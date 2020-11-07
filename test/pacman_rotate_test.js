import {List, Map} from 'immutable';
import {expect} from 'chai';
import {rotate} from '../src/core';

describe('Pacman rotate function', () => {
	it('should rotate to West from NORTH when command is LEFT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'NORTH'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'WEST'
		}));
	});
	it('should rotate to EAST from NORTH when command is RIGHT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'NORTH'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'EAST'
		}));
	});
	it('should rotate to EAST from SOUTH when command is LEFT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'SOUTH'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'EAST'
		}));
	});
	it('should rotate to WEST from SOUTH when command is RIGHT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'SOUTH'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'WEST'
		}));
	});
	it('should rotate to NORTH from WEST when command is RIGHT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'WEST'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'NORTH'
		}));
	});
	it('should rotate to SOUTH from WEST when command is LEFT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'WEST'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'SOUTH'
		}));
	});
	it('should rotate to SOUTH from EAST when command is RIGHT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'EAST'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'SOUTH'
		}));
	});
	it('should rotate to NORTH from EAST when command is LEFT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'EAST'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			facing: 'NORTH'
		}));
	});
	it('should not rotate if it hasn\'t been placed on the grid', () => {
		const state = Map({
			facing: 'EAST'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(state);
	});
	it('should not rotate if the command is not LEFT or RIGHT', () => {
		const state = Map({
			isPlaced: true,
			facing: 'EAST'
		});
		const nextState = rotate(state, 'HELLO')
		expect(nextState).to.equal(state);
	});
});
