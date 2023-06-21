const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const swaggerSetup = require('./swagger');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/veterinaria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.use(express.json());
    app.use('/api', apiRoutes);
    swaggerSetup(app); // Configuración de Swagger
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar a la base de datos', err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

