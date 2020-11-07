import {Map} from 'immutable';
import {validatePlaceValues} from './place-validator';


export const GRID_SIZE = Map({
	x:5,
	y:5
});
export const INITIAL_STATE = Map();

//Retrive old state and return new state

export function place(state, placeValues) {
	const immbutablePlaceValues = Map(placeValues);
	const gridSize = state.get('gridSize', GRID_SIZE);
	if(!validatePlaceValues(immbutablePlaceValues,gridSize)){
		return state;
	}
  return state
  	.set('isPlaced', true)
  	.set('gridSize', gridSize)
  	.set('position', Map({
  		x: immbutablePlaceValues.get('x'),
  		y: immbutablePlaceValues.get('y')
  	}))
  	.set('facing', immbutablePlaceValues.get('f'));
}

//move pacman position and keep it in grid

function keepWithInGrid(change,maximumValue){
	return position =>{
		if(change === 'increase' && position +1 !== maximumValue){
			return position + 1;
		}
		if(change === 'decrease' && position !== 0){
			return position - 1;
		}
		console.log('Pacman cannot go outside of grid');
		return position;
	};
};

//Move pacman depending on the side which pacman is facing
//return old state if pacman is not placed

export function move(state) {
	if(!state.get('isPlaced')){
		console.log('Pacman is not placed on grid.\nPlease place pacman on grid using PLACE command');
		return state;
	}
	switch (state.get('facing')) {
	case 'NORTH':
	  return state.updateIn(['position', 'y'], keepWithInGrid('increase', state.getIn(['gridSize', 'y'])));
	case 'SOUTH':
	  return state.updateIn(['position', 'y'], keepWithInGrid('decrease'));
	case 'EAST':
		return state.updateIn(['position', 'x'], keepWithInGrid('increase', state.getIn(['gridSize', 'x'])));
	case 'WEST':
		return state.updateIn(['position', 'x'], keepWithInGrid('decrease'));
	}
	return state;
}

//Rotate pacman left

function rotateLeft(facing){
	switch(facing){
		case 'NORTH':
			return 'WEST';
		case 'SOUTH':
			return 'EAST';
		case 'EAST':
			return 'NORTH';
		case 'WEST':
			return 'SOUTH';
	}
}

//Rotate pacman right

function rotateRight(facing){
	switch(facing){
		case 'NORTH':
			return 'EAST';
		case 'SOUTH':
			return 'WEST';
		case 'EAST':
			return 'SOUTH';
		case 'WEST':
			return 'NORTH';
	}
}

//Rotate pacman depending depending upon the side pacman is facing 

function makeCorrectRotation(direction){
	return facing =>{
		if(direction === 'LEFT'){
			return rotateLeft(facing);
		}
		if(direction === 'RIGHT'){
			return rotateRight(facing);
		}
	};
}

//Rotate Pacman if placed on grid

export function rotate(state, rotateDirection) {
		if(!state.get('isPlaced')){
		console.log('Pacman is not placed on grid.\nPlease place pacman on grid using PLACE command');
			return state;
		}
		if(rotateDirection !== 'LEFT' && rotateDirection !== 'RIGHT'){
			return state;
		}
		return state.update('facing', makeCorrectRotation(rotateDirection));
}

//Print report if pacman is placed

export function report(state){
	if(!state.get('isPlaced')){
		return state;
	}
	console.log(`Pacman\'s Coordibates are  X : ${state.getIn(['position','x'])} and Y : ${state.getIn(['position','y'])} and it is Facing ${state.get('facing')}`);
	return state.update('haveReportet', 0, timesReportet => timesReportet + 1);
}