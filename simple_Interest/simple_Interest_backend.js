const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', function (req, res) {
    const p = req.query.p;
    const r = req.query.r;
    const t = req.query.t;

    // let pn = parseFloat(req.query.p);
    // let tn = parseFloat(req.query.t);
    // let rn = parseFloat(req.query.r);
    // let si = pn * rn * tn / 100;
    let si = p * r * t / 100;

    res.json(si);
})

app.listen(3000);