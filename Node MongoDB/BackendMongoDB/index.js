import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js'
import cors from 'cors'
import eventsRoutes from './src/routes/eventsRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()




app.use(cors());
app.use(express.json());

app.use('/api', eventsRoutes);

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})