import express, { NextFunction, Response } from 'express';
import fileUpload from 'express-fileupload';
import * as mongoose from 'mongoose';

import { apiRouter } from './routes';
import { envConfig } from './configs';
import { IRequest } from './interfaces';
import { cronRunner } from './crones';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(apiRouter);

// eslint-disable-next-line no-unused-vars
app.use((err:any, req:IRequest, res:Response, next:NextFunction) => {
    res.status(err.status || 500).json({
        errorMessage: err.message || 'Unknown error',
        statusCode: err.status || 500
    });
});

app.listen(envConfig.PORT, async ():Promise<void> => {
    await mongoose.connect(envConfig.MONGO_SERVER as string);
    console.log(`working on port ${envConfig.PORT}`);
    cronRunner();
});
