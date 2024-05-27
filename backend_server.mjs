
import  mysql  from 'mysql2/promise';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

let env = process.env;
  
   // Create a connection to the database
const connection = await mysql.createConnection({
    host: env.DBHOST,
    user: env.DBUSER,
    password: env.DBPASSWORD,
    database: env.DBDATABASE
});

const checkEmailAccess = async (email) => {
    try {
        const [results] = await connection.execute(
            `SELECT * FROM mail_user WHERE email = ?`,
            [email]
        );

        if (results.length === 0) {
            return "false";
        } else {
            return "EMAIL:" + results[0].email;
        }
    } catch (error) {
        return "error: " + error.message;
    }
}
const app = express();
const port = 3000;
const getOptions = (bearer, GET)=>{
    let options;
    if(type.includes('get')) {
      options = {
        method: 'GET',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
        }
      };
    }
    else {
      options = {
        method: 'POST',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
        },
        body: customer
      };
  
    }
    return options;
  };

  const options = {
    method: 'GET',
    headers: {
      'Authorization': env.bearer,
      'Content-Type': 'application/json'
    },
    body: 'false'
  };
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.post('/test', async (req, res) => {
    const body = req.body;
      console.log({body})
      res.send('OK');
  });

const server = app.listen(port, () => console.log(`Server is running:  ${port}!`));
console.log('Server started with variables:');
console.log({env})
console.log('process.env.emailbearer', process.env.emailbearer);
export default server;
