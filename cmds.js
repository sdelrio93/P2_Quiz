
const out = require("./out");
const figlet = require('figlet');
const chalk = require('chalk');


const colorize = (msg,color) => {
	if (typeof color !== "undefined"){
		msg=chalk[color].bold(msg);
	}
	return msg;
};
const log = (msg,color) => {
	console.log(colorize(msg,color));
};

const biglog = (msg,color) => {
	log(figlet.textSync(msg, { horizontalLayout: 'full'}),color);
};

const errorlog = (emsg) => {
	console.log(`${colorize("Error", "red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}`);
};



const model = require('./model');

exports.helpCmd = rl => {
	  console.log("Commandos");
      console.log(	"h|help - Muestra esta ayuda.");
      console.log(	"list - Listar los quizzes existentes.");
      console.log(	"show <id> - Muestra la pregunta y la respuesta del quiz indicado.");
      console.log(	"add - Añadir nuevo quiz interactivamente.");
      console.log(	"delete <id> - Borrar el quiz indicado.");
      console.log(	"edit <id> - Editar el quiz indicado.");
      console.log(	"test <id> - Probar el quiz indicado.");
      console.log(	"p|play - Jugar a preguntar aleatoriamente todos los quizzes.");
      console.log(	"credits - Creditos.");
      console.log(	"q|quit - Salir del programa.");
      rl.prompt();

};

exports.listCmd = rl => {
	model.getAll().forEach((quiz, id) => {

		log(`[${colorize(id,'magenta')}] : ${quiz.question}`);
	});
	
	rl.prompt();
};

exports.showCmd = (rl,id) => {
	log('Mostrar el quiz indicado.','red');
	rl.prompt();
};

exports.addCmd = rl => {
	log('Añadir un nuevo quiz.','red');
	rl.prompt();
};

exports.testCmd = (rl,id) => {
	log('Probar el quiz indicado.','red');
	rl.prompt();
};

exports.deleteCmd = (rl,id) => {
	log('Borrar el quiz indicado.','red');
	rl.prompt();
};

exports.editCmd = (rl,id) => {
	log('Editar el quiz indicado','red');
	rl.prompt();
};

exports.playCmd = rl => {
	log('Jugar.','red');
	rl.prompt();
};

exports.creditsCmd = rl => {
	console.log('Autor de la práctica:');
    log('SERGIO','green');
    rl.prompt();

};

exports.quitCmd = rl => {
	rl.close();
	rl.prompt();
};