const Assignment = require("../models/assignmentsModel");
const Class = require("../models/classesModel");
const createAssignment = async (req, res) => {
  try {
    const { submissions, ...assignmentData } = req.body;
    const classIds = submissions.map((sub) => sub.classId);

    const classes = await Class.find({ _id: { $in: classIds } }).populate(
      "students"
    );

    if (!classes.length) {
      return res.status(404).json({
        success: false,
        message: "No valid classes found",
      });
    }

    const formattedSubmissions = classes.map((cls) => ({
      classId: cls._id,
      students: cls.students.map((student) => ({
        studentId: student._id,
        submissionDate: null,
        file: null,
        grade: null,
      })),
    }));

    const assignment = await Assignment.create({
      ...assignmentData,
      submissions: formattedSubmissions,
    });

    return res.status(201).json({
      success: true,
      data: assignment,
      message: "Assignment created successfully with students added",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("unitId");
    return res.status(200).json({
      success: true,
      data: assignments,
      message: "Assignments retrieved successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getAssignmentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const assignments = await Assignment.find({
      "submissions.classId": classId,
    }).populate("unitId");
    return res.status(200).json({
      success: true,
      data: assignments,
      message: "Assignments retrieved successfully for the class",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getAssignmentsByUnit = async (req, res) => {
  try {
    const { unitId } = req.params;
    const assignments = await Assignment.find({ unitId }).populate("unitId");
    return res.status(200).json({
      success: true,
      data: assignments,
      message: "Assignments retrieved successfully for the unit",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { classId, studentId, submissionDate, file } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    const currentTime = new Date();
    if (currentTime > assignment.deadline) {
      return res.status(400).json({
        success: false,
        message: "Deadline has passed. Submission is not allowed.",
      });
    }

    let classSubmission = assignment.submissions.find(
      (sub) => sub.classId.toString() === classId
    );

    if (!classSubmission) {
      classSubmission = { classId, students: [] };
      assignment.submissions.push(classSubmission);
    }

    const existingSubmission = classSubmission.students.find(
      (sub) => sub.studentId.toString() === studentId
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "Student has already submitted this assignment",
      });
    }

    classSubmission.students.push({
      studentId,
      submissionDate,
      file,
      grade: null,
    });

    await assignment.save();

    res
      .status(201)
      .json({ success: true, message: "Assignment submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const gradeMultipleStudents = async (req, res) => {
  try {
    const { assignmentId, classId } = req.params;
    const { grades } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    const classSubmission = assignment.submissions.find(
      (sub) => sub.classId.toString() === classId
    );

    if (!classSubmission) {
      return res
        .status(404)
        .json({ success: false, message: "Class submission not found" });
    }

    grades.forEach(({ studentId, grade }) => {
      if (grade < 0 || grade > assignment.maxMarks) {
        return res.status(400).json({
          success: false,
          message: `Invalid grade for student ${studentId}. Must be between 0 and ${assignment.maxMarks}.`,
        });
      }

      const studentSubmission = classSubmission.students.find(
        (sub) => sub.studentId.toString() === studentId
      );

      if (studentSubmission) {
        studentSubmission.grade = grade;
      }
    });

    await assignment.save();

    res
      .status(200)
      .json({ success: true, message: "Grades updated successfully", grades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assignment)
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment)
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    res
      .status(200)
      .json({ success: true, message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);

    if (!assignment)
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentsByClass,
  getAssignmentsByUnit,
  submitAssignment,
  gradeMultipleStudents,
  updateAssignment,
  deleteAssignment,
  getAssignmentById,
};
