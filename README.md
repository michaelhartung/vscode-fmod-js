# fmod-vscode-js

Is a [Visual Studio Code](https://code.visualstudio.com/) extension that allows
to execute javascript in a [FMOD Studio](https://fmod.com) project via the 
[FMOD Scripting API](https://www.fmod.com/docs/2.01/studio/scripting-api-reference.html) 
over TCP/IP.

## Installation

To install the extension download the `.vsix` file of latest release and install
it manually from a terminal using:

```
code --install-extension vscode-fmod-js-<version>.vsix
```

**Note:** For the time being I don't intend to distribute this extension via the
VSCode marketplace as I don't know what this entails in terms of costs.

## Usage

Running `FMOD: Attach` will attempt to attach to an open FMOD Studio project
using the `host` configured in the settings which defaults to `127.0.0.1`.

On success, an output window is opened for the open connection and a
notification is displayed (in case no notification is shown, check your
notication settings).

Running `FMOD: Run` or pressing `CTRL+Enter` will send the current text
buffer/file to the FMOD Studio project to execute. 

If a text selection exists, only the selection is sent.

**Note**: The extension checks if the file language is set to `javascript` and 
does not sent anything to FMOD if that's not the case.

The result will be displayed in the `FMOD JS` output window.

`FMOD: Detach` will close the remote connection.

![demo](./media/demo/vscode-fmod-js_demo.gif)

## Extension Settings

This extension contributes the following settings:

### `fmod-js.remote.host`

The host to connect to. Defaults to `localhost`.

**Note**: I have **not tested** remote connections on local networks, in *theory
should work*™.

## Contributing

This project welcomes contributions.

## License

This project is licensed under a [MIT license](https://mit-license.org/), see
[LICENSE.md](LICENSE.md).

Copyright of the FMOD icon belongs to Firelight Technologies Pty Ltd.