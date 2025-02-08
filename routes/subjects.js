var express = require('express');
var router = express.Router();
var Subjects = require('../models/subject')
const pagination = require('../config/pagination')

// Get Subjects with paginations
router.get('/get', pagination(Subjects), function (req, res) {
    res.json(res.paginatedResults)
});
// Get all subjects
router.get('/get/all', function (req, res) {
    Subjects.find({}, function (err, result) {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else {
            res.json(result)
        }
    });
});

// Add Subject
router.post('/add', function (req, res) {
    let obj = JSON.parse(req.body.class)
    const subject = new Subjects({
        title: req.body.title,
        description: req.body.description,
        credit_hour: req.body.credit_hour,
        file_url: req.body.file_url,
        class: {
            id: obj.classId,
            name: obj.name
        },
    });
    subject
        .save()
        .then(result => {
            res.status(200).json({
                status: 200,
                message: 'Subject added successfully',
                data: 'OK'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
// Delete Subject
router.delete('/delete/:id', function (req, res) {
    // Delete User
    Subjects.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Subject Deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        });

});

module.exports = router;