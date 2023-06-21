const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  fecha: { type: Date, required: false },
  nombreCliente: { type: String, required: true },
  nombreMascota: { type: String, required: true },
  servicio: { type: String, required: true },
});

module.exports = mongoose.model('Turno', turnoSchema);
