import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
};

export default envConfig;
