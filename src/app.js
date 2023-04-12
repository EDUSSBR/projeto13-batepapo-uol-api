import * as dotenv from 'dotenv'; 
import app from './routes/index.js';
dotenv.config();
app.listen(process.env.PORT, ()=>console.log(`App listening at port ${process.env.PORT}`));