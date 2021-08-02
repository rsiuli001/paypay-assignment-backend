/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import { loginRouter, prRouter, userRouter } from './users/routers';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/prs', prRouter);

app.use(errorHandler);
app.use(notFoundHandler);
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
