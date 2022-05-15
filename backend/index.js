const express = require('express')
require('dotenv').config({ path: './config/.env' })
const connect = require('./config/dbConnect');
const userRoutes = require('./api/user.routes')
const postRoutes = require('./api/posts.routes')
const app = express();
app.set('trust proxy', true)
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
connect()
const port = process.env.PORT;
app.use(express.json())
app.use('/api/users/', userRoutes)
app.use('/api/posts/', postRoutes)

app.get('*', (req, res) => {
    res.json({ message: "This End Point isn't Served" })
});




app.listen(port, () => {
    console.log(`Server started on port${port}`);
});