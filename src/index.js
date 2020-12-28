const express = require('express');
const app = express();
const promisePool = require(`${__dirname}/SQL/connect`);
// const parseQuery = require(`${__dirname}/modules/parseQuery`)


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/query/:table', async function(req, res, next) {
    const {table} = req.params
    const tables = ['counties48', 'counties168', 'towns48', 'towns168', 'counties48pop12h', 'counties168pop12h', 'towns48pop12h', 'towns168pop12h']
    if (!tables.includes(table)) {
        next()
    }

    const {geocodes, datetime, queryString} = req.body
    const geocodeType = table.includes('counties') ? 'countyCode' : 'townCode'
    const sql = `SELECT ${queryString} FROM ${table} WHERE ${geocodeType} IN (?) && startTime = ?`

    if (table.includes('pop')) {
        try {
            let [pop12h, _] = await promisePool.query(sql, [geocodes, datetime])
    
            return res.json({ pop12h: pop12h })
        } catch(err) {
            throw err
        }
    } else {
        try {
            let [forecast, _] = await promisePool.query(sql, [geocodes, time])

            return res.json({ forecast: forecast })
        } catch(err) {
            throw err
        }
    }
})

app.use(express.static('public'));
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 Not Found.');
});

app.listen(8001, function() {
    console.log('Start listen sever port 8001.');
})