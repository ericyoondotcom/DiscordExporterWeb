import React, { useCallback, useState } from "react";
import "./stylesheets/ExportPage.css";
import moment from "moment";
import BlurpleBackground from "./BlurpleBackground";
import Button from "./Button";
import Input from "./Input";
import Spacer from "./Spacer";
import Center from "./Center";
import { runExport } from "../helpers/export";
import ProgressBar from "./ProgressBar";

function ExportPage() {
	const urlParams = new URLSearchParams(window.location.search);

	const [token, setToken] = useState(urlParams.get("token") || "");
	const [channelId, setChannelId] = useState(urlParams.get("channel") || "");
	const [startTime, setStartTime] = useState("");
	const [basicData, setBasicData] = useState(false);
	const [tokenIsBot, setTokenIsBot] = useState(false);
	const [progress, setProgress] = useState(0);
	const [statusText, setStatusText] = useState("");
	const [error, setError] = useState(null);

	const onExportClick = useCallback(async () => {
		try {
			await runExport(
				tokenIsBot ? `Bot ${token}` : token,
				channelId,
				startTime,
				basicData,
				setProgress,
				setStatusText
			);
		} catch(e) {
			setError(e.toString());
			return;
		}
		setProgress(0);
		setStatusText("");
	}, [token, tokenIsBot, channelId, setProgress, basicData, startTime, setError, setStatusText]);

	const startDateToggle = useCallback(() => {
		if(startTime){
			setStartTime(null);
		}
		else {
			const date = new Date();
			date.setDate(date.getDate() - 7);
			setStartTime(date);
		}
	}, [startTime, setStartTime]);

	return (
		<div id="export-page" className="rails">
			<BlurpleBackground>
				<h1>Discord Exporter Web</h1>
				<p>
					Open source — <a href="https://github.com/ericyoondotcom/discordexporterweb" target="_blank" rel="noreferrer">View on GitHub</a>
					<br />
					Made by <a href="https://yoonicode.com" target="_blank" rel="noreferrer">Yoonicode</a>
					<br />
					Inspired by Tyrrrz's <a href="https://github.com/Tyrrrz/DiscordChatExporter" target="_blank" rel="noreferrer">DiscordChatExporter</a>
				</p>
				<Spacer height="50px" />
				<h2>1. Enter your Discord token</h2>
				<ol>
					<li>Open the Discord Developer Console by pressing Ctrl/Cmd + Shift + I.</li>
					<li>Go to the Networking tab.</li>
					<li>Click on any channel.</li>
					<li>Search for the entry that starts with <code>messages?limit=</code>.</li>
					<li>Under <b>Request Headers</b>, copy the value in the <b>authorization</b> field.</li>
				</ol>
				<p>
					<b>Is it safe to enter my token into this website?</b><br />
					Good on you for being security-conscious! The website does not transmit your token to any
					server except Discord's. You can verify this by looking at my source code
					on <a href="https://github.com/ericyoondotcom/discordexporterweb" target="_blank" rel="noreferrer">GitHub</a> or
					carefully inspecting the Networking tab in the developer console.
				</p>
				<Spacer height="30px" />
				{/* TODO: Bots are not supported from a web context. See https://github.com/discord/discord-api-docs/issues/2078#issuecomment-697829305 */}
				{/* <Button
					small
					content={tokenIsBot ? "Use user token instead" : "Use bot token instead"}
					emoji={tokenIsBot ? "🧒" : "🤖"}
					onClick={() => setTokenIsBot(!tokenIsBot)}
				/> */}
				<Spacer height="10px" />
				<Input
					placeholder={tokenIsBot ? "Bot token" : "Discord token"}
					value={token}
					onChange={e => setToken(e.target.value)}
				/>
				<Spacer height="30px" />

				<h2>2. Enter the channel ID</h2>
				<ol>
					<li>Enable developer mode in Discord. Go to <b>Settings</b>, then <b>Advanced</b>, then turn on <b>Developer Mode</b>.</li>
					<li>Right click on the channel you want to export, then click <b>Copy ID</b>.</li>
				</ol>

				<Input
					placeholder="Channel ID"
					value={channelId}
					onChange={e => setChannelId(e.target.value)}
				/>
				<Spacer height="30px" />

				<h2>3. Options</h2>
				<Spacer height="10px" />
				<Button
					small
					content={startTime ? "Include all messages" : "Specify start time"}
					emoji={startTime ? "❌" : "🕒"}
					onClick={startDateToggle}
				/>
				{
					startTime && (
						<>
							<Spacer height="10px" />
							<Input
								small
								type="datetime-local"
								value={moment(startTime).format("YYYY-MM-DDTHH:mm")}
								onChange={e => setStartTime(new Date(e.target.value))}
							/>
						</>
					)
				}
				<Spacer height="10px" />
				<Button
					small
					content={basicData ? "Export full data" : "Export basic subset of data (smaller file)"}
					emoji={basicData ? "🖐️" : "☝️"}
					onClick={() => setBasicData(!basicData)}
				/>
				<Spacer height="30px" />
				<h2>4. Export</h2>
				<Spacer height="10px" />
				<p>
					Once we've gathered all of the messages (will take a while), you'll get your download in JSON format.
				</p>
				<Spacer height="30px" />
				{
					progress === 0 && (
						<Center>
							<Button content="Export" emoji="➡️" emojiRight onClick={onExportClick} />
						</Center>
					)
				}
				{
					progress > 0 && (
						<ProgressBar progress={progress} />
					)
				}
				{
					statusText && (
						<p>{statusText}</p>
					)
				}
				{
					error && (
						<p className="error">{error}</p>
					)
				}
			</BlurpleBackground>
		</div>
    );
}

export default ExportPage;
