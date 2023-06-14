import { dateTimeToSnowflake, getMessagesFromChannel, sendRequestWithAuthenticationAndRateLimiting } from "./discord";

export async function runExport(token, channelId, setProgress, startTime) {
    await getMessagesFromChannel(channelId, token, setProgress, startTime);
}