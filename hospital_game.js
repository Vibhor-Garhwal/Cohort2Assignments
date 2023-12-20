const express = require('express');
const app = express();
app.use(express.json());
let users = [{
    name: 'John',
    kidneys: [{
        healthy: true
    }, {
        healthy: true
    }]
}]

//get-check how many kidneys are there and their health
app.get('/', function (req, res) {
    // let kidneys_number = users[0].kidneys.length;
    // let healthy_kidneys = 0;
    // for (let user of users) {
    //     for (let kidney of user.kidneys) {
    //         if (kidney.healthy) {
    //             healthy_kidneys++;
    //         }
    //     }
    // }
    // res.send(`you have ${kidneys_number} kidneys with you out of which ${healthy_kidneys} are healthy`);
    let john_kidneys = users[0].kidneys;
    let total_kidneys = john_kidneys.length;
    let healthy_kidneys = 0;

    for (let kidney of john_kidneys) {
        if (kidney.healthy) {
            healthy_kidneys++;
        }
    }
    
    res.json({
        total_kidneys,
        healthy_kidneys
    })
});

//post - add a new kidney
app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done"
    });
});

//put - replace all kidneys, make them healthy
app.put('/', function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.send("Kidneys updated");
});

//delete - remove all the unhealthy kidneys
app.delete('/', function (req, res) {

    //what if there are no unhealthy kidneys
    let unhealthy_kidneys_count = 0;
    for (i = 0; i < users[0].kidneys.length; i++)
    {
        if (!users[0].kidneys[i].healthy) {
            unhealthy_kidneys_count++;
        }

    }

    if (unhealthy_kidneys_count == 0) {
        res.sendStatus(411);
    }
    else {
        let healthy_kidneys_count = 0;
    for (i = 0; i < users[0].kidneys.length; i++)
    {
        if (users[0].kidneys[i].healthy) {
            healthy_kidneys_count++;
        }

    }
    users[0].kidneys.length = 0;
    for (i = 0; i < healthy_kidneys_count; i++){
        users[0].kidneys.push({
            healthy: true
        });
    }
    res.send("You have all the bad kidneys removed");
    }
});



app.listen(3000);