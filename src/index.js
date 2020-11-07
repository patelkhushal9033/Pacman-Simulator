import makeStore from './store';
import {handleCommand} from './handler';
import 'colors';
const readline = require('readline')
.createInterface({
	input: process.stdin,
	output: process.stdout
});
const store = makeStore();

console.log('\nPacman Simulator'.rainbow.bold);
console.log('\nHere\'s a list of input commands to navigate pacman\n'.bold);
console.log('                   '.bgBrightBlue.bold.white);
console.log('  - PLACE X,Y,F    '.bgBrightBlue.bold.white);
console.log('  - MOVE           '.bgBrightBlue.bold.white);
console.log('  - LEFT           '.bgBrightBlue.bold.white);
console.log('  - RIGHT          '.bgBrightBlue.bold.white);
console.log('  - REPORT         '.bgBrightBlue.bold.white);
console.log('                   '.bgBrightBlue.bold.white);
console.log('\nHave Fun...\n'.random);

function handleLineInput(input){
	const action = handleCommand(input);
	action.forEach(store.dispatch);
	readline.prompt();
}

readline
.on('line', handleLineInput)
.on('close', ()=> {
	console.log('Thanks for playing');
	process.exit(0);
})
.setPrompt('Pacman> ');
readline.prompt();