const { id } = require("@hapi/joi/lib/base");
const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const RiskSchema = new Schema({
    id: { type: Number, required: true },
    institution: { type: String, required: true },
    criteria : {
        lowRisk : {
            attendanceThreshold : {type : Number, required : true},
            lowMark : {type : Number, required : true}
        },
        mediumRisk : {
            attendanceThreshold : {type : Number, required : true},
            lowMark : {type : Number, required : true}
        },
        highRisk : {
            attendanceThreshold : {type : Number, required : true},
            lowMark : {type : Number, required : true}
        }
    }, timestamp: true
});

const Risk = mongodb.model('Risk', RiskSchema)
module.exports = Risk