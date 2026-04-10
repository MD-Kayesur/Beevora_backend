import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/beevora',
  jwt_secret: process.env.JWT_SECRET || 'very-secret-secret',
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'very-secret-refresh-secret',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
};
