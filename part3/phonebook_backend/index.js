require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/phonebook");

app.use(express.json());
// add morgan
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint

// middlewares
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    response.status(404).json({ message: "malformatted id" }).end();
  }
  next(error);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // hasError(body, response);
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPhonebook) => response.json(savedPhonebook));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;
  Person.findById(id).then((result) => {
    if (!result) return response.status(404).end();

    result.name = name;
    result.number = number;
    result.save().then((updatedPerson) => response.json(updatedPerson));
  });
});

app.get("/api/persons", (request, response) => {
  console.log("response", response);
  Person.find({}).then((result) => response.json(result));
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`,
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(200).json(result).end();
    })
    .catch((error) => next(error));
});
app.use(unknownEndpoint);

app.use(errorHandler);

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000);
};

const hasError = (body, response) => {
  if (!body.name || !body.number)
    return response
      .status(401)
      .json({ message: "name or number is missing" })
      .end();
};
const updateUserNumber = (body, response) => {
  return Person.find({
    name: body.name,
  }).then((result) => console.log("result", result));
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
