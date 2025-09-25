import express from 'express';
import homeRoutes from './routes/home.js';
import userRoutes from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js'; 
import appointementRoute from './routes/appointementRoute.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/appointements', appointementRoute);



app.listen(port, () => {
  console.log(`Doctolib API listening at http://localhost:${port}`);
});