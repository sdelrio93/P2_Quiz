
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

		log(`Pregunta Número ${colorize(id,'magenta')} : ${quiz.question}`);
	});
	
	rl.prompt();
};

exports.showCmd = (rl,id) => {
	if (typeof id == "undefined"){
		errorlog(`Falta el parámetro id.`);	

	}else{
		try{
			const quiz = model.getByIndex(id);
			log(`[${colorize(id, 'magenta')}] : ${quiz.question} ${colorize('=>', 'magenta')} ${quiz.answer}`);
		} catch(error){
			errorlog(error.message);
		}
	}

	rl.prompt();
};

exports.addCmd = rl => {
	
	rl.question(colorize(' Introduzca una pregunta:', 'red'), question => {

		rl.question(colorize(' Introduce una respuesta:', 'red'), answer => {
			
			model.add(question,answer);
			log(`${colorize('Se ha añadido','magenta')}:${question}  ${colorize('=>', 'magenta')} ${answer}`);
			rl.prompt();

		});
	});
	
};

exports.testCmd = (rl,id) => {

	if (typeof id == "undefined"){
		errorlog(`Falta el parámetro id.`);	
		rl.prompt();
	} else {
		try {
			var quiz = model.getByIndex(id);
			rl.question(colorize(`${quiz.question}`, 'red'), answer => {

				var answerPlayer = answer.toLowerCase().trim();
				var answerReal = acentos(quiz.answer.toLowerCase().trim());		

				if(answerPlayer=== answerReal){
					biglog("Correcta", "green");
					rl.prompt();
				}else{
					biglog("Incorrecta", "red");
					rl.prompt();
				}				
				
			});

		} catch (error){
			errorlog(error.message);
			rl.prompt();
		}		

	}	
	rl.prompt();	

	
};

exports.deleteCmd = (rl,id) => {
	if (typeof id == "undefined"){
		errorlog(`Falta el parámetro id.`);	
	}else{
		try{
			model.deleteByIndex(id);
		} catch(error){
			errorlog(error.message);
		}
	}

	rl.prompt();

};

exports.editCmd = (rl,id) => {
	if (typeof id == "undefined"){
		errorlog(`Falta el parámetro id.`);	
		rl.prompt();
	} else {
		try {
			rl.question(colorize(' Introduzca una pregunta:', 'red'), question => {
				rl.question(colorize(' Introduce una respuesta:', 'red'), answer => {			
					model.update(id,question,answer);
					log(` Se ha cambiado  el quiz${colorize(id,'magenta')}:${question}  ${colorize('=>', 'magenta')} ${answer}`);
					rl.prompt();
				});
			});
		} catch (error){
			errorlog(error.message);
			rl.prompt();
		}		

	}	
	rl.prompt();
};

exports.playCmd = rl => {

	if(model.count() ==0){
		log('No hay preguntas para jugar');
		rl.prompt();
		return;
	}

	var points = 0;
	var toBeResolved = [];
	toBeResolved.lenght = model.count();
	var long = toBeResolved.lenght;

	for (var i = 0; i < toBeResolved.lenght; i++) {
		toBeResolved.push(i);
	}

	const playOne = () => {

		var randomId = Math.floor(Math.random()*(long -points)); //nº al azar para el array de id
		var idRandom = toBeResolved[randomId];
		const quiz = model.getByIndex(idRandom);

		log(`${quiz.question} ?`);
		rl.question('Introduce la respuesta: ', answer =>{
			var answerPlayer = answer.toLowerCase().trim();
			var answerReal = acentos(quiz.answer.toLowerCase().trim());

			if( answerPlayer === answerReal){
				++points;
				log(`u respuesta es: CORRECTA. Lleva ${points}`);
				if(points<long){
					toBeResolved.splice(randomId,1);
					rl.prompt();
					playOne();
				} else {
					log(`HAS ACERTDO TODAS LAS PREGUNTAS, ENHORABUENA!!`);
					rl.prompt();
				}
			} else {
				log(`Su respuesta es : INCORRECTA`);
				log(`Ha acertado: ${points} de ${long} preguntas`);
				log(`FIN DEL JUEGO`,'red');
				rl.prompt();
			}
		});
	}
	playOne();	

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
function acentos(cadena){
	cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    return cadena;
}
