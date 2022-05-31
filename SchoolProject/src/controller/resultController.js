import models from "../models";
import _ from "lodash"


function calculate(data) {

    data.totalSubjectMarks = _.sumBy(data?.score, 'total');
    data.totalObtainMarks = _.sumBy(data?.score, 'marksObtain');
    const result = data?.score.find(element => element?.marksObtain < 23)
    data.result = result ? "fail" : "pass"

    //percentage
    const percentage = (data.totalObtainMarks / data.totalSubjectMarks) * 100;
    data.percentage = percentage.toFixed(2)
    //grade
    if (data.result == "pass" && percentage >= 70) {
        data.grade = 'distinction'
    } else if (data.result == "pass" && percentage < 70 && percentage >= 60) {
        data.grade = "first class"
    } else if (data.result == 'pass' && percentage < 60 && percentage >= 50) {
        data.grade = "second class"
    } else if (data.result == 'pass' && percentage < 50) {
        data.grade = "pass"
    } else if (data.result == 'fail') {
        data.grade = "fail"
    }

    return data
}

const createResult = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        req.body.updatedBy = req.user._id
        req.body.facultyId = req.user._id
        req.body.classId = req.user.classId

        const data = new models.Result(req.body)
        const abc = calculate(data)
        await abc.save()
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send(e.message)
    }

}

const getAllResult = async (req, res) => {
    try {

        if (['faculty', 'student'].includes(req.user.roleId.roleName)) {
            const resultData = await models.Result.find({ isDeleted: false }).populate([{ path: 'facultyId', select: ['firstName', 'lastName'] }, { path: 'studentId', select: "firstName" }, { path: 'classId', select: 'className' }])
            res.status(200).send(resultData)
        } else {
            res.send(404).send("you are not authorizations")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }

}

const getResult = async (req, res) => {
    try {
        if (['faculty', 'student'].includes(req.user.roleId.roleName)) {
            const _id = req.params.classId
            const resultData = await models.Result.find({ classId: _id, isDeleted: false }).sort({ percentage: -1 }).populate([{ path: 'facultyId', select: ['firstName', 'lastName'] }, { path: 'studentId', select: "firstName" }, { path: 'classId', select: 'className' }])
            console.log(resultData);
            res.status(202).send(resultData)
        } else {
            res.send(404).send("you are not authorizations")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getCountResult = async (req, res) => {
    try {
        const _id = req.params.classId
        const result = req.query.result
        const resultData = await models.Result.find({ classId: _id, isDeleted: false }).count({ result: result })
        if (!resultData) {
            res.json(`Number of documents in the result is ${result}:` + resultData)
        } else {
            res.json(`Number of documents in the result is ${result}:` + resultData)
        }
    } catch (e) {
        res.status(404).send(e.message)
    }

}

const getGradeResult = async (req, res) => {
    try {

        const _id = req.params.classId
        const grade = req.query.grade
        const resultData = await models.Result.find({ classId: _id, grade: grade, isDeleted: false })
        res.send(resultData)

    } catch (e) {
        res.status(404).send(e.message)
    }
}


const updateMarks = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const resultData = await models.Result.findOneAndUpdate({ _id, "score._id": req.body._id, isDeleted: false },
            {
                "score.$.marksObtain": req.body.marksObtain
            }, { new: true })

        const result = calculate(resultData)
        console.log(result);
        await result.save()
        res.send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}

const updateResult = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const result = await models.Result.findOne({ _id, isDeleted: false })

        const arr1 = result.score
        const arr2 = req.body.score

        //include Database
        function getDifference(array1, array2) {
            return array2.filter(object1 => {
                return array1.some(object2 => {
                    return object1.subjectId.toString() == object2.subjectId;
                });
            });
        }

        //database not includes
        function getDifferenceDa(array1, array2) {
            return array2.filter(object1 => {
                return !array1.some(object2 => {
                    return object1.subjectId.toString() == object2.subjectId;
                });
            });
        }

        const NotMatchData = getDifference(arr1, arr2);
        const MatchData = getDifferenceDa(arr1, arr2);

        if (MatchData.length > 0) {
            await models.Result.findOneAndUpdate({ _id, isDeleted: false }, { $push: { score: MatchData } }, { new: true })
        }

        if (NotMatchData.length > 0) {
            const score = req.body.score
            score.map(async element => {
                const finalData = await models.Result.findOneAndUpdate({ _id, 'score._id': element._id, isDeleted: false }, {
                    "score.$.marksObtain": element.marksObtain,
                    "score.$.total": element.total
                }, { new: true })

            })
        }
        const finalResult = await models.Result.findOne({ _id, isDeleted: false })

        const data = calculate(finalResult)
        await data.save()
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send(e.message)
    }

}
const removeResult = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id;
        const _id = req.params.id
        const resultData = await models.Result.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true })
        res.status(200).send(resultData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const resultController = { createResult, getResult, getGradeResult, getCountResult, getAllResult, updateResult, updateMarks, removeResult }

export default resultController