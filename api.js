const express = require('express');
const router = express.Router();
const Turno = require('./models/turno');

/**
 * @swagger
 * /api/turnos:
 *   get:
 *     summary: Obtiene todos los turnos.
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida correctamente.
 *       500:
 *         description: Error al obtener los turnos.
 */
router.get('/turnos', async (req, res) => {
  try {
    const turnos = await Turno.find();
    if (turnos.length === 0) {
      res.json({ mensaje: 'No hay turnos por atender' });
    } else {
      res.json(turnos);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
});

/**
 * @swagger
 * /api/turnos:
 *   post:
 *     summary: Crea un nuevo turno.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               nombreCliente:
 *                 type: string
 *               nombreMascota:
 *                 type: string
 *               servicio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turno creado correctamente.
 *       500:
 *         description: Error al crear el turno.
 */
router.post('/turnos', async (req, res) => {
  try {
    const { fecha, nombreCliente, nombreMascota, servicio } = req.body;
    const turno = new Turno({ fecha, nombreCliente, nombreMascota, servicio });
    await turno.save();
    res.json(turno);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el turno' });
  }
});

/**
 * @swagger
 * /api/turnos/{id}:
 *   put:
 *     summary: Actualiza la fecha de un turno existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del turno a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Fecha del turno actualizada correctamente.
 *       500:
 *         description: Error al cambiar la fecha del turno.
 */
router.put('/turnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha } = req.body;
    const turno = await Turno.findByIdAndUpdate(id, { fecha }, { new: true });
    res.json(turno);
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar la fecha del turno' });
  }
});

/**
 * @swagger
 * /api/turnos/{id}:
 *   delete:
 *     summary: Elimina un turno existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del turno a eliminar.
 *     responses:
 *       200:
 *         description: Turno eliminado correctamente.
 *       500:
 *         description: Error al eliminar el turno.
 */
router.delete('/turnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Turno.findByIdAndRemove(id);
    res.json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el turno' });
  }
});

module.exports = router;

