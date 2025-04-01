const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const StudentTranscriptSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    transcript: [{
        year: { type: Number, required: true },
        semester: { type: Number, required: true },
        unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
        score: { 
            attendanceScore : {type : Number, required : true},
            assignmentScore : {type : Number, required : true},
            midtermScore : {type : Number, required : true},
            finalScore : {type : Number, required : true},
            totalScore : {type : Number, required : true},
            grade : {type : String, required : true},
        },
        gpa : {type : Number},

    }]
}, { timestamps: true });

const StudentTranscript = mongodb.model('StudentTranscript', StudentTranscriptSchema)
module.exports = StudentTranscript