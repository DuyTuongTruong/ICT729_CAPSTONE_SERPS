const { Roles } = require("../constants/roles");
const UnitController = require("../controllers/unitController");
const { protect, authorization } = require("../middlewares/auth");

const router = require("express-promise-router")();
/**
 * @swagger
 * /unit/getAllUnits:
 *   get:
 *     summary: Retrieve all units  [ADMIN]
 *     description: Get a list of all academic units.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Units
 *     responses:
 *       200:
 *         $ref: "#/components/responses/GetAllUnits"
 *
 * /unit/create:
 *   post:
 *     summary: Create a new unit  [ADMIN]
 *     description: Add a new academic unit to the system.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Units
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UnitSchema"
 *     responses:
 *       201:
 *         $ref: "#/components/responses/UnitCreated"
 */

/**
 * @swagger
 * /unit/search:
 *   get:
 *     summary: Search Unit  [ADMIN]
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keywords to search for Unit
 *     responses:
 *       200:
 *         $ref: "#/components/responses/GetAllUnits"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/filter:
 *   get:
 *     summary: Filter Unit by Course  [ADMIN]
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *         description: Course ID to filter Units
 *     responses:
 *       200:
 *         $ref: "#/components/responses/GetAllUnits"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/createManyUnit:
 *   post:
 *     summary: Create multiple Units at once  [ADMIN]
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: array
 *              items:
 *                 $ref: "#/components/schemas/UnitSchema"
 *
 *     responses:
 *       201:
 *         description: create Multiple Units
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
 *                      $ref: "#/components/schemas/UnitSchema"
 *                 message:
 *                   type: string
 *                   example: "Unit create Multiple successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/update/{unitID}:
 *   put:
 *     summary: Update Unit  [ADMIN]
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: unitID
 *         schema:
 *           type: string
 *         required: true
 *         description: The unit ID
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
 *               course:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c90"
 *               name:
 *                 type: string
 *                 example: "Advanced Java Programming"
 *               credits:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: Unit update successful
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
 *                   example: "Unit updated successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/delete/{unitID}:
 *   delete:
 *     summary: remove Unit [ADMIN]
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: unitID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of Unit to be deleted
 *     responses:
 *       200:
 *         description: Unit deleted successfully
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
 *                   example: "Unit deleted successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /units/{id}:
 *   get:
 *     summary: Get unit by ID
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unit ID
 *     responses:
 *       200:
 *         description: Unit found
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Server error
 */

router
  .route("/unit/getAllUnits")
  .get(protect, authorization(Roles.ADMIN), UnitController.getAllUnit);

router
  .route("/unit/create")
  .post(protect, authorization(Roles.ADMIN), UnitController.createUnit);

router
  .route("/unit/search")
  .get(protect, authorization(Roles.ADMIN), UnitController.searchUnit);

router
  .route("/unit/filter")
  .get(protect, authorization(Roles.ADMIN), UnitController.filterByCourse);

router
  .route("/unit/createManyUnit")
  .post(protect, authorization(Roles.ADMIN), UnitController.createManyUnit);

router
  .route("/unit/update/:unitID")
  .put(protect, authorization(Roles.ADMIN), UnitController.updateUnit);

router
  .route("/unit/delete/:unitID")
  .delete(protect, authorization(Roles.ADMIN), UnitController.removeUnit);

router
  .route("/units/:id")
  .get(protect, authorization(Roles.STUDENT), UnitController.getUnitById);

module.exports = router;
