// import express and use it
import express from 'express';
import os from "os"


const app = express();
const hostname = os.hostname
const port = 9000

app.get('/', (req, res) => {
    res.send(`Hello world ${hostname}`);
});

app.listen(port, () => {
    console.log(`Example app with: ${hostname}, listening on port ${port}!`);
});