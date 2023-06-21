const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

// Configuración de Swagger
const swaggerDefinition = require('./swagger.json');
const options = {
  swaggerDefinition,
  apis: ['./api.js', './models/turno.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/veterinaria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Iniciar el servidor después de la conexión exitosa a la base de datos
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar a la base de datos', err));

// Rutas de la API
app.use('/api', apiRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});