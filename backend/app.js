
import express from 'express';
import connectDB from './db/connect.js';
import expensesRouter from './routers/expensesRouter.js';
import userRoute from './routers/userRouter.js';



//initialization
const app = express();

//db connection
connectDB();

app.use(express.json());

//Routers
app.use('/', expensesRouter)
app.use('/auth', userRoute)

//Set constant for port
const PORT = process.env.PORT || 8000;

//Listen to a port
app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`));

