const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   Turno:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       fecha:
 *         type: string
 *         format: date
 *       nombreCliente:
 *         type: string
 *       nombreMascota:
 *         type: string
 *       servicio:
 *         type: string
 *
 *   TurnoInput:
 *     type: object
 *     properties:
 *       fecha:
 *         type: string
 *         format: date
 *         required: true
 *       nombreCliente:
 *         type: string
 *         required: true
 *       nombreMascota:
 *         type: string
 *         required: true
 *       servicio:
 *         type: string
 *         required: true
 */

const turnoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  nombreCliente: { type: String, required: true },
  nombreMascota: { type: String, required: true },
  servicio: { type: String, required: true },
});

module.exports = mongoose.model('Turno', turnoSchema);
