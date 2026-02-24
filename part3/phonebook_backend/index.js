require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/phonebook");

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
// add morgan
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // hasError(body, response);

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPhonebook) => response.json(savedPhonebook));
});

app.get("/api/persons", (request, response) => {
  console.log("response", response);
  Person.find({}).then((result) => response.json(result));
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`,
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = findPerson(id, response);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  findPerson(id, response);
  const filteredPersons = persons.filter((person) => person.id !== id);
  response.json(filteredPersons);
});

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000);
};

const hasError = (body, response) => {
  if (!body.name || !body.number)
    return response
      .status(401)
      .json({ message: "name or number is missing" })
      .end();
  const person = persons.find((person) => person.name === body.name);
  if (person)
    return response.status(401).json({ message: "already exists" }).end();
};

const findPerson = (id, response) => {
  const person = persons.find((person) => person.id === id);

  if (!person) return response.status(404).end();
  return person;
};

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
