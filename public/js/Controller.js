"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SimpleDebug = _interopRequireDefault(require("./util/SimpleDebug.js"));

var _DataModel = _interopRequireDefault(require("./DataModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* this class will link the functionality of the data model and the application (view) */
var Controller = /*#__PURE__*/function () {
  function Controller(applicationView, highScoreStorageToUse) {
    _classCallCheck(this, Controller);

    _defineProperty(this, "applicationView", null);

    this.applicationView = applicationView;
    this.dataModel = new _DataModel.default(highScoreStorageToUse);
    this.timePenaltyForWrongAnswer = 30;
    this.resetTimer();
    /* setup the randomised questions and set question index to the first in the list */

    this.resetQuestions();
    /* setup the event handlers */

    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
    this.handleGotoSection = this.handleGotoSection.bind(this);
    this.handleAddScore = this.handleAddScore.bind(this);
    this.handleResetScores = this.handleResetScores.bind(this);
  }

  _createClass(Controller, [{
    key: "resetQuestions",
    value: function resetQuestions() {
      this.questions = [];
      this.currentQuestionIndex = 0;
    }
  }, {
    key: "randomiseAnswers",
    value: function randomiseAnswers(question) {
      /* simple randomise - just pick an answer and start from there in the array and loop through */
      var randomAnswerIndex = Math.floor(Math.random() * question.answers.length);
      /* get the questions from the index to the end of the array */

      var randomisedAnswers = [];

      for (var index = randomAnswerIndex; index < question.answers.length; index++) {
        randomisedAnswers.push(question.answers[index]);
      }

      if (randomAnswerIndex > 0) {
        for (var _index = 0; _index < randomAnswerIndex; _index++) {
          randomisedAnswers.push(question.answers[_index]);
        }
      }

      _SimpleDebug.default.log("Randomised answers to question " + question.id, 5);

      _SimpleDebug.default.log(randomisedAnswers, 5);

      return randomisedAnswers;
    }
  }, {
    key: "randomiseQuestionsAndAnswers",
    value: function randomiseQuestionsAndAnswers(questions) {
      /* simple randomise - just pick a question and start from there in the array and loop through */
      var randomQuestionIndex = Math.floor(Math.random() * questions.length);

      _SimpleDebug.default.log("Start questions from " + randomQuestionIndex, 5);

      var randomisedQuestions = [];
      /* get the questions from the index to the end of the array */

      for (var index = randomQuestionIndex; index < questions.length; index++) {
        randomisedQuestions.push(questions[index]);
      }

      if (randomQuestionIndex > 0) {
        for (var _index2 = 0; _index2 < randomQuestionIndex; _index2++) {
          randomisedQuestions.push(questions[_index2]);
        }
      }

      _SimpleDebug.default.log("Randomised questions are: ", 5);

      _SimpleDebug.default.log(randomisedQuestions, 5);
      /* randomise the answers in each question */


      for (var i = 0; i < randomisedQuestions.length; i++) {
        var question = randomisedQuestions[i];

        _SimpleDebug.default.log("Randomising answers to question " + question.id, 5);

        _SimpleDebug.default.log(question, 5);

        question.answers = this.randomiseAnswers(question);

        _SimpleDebug.default.log("After randomising answers to question " + question.id, 5);

        _SimpleDebug.default.log(question, 5);
      }

      return randomisedQuestions;
    }
  }, {
    key: "initialiseRandomQuestions",
    value: function initialiseRandomQuestions() {
      /* initialise the questions first */
      if (this.questions.length === 0) {
        this.questions = this.randomiseQuestionsAndAnswers(this.dataModel.getQuestions());
        this.currentQuestionIndex = 0;
      }
    }
  }, {
    key: "getNextQuestion",
    value: function getNextQuestion() {
      this.initialiseRandomQuestions();
      var nextQuestion = null;
      /* get the next question in the list */

      if (!(this.currentQuestionIndex > this.questions.length - 1)) {
        nextQuestion = this.questions[this.currentQuestionIndex];

        _SimpleDebug.default.log(nextQuestion);

        this.currentQuestionIndex++;
      } else {
        /* we are out of questions */

        /* stop the timer */
        var score = this.stopTimer();
        /* let the view know */

        this.applicationView.callbackQuestionsFinished(score);
        /* reset the state of the controller */

        this.resetTimer();
        this.resetQuestions();
      }
      /* an empty object will be returned for the question if we have finished */


      return nextQuestion;
    }
  }, {
    key: "getHighScores",
    value: function getHighScores() {
      return this.dataModel.getHighScores();
    }
    /*
      Controller actions:
      0.  Run a timer and let the view know when time has run out
      1.  supply the questions to the view (randomised and randomised answer order) one at a time
      2.  supply the high scores for the view to display
      3.  the user selects an answer with a click for a displayed question - process the answer and update the score/timer
      4.  the user resets the high scores using a button click
      5.  provide the next question, and if none, let the view know we are done, and stop the timer
      6.  Add a high score with a name and score
     */

  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearInterval(this.scoreTimer);
      return this.timeRemaining;
    }
  }, {
    key: "resetTimer",
    value: function resetTimer() {
      this.scoreTimer = 0;
      this.timeRemaining = 100;
    }
  }, {
    key: "applyTimePenalty",
    value: function applyTimePenalty() {
      this.timeRemaining -= this.timePenaltyForWrongAnswer;
      if (this.timeRemaining < 0) this.timeRemaining = 0;
      this.applicationView.callbackUpdateTimerDisplay(this.timeRemaining);
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this = this;

      this.applicationView.callbackUpdateTimerDisplay(this.timeRemaining);
      this.scoreTimer = setInterval(function () {
        /* count down each second and display the user */
        if (_this.timeRemaining > 0) {
          _this.timeRemaining--;
        } else {
          _this.timeRemaining = 0;
          /* run out of time */

          _this.stopTimer();
          /* let the view know */


          _this.applicationView.callbackTimerRanOut();
          /* reset the state of the controller */


          _this.resetTimer();

          _this.resetQuestions();
        }
        /* ask the view to update the timer display */


        _this.applicationView.callbackUpdateTimerDisplay(_this.timeRemaining);
      }, 1000);
    }
  }, {
    key: "handleAnswerSelection",
    value: function handleAnswerSelection(event) {
      _SimpleDebug.default.log("Checking for answer selection", 2); // did we click on an answer


      if (event.target.className === "answer") {
        // was it the correct answer?
        var value = event.target.getAttribute("iscorrect");

        if (value !== "true") {
          _SimpleDebug.default.log("Clicked incorrect answer", 3);
          /* penalise the timer */


          this.applyTimePenalty();
        }
        /* let the view give the user some information about the correctness of the answer */


        this.applicationView.callbackProvideAnswerFeedback(value === "true");
        /* show the next question */

        this.applicationView.callbackShowNextQuestion();
      }
    }
  }, {
    key: "handleStartQuiz",
    value: function handleStartQuiz(event) {
      _SimpleDebug.default.log("Handle start quiz", 2);
      /* start a timer */


      this.startTimer();
      /* let the view know about the state change */

      this.applicationView.callbackQuizStarted();
    }
  }, {
    key: "handleGotoSection",
    value: function handleGotoSection(event) {
      _SimpleDebug.default.log("Showing other section of the site", 2);

      this.stopTimer();
      /* update the state of the view to let them know about the high score view */

      this.applicationView.callbackShowOtherSection();
    }
  }, {
    key: "handleAddScore",
    value: function handleAddScore(event) {
      _SimpleDebug.default.log("handling adding score to high scores", 2);

      event.preventDefault();
      /* has the user put something in the name field */

      var view = event.target; // should be the form object

      var nameView = view.querySelector("#nameText");
      /* if there is no name, we are assuming they don't want to save their score */

      if (nameView.value !== "") {
        /* get the score out of the hidden details */
        var hiddenScoreView = view.querySelector("#score");
        var score = parseInt(hiddenScoreView.getAttribute("value"));
        this.dataModel.addNewHighScore(score, nameView.value);
      }

      this.applicationView.callbackResetQuizDisplay();
    }
  }, {
    key: "handleResetScores",
    value: function handleResetScores(event) {
      _SimpleDebug.default.log("Handling resetting scores", 2);

      event.preventDefault();
      /* clear the scores from the model */

      this.dataModel.resetHighScores();
      /* ask the view to reset back to the quiz display */

      this.applicationView.callbackResetQuizDisplay();
    }
  }]);

  return Controller;
}();

var _default = Controller;
exports.default = _default;