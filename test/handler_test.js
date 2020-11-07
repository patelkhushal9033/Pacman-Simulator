import {expect} from 'chai';
import {handleCommand} from '../src/handler';

describe('Parser', () => {

	it('should handle LEFT COMMAND', () => {
		 expect(handleCommand('LEFT')).to.deep.equal([{type: 'ROTATE', direction: 'LEFT'}]);
	});
	it('should handle RIGHT COMMAND', () => {
		expect(handleCommand('RIGHT')).to.deep.equal([{type: 'ROTATE', direction: 'RIGHT'}]);
	});
	it('should handle REPORT COMMAND', () => {
		expect(handleCommand('REPORT')).to.deep.equal([{type: 'REPORT'}]);
	});
	it('should handle MOVE COMMAND', () => {
		 expect(handleCommand('MOVE')).to.deep.equal([{type:'MOVE'}]);
    });
    
	it('should handle PLACE COMMAND', () => {
		expect(handleCommand('PLACE 1,3,NORTH')).to.deep.equal([{
			type:'PLACE',
			position:{
				x:1, y:3, f:'NORTH'
			}
		}]);
	});
	
	it('should not read empty string', () => {
		expect(handleCommand('READ ').length).to.not.be.ok
	})
	
	it('should handles lower case commands', () => {
		expect(handleCommand('move')).to.deep.equal([{type:'MOVE'}]);
	});
	it('should trims spaces', () => {
		expect(handleCommand(' right ')).to.deep.equal([{type: 'ROTATE', direction: 'RIGHT'}]);
	});
	it('should ignores other words', () => {
		expect(handleCommand('hello').length).to.not.be.ok;
	});
	it('should ignores PLACE command with only two arguments', () => {
		expect(handleCommand('PLACE 1,3').length).to.not.be.ok;
	});
});