/**
 * @openapi
 * /api/epresence:
 *   post:
 *     summary: Menambahkan data absen
 *     tags:
 *       - Epresence
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEpresenceRequest'
 *     responses:
 *       '200':
 *         description: Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEpresenceResponse'
 *       '400':
 *         description: Gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * /api/epresence/approve/{idEpresence}:
 *   put:
 *     summary: Melakukan approval status absen
 *     tags:
 *       - Epresence
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: idEpresence
 *        schema:
 *          type: number
 *        required: true
 *        description: ID Epresence
 *     responses:
 *       '200':
 *         description: Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApproveEpresenceResponse'
 *       '400':
 *         description: Gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
