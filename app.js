const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./db/config')
const {notFound,errorHandler} = require('./middlewares')
const LogEntry = require('./models/LogEntry')

const app = express()


// connect Database
connectDB()

app.use(morgan('dev'))
app.use(helmet());
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.json({
        message:"App running"
    })
})
app.get('/api/logs',async(req,res,next)=>{
    try {
        const entries = await LogEntry.find()
        res.json(entries)
    } catch (error) {
        next(error)
    }
})

app.post('/api/logs',async(req,res,next)=>{
    console.log(req.body);
    try {
        const logEntry = new LogEntry(req.body);
        const createEntry = await logEntry.save()
        res.json(createEntry)
    } catch (error) {
        next(error)
    }
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})