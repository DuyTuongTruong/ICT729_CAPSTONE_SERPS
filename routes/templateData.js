const router = require("express").Router();

const { createManyUser } = require("../controllers/userController");
const courseController = require("../controllers/courseController");
const { protect, authorization } = require("../middlewares/auth");
const { Roles } = require("../constants/roles");

/**
 * @swagger
 * /template/createManyUser:
 *   post:
 *     summary : insert many user test data
 *     description : router for test insert many user
 *     tags : [create template data]
 *     security :
 *      - bearerAuth : []
 *     requestBody:
 *       required : true
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: User created successfully
 *
 */

/**
 * @swagger
 * /template/createManyCourse:
 *   post:
 *     summary : insert many course test data course
 *     description : router for test insert many course
 *     tags : [create template data]
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
 *         $ref: '#/components/responses/CourseSchemaCreateResponse'
 *
 */
router.route("/template/createManyUser").post(createManyUser);
router
  .route("/template/createManyCourse")
  .post(
    protect,
    authorization(Roles.ADMIN),
    courseController.createManyCourses
  );

module.exports = router;
