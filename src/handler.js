import { from } from "core-js/fn/array";
import {place, rotate, move, report} from './command';

//Handle single word commands
function handleSingleCommand(input){
    if(input === 'MOVE'){
        return [move()]
    }
    if(input === 'LEFT' || input === 'RIGHT'){
        return [rotate(input)]
    }
    if(input === 'REPORT'){
        return [report()]
    }
    console.log('Invalid Command \n Please use MOVE, PLACE, LEFT or RIGHT command');
    return[]
}

//Handle place command
function handleCommandWithParameter(input){
    const [inputType, inputParameters] = input.split(' '),
    [x,y,f] = inputParameters.split(',');

    if(inputType !== 'PLACE' || inputParameters.split(',').length !== 3){
        console.log('Invalid use of PLACE command \n example PLACE 0,0,EAST');
        return[]
    }
    return [place({
        x: parseInt(x,10),
        y: parseInt(y, 10),
        f: f
    })];
}

//Handle commands
export function handleCommand(input){
    const command = input.toUpperCase().trim(),
        actionWithArguments = command.split(' ').length > 1;
    if(actionWithArguments){
        return handleCommandWithParameter(command);
    }
    return handleSingleCommand(command);
}
