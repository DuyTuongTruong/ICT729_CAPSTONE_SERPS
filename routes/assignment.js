const router = require("express").Router();
const assignmentController = require("../controllers/assignmentsController");
const { protect, authorization } = require("../middlewares/auth");
const { Roles } = require("../constants/roles");

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create a new assignment [TEACHER] [ADMIN]
 *     description: API for creating an assignment
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignmentSchema'
 *     responses:
 *       201:
 *         description: Assignment created successfully
 */

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get all assignments  [STUDENT] [TEACHER] [ADMIN]
 *     description: Retrieve all assignments from the database
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all assignments
 */

/**
 * @swagger
 * /assignments/class/{classId}:
 *   get:
 *     summary: Get assignments by class [STUDENT] [TEACHER] [ADMIN]
 *     description: Retrieve assignments based on classId
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Successfully retrieved assignments for the class
 */

/**
 * @swagger
 * /assignments/unit/{unitId}:
 *   get:
 *     summary: Get assignments by unit [STUDENT] [TEACHER] [ADMIN]
 *     description: Retrieve assignments based on unitId
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unit ID
 *     responses:
 *       200:
 *         description: Successfully retrieved assignments for the unit
 */

/**
 * @swagger
 * /assignments/{assignmentId}/submit:
 *   post:
 *     summary: Submit an assignment [STUDENT] [TEACHER] [ADMIN]
 *     description: Students can submit assignments along with files
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "65fcd2a78b5a1d4b3c1e3f8d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/assignmentSubmissionSchema'
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 */

/**
 * @swagger
 * /assignments/{assignmentId}/class/{classId}/grades:
 *   post:
 *     summary: Grade multiple students in one request [TEACHER] [ADMIN]
 *     description: Teachers can grade multiple students' assignments in a single API call.
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the assignment
 *       - name: classId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grades
 *             properties:
 *               grades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - studentId
 *                     - grade
 *                   properties:
 *                     studentId:
 *                       type: string
 *                       example: "60d21b4967d0d8992e610c81"
 *                     grade:
 *                       type: number
 *                       example: 85
 *     responses:
 *       200:
 *         description: Grades updated successfully
 *       400:
 *         description: Invalid grade input
 *       404:
 *         description: Assignment or class not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /assignments/{id}:
 *   put:
 *     summary: Update assignment by ID  [TEACHER] [ADMIN]
 *     description: Admin can update assignment details
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65fcd2a78b5a1d4b3c1e3f8d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignmentSchema'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 */

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Delete assignment by ID [TEACHER] [ADMIN]
 *     description: Admin can delete an assignment
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65fcd2a78b5a1d4b3c1e3f8d"
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 */

/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     summary: Get assignment by ID [STUDENT] [TEACHER] [ADMIN]
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment found
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Server error
 */
router
  .route("/assignments")
  .post(
    protect,
    authorization(Roles.TEACHER),
    assignmentController.createAssignment
  );
router
  .route("/assignments")
  .get(
    protect,
    authorization(Roles.STUDENT),
    assignmentController.getAllAssignments
  );
router
  .route("/assignments/class/:classId")
  .get(
    protect,
    authorization(Roles.STUDENT),
    assignmentController.getAssignmentsByClass
  );
router
  .route("/assignments/unit/:unitId")
  .get(
    protect,
    authorization(Roles.STUDENT),
    assignmentController.getAssignmentsByUnit
  );
router
  .route("/assignments/:assignmentId/submit")
  .post(
    protect,
    authorization(Roles.STUDENT),
    assignmentController.submitAssignment
  );
router
  .route("/assignments/:assignmentId/class/:classId/grades")
  .post(
    protect,
    authorization(Roles.TEACHER),
    assignmentController.gradeMultipleStudents
  );

router.put(
  "/assignments/:id",
  protect,
  authorization(Roles.TEACHER),
  assignmentController.updateAssignment
);
router.delete(
  "/assignments/:id",
  protect,
  authorization(Roles.TEACHER),
  assignmentController.deleteAssignment
);

router
  .route("/assignments/:id")
  .get(
    protect,
    authorization(Roles.STUDENT),
    assignmentController.getAssignmentById
  );

module.exports = router;
