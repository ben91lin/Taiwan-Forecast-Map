const express = require('express');
const app = express();
const promisePool = require(`${__dirname}/SQL/connect`);
const parseQuery = require(`${__dirname}/parseQuery`)


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/query/queryString/:table/:geocode/:time', async function(req, res, next) {
    const {table, geocode, time} = req.params
    const tables = ['counties48', 'counties168', 'towns48', 'towns168']
    if (tables.includes(table)) {
        next()
    }

    try {
        let geocodeType = table.includes('county') ? 'countycode' : 'towncode'
        let geocodes = parseQuery(geocode).decode().toSQL().output()
        let sql = `SELECT ${queryString} FROM ${table} WHERE ${geocodeType} in ? && startTime = ?`
        let [[forecast]] = await promisePool.query(sql, [geocodes, time])

        return res.json(
            {
                forecast: forecast,
            }
        )
    } catch(err) {
        throw err
    }
})
    

app.post('/query/:table/:geocode/:time', async function(req, res) {
    const {table, geocode, time} = req.params
    const tables = ['counties48pop12h', 'counties168pop12h', 'towns48pop12h', 'towns168pop12h']
    if (tables.includes(table)) {
        next()
    }

    try {
        let geocodeType = table.includes('county') ? 'countycode' : 'towncode'
        let geocodes = parseQuery(geocode).decode().toSQL().output()
        let sql = `SELECT * FROM ${table} WHERE ${geocodeType} in ? && startTime = ?`
        let [[pop12h]] = await promisePool.query(sql, [geocodes, time])

        return res.json(
            {
                pop12h: pop12h,
            }
        )
    } catch(err) {
        throw err
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