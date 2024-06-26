import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './src/models/bookModel.js';
import booksRoute from './src/routes/booksRoute.js';
import authRoutes from './src/routes/authRoute.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// TODO: Creat app.js and reorganize the code

const app = express();

app.use(morgan('dev'));

//Middleware for parsing request body
app.use(express.json());
app.use(cookieParser());

//Middlerare for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome to MERN STACK Tutorial');
});

app.use('/books', booksRoute);
app.use('/api', authRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
