# Taiwan-Forcast-Map

USE MySQL.

```bash
mysql < weather_forecast_tw.sql
```

Create Two Essential File.

1. src/SQL/connect.js
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
2. src/SQL/auth.js
   You should get auth from https://opendata.cwb.gov.tw/index.
```js
const auth = '<YOUR_AUTH>'

module.exports = auth
```

    