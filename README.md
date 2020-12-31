# Taiwan-Forecast-Map

The atlas is from https://github.com/dkaoster/taiwan-atlas

## Create Database.
```bash
mysql < weather_forecast_tw.sql
```
## Create Two Essential File.
src/SQL/connect.js
```js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: '<YOUR_ACCOUNT>',
    password: '<YOUR_PASSWORD>',
    database: 'weather_forecast_tw',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

module.exports = pool.promise();
```
src/SQL/auth.js  
You should get auth from https://opendata.cwb.gov.tw/index.
```js
const auth = '<YOUR_AUTH>'

module.exports = auth
```
TODO: RWD ControlPanel
    