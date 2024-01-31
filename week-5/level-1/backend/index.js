const express = require("express");

const { card } = require('./db');
const { cardSchema } = require('./zodfile');


const app = express();
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(cors());

app.post('/home', async (req, res)=>{
    //in the body all the details have arrived
    const payload = req.body;
    const safePayload = cardSchema.safeParse(payload);
    // console.log(payload);
    // console.log(safePayload);
    if (!safePayload.success) {
        res.status(411).json({
            msg:"Wrong input Send"
        })
        return;
    }
    //put in the Mongo db
    let c = await card.create({
        title: payload.title,
        sd: payload.sd,
        interests: payload.interests,
        linkedIn: payload.linkedIn,
        twitter:payload.twitter
    })
    // console.log(c);
    res.json({
        msg:"Posted Successfully"
    })
})

app.get('/cards', async (req, res) => {
    try {
        // console.log(req.body);
        const cards = await card.find();
        res.json({ cards });
      } catch (error) {
        // console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

app.listen(3000);