import express from 'express';
import dotenv from 'dotenv';
// import homeRoutes from './routes/home.js';
import userRoutes from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js'; 
import appointementRoute from './routes/appointementRoute.js';

const app = express();
const port = process.env.PORT || 3000;

config.dotenv();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Doctolib API'});
}); 

// app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/appointements', appointementRoute);

app.listen(port, () => {
  console.log(`Doctolib API listening on port ${port}`);
} );