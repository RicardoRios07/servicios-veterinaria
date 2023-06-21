const express = require('express');
const router = express.Router();
const Turno = require('./models/turno');

/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: API para administrar turnos en una veterinaria
 */

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Obtener todos los turnos
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida exitosamente
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Turno'
 *       500:
 *         description: Error al obtener los turnos
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
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
 * /turnos:
 *   post:
 *     summary: Crear un nuevo turno
 *     tags: [Turnos]
 *     parameters:
 *       - name: turno
 *         in: body
 *         description: Objeto del turno a crear
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TurnoInput'
 *     responses:
 *       200:
 *         description: Turno creado exitosamente
 *         schema:
 *           $ref: '#/definitions/Turno'
 *       500:
 *         description: Error al crear el turno
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
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
 * /turnos/{id}:
 *   put:
 *     summary: Cambiar la fecha de un turno
 *     tags: [Turnos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del turno a actualizar
 *         required: true
 *         schema:
 *           type: string
 *       - name: fecha
 *         in: body
 *         description: Nueva fecha del turno
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             fecha:
 *               type: string
 *               format: date
 *     responses:
 *       200:
 *         description: Fecha del turno actualizada exitosamente
 *         schema:
 *           $ref: '#/definitions/Turno'
 *       500:
 *         description: Error al cambiar la fecha del turno
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
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
 * /turnos/{id}:
 *   delete:
 *     summary: Eliminar un turno
 *     tags: [Turnos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del turno a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turno eliminado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Error al eliminar el turno
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
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
