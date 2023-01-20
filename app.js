const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bodyParserJson = bodyParser.json();
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/phoneBook');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{versionKey: false})
const contact = mongoose.model('contacts', contactSchema);

app.use(bodyParserJson);
app.use(express.static('assets'));

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/assets/contacts.html')
})

app.get('/contacts',(req,res) => {
    contact.find().then(data => res.send(data));
})

// add book
app.post('/contacts', (req,res) => {
    contact.create(req.body)
    .then(data => res.send(data));
})

// delete book
app.delete('/contacts/:id', (req,res) => {
    contact.deleteOne({_id: ObjectId(req.params.id)}).then(data => res.send(data));
})

// search book
app.get('/contacts/:search', (req,res) => {
    let searchValue = req.params.search;
    contact.find().or({name: searchValue},{phone: searchValue})
    .then(data => res.send(data));
})

// update book
app.put('/contacts', (req,res) => {
    contact.updateOne(
        {_id: ObjectId(req.body._id)},
        {$set: {name:req.body.name, phone:req.body.phone}}
    )
    .then(data => res.send(data));
})

const port = process.env.port || 3000;
app.listen(port);