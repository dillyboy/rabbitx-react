# How to run the development server

- Clone the project
- Install dependencies in the client side with **npm install**
- Execute **npm run dev** to run the react application
- Open another terminal window and Install dependencies in the server side with **cd server && npm install**
- Add the API_KEY which can be retrieved from CoinMarketCap Developer account to **server/.env** file
- Run **npm start** to run the express backend

## Why is an express app needed?

The reason to have an NodeJS express app is because the React application will expose the API key of CoinMarketCap to any potential client.

## Application Features

- Using Vite for fast runtime performance during development.
- Using TypeScript to minimise errors during development and self document the code.
- Using Redux Toolkit for state management
- Using Tailwind CSS utility classes for rapid development
