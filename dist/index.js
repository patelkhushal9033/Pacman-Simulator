// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"place-validator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePlaceValues = validatePlaceValues;

var _immutable = require("immutable");

//check if the cordinate is integer
function isInteger(number) {
  if (typeof number === 'number' && number % 1 === 0) {
    return false;
  }

  console.log('                                      '.bold.bgBrightRed.white);
  console.log('  Please enter number as coordinates  '.bold.bgBrightRed.white);
  console.log('                                      '.bold.bgBrightRed.white);
  return true;
}

function isOutsideGrid(placeValues, gridSize) {
  if (placeValues.get('x') > gridSize.get('x') || placeValues.get('y') > gridSize.get('y')) {
    console.log('                                         '.bold.bgBrightRed.white);
    console.log('  The coordinates are outside grid area  '.bold.bgBrightRed.white);
    console.log('                                         '.bold.bgBrightRed.white);
    return true;
  }

  return false;
}

function isNegativeNumber(placeValues) {
  if (placeValues.get('y') < 0 || placeValues.get('x') < 0) {
    console.log('                                         '.bold.bgBrightRed.white);
    console.log('  The coordinates are outside grid area  '.bold.bgBrightRed.white);
    console.log('                                         '.bold.bgBrightRed.white);
    return true;
  }

  return false;
} //Validates position


function validatePosition(placeValues, gridSize) {
  if (isInteger(placeValues.get('y')) || isInteger(placeValues.get('x')) || isNegativeNumber(placeValues) || isOutsideGrid(placeValues, gridSize)) {
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


function validateFacing(placeValues) {
  const validFacingValue = (0, _immutable.Map)({
    NORTH: true,
    SOUTH: true,
    EAST: true,
    WEST: true
  });

  if (validFacingValue.has(placeValues.get('f'))) {
    return true;
  } else {
    console.log('                                                     '.bold.bgBrightRed.white);
    console.log('  Please enter NORTH, EAST, SOUTH or WEST as facing  '.bold.bgBrightRed.white);
    console.log('                                                     '.bold.bgBrightRed.white);
  }
} //validate place values 


function validatePlaceValues(placeValues, gridSize) {
  if (!validateFacing(placeValues)) {
    return false;
  }

  if (!validatePosition(placeValues, gridSize)) {
    return false;
  }

  return true;
}
},{}],"core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.place = place;
exports.move = move;
exports.rotate = rotate;
exports.report = report;
exports.INITIAL_STATE = exports.GRID_SIZE = void 0;

var _immutable = require("immutable");

var _placeValidator = require("./place-validator");

const GRID_SIZE = (0, _immutable.Map)({
  x: 5,
  y: 5
});
exports.GRID_SIZE = GRID_SIZE;
const INITIAL_STATE = (0, _immutable.Map)(); //Retrive old state and return new state

exports.INITIAL_STATE = INITIAL_STATE;

function place(state, placeValues) {
  const immbutablePlaceValues = (0, _immutable.Map)(placeValues);
  const gridSize = state.get('gridSize', GRID_SIZE);

  if (!(0, _placeValidator.validatePlaceValues)(immbutablePlaceValues, gridSize)) {
    return state;
  }

  return state.set('isPlaced', true).set('gridSize', gridSize).set('position', (0, _immutable.Map)({
    x: immbutablePlaceValues.get('x'),
    y: immbutablePlaceValues.get('y')
  })).set('facing', immbutablePlaceValues.get('f'));
} //move pacman position and keep it in grid


function keepWithInGrid(change, maximumValue) {
  return position => {
    if (change === 'increase' && position + 1 !== maximumValue) {
      return position + 1;
    }

    if (change === 'decrease' && position !== 0) {
      return position - 1;
    }

    console.log('                                   '.bold.bgBrightRed.white);
    console.log('  Pacman cannot go outside of grid '.bold.bgBrightRed.white);
    console.log('                                   '.bold.bgBrightRed.white);
    return position;
  };
}

; //Move pacman depending on the side which pacman is facing
//return old state if pacman is not placed

function move(state) {
  if (!state.get('isPlaced')) {
    console.log('                                '.bold.bgBrightRed.white);
    console.log('  Pacman is not placed on grid  '.bold.bgBrightRed.white);
    console.log('                                '.bold.bgBrightRed.white);
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
} //Rotate pacman left


function rotateLeft(facing) {
  switch (facing) {
    case 'NORTH':
      return 'WEST';

    case 'SOUTH':
      return 'EAST';

    case 'EAST':
      return 'NORTH';

    case 'WEST':
      return 'SOUTH';
  }
} //Rotate pacman right


function rotateRight(facing) {
  switch (facing) {
    case 'NORTH':
      return 'EAST';

    case 'SOUTH':
      return 'WEST';

    case 'EAST':
      return 'SOUTH';

    case 'WEST':
      return 'NORTH';
  }
} //Rotate pacman depending depending upon the side pacman is facing 


function makeCorrectRotation(direction) {
  return facing => {
    if (direction === 'LEFT') {
      return rotateLeft(facing);
    }

    if (direction === 'RIGHT') {
      return rotateRight(facing);
    }
  };
} //Rotate Pacman if placed on grid


function rotate(state, rotateDirection) {
  if (!state.get('isPlaced')) {
    console.log('                                '.bold.bgBrightRed.white);
    console.log('  Pacman is not placed on grid  '.bold.bgBrightRed.white);
    console.log('                                '.bold.bgBrightRed.white);
    return state;
  }

  if (rotateDirection !== 'LEFT' && rotateDirection !== 'RIGHT') {
    return state;
  }

  return state.update('facing', makeCorrectRotation(rotateDirection));
} //Print report if pacman is placed


function report(state) {
  if (!state.get('isPlaced')) {
    return state;
  }

  console.log('                       '.bgBrightBlue.bold.white);
  console.log('  Pacman\'s Coordinate  '.bgBrightBlue.bold.white);
  console.log(`  X: ${state.getIn(['position', 'x'])}                 `.bgBrightBlue.bold.white);
  console.log(`  Y: ${state.getIn(['position', 'y'])}                 `.bgBrightBlue.bold.white);
  console.log(`  F: ${state.get('facing')}             `.bgBrightBlue.bold.white);
  console.log('                       '.bgBrightBlue.bold.white);
  return state.update('haveReportet', 0, timesReportet => timesReportet + 1);
}
},{"./place-validator":"place-validator.js"}],"reducer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _core = require("./core");

//Retrive current state and return new state
function reducer(state = _core.INITIAL_STATE, action) {
  switch (action.type) {
    case 'PLACE':
      return (0, _core.place)(state, action.position);

    case 'ROTATE':
      return (0, _core.rotate)(state, action.direction);

    case 'MOVE':
      return (0, _core.move)(state);

    case 'REPORT':
      return (0, _core.report)(state);
  }

  return state;
}
},{"./core":"core.js"}],"store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeStore;

var _redux = require("redux");

var _reducer = _interopRequireDefault(require("./reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeStore() {
  return (0, _redux.createStore)(_reducer.default);
}
},{"./reducer":"reducer.js"}],"command.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.place = place;
exports.move = move;
exports.report = report;
exports.rotate = rotate;

function place(position) {
  return {
    type: 'PLACE',
    position
  };
}

function move() {
  return {
    type: 'MOVE'
  };
}

function report() {
  return {
    type: 'REPORT'
  };
}

function rotate(direction) {
  return {
    type: 'ROTATE',
    direction
  };
}
},{}],"handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCommand = handleCommand;

var _array = require("core-js/fn/array");

var _command = require("./command");

//Handle single word commands
function handleSingleCommand(input) {
  if (input === 'MOVE') {
    return [(0, _command.move)()];
  }

  if (input === 'LEFT' || input === 'RIGHT') {
    return [(0, _command.rotate)(input)];
  }

  if (input === 'REPORT') {
    return [(0, _command.report)()];
  }

  console.log('                   '.bold.bgBrightRed.white);
  console.log('  Invalid Command  '.bold.bgBrightRed.white);
  console.log('                   '.bold.bgBrightRed.white);
  return [];
} //Handle place command


function handleCommandWithParameter(input) {
  const [inputType, inputParameters] = input.split(' '),
        [x, y, f] = inputParameters.split(',');

  if (inputType !== 'PLACE' || inputParameters.split(',').length !== 3) {
    console.log('                                '.bold.bgBrightRed.white);
    console.log('  PLACE command is not correct  '.bold.bgBrightRed.white);
    console.log('  example: PLACE 0,0,EAST       '.bold.bgBrightRed.white);
    console.log('                                '.bold.bgBrightRed.white);
    return [];
  }

  return [(0, _command.place)({
    x: parseInt(x, 10),
    y: parseInt(y, 10),
    f: f
  })];
} //Handle commands


function handleCommand(input) {
  const command = input.toUpperCase().trim(),
        actionWithArguments = command.split(' ').length > 1;

  if (actionWithArguments) {
    return handleCommandWithParameter(command);
  }

  return handleSingleCommand(command);
}
},{"./command":"command.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _store = _interopRequireDefault(require("./store"));

var _handler = require("./handler");

require("colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const store = (0, _store.default)();
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

function handleLineInput(input) {
  const action = (0, _handler.handleCommand)(input);
  action.forEach(store.dispatch);
  readline.prompt();
}

readline.on('line', handleLineInput).on('close', () => {
  console.log('Thanks for playing');
  process.exit(0);
}).setPrompt('Pacman> ');
readline.prompt();
},{"./store":"store.js","./handler":"handler.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map