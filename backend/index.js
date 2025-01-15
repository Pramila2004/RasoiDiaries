import express from 'express'
import cookieParser from 'cookie-parser';
import DBConnection from "./database/db_connection.js";
import cors from 'cors'



const app = express();
const PORT = process.env.PORT || 8000;


//Database connection
DBConnection();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.get('/', (req,res)=>{
    res.send('Hello world')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
