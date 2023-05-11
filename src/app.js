import dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
dotenv.config();
const app = express();

import bodyParser from 'body-parser';
import DB from './models/db.js';


import {router as indexRouter} from './routes/index.js';

DB.connect();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);


app.get('/health', (req, res)=>{
    res.status(200).json({
        "message": "server is running"
    });
});



app.use(function(req, res, next){
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server started');
});