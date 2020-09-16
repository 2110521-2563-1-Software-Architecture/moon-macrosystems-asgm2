const bodyParser = require("body-parser");
var path = require("path");

const express = require("express");
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var docs_handler = express.static(path.join(__dirname, "../docs"));
app.use("/docs", docs_handler);
console.log(path.join(__dirname, "../docs"));
// In-memory array of book objects
var books = [
  {
    id: 123,
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
  },
];

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

/**
 * List all books in the store
 */
app.get("/book", (req, res) => {
  res.send(books);
});

/**
 * Find book by id
 */
app.get("/book/:id", (req, res) => {
  res.json(books.find((book) => book.id === parseInt(req.params.id)));
});

/**
 * Insert a book
 */
app.post("/book", (req, res) => {
  books.push(req.body);
  res.status(201).json(req.body);
});

/**
 * Insert books
 */
app.post("/books", (req, res) => {
  for (const book of req.body) {
    books.push(book);
  }
  res.status(201).json(req.body);
});

/**
 * Insert a book
 */
app.delete("/book/:id", (req, res) => {
  const deletedIndex = books.findIndex((book) => book.id === req.params.id);
  books.splice(deletedIndex, 1);
  res.status(204).send();
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(`documents started at http://localhost:${port}/docs`);
});
