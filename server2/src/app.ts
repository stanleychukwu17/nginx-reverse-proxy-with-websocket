import express, { Request, Response } from 'express';

const app = express();
const port = 3000;


// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript!');
});

// A simple POST route
app.post('/data', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ received: data });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});