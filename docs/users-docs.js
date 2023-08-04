/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Mengambil semua data user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FindUsersResponse'
 *       '401':
 *         description: Gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
