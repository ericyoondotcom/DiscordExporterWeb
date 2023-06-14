import { getMessagesFromChannel } from "./discord";

export async function runExport(token, channelId, startTime, basicData, setProgress, setStatusText) {
    setStatusText("Fetching messages from Discord...");
    let messages = await getMessagesFromChannel(channelId, token, setProgress, startTime);
    if(basicData) {
        setStatusText("Transforming to basic data...");
        messages = transformToBasicData(messages);
    }
    setStatusText("Downloading...");
    downloadJSON(messages, channelId);
}

function transformToBasicData(messages) {
    return messages.map(message => {
        return {
            author: {
                username: message.author.username,
                global_name: message.author.global_name,
                discriminator: message.author.discriminator,
                avatar: message.author.avatar,
                id: message.author.id
            },
            content: message.content,
            timestamp: message.timestamp,
            id: message.id
        };
    });
}

function downloadJSON(json, filename) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    const anchor = document.createElement("a");
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `${filename}.json`);
    anchor.click();
}
