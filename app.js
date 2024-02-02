const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const userActionsRoutes = require('./routes/userActionsRoutes');
const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());

// view engine
// app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://omar:dbpass1234@cluster0.huymcu2.mongodb.net/node_course?retrywrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.send('home'));
app.use(productRoutes);
app.use(authRoutes);
app.use(userActionsRoutes);
