import {fromJS, List, Map} from 'immutable';
import {expect} from 'chai';
import {should} from 'chai';

import {move} from '../src/core';

describe('Pacman move function', () => {
	it('should move one step North when facing North', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 4}),
			facing: 'NORTH'
		}));
	});
	it('should move one step South when facing South', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 3}),
			facing: 'SOUTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 2}),
			facing: 'SOUTH'
		}));
	});
	it('should move one step EAST when facing EAST', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 3}),
			facing: 'EAST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		}));
	});
	it('should move one step WEST when facing WEST', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 3}),
			facing: 'WEST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'WEST'
		}));
	});
	it('should\'t move while facing WEST and x is 0 (outside of grid)', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 0, y: 3}),
			facing: 'WEST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 0, y: 3}),
			facing: 'WEST'
		}));
	});
	it('should\'t move while facing EAST and x is 4 (outside of grid)', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 3}),
			facing: 'EAST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 3}),
			facing: 'EAST'
		}));
	});
	it('should\'t move while facing NORTH and y is 4 (outside of grid)', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 4}),
			facing: 'NORTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 4}),
			facing: 'NORTH'
		}));
	});
	it('should\'t move while facing SOUTH and y is 0 (outside of grid)', () => {
		const state = Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 0}),
			facing: 'SOUTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 0}),
			facing: 'SOUTH'
		}));
	});
	it('should not move if pacman hasnt been placed', () => {
		const state = Map({
			gridSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'SOUTH'
		});
		const nextState = move(state);
		expect(nextState).to.equal(state);
	});
});
