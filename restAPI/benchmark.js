const _ = require("lodash");
const axios = require("axios");

const url = "http://127.0.0.1:8080";

const listAsync = async (starter, timers) =>
  new Promise((resolve, reject) => {
    axios
      .get(url + "/book")
      .then((response) => {
        timers.push(new Date().getTime() - starter);
        resolve({});
      })
      .catch(function (error) {
        // console.log(error);
      });
  });

const insertAsync = async (id, starter, timers) =>
  new Promise((resolve, reject) => {
    const book = {
      id: id,
      title: `A Book${id}`,
      author: `An Author${id}`,
    };
    axios
      .post(url + `/book`, book)
      .then((response) => {
        timers.push(new Date().getTime() - starter);
        resolve({});
      })
      .catch(function (error) {
        reject(error);
      });
  });

const deleteAsync = async (id, starter, timers) =>
  new Promise((resolve, reject) => {
    axios
      .delete(url + `/book/${id}`)
      .then((response) => {
        timers.push(new Date().getTime() - starter);
        resolve({});
      })
      .catch(function (error) {
        console.log("delete", error);
        reject(error);
      });
  });

const getAsync = async (id, starter, timers) =>
  new Promise((resolve, reject) => {
    axios
      .get(url + `/book/${id}`)
      .then(function (response) {
        timers.push(new Date().getTime() - starter);
        resolve({});
      })
      .catch(function (error) {
        // console.log(error);
      });
  });
const numbers = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
const run = async () => {
  console.log("REST API Benchmarking");
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
    await Promise.all(promises).catch((err) => {
      console.log(err);
    });
    console.log(
      `Iterations #${number}: max time: ${_.max(timers)}ms, min time: ${_.min(
        timers
      )}ms, average time: ${_.mean(timers)}`
    );
  }
};

run();
