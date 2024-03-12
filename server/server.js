const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/mongoDB.js');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
// const { environment } = require('./config');
const helmet = require('helmet');
dotenv.config();
require('express-async-errors');

const port = process.env.PORT || 8001;

connectDB();

const app = express();
// const isProduction = environment === 'production';
app.use(morgan('dev'));

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

// app.get('/api/csrf/restore', (req, res) => {
//   const csrfToken = req.csrfToken();
//   res.cookie('XSRF-TOKEN', csrfToken);
//   res.status(200).json({
//     'XSRF-Token': csrfToken,
//   });
// });

app.get('/', (req, res) => res.send('API running'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
