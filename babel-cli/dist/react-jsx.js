"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DiceRoll;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
function DiceRoll() {
  var _useState = useState(getRandomNumber()),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    num = _useState2[0],
    setNum = _useState2[1];
  var getRandomNumber = function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  };
  return /*#__PURE__*/React.createElement("div", null, "Your dice roll:", num);
}