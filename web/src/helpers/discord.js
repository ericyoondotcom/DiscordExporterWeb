const BASE_URL = "https://discord.com/api/v10/";

export async function sendRequestWithAuthenticationAndRateLimiting(url, token) {
    const res = await fetch(BASE_URL + url, {
        headers: {
            "Authorization": token,
        },
    });

    const remainingRequestCount = parseInt(res.headers.get("X-RateLimit-Remaining"));
    const resetAfterDelaySecs = parseFloat(res.headers.get("X-RateLimit-Reset-After"));
    
    if(!res.ok) {
        throw new Error(`Request to ${url} failed with status ${res.status}. ${await res.text()}}`);
    }

    const delay =
        // Tyrrrz: Sometimes Discord returns an absurdly high value for the reset time, which
        // is not actually enforced by the server. So we cap it at a reasonable value.
        Math.min(
            // Tyrrrz: Adding a small buffer to the reset time reduces the chance of getting
            // rate limited again, because it allows for more requests to be released.
            resetAfterDelaySecs + 1,
            60
        );
    
    if(!isNaN(delay)){
        console.log("Waiting for rate limit: " + delay + " secs");
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }

    return await res.json();
}

export async function getMessagesFromChannel(channelId, token, setProgress, startTime) {
    // Get the last message so we can roughly calculate based on timestamps the progress of the export
    const lastMessage = await getLastMessageFromChannel(channelId, token);

    let firstMessage = null;
    let nextPageSnowflake = startTime ? dateTimeToSnowflake(startTime) : "0";

    let allMessages = [];

    while(true) {
        const paramObject = {
            limit: 100
        };
        if(nextPageSnowflake) paramObject.after = nextPageSnowflake;
        const searchParams = new URLSearchParams(paramObject);
        const url = `channels/${channelId}/messages?${searchParams.toString()}`;
        let messages = await sendRequestWithAuthenticationAndRateLimiting(url, token);
        messages = messages.reverse();

        if(messages.length === 0) break;

        if(!firstMessage) firstMessage = messages[0];
        nextPageSnowflake = messages[messages.length - 1].id;

        const totalExportTime = new Date(lastMessage.timestamp).getTime() - new Date(firstMessage.timestamp).getTime();
        const completedExportTime = new Date(messages[messages.length - 1].timestamp).getTime() - new Date(firstMessage.timestamp).getTime();

        setProgress(Math.max(completedExportTime / totalExportTime, 0.01));
        allMessages = allMessages.concat(messages);
    }

    return allMessages;
}

export async function getLastMessageFromChannel(channelId, token) {
    const url = `channels/${channelId}/messages?limit=1`;
    const messages = await sendRequestWithAuthenticationAndRateLimiting(url, token);
    if(messages.length === 0) return null;
    return messages[0];
}

export function dateTimeToSnowflake(datetime) {
    const unixMillis = datetime.getTime();
    const snowflake = (BigInt(unixMillis) - 1420070400000n) << 22n; 
    return snowflake.toString();
}