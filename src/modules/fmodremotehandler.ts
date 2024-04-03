// 2024 Michael Hartung

import net from "node:net";
import * as vscode from "vscode";

export class FmodRemoteHandler {

    _host!: string;
    _port: number = 3663;
    _sock!: net.Socket;
    _outputChannel!: vscode.OutputChannel;
    _statusBarItem!: vscode.StatusBarItem;
    _ready: Boolean = false;

    constructor() {

        this._sock = new net.Socket();
        this._sock.on("ready", this.onReady.bind(this));
        this._sock.on("data", this.onData.bind(this));
        this._sock.on("error", this.onError.bind(this));

        this._outputChannel = vscode.window.createOutputChannel("FMOD JS");
        this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    }

    connect(host: string): void {
        this._host = host;
        this._sock.connect({ host: this._host, port: this._port });
    }

    disconnect(): void {
        this._ready = false;
        this._sock.destroy();
        this._outputChannel.hide();
        this._statusBarItem.hide();
    }

    send(payload: string): void {
        if (this._ready) {
            this._sock.write(payload);
        } else {
            vscode.window.showErrorMessage("FMOD JS: FMOD Studio not connected");
        }
    }

    isReady(): Boolean { 
        return this._ready; 
    }

    onReady(): void { 
        this._ready = true; 
        this._outputChannel.show();
        this._statusBarItem.text = "FMOD: Ready";
        this._statusBarItem.show();
        vscode.window.showInformationMessage(`FMOD JS: Connected to ${this._host}:3663`);
    }

    onData(buf: Buffer): void {

        let data = buf.toString('utf8');
        let r = /(.+)\(\):\s+(.+)/;
        let match = data.match(r);

        if (match !== null) {
            if (match.length > 1) {
                let responseType = match[1];
                let responseData = match[2];
                let response = {
                    "type": match[1],
                    "data": match[2]
                }
                this._outputChannel.append(`${response.data}\n`);
            }
        }
    }

    onError(err: Error): void {
        vscode.window.showErrorMessage(`FMOD JS: Error failed to connect to ${this._host}:3663`);
    }
}