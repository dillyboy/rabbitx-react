import axios from 'axios';
import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import appConstants from './appConstants.js';

const app: Application = express();
const port: number = 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.get('/listings', async (req: Request, res: Response) => {
  try {
    let convert = req.query.convert;
    if (!convert) {
      res.status(400).send({message: "plese send a currency"});
    }
    
    const response = await axios.get(`${appConstants.URL}/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${appConstants.API_KEY}&convert=${convert}`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(400).send({err});
  }
});

app.listen(port, () => {
  console.log(`Connect to port ${port}`)
})