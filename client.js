"use strict";
const message = require("./simulate.js");
const util = require("util");
const grpc = require("grpc");
const proto = grpc.load(`${__dirname}/./sample.proto`);
const client = new proto.Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
setInterval(function() {
  let dataArr = [];
  for (let i = 1; i < 51; i++) {
    let sensorId = "sensor" + i;
    dataArr.push(message(sensorId));
  }
  console.log(dataArr);
  const req = {
    data: JSON.stringify(dataArr)
  };
  client.sayHello(req, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log(res);
  });
}, 4000);
