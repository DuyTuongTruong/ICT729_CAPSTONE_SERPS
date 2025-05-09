const { Roles } = require("../constants/roles");
const { protect, authorization } = require("../middlewares/auth");

const ClassController = require("../controllers/classController");
const router = require("express-promise-router")();
/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Classroom Management
 */

/**
 * @swagger
 * /class/getAllClass:
 *   get:
 *     summary: Get a list of all classes  [ADMIN]
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get class list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ClassSchema"
 *                 message:
 *                   type: string
 *                   example: "Classes retrieved successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/create:
 *   post:
 *     summary: Create a new class  [ADMIN]
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: number
 *                 example: 2025
 *               semester:
 *                 type: number
 *                 example: 2
 *               unitId:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c85"
 *               className:
 *                 type: string
 *                 example: "Java Spring Boot Class"
 *               quantity :
 *                 type: number
 *                 example : 4
 *               lecture:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c77"
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     time:
 *                       type: string
 *                       example: "08:00 AM - 10:00 AM"
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Class created successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/{classId}/attendance:
 *   post:
 *     summary: Mark student attendance  [TEACHER] [ADMIN]
 *     tags: [Classes]
 *     description: API for lecturers to mark student attendance for a specific class on a given date.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-28"
 *                 description: Attendance date (YYYY-MM-DD)
 *               topic:
 *                 type: string
 *                 example: "Linked Lists"
 *                 description: Lesson topic
 *               students:
 *                 type: array
 *                 description: List of students and their attendance status
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                       example: "67e5abcd1234abcd5678efgh"
 *                       description: ID of the student
 *                     status:
 *                       type: string
 *                       enum: ["present", "absent"]
 *                       example: "present"
 *                       description: Attendance status
 *     responses:
 *       200:
 *         description: Attendance marked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Attendance marked successfully"
 *                 data:
 *                   type: array
 *                   description: Class attendance list
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-03-28"
 *                       topic:
 *                         type: string
 *                         example: "Linked Lists"
 *                       students:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             studentId:
 *                               type: string
 *                               example: "67e5abcd1234abcd5678efgh"
 *                             status:
 *                               type: string
 *                               example: "present"
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid data format"
 *       401:
 *         description: Unauthorized - Token required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Class not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Class not found"
 */

/**
 * @swagger
 * /class/update/{classID}:
 *   put:
 *     summary: Update class information  [ADMIN]
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classID
 *         schema:
 *           type: string
 *         required : true
 *         description: ID of Class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: number
 *                 example: 2025
 *               semester:
 *                 type: number
 *                 example: 2
 *               unitId:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c85"
 *               className:
 *                 type: string
 *                 example: "Java Spring Boot Class"
 *               quantity :
 *                 type: number
 *                 example : 4
 *               lecture:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c77"
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     time:
 *                       type: string
 *                       example: "08:00 AM - 10:00 AM"
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Class updated successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/delete/{classID}:
 *   delete:
 *     summary: Delete a class [ADMIN]
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class to delete
 *     responses:
 *       200:
 *         description: ID of the class to delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Class deleted successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/filter:
 *   get:
 *     summary: Filter classes by criteria [STUDENT] [TEACHER] [ADMIN]
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: School year
 *       - in: query
 *         name: semester
 *         schema:
 *           type: number
 *         description: Semester
 *       - in: query
 *         name: unitId
 *         schema:
 *           type: string
 *         description: Unit ID
 *     responses:
 *       200:
 *         description: List of classes by filter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d21b4967d0d8992e610c85"
 *                       className:
 *                         type: string
 *                         example: "Java Spring Boot Class"
 *                       year:
 *                         type: number
 *                         example: 2025
 *                       semester:
 *                         type: number
 *                         example: 2
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/{studentId}/attendance:
 *   get:
 *     summary: Get student attendance history [STUDENT] [TEACHER] [ADMIN]
 *     description: Returns the attendance history of a student based on their ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose attendance record is being retrieved
 *     responses:
 *       200:
 *         description: Student attendance records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-03-15"
 *                       topic:
 *                         type: string
 *                         example: "Spring Boot Basics"
 *                       className:
 *                         type: string
 *                         example: "Java Spring Boot Class"
 *                       unitName:
 *                         type: string
 *                         example: "Spring Framework"
 *                       status:
 *                         type: string
 *                         enum: ["present", "absent"]
 *                         example: "present"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Missing student ID"
 *       404:
 *         description: Attendance record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No attendance history found for this student."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /classes/{classId}/students:
 *   post:
 *     summary: Add multiple students to a class [ADMIN]
 *     description: Add a list of studentIds to a class, avoiding duplicates.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Students added successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get class by ID [STUDENT] [TEACHER] [ADMIN]
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */

router
  .route("/class/getAllClass")
  .get(protect, authorization(Roles.ADMIN), ClassController.getAllClass);

router
  .route("/class/filter")
  .get(protect, authorization(Roles.STUDENT), ClassController.filterClass);

router
  .route("/class/:studentId/attendance")
  .get(
    protect,
    authorization(Roles.STUDENT),
    ClassController.getStudentAttendance
  );

router
  .route("/class/create")
  .post(protect, authorization(Roles.ADMIN), ClassController.createClass);

router
  .route("/class/:classId/attendance")
  .post(protect, authorization(Roles.TEACHER), ClassController.markAttendance);

router
  .route("/class/update/:classID")
  .put(protect, authorization(Roles.ADMIN), ClassController.updateClass);

router
  .route("/class/delete/:classID")
  .delete(protect, authorization(Roles.ADMIN), ClassController.deleteClass);

router
  .route("/classes/:classId/students")
  .post(
    protect,
    authorization(Roles.ADMIN),
    ClassController.addStudentsToClass
  );

router
  .route("/classes/:id")
  .get(protect, authorization(Roles.STUDENT), ClassController.getClassById);
module.exports = router;
