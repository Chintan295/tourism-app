const express =  require('express');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter);

module.exports = app;