// 2024 Michael Hartung <michael@hartung.studio>

import * as vscode from "vscode";
import os from "os";
import path from "path";

import { FmodRemoteHandler } from "./modules/fmodremotehandler";

let fmodRemoteHandler: FmodRemoteHandler;

export function activate(context: vscode.ExtensionContext) {

	fmodRemoteHandler = new FmodRemoteHandler();

	let attach = vscode.commands.registerCommand("fmod-js.attach", () => {
		if (!fmodRemoteHandler.isReady()) {
			let config = vscode.workspace.getConfiguration("fmod-js");
			const host = config.get("remote.host") as string;
			fmodRemoteHandler.connect(host);
		}
	});

	context.subscriptions.push(attach);

	let detach = vscode.commands.registerCommand("fmod-js.detach", () => {
		fmodRemoteHandler.disconnect();
	});

	context.subscriptions.push(detach);

	let run = vscode.commands.registerCommand("fmod-js.run", () => {

		const editor = vscode.window.activeTextEditor;

		if (editor) {

			let txt;

			if (!editor.selection.isEmpty)
			{
				txt = editor.document.getText(editor.selection);
			} else {
				txt = editor.document.getText();
			}

			fmodRemoteHandler.send(txt);
		}
	});

	context.subscriptions.push(run);
}

export function deactivate() {
	fmodRemoteHandler.disconnect();
}