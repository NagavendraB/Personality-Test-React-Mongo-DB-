import express from 'express';
import moment from 'moment';
import assert from 'assert';
import {quizQuestions} from './mock-response';

const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/test';

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Personality test listening on port ${port}`);
});

// It lists all questions for personality test
app.get('/test/questions', function (req, res) {
  res.status(200).send(quizQuestions);
});

// It stores all user answers in to Mongo DB database
app.post('/user/answers', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('personalityTest').insertOne(...req.body, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });
  res.redirect('/');
});

// It fetches all user answers from Mongo DB database
app.get('/user/answers', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('personalityTest').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.send(resultArray);
    });
  });
});

