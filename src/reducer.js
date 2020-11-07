import {place, rotate, move, report, INITIAL_STATE} from './core';

//Retrive current state and return new state
export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'PLACE':
			return place(state, action.position);
		case 'ROTATE':
			return rotate(state, action.direction);
		case 'MOVE':
			return move(state);
		case 'REPORT':
			return report(state);
	}
	return state;
}