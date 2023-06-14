import React from "react";
import "./stylesheets/ExportPage.css";
import BlurpleBackground from "./BlurpleBackground";
import Button from "./Button";
import Input from "./Input";
import Spacer from "./Spacer";
import Center from "./Center";

function ExportPage() {
	const [token, setToken] = React.useState("");
	const [channelId, setChannelId] = React.useState("");

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
				
				<Input
					placeholder="Discord token"
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

				<h2>3. Export</h2>
				<Spacer height="10px" />
				<p>
					Once we've gathered all of the messages (will take a while), you'll get your download in CSV format.
				</p>
				<Spacer height="30px" />
				<Center>
					<Button content="Export" emoji="➡️" emojiRight />
				</Center>
			</BlurpleBackground>
		</div>
    );
}

export default ExportPage;
