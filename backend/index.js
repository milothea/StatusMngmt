const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/static', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}, express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());

const employees = [
    {
        id: 1,
        name: 'John Doe',
        status: 'Working',
        img: 'http://localhost:3001/static/1.jpeg',
    },
    {
        id: 2,
        name: 'Sheli Tally',
        status: 'Working',
        img: 'http://localhost:3001/static/2.jpeg',
    },
    {
        id: 3,
        name: 'Jack Wolf',
        status: 'Working',
        img: 'http://localhost:3001/static/3.jpeg',
    },
    {
        id: 4,
        name: 'Eitan Gun',
        status: 'Working',
        img: undefined
    },
    {
        id: 5,
        name: 'Chloe Lory',
        status: 'On vacation',
        img: 'http://localhost:3001/static/5.jpeg',
    },
    {
        id: 6,
        name: 'Sophie L.',
        status: 'Lunch time',
        img: undefined
    },
];

app.get('/users', (req, res) => {
    res.send(employees);
});

app.post('/users', (req, res) => {
    const { searchQuery, status } = req.body;
    const cleanQuery = searchQuery.trim().toLowerCase();
    const filteredEmployees = employees.filter((employee) => {
        let result;

        if (cleanQuery) {
            result = employee.name.toLowerCase().trim().includes(cleanQuery);
        }

        if (status) {
            result = employee.status === status;
        }

        return result;
    });
    res.send(filteredEmployees);
});

app.post('/save-user', (req, res) => {
    const id = employees.length + 1;
    employees.push({
        ...req.body,
        id
    });
    res.send(employees);
});

app.post('/users/:id', (req , res) => {
    const index = employees.findIndex((obj => obj.id === +req.params.id));
    employees[index].status = req.body.status;
    res.send(employees);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});
