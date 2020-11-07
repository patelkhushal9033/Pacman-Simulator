import {Map} from 'immutable';

//check if the cordinate is integer
function isInteger(number){
	if(typeof number ==='number' && (number%1) === 0){
		return false;
	}
	console.log('Only numbers are accepted as coordinates.\nPlease enter numbers only');
	return true;
}

function isOutsideGrid(placeValues, gridSize){
	if(placeValues.get('x') > gridSize.get('x') ||
	   placeValues.get('y') > gridSize.get('y')){
		console.log('The entered coordinates are outside grid area');
		return true;
	}
	return false;
}

function isNegativeNumber(placeValues){
	if(placeValues.get('y') < 0 || placeValues.get('x') < 0){
		console.log('The entered coordinates are outside grid area');
		return true;
	}
	return false;
}

//Validates position
function validatePosition(placeValues, gridSize){
	if(isInteger(placeValues.get('y')) ||
	   isInteger(placeValues.get('x')) ||
	   isNegativeNumber(placeValues)   ||
	   isOutsideGrid(placeValues, gridSize)){
		return false;
	}
	return true;
}

/**
 * Checks that facing is valid string.
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
//Checks facing of pacman
function validateFacing(placeValues){
	const validFacingValue = Map({
		NORTH: true,
		SOUTH: true,
		EAST: true,
		WEST: true
	});
	if(validFacingValue.has(placeValues.get('f'))){
		return true;
	}else{
		console.log('Please enter NORTH, EAST, SOUTH or WEST as facing');
	}
}

//validate place values 
export function validatePlaceValues(placeValues, gridSize){
	if(!validateFacing(placeValues)){
		return false;
	}
	if(!validatePosition(placeValues,gridSize)){
		return false;
	}
	return true;
}