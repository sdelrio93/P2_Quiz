const figlet = require('figlet');
const chalk = require('chalk');


exports.colorize = (msg,color) => {
	if (typeof color !== "undefined"){
		msg=chalk[color].bold(msg);
	}
	return msg;
};
exports.log = (msg,color) => {
	console.log(colorize(msg,color));
};

exports.biglog = (msg,color) => {
	log(figlet.textSync(msg, { horizontalLayout: 'full'}),color);
};

exports.errorlog = (emsg) => {
	console.log(`${colorize("Error", "red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}`);
};

