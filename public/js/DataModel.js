"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataTypes = require("./data/DataTypes.js");

var _SimpleDebug = _interopRequireDefault(require("./util/SimpleDebug.js"));

var _FileDataSourceDelegate = _interopRequireDefault(require("./data/FileDataSourceDelegate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataModel = /*#__PURE__*/function () {
  function DataModel() {
    var simpleStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DataModel);

    _defineProperty(this, "simpleStorage", null);

    _defineProperty(this, "currentHighScores", []);

    _defineProperty(this, "questions", []);

    _defineProperty(this, "dataSourceDelegate", null);

    _defineProperty(this, "highScoreKey", "highScores");

    //this.dataSourceDelegate = new ObjectDataSourceDelegate();
    this.dataSourceDelegate = new _FileDataSourceDelegate.default();
    this.initialise(simpleStorage);
  }

  _createClass(DataModel, [{
    key: "resetQuestions",
    value: function resetQuestions() {
      _SimpleDebug.default.log("Resetting Questions", 5);

      for (var index = 0; index < this.questions.length; index++) {
        var question = this.questions[index];
        question.isAlreadyAsked = false;
      }
    }
  }, {
    key: "loadQuestions",
    value: function loadQuestions() {
      return this.dataSourceDelegate.loadQuestions();
    }
  }, {
    key: "loadHighScores",
    value: function loadHighScores() {
      _SimpleDebug.default.log("Loading High Scores", 5);

      var savedHighScores = JSON.parse(this.simpleStorage.getItem(this.highScoreKey));

      _SimpleDebug.default.log("Saved High Scores were " + savedHighScores, 5);

      if (savedHighScores != null) {
        for (var index = 0; index < savedHighScores.length; index++) {
          /* create a store the high scores */
          var score = parseInt(savedHighScores[index].score);
          var name = savedHighScores[index].name;
          var highScore = new _DataTypes.HighScore(score, name);
          this.currentHighScores.push(highScore);
        }
      }

      _SimpleDebug.default.log(this.currentHighScores, 5);
    }
  }, {
    key: "saveHighScores",
    value: function saveHighScores() {
      _SimpleDebug.default.log("Saving High Scores", 5);

      var stringifiedHighScores = JSON.stringify(this.currentHighScores);

      _SimpleDebug.default.log(stringifiedHighScores);

      this.simpleStorage.setItem(this.highScoreKey, stringifiedHighScores);
    }
  }, {
    key: "getQuestions",
    value: function getQuestions() {
      /*
        in the data model we will just return the questions, but will make a copy of the them for the controller
        so that the controller may modify order and randomise answers without affecting the data model source
        ideally the questions array would be private to this class
      */
      _SimpleDebug.default.log("Getting Questions", 5);

      _SimpleDebug.default.log(this.questions, 5);

      _SimpleDebug.default.log(this.questions.length);

      var copiedQuestions = [];

      for (var index = 0; index < this.questions.length; index++) {
        var question = this.questions[index];

        _SimpleDebug.default.log(question, 5);

        var copiedQuestion = new _DataTypes.Question(question.id, question.question);
        copiedQuestions.push(copiedQuestion);
        var copiedAnswers = [];

        for (var j = 0; j < question.answers.length; j++) {
          var answer = question.answers[j];
          var copiedAnswer = new _DataTypes.Answer(answer.id, answer.answer, answer.isCorrect);
          copiedAnswers.push(copiedAnswer);
        }

        copiedQuestion.answers = copiedAnswers;

        _SimpleDebug.default.log(copiedQuestion, 5);
      }

      _SimpleDebug.default.log(copiedQuestions, 5);

      return copiedQuestions;
    }
  }, {
    key: "addNewHighScore",
    value: function addNewHighScore(score, name) {
      _SimpleDebug.default.log("Adding new high score " + score + " " + name, 5);
      /* create a new HighScore and add to the high scores in memory */


      var highScore = new _DataTypes.HighScore(score, name);
      this.currentHighScores.push(highScore);
      /* sort the array of scores into descending order */

      this.currentHighScores.sort(compareHighScores);
      /* save the new scores */

      this.saveHighScores();
    }
  }, {
    key: "resetHighScores",
    value: function resetHighScores() {
      _SimpleDebug.default.log("Resetting high scores", 5);

      this.currentHighScores = [];
      /* empty the array, relies of gc */

      this.saveHighScores();
    }
  }, {
    key: "getHighScores",
    value: function getHighScores() {
      return this.currentHighScores;
    }
  }, {
    key: "initialise",
    value: function initialise() {
      var simpleStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /* assume a stringified storage with JSON format */
      this.simpleStorage = simpleStorage;
      /* create the questions */

      this.questions = this.loadQuestions();
      /* load the high scores from local data */

      this.loadHighScores();
    }
  }]);

  return DataModel;
}();
/* reverse order comparison by score - not exported */


function compareHighScores(highScore1, highScore2) {
  /* sort into reverse order (i.e. descending) */
  return highScore2.score - highScore1.score;
}

var _default = DataModel;
exports.default = _default;