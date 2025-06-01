import express from 'express';
import dotenv from 'dotenv';
import crudRoutes from './routes/crudRouters.js';
import cors from 'cors';

dotenv.config()

const app = express()

app.use(cors())
const PORT = process.env.PORT || 3000
app.use(express.json())


app.use('/api', crudRoutes)




app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})