import fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server with students');
});

app.get('/students', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            console.error("File read failed in GET /students:", err);
            return res.status(500).send('File read failed');
        }
        console.log("GET: /students");
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/students/:id', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, studentsJson) => {
        if (err) {
            console.log("File read failed in GET /students/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var students = JSON.parse(studentsJson);
        var student = students.find(studentTmp => studentTmp.studentId == req.params.id);
        if (!student) {
            console.log("Can't find student with id: " + req.params.id);
            res.status(500).send('Cant find student with id: ' + req.params.id);
            return;
        }
        var studentJSON = JSON.stringify(student);
        console.log("GET /students/" + req.params.id);
        res.send(studentJSON);
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));