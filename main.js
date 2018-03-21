
const readline = require('readline');



const model = require('./model');



const cmds = require('./cmds');

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


//Mensaje inicial
biglog("CORE Quiz", "green");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorize( 'quiz> ','blue'),
  completer: (line) => {
  	const completions = 'h help add delete edit list test p play credits q quit'.split(' ');
  	const hits = completions.filter((c) => c.startsWith(line));
  	// show all completions if none found
  	return [hits.length ? hits : completions, line];
	}  
});

rl.prompt();

rl
.on('line', (line) => {

	var args = line.split(" ");
	var cmd = args[0].toLowerCase().trim();


  switch (cmd) {
    case '':
    	rl.prompt();
    	break;
    case 'help':
    case 'h':
    	cmds.helpCmd(rl);     
      break;

    case 'quit':
    case 'q':
    	cmds.quitCmd(rl);
    	
    	break;

    case 'add':
    	cmds.addCmd(rl);
    	break;

    case 'list':
    	cmds.listCmd(rl);
    	break;

    case 'show':
    	cmds.showCmd(rl,args[1]);
    	break;

    case 'test':
    	cmds.testCmd(rl,args[1]);
    	
    	break;

    case 'play':
    case 'p':
    	cmds.playCmd(rl);
    	
    	break;

    case 'delete':
    	cmds.deleteCmd(rl);
    	
    	break;

    case'edit':
    	cmds.editCmd(rl,args[1]);
    	
    	break;

    case 'credits':
    	cmds.creditsCmd(rl);
    	
    	break;

      
    default:
      console.log(`Commando desconocido: '${colorize(cmd,"red")}'`);
      console.log(`Use ${colorize('help','green')} para ver todos los comandos disponibles'`);
      rl.prompt();
      break;
  }
  
})
.on('close', () => {
  log('Adiós!');
  process.exit(0);
});

