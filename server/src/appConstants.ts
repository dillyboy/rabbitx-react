import dotenv from "dotenv";
dotenv.config();

const appConstants = {
  URL: 'https://pro-api.coinmarketcap.com',
  API_KEY: process.env.API_KEY
}
  
export default appConstants;