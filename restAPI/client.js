const axios = require("axios");

url = "http://35.240.177.194:8080";

function listBook() {
  return axios
    .get(url + "/book")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addBook(id, title, author) {
  return axios
    .post(url + `/book`, {
      id: parseInt(id),
      title,
      author,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getBook(id) {
  return axios
    .get(url + `/book/${id}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteBook(id) {
  return axios
    .delete(url + `/book/${id}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

require("yargs")
  .scriptName("pirate-parser")
  .usage("$0 <cmd> [args]")
  .command(
    "hello [name]",
    "welcome ter yargs!",
    (yargs) => {
      yargs.positional("name", {
        type: "string",
        default: "Cambi",
        describe: "the name to say hello to",
      });
    },
    function (argv) {
      console.log("hello", argv.name, "welcome to yargs!");
    }
  )
  .command("listBook", "", (yargs) => {}, listBook)
  .command(
    "getBook [id]",
    "get book by Id",
    (yargs) => {
      yargs.positional("id", {
        type: "number",
        default: 0,
        describe: "book id to find on the server",
      });
    },
    (argv) => getBook(argv.id)
  )
  .command(
    "addBook [id] [title] [author]",
    "Add a book to the store",
    (yargs) => {
      yargs.positional("id", {
        type: "number",
        default: 0,
        describe: "id of the book",
      });
      yargs.positional("title", {
        type: "string",
        default: "A Tale of Two Cities",
        describe: "Title of the book",
      });
      yargs.positional("author", {
        type: "string",
        default: "Charles Dickens",
        describe: "Author of the book",
      });
    },
    (argv) => addBook(argv.id, argv.title, argv.author)
  )
  .command(
    "deleteBook [id]",
    "delete book by Id",
    (yargs) => {
      yargs.positional("id", {
        type: "number",
        default: 0,
        describe: "book id to be deleted on the server",
      });
    },
    (argv) => {
      deleteBook(argv.id);
    }
  )
  .help().argv;

module.exports = {
  listBooks: listBook,
  insertBook: addBook,
  getBook,
  deleteBook,
};
