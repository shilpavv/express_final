import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

// Import your Express app and router
import express from 'express';
import { Employee } from './src/entities/Employee';
import cors from 'cors'; // Import cors as an ES6 module
import { EmployeeRouter } from './src/routes/employeeRoutes';
import { User } from './src/entities/User';
import { UserRouter } from './src/routes/userRoutes';
import { AuthRouter } from './src/routes/authRoutes';
const app = express();
const port = parseInt(process.env.PORT || '8000');
// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use('/',new EmployeeRouter().router);
app.use('/',new UserRouter().router);
app.use('/',new AuthRouter().router);


createConnection({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [Employee,User],
})
  .then(() => {
    // Connection established
    console.log('Connected to the database');
    // Start your Express server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
