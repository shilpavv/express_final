"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import your Express app and router
const express_1 = __importDefault(require("express"));
const Employee_1 = require("./src/entities/Employee");
const cors_1 = __importDefault(require("cors")); // Import cors as an ES6 module
const employeeRoutes_1 = require("./src/routes/employeeRoutes");
const User_1 = require("./src/entities/User");
const userRoutes_1 = require("./src/routes/userRoutes");
const authRoutes_1 = require("./src/routes/authRoutes");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '8000');
// Enable CORS for all routes
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', new employeeRoutes_1.EmployeeRouter().router);
app.use('/', new userRoutes_1.UserRouter().router);
app.use('/', new authRoutes_1.AuthRouter().router);
(0, typeorm_1.createConnection)({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [Employee_1.Employee, User_1.User],
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
