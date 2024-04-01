import path from 'path';
import dotenv from 'dotenv';

// Load the .env file from the project root
dotenv.config({ path: [path.resolve('../../.env.secrets.local')] });
dotenv.config({ path: [path.resolve('../../.env.local')] });
