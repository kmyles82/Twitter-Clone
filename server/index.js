const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();
//connect to meow database
const db = monk('localhost/meow');
//creating database
const meows = db.get('meows');



app.use(cors());
//add body-parser middleware
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({
        message: 'Meow 🐈'
    });
});

//validate fields are not empty
function isValidMeow(meow) {
    return meow.name && meow.name.toString().trim() !== '' && meow.content && meow.content.toString().trim() !== '';
}

//listening for client sending a POST request to /meows
app.post('/meows', (req, res, next) => {
    if (isValidMeow(req.body)) {
        //insert in db...
        const meow = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        }
        //insert into database
        meows.insert(meow)
            .then(createdMeow => {
                //response back the client with what was just inserted in db
                res.json(createdMeow)
            })

    } else {
        res.status(422);
        res.json({
            message: 'Name and Content is required'
        })
    }
})

//get all meows from database
app.get('/meows', (req, res, next) => {
    meows.find()
        .then(meows => {
        res.json(meows)
    })
})



app.listen(5000, () => {
    console.log('listening on http://localhost:5000')
});