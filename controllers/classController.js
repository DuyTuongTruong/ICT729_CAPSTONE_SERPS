const Class = require("../models/classesModel");

const getAllClass = async (req, res) => {
  try {
    const classes = await Class.find();
    return res.status(200).json({
      success: true,
      data: classes,
      message: "Classes retrieved successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const createClass = async (req, res, next) => {
  try {
    const classData = { students: [], attendance: [], ...req.body };

    const conflictingClasses = await Class.find({
      year: classData.year,
      semester: classData.semester,
      "schedule.day": { $in: classData.schedule.map((s) => s.day) },
      "schedule.time": { $in: classData.schedule.map((s) => s.time) },
    });

    for (let existingClass of conflictingClasses) {
      if (
        classData.schedule.some((newSchedule) =>
          existingClass.schedule.some(
            (existingSchedule) =>
              newSchedule.day === existingSchedule.day &&
              newSchedule.time === existingSchedule.time
          )
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `Class ${
            existingClass.className
          } has a schedule ${classData.schedule
            .map((s) => `${s.day} - ${s.time}`)
            .join(", ")}`,
        });
      }
      if (existingClass.lecture.toString() === classData.lecture.toString()) {
        return res.status(400).json({
          success: false,
          message: `Teacher ${classData.lecture} already has a class ${
            existingClass.className
          } to ${classData.schedule
            .map((s) => `${s.day} - ${s.time}`)
            .join(", ")}`,
        });
      }
    }
    const newClass = new Class(classData);
    await newClass.save();
    return res
      .status(201)
      .json({ success: true, message: "Class created successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date, topic, students } = req.body;

    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    if (!classObj.students || classObj.students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Class has no students, cannot mark attendance",
      });
    }

    const validStudents = students.filter((s) =>
      classObj.students.some(
        (studentId) => studentId.toString() === s.studentId
      )
    );

    if (validStudents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid students found in the class",
      });
    }

    const existingAttendance = classObj.attendance.find(
      (att) => att.date.toISOString().split("T")[0] === date
    );

    if (existingAttendance) {
      existingAttendance.students = validStudents.map((s) => ({
        student: s.studentId,
        status: s.status,
      }));
    } else {
      classObj.attendance.push({
        date: new Date(date),
        topic,
        students: validStudents.map((s) => ({
          student: s.studentId,
          status: s.status,
        })),
      });
    }

    await classObj.save();

    return res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: classObj.attendance,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateClass = async (req, res, next) => {
  try {
    const { classID } = req.params;
    const update = req.body;
    console.log(classID);
    const oldData = await Class.findById(classID);
    if (!oldData) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    const updateData = {
      ...update,
      students: oldData.students,
      attendance: oldData.attendance,
    };

    const updatedClass = await Class.findByIdAndUpdate(classID, updateData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedClass,
      message: "Class updated successfully",
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const { classID } = req.params;
    const deletedClass = await Class.findByIdAndDelete(classID);
    if (!deletedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const filterClass = async (req, res, next) => {
  try {
    const { year, semester, unitId, courseId, search } = req.query;
    let filter = {};

    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (unitId) filter.unitId = unitId;
    if (courseId) filter.courseId = courseId;
    if (search) filter.className = { $regex: search, $options: "i" };

    const classes = await Class.find(filter);

    return res.status(200).json({ success: true, data: classes });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const classes = await Class.find({ students: studentId }).populate({
      path: "unitId",
      select: "name",
    });

    if (!classes || classes.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found in any class" });
    }

    let attendanceRecords = [];

    classes.forEach((classObj) => {
      classObj.attendance.forEach((att) => {
        const studentRecord = att.students.find(
          (s) => s.student.toString() === studentId
        );
        if (studentRecord) {
          attendanceRecords.push({
            date: att.date.toISOString().split("T")[0],
            subject: classObj.unitId.name,
            status: studentRecord.status,
          });
        }
      });
    });

    return res.status(200).json({
      success: true,
      message: "Attendance records fetched successfully",
      data: attendanceRecords,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createClass,
  markAttendance,
  updateClass,
  deleteClass,
  filterClass,
  getAllClass,
  getStudentAttendance,
};
