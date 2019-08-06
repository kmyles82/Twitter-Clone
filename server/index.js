const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
//add body-parser middleware
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({
        message: 'Meow 🐈'
    });
});

function isValidMeow(meow) {
    return meow.name && meow.name.toString().trim() !== '' && meow.content && meow.content.toString().trim() !== '';
}

app.post('/meows', (req, res, next) => {
    if (isValidMeow(req.body)) {
        //insert in db...
        const meow = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        }

    } else {
        res.status(422);
        res.json({
            message: 'Name and Content is required'
        })
    }
})

app.listen(5000, () => {
    console.log('listening on http://localhost:5000')
});