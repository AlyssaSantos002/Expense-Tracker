import express from 'express';
import connectDB from './db/connect.js';
import expensesRouter from './routers/expensesRouter.js';
import userRouter from './routers/userRouter.js';
import budgetRouter from './routers/budgetRouter.js';

//initialization
const app = express();

//db connection
connectDB();

app.use(express.json());
app.use(cors());

//Routers
app.use('/', expensesRouter);
app.use('/', budgetRouter);
app.use('/auth', userRouter);

//Set constant for port
const PORT = process.env.PORT || 8000;

//Listen to a port
app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`));

