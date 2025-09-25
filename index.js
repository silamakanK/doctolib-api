import express from 'express';
import dotenv from 'dotenv';
import homeRoutes from './routes/home.js';
import userRoutes from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js'; 
import appointementRoute from './routes/appointementRoute.js';
import doctofeedRoute from  './routes/doctofeedRoute.js'
import searchHistoricRoute from './routes/searchHistoricRoute.js'

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/appointements', appointementRoute);
app.use('/doctofeed', doctofeedRoute);
app.use('/historics', searchHistoricRoute)

app.listen(port, () => {
  console.log(`Doctolib API listening on port ${port}`);
} );