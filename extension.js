// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

let outer_panel = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('catCoding.start', () => {
			// Create and show a new webview
			let panel = vscode.window.createWebviewPanel(
				'catCoding', // Identifies the type of the webview. Used internally
				'Cat Coding', // Title of the panel displayed to the user
				vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
				{} // Webview options. More on these later.
			);
			outer_panel = panel;

			//todo: new code for
			updateWebview(panel);

		})
	);

	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(editor => {
		if (editor) {
			if (outer_panel) {
				updateWebview(outer_panel);
			}
		}
	}));
}

function updateWebview(panel) {
	let doc = vscode.window.activeTextEditor.document;
	let line = doc.lineAt(1);
	// And set its HTML content
	panel.webview.html = getWebviewContent(line.text);
}

function getWebviewContent(text) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
	  <div>${text}</div>
  </body>
  </html>`;
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

