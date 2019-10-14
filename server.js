const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
const parser = bodyParser.urlencoded({ extended: true });

// express router object
const router = express.Router();

router.route('/topics').get(function (req, res) {
    res.json(topics);
})
    .post(function (req, res) {
        console.log("post");
        let topic = {
            "id": topics.length + Math.floor((Math.random() * 10000) + 1),
            "title": req.body.title,
            "tag": req.body.tag,
            "notes": req.body.notes,
            "source": req.body.source,
            "timeToMaster": req.body.timeToMaster,
            "weeksStudied": req.body.weeksStudied,
            "startDay": req.body.startDay,
            "inProgress": req.body.inProgress,
            "complDay": req.body.complDay
        };
        topics.push(topic);
        let data = JSON.stringify(topics);
        fs.writeFileSync('topics.json', data);
        res.json({ msg: "Topic added" })
        console.dir(req.body);
        return;

    });

router.route('/topics/:id')
    .get(function (req, res) {
        for (var topic of topics) {
            if (topic.id == req.params.id) {
                res.json(topic);
                return;
            }
        }
        res.json("{'msg:' 'Error, no such topic!'}");
    })

    .delete(function (req, res) {
        for (var topic in topics) {
            if (topics[topic].id == req.params.id) {
                topics.splice(topic, 1);
                let data = JSON.stringify(topics);
                fs.writeFileSync('topics.json', data);
                res.json("{'msg:' 'topic removed'}");
                return;
            }
        }
        res.json("{'msg:' 'Error, no such topic!'}");
    });

router.use(function (req, res, next) {
    console.log('request');
    next();
});

var topics = [];

app.use(express.static('public'));

// attach routers for their respective paths
app.use('/api', router);

var server = app.listen(port, function () {
    var rawdata = fs.readFileSync('topics.json');
    topics = JSON.parse(rawdata);
    var host = server.address().address;
    console.log("Listening at http://%s:%s", host, port);
});