const router = require("express-promise-router")();

const { Roles } = require("../constants/roles");
const courseController = require("../controllers/courseController");

const { protect, authorization } = require("../middlewares/auth");

/**
 * @swagger
 * /course/getAllCourse:
 *  get:
 *    summary : get all course  [ADMIN]
 *    description : get all course
 *    tags : [course]
 *    security :
 *      - bearerAuth : []
 *    responses :
 *      200:
 *        $ref:  '#/components/responses/SuccessRequest'
 *      400:
 *        description: Invalid request
 *      401:
 *        description: Unauthorized
 *
 */

/**
 * @swagger
 * /course/createCourse:
 *   post:
 *     summary : create a course [ADMIN]
 *     description : create a course
 *     tags : [course]
 *     security :
 *      - bearerAuth : []
 *     requestBody:
 *       required : true
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#/components/schemas/CourseSchema'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/SuccessRequest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         description: Unauthorized
 *
 */

/**
 * @swagger
 * /course/{courseID}:
 *   put:
 *      summary : create many courses  [ADMIN]
 *      description : create many courses
 *      tags : [course]
 *      security :
 *         - bearerAuth : []
 *      parameters:
 *       - in: path
 *         name: courseID
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *      requestBody:
 *         required : true
 *         content:
 *            application/json:
 *               schema:
 *                  $ref : '#/components/schemas/CourseSchema'
 *      responses:
 *         201:
 *            $ref: '#/components/responses/SuccessRequest'
 *         400:
 *            $ref: '#/components/responses/BadRequest'
 *         401:
 *            description: Unauthorized
 */

/**
 * @swagger
 * /course/{courseID}:
 *   delete:
 *      summary : delete a course  [ADMIN]
 *      description : delete a course
 *      tags : [course]
 *      security :
 *         - bearerAuth : []
 *      parameters:
 *       - in: path
 *         name: courseID
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *      responses:
 *         200:
 *            $ref: '#/components/responses/SuccessRequest'
 *         400:
 *            $ref: '#/components/responses/BadRequest'
 *         401:
 *            description: Unauthorized
 */
router
  .route("/course/getAllCourse")
  .get(protect, authorization(Roles.ADMIN), courseController.getAllCourse);
router
  .route("/course/createCourse")
  .post(protect, authorization(Roles.ADMIN), courseController.createCourse);
router
  .route("/course/:courseID")
  .put(protect, authorization(Roles.ADMIN), courseController.updateCourse);
router
  .route("/course/:courseID")
  .delete(protect, authorization(Roles.ADMIN), courseController.deleteCourse);

module.exports = router;
