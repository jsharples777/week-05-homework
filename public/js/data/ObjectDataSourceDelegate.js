"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataTypes = require("./DataTypes.js");

var _DataSource2 = _interopRequireDefault(require("./DataSource.js"));

var _SimpleDebug = _interopRequireDefault(require("../util/SimpleDebug.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ObjectDataSourceDelegate = /*#__PURE__*/function (_DataSource) {
  _inherits(ObjectDataSourceDelegate, _DataSource);

  var _super = _createSuper(ObjectDataSourceDelegate);

  function ObjectDataSourceDelegate() {
    _classCallCheck(this, ObjectDataSourceDelegate);

    return _super.apply(this, arguments);
  }

  _createClass(ObjectDataSourceDelegate, [{
    key: "loadQuestions",
    value: function loadQuestions() {
      var questions = [];

      _SimpleDebug.default.log("Loading Questions", 5);

      var answer1 = new _DataTypes.Answer(1, "&lt;javascript&gt;");
      var answer2 = new _DataTypes.Answer(2, "&lt;js&gt;");
      var answer3 = new _DataTypes.Answer(3, "&lt;script&gt;", true);
      var answer4 = new _DataTypes.Answer(4, "&lt;scripting&gt;");
      var question = new _DataTypes.Question(1, "Inside which HTML element do we put the JavaScript?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " document.getElementById(\"demo\").innerHTML = \"Hello World!\";", true);
      answer2 = new _DataTypes.Answer(2, " document.getElementByName(\"p\").innerHTML = \"Hello World!\";");
      answer3 = new _DataTypes.Answer(3, " document.getElement(\"p\").innerHTML = \"Hello World!\";");
      answer4 = new _DataTypes.Answer(4, " #demo.innerHTML = \"Hello World!\";");
      question = new _DataTypes.Question(2, "What is the correct JavaScript syntax to change the content of the HTML element? &lt;p id=\"demo\"&gt;This is a demonstration.&lt;/p&gt;", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " alert(\"Hello World\");", true);
      answer2 = new _DataTypes.Answer(2, " alertBox(\"Hello World\");");
      answer3 = new _DataTypes.Answer(3, " msg(\"Hello World\");");
      answer4 = new _DataTypes.Answer(4, " msgBox(\"Hello World\");");
      question = new _DataTypes.Question(3, "How do you write \"Hello World\" in an alert box?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, "function:myFunction()");
      answer2 = new _DataTypes.Answer(2, "function myFunction()", true);
      answer3 = new _DataTypes.Answer(3, "function = myFunction()");
      question = new _DataTypes.Question(4, "How do you create a function in JavaScript?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, "if i == 5 then");
      answer2 = new _DataTypes.Answer(2, "if (i == 5)", true);
      answer3 = new _DataTypes.Answer(3, "if i = 5");
      answer4 = new _DataTypes.Answer(4, "if i = 5 then");
      question = new _DataTypes.Question(5, "How to write an IF statement in JavaScript?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " if i =! 5 then");
      answer2 = new _DataTypes.Answer(2, " if (i != 5)", true);
      answer3 = new _DataTypes.Answer(3, " if i &lt;&gt; 5");
      answer4 = new _DataTypes.Answer(4, " if (i &lt;&gt; 5)");
      question = new _DataTypes.Question(6, "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " while (i &lt;= 10)", true);
      answer2 = new _DataTypes.Answer(2, " while i = 1 to 10");
      answer3 = new _DataTypes.Answer(3, " while (i &lt;= 10; i++)");
      question = new _DataTypes.Question(7, "How does a WHILE loop start?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " for (i = 0; i &lt;= 5; i++)", true);
      answer2 = new _DataTypes.Answer(2, " for (i = 0; i &lt;= 5)");
      answer3 = new _DataTypes.Answer(3, " for (i &lt;= 5; i++)");
      answer4 = new _DataTypes.Answer(4, " for i = 1 to 5");
      question = new _DataTypes.Question(8, "How does a FOR loop start?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " //This is a comment", true);
      answer2 = new _DataTypes.Answer(2, " 'This is a comment");
      answer3 = new _DataTypes.Answer(3, " &lt;!--This is a comment--&gt;");
      question = new _DataTypes.Question(9, "How can you add a comment in a JavaScript?", [answer1, answer2, answer3, answer4]);
      questions.push(question);
      answer1 = new _DataTypes.Answer(1, " var colors = [\"red\", \"green\", \"blue\"]", true);
      answer2 = new _DataTypes.Answer(2, " var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")");
      answer3 = new _DataTypes.Answer(3, " var colors = (1:\"red\", 2:\"green\", 3:\"blue\")");
      answer4 = new _DataTypes.Answer(4, " var colors = \"red\", \"green\", \"blue\"");
      question = new _DataTypes.Question(10, "What is the correct way to write a JavaScript array?", [answer1, answer2, answer3, answer4]);
      questions.push(question);

      _SimpleDebug.default.log(this.questions, 5);

      return questions;
    }
  }]);

  return ObjectDataSourceDelegate;
}(_DataSource2.default);

var _default = ObjectDataSourceDelegate;
exports.default = _default;