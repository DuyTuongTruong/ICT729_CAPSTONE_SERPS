const router = require("express-promise-router")();

const UserController = require("../controllers/userController");

const {
  signinSchema,
  signinResponse,
} = require("../swagger/schema/userLoginSchemaUI");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

const passport = require("passport");
const { Roles } = require("../constants/roles");
const { protect, authorization } = require("../middlewares/auth");

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Login and receive JWT tokens [STUDENT] [TEACHER] [ADMIN]
 *     description: Check the account and password, if valid, the JWT token will be returned.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SigninRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SigninSuccess'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/{userID}:
 *   get:
 *     summary: Get a user by ID [STUDENT] [TEACHER] [ADMIN]
 *     description: Get a user by ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user [TEACHER] [ADMIN]
 *     description: Create a new user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/getAllTeacher:
 *  get:
 *   summary: Get all teachers [ADMIN]
 *   description: Get all teachers
 *   tags: [Users]
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       $ref: '#/components/responses/UserSchemaResponse'
 *     400:
 *       description: Invalid request
 *     401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /users/{userID}:
 *   put:
 *     summary: Update a user by ID [STUDENT] [TEACHER] [ADMIN]
 *     description: Update a user by ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /users/register-multiple:
 *   post:
 *     summary: Register multiple users  [ADMIN]
 *     description: Create multiple new users with auto-generated user_id (ST001, TC001,...).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - fullName
 *                 - gender
 *                 - email
 *                 - phone
 *                 - role
 *                 - status
 *                 - dateOfBirth
 *                 - username
 *                 - password
 *                 - address
 *               properties:
 *                 fullName:
 *                   type: string
 *                 gender:
 *                   type: string
 *                   enum: [male, female]
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [student, teacher]
 *                 status:
 *                   type: string
 *                   enum: [active, inactive]
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *                 address:
 *                   type: string
 *     responses:
 *       201:
 *         description: Users registered successfully
 *       400:
 *         description: Username or email already exists
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/classes/{studentId}:
 *   get:
 *     summary: Get all classes of a student [STUDENT]
 *     description: Retrieve all classes that a student has participated in. Supports filtering by semester or year.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by academic year (e.g., 2023)
 *       - in: query
 *         name: semester
 *         schema:
 *           type: string
 *         description: Filter by semester (e.g., 1 or 2)
 *     responses:
 *       200:
 *         description: List of classes retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /users/courses/{studentId}:
 *   get:
 *     summary: Get all courses of a student [STUDENT]
 *     description: Retrieve all courses that a student is participating in, based on enrolled classes.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/units/{studentId}:
 *   get:
 *     summary: Get all units of a student [STUDENT]
 *     description: Retrieve all units of a student based on enrolled classes, with optional filtering by semester and year.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by academic year
 *       - in: query
 *         name: semester
 *         schema:
 *           type: string
 *         description: Filter by semester (e.g., 1 or 2)
 *     responses:
 *       200:
 *         description: List of units retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router
  .route("/signin")
  .post(
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    UserController.signIn
  );
router.route("/users").get(protect, UserController.index);
router
  .route("/users/createUser")
  .post(protect, authorization(Roles.ADMIN), UserController.createUser);

router
  .route("/users/getAllTeacher")
  .get(protect, authorization(Roles.ADMIN), UserController.findAllTeachers);

router
  .route("/users/:userID")
  .get(
    protect,
    authorization(Roles.STUDENT),
    validateParam(schemas.idSchema, "userID"),
    UserController.findOneUser
  );

router
  .route("/users/:userID")
  .put(
    protect,
    authorization(Roles.ADMIN),
    validateParam(schemas.idSchema, "userID"),
    UserController.updateUser
  );

router
  .route("/users/secret")
  .get(passport.authenticate("jwt", { session: false }), UserController.secret);

router
  .route("/users/register-multiple")
  .post(
    protect,
    authorization(Roles.TEACHER),
    UserController.registerMultipleUsers
  );

router.get(
  "/users/classes/:studentId",
  protect,
  authorization(Roles.STUDENT),
  UserController.getClassesByStudent
);
router.get(
  "/users/courses/:studentId",
  protect,
  authorization(Roles.STUDENT),
  UserController.getCoursesByStudent
);
router.get(
  "/users/units/:studentId",
  protect,
  authorization(Roles.STUDENT),
  UserController.getUnitsByStudent
);

module.exports = router;
