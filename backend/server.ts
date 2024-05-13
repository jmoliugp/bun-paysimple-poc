import express, {
  type Request,
  type Response,
  type NextFunction,
  type Express,
} from 'express';
const app: Express = express();

import crypto from 'crypto';
import cors from 'cors';
import request from 'request';

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        message: 'Hurray!! PaySimple POC',
        success: true,
      });
    } catch (error: unknown) {
      next(new Error((error as Error).message));
    }
  }
);

const settings = {
  port: 8080,
  apiv4url: process.env.PAYSIMPLE_API_URL,
  username: process.env.PAYSIMPLE_USERNAME,
  apikey: process.env.PAYSIMPLE_API_KEY,
};

function getAuthHeader() {
  const time = new Date().toISOString();
  const hash = crypto
    .createHmac('SHA256', settings.apikey!)
    .update(time)
    .digest('base64');
  return (
    'PSSERVER ' +
    'accessid=' +
    settings.username +
    '; timestamp=' +
    time +
    '; signature=' +
    hash
  );
}

app.get(
  '/getCheckoutToken',
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
      method: 'POST',
      uri: settings.apiv4url + '/checkouttoken',
      headers: {
        Authorization: getAuthHeader(),
      },
      body: {},
      json: true,
    };

    request(options, function (error, response, body) {
      if (!error && response && response.statusCode < 300) {
        res.json({
          message: 'Successfully fetched checkout token',
          token: body.Response.JwtToken,
        });
        return;
      }

      res.status((response && response.statusCode) || 500).send(error);
    });
  }
);

app.post('/payment', function (req, res) {
  var requestData = req.body;

  let options = {
    method: 'POST',
    uri: settings.apiv4url + '/payment',
    headers: {
      Authorization: getAuthHeader(),
    },
    body: {
      AccountId: requestData.account.id,
      PaymentToken: requestData.paymentToken,
      // Payment Specific information...
      Amount: requestData.amount,
      PurchaseOrderNumber: requestData.pono,
      Description: requestData.description,
      PaymentSubType: 'MOTO',
    },
    json: true,
  };

  request(options, function (error, response, body) {
    // The return code for /payment will be a 201 (CREATED)
    if (!error && response && response.statusCode < 300) {
      res.json(body.Response);
      return;
    }

    res.status((response && response.statusCode) || 500).send(error);
  });
});

app.listen(port, () => {
  console.log(`🚀 ~ Server is up and running on port ${port}`);
});
