var grpc = require("grpc");
var booksProto = grpc.load("books.proto");
const _ = require("lodash");

// const url = "35.240.177.194:50051"
const url = "localhost:50051";

var client = new booksProto.books.BookService(
  url,
  grpc.credentials.createInsecure()
);

function printResponse(error, response) {
  if (error) console.log("Error: ", error);
  else console.log(response);
}

const insertAsync = async (id, starter, timers) =>
  new Promise((resolve, reject) => {
    const book = {
      id: id,
      title: `A Book${id}`,
      author: `An Author${id}`,
    };
    client.insert(book, (error, empty) => {
      timers.push(new Date().getTime() - starter);
      resolve({});
    });
  });

const listAsync = async (starter, timers) =>
  new Promise((resolve, reject) => {
    client.list({}, (error, empty) => {
      timers.push(new Date().getTime() - starter);
      resolve({});
    });
  });

const deleteAsync = async (id, starter, timers) =>
  new Promise((resolve, reject) => {
    client.delete({ id }, (error, empty) => {
      timers.push(new Date().getTime() - starter);
      resolve({});
    });
  });

const getAsync = async (id, starter, timers) =>
  new Promise((resolve, reject) => {
    client.get({ id }, (error, empty) => {
      timers.push(new Date().getTime() - starter);
      resolve({});
    });
  });

const numbers = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
const run = async () => {
  console.log("gRPC Benchmarking");
  for (let number of numbers) {
    var timers = [];
    var promises = [];
    for (let i = 0; i < 4096; i++) {
      await deleteAsync(i, 0, []);
    }
    for (var n = 0; n < number; n++) {
      var starter = new Date().getTime();
      switch (n % 5) {
        case 0: {
          promises.push(insertAsync(n, starter, timers));
          break;
        }
        case 1: {
          promises.push(deleteAsync(n, starter, timers));
          break;
        }
        case 3: {
          promises.push(listAsync(starter, timers));
          break;
        }
        case 4: {
          promises.push(getAsync(n, starter, timers));
          break;
        }
      }
    }
    await Promise.all(promises);
    console.log(
      `Iterations #${number}: max time: ${_.max(timers)}ms, min time: ${_.min(
        timers
      )}ms, average time: ${_.mean(timers)}`
    );
  }
};

run();
