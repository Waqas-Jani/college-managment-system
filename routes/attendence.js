const express = require('express');
const router = express.Router();
const Attendence = require('../models/attendence');
const Subject = require('../models/subject');

// Get Attendence
router.get('/get', async (req, res) => {
    let qu = req.query;
    let query = { classId: qu.class_id, subId: qu.sub_id, date: qu.date }
    await Attendence.find(query, function (err, result) {
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
// Get Attendence by specfic student
router.get('/get/single', async (req, res) => {
    let qu = req.query;
    let query = { stdId: qu.std_id }
    await Attendence.find(query, async function (err, result) {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else {
            await Subject.find({ "class.id": qu.class_id }, (e, sub) => {
                if (e) {
                    res.status(422);
                    res.json({
                        e
                    })
                } else {

                    res.status(200).send(filterAttendance(sub, result))
                }
            })
        }
    });
});
// Add Attendence
router.post('/add', async (req, res) => {
    await Attendence.insertMany(req.body, (err, result) => {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else if (result) {
            res.status(200).json({
                status: 200,
                message: 'Attendence added successfully',
            });
        } else {
            res.status(422);
            res.json({
                message: 'Something went wrong!',
            })
        }
    })
});
// Filter Attendence
function filterAttendance(subject, stdAtd) {
    let newArr = [];
    for (var i = 0; i < subject.length; i++) {
        var s_att = stdAtd.filter(st => st.subName === subject[i].title);
        var p = s_att.filter(st => st.status === "present");
        var a = s_att.filter(st => st.status === "absent");
        var l = s_att.filter(st => st.status === "leave");
        var o = {
            subject: subject[i].title,
            total: s_att.length,
            present: p.length,
            absent: a.length,
            leave: l.length
        }
        newArr.push(o)
    }
    return newArr;
}
module.exports = router;