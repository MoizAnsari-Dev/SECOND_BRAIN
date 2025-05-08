import express from 'express';
import mongooe from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();

app.post('/user/signup', (req, res) => {
    try {
        res.send('Comming from signup')
    } catch (error) {
        res.status(400).send("Error: " + error)
    }
})
app.post('/user/login', (req, res) => {
    try {
        res.send('Comming from login')
    } catch (error) {
        res.status(400).send("Error: " + error)
    }
})
app.get('/user/contain', (req, res) => {
    try {
        res.send('Comming from Contains')
    } catch (error) {
        res.status(400).send("Error: " + error)
    }
})
app.delete('/user/containdelete', (req, res) => {
    try {
        res.send('Comming from delete Contains')
    } catch (error) {
        res.status(400).send("Error: " + error)
    }
})


app.listen(3000, () => {
    console.log("Server is Live");
})