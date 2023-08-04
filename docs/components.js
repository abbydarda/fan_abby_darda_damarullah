/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email user
 *         password:
 *           type: string
 *           description: Password user
 *       required:
 *         - email
 *         - password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Pesan dari response
 *         data:
 *           type: object
 *           description: Response data
 *           properties:
 *             token:
 *               type: string
 *               description: Token untuk akses resource
 *     FindUsersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Pesan dari response
 *         data:
 *           type: array
 *           description: Response data
 *           items:
 *             type: object
 *             properties:
 *               id_users:
 *                 type: string
 *                 description: ID User
 *               nama_user:
 *                 type: string
 *                 description: Nama User
 *               tanggal:
 *                 type: string
 *                 description: Tanggal absen
 *               waktu_masuk:
 *                 type: string
 *                 description: Jam masuk
 *               waktu_pulang:
 *                 type: string
 *                 description: Jam pulang
 *               status_masuk:
 *                 type: string
 *                 description: Status jam masuk
 *               status_pulang:
 *                 type: string
 *                 description: Status jam pulang
 *     CreateEpresenceRequest:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: IN|OUT
 *         waktu:
 *           type: string
 *           description: YYYY-MM-DD HH:mm:ss
 *       required:
 *         - type
 *         - waktu
 *     CreateEpresenceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Pesan dari response
 *         data:
 *           type: object
 *           description: Respons data
 *           properties:
 *             id:
 *               type: string
 *               description: ID Epresence yang dibuat
 *     ApproveEpresenceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Pesan dari response
 *         data:
 *           type: object
 *           description: Respons data
 *           properties:
 *             id:
 *               type: string
 *               description: ID Epresence yang diubah
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errors:
 *           type: string
 *           description: Pesan dari response
 */
