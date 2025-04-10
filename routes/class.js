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
 *     summary: Get a list of all classes
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
 *     summary: Create a new class
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
 * /class/update/{classID}:
 *   put:
 *     summary: Update class information
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
 *     summary: Delete a class
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


router
  .route("/class/getAllClass")
  .get(protect, authorization(Roles.STUDENT), ClassController.getAllClass);

router
  .route("/class/create")
  .post(protect, authorization(Roles.TEACHER), ClassController.createClass);

router
  .route("/class/update/:classID")
  .put(protect, authorization(Roles.TEACHER), ClassController.updateClass);

router
  .route("/class/delete/:classID")
  .delete(protect, authorization(Roles.TEACHER), ClassController.deleteClass);

module.exports = router;
