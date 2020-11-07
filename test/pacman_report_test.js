import {List, Map} from 'immutable';
import {expect} from 'chai';

import {report} from '../src/core';


describe('Pacman report function', () => {
	it('should report x and y coordinates as well as direction it is facing ', () => {
		const state = Map({
            isPlaced: true,
            position: Map({x: 4, y: 3}),
            facing: 'NORTH'
        })
        const nextState = report(state);
        expect(nextState).to.equal(Map({
            isPlaced: true,
            haveReportet: 1,
            position: Map({x: 4, y: 3}),
            facing: 'NORTH'
        }));
	});
	it('should not report if not placed', () => {
        const state = Map({
            position: Map({x: 1, y: 3}),
            facing: 'NORTH'
        })
        const nextState = report(state);
        expect(nextState).to.equal(state);
	});
});