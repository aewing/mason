"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Command = require("./Command");

var _Command2 = _interopRequireDefault(_Command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal plugin to register all built-in Mason commands
 * @param  {Mason} Mason The Mason instance
 * @return {void}
 */
exports.default = Mason => {
	class VersionCommand extends _Command2.default {
		static get description() {
			return "Displays the current Mason build version";
		}

		run(input, config) {
			console.log("Mason version: " + Mason.version());
		}
	}

	class HelpCommand extends _Command2.default {
		static get description() {
			return "Displays this help text";
		}

		run(input, config) {
			if (input.args.length) {
				let cmd = input.args[0];
				let command = Mason.getCommand(cmd, true);
				if (command) {
					console.log("Mason - " + cmd + " Help");
					console.log("---------------------------");
					command.help();
					console.log("---------------------------");

					return;
				}
			}

			console.log("Mason - Available Commands");
			console.log("---------------------------");
			Mason.commands.forEach((cmd, name) => {
				console.log(name + ": " + (cmd.description ? cmd.description : "(no description provided)"));
			});
			console.log("---------------------------");
		}
	}

	Mason.registerCommand("help", HelpCommand);
	Mason.registerCommand("version", VersionCommand);
};