"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighScore = exports.Question = exports.Answer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Answer = /*#__PURE__*/function () {
  function Answer(id, answer, isCorrect) {
    _classCallCheck(this, Answer);

    this.id = id;
    this.answer = answer;
    this.isCorrect = isCorrect == null ? false : isCorrect;
  }

  _createClass(Answer, [{
    key: "toString",
    value: function toString() {
      return "{Answer id: " + this.id + ", answer: " + this.answer + ", iscorrect: " + this.isCorrect + "}";
    }
  }]);

  return Answer;
}();

exports.Answer = Answer;

var Question = /*#__PURE__*/function () {
  function Question(id, question) {
    var answers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Question);

    this.id = id;
    this.question = question;
    this.answers = answers;
    this.alreadyAsked = false;
  }

  _createClass(Question, [{
    key: "toString",
    value: function toString() {
      return "{Question id: " + this.id + ", question: " + this.question + "}";
    }
  }]);

  return Question;
}();

exports.Question = Question;

var HighScore = function HighScore(score, name) {
  _classCallCheck(this, HighScore);

  this.score = score;
  this.name = name;
};

exports.HighScore = HighScore;