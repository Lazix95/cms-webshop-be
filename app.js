// Node modules
const path = require('path');

// Plugins
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

// Plugin config files
const {fileStorage, fileFilter} = require('./Utils/multer');

// Routes
const initApp = require('./routes/initApp');
const auth = require('./routes/auth');

// Load env varibles
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Utils Middlewares
app.use(bodyParser.json()); // application/json header required
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

// Route Middlewares
app.use('/', initApp);
app.use('/', auth);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
});

// Run Node app
mongoose
   .connect(process.env.DB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
   .then(result => {
      const server = app.listen(process.env.PORT || 8080); 
   })
   .catch(err => console.log('MongoDB Error => ' ,err));


