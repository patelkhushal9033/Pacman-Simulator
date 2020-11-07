import {List, Map} from 'immutable';
import {expect} from 'chai';

import {place} from '../src/core';



describe('Pacman place function', () => {

	it('should place pacman on correct coordinates and direction facing', () => {
		const state = Map();
		const placeValues = Map({
			x: 1,
			y:1,
			f: 'WEST'
		});
		const nextState = place(state, placeValues);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			gridSize: Map({
				x: 5,
				y: 5
			}),
			position: Map({x: 1, y: 1}),
			facing: 'WEST'
		}));
	});

	it('should converts to immutable', () => {
		const state = Map();
		const placeValues = {
			x: 1,
			y: 1,
			f: 'WEST'
		};
		const nextState = place(state, placeValues);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				gridSize: Map({
					x: 5,
					y: 5
				}),
				position: Map({x: 1, y: 1}),
				facing: 'WEST'
			}));
	});

	it('should ignore values outside grid area', () => {
		const state = Map();
		const placeValuesInvalidX = {
			x: 6,
			y: 1,
			f: 'WEST'
		};
		const placeValuesInvalidY = {
			x: 1,
			y: 9,
			f: 'WEST'
		};
		const nextStateInvalidX = place(state, placeValuesInvalidX);
		const nextStateInvalidY = place(state, placeValuesInvalidY);
		expect(nextStateInvalidX).to.equal(state);
		expect(nextStateInvalidY).to.equal(state);

	});

	it('should place pacman even when it has already been placed', () => {
		const state = Map({
				isPlaced: true,
				gridSize: Map({
					x: 5,
					y:5
				}),
				position: Map({x: 1, y: 1}),
				facing: 'EAST'
		});
		const placeValues = {
			x: 1,
			y:3,
			f: 'NORTH'
		};
		const nextState = place(state, placeValues);
		expect(nextState).to.equal(Map({
				isPlaced: true,
				gridSize: Map({
					x: 5,
					y:5
				}),
				position: Map({x: 1, y: 3}),
				facing: 'NORTH'
		}));
	});
	it('should ignore when coordinates are not integer', () => {
		const state = Map();
		const placeValuesInvalidX = {
			x: 1.3,
			y:3,
			f: 'EAST'
		};
		const placeValuesInvalidY = {
			x: 1,
			y:3.1,
			f: 'EAST'
		};
		const nextStateInvalidY = place(state, placeValuesInvalidX);
		const nextStateInvalidX = place(state, placeValuesInvalidY);
		expect(nextStateInvalidY).to.equal(state);
		expect(nextStateInvalidX).to.equal(state);
	});
	it('should ignore when the coordinates are negative value', () => {
		const state = Map();
		const placeValuesInvalidX = {
			x: -1,
			y: 3,
			f: 'EAST'
		};
		const placeValuesInvalidY = {
			x: 1,
			y: -4,
			f: 'EAST'
		};
		const nextStateInvalidY = place(state, placeValuesInvalidX);
		const nextStateInvalidX = place(state, placeValuesInvalidY);
		expect(nextStateInvalidY).to.equal(state);
		expect(nextStateInvalidX).to.equal(state);
	});

	it('should ignore place when direction is not EAST, WEST, NORTH or SOUTH', () => {
		const state = Map();
		const placeValues = {
			x: 1,
			y: 3,
			f: 'MIDDLE'
		};
		const nextState = place(state, placeValues);
		expect(nextState).to.equal(Map());
	});
});