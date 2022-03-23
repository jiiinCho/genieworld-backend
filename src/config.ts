import dotenv from "dotenv";
dotenv.config();

function requiredString(
  key: string,
  defaultValue: undefined | string = undefined
) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    //if value is null or undefined '=='
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

function requiredInteger(
  key: string,
  defaultValue: undefined | number = undefined
) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    //if value is null or undefined '=='
    throw new Error(`Key ${key} is undefined`);
  }
  return parseInt(value.toString());
}

export const config = {
  jwt: {
    secretKey: requiredString("JWT_SECRET"),
    expiresInSec: requiredString("JWT_EXPIRES_SEC", "48h"),
  },
  bcrypt: {
    saltRounds: requiredInteger("BCRYPT_SALT_ROUNDS", 12),
  },
  port: requiredInteger("PORT", 8080),
  db: {
    host: requiredString("DB_HOST"),
  },
  cors: {
    allowedOrigin: requiredString("CORS_ALLOW_ORIGIN"),
  },
  rateLimit: {
    windowMs: 60000,
    maxRequest: 100,
  },
};
