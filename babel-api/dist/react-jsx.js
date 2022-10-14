"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DiceRoll;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _jsxRuntime = require("react/jsx-runtime");

function DiceRoll() {
  var _useState = useState(getRandomNumber()),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      num = _useState2[0],
      setNum = _useState2[1];

  var getRandomNumber = function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: ["Your dice roll:", num]
  });
}