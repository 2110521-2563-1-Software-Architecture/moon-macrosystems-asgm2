const { spawn } = require("child_process");

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var interface = process.argv.shift();
var command = process.argv.shift();

var restapiClient = require("./restAPI/client.js");
console.log(interface);
switch (interface) {
  case "grpc": {
    ls = spawn("node", ["client.js", command].concat(process.argv), {
      cwd: "./grpc",
    });
    ls.stdout.on("data", (data) => {
      console.log(`${data}`);
    });
    return;
  }
  case "restapi": {
    if (command == "list") restapiClient.listBooks();
    else if (command == "insert")
      restapiClient.insertBook(
        process.argv[0],
        process.argv[1],
        process.argv[2]
      );
    else if (command == "get") restapiClient.getBook(process.argv[0]);
    else if (command == "delete") restapiClient.deleteBook(process.argv[0]);
    return;
  }
}
ls.stdout.on("data", (data) => {
  console.log(`${data}`);
});
