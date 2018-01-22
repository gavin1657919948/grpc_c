const util = require("util");
const config = require("./config.json");
module.exports = function message(id) {
  let temperature;
  let voltage;
  let current;
  let channels;
  let error = "[]";
  let alert = "";
  let arcFault = "";
  temperature = (
    (Math.random() * 30 +
      20 +
      (Math.random() * 30 + 20) +
      (Math.random() * 30 + 20)) /
    3
  ).toFixed(2);
  voltage = (
    (Math.random() * 3 +
      218 +
      (Math.random() * 3 + 218) +
      (Math.random() * 3 + 218)) /
    3
  ).toFixed(2);
  current = (
    (Math.random() * 3 +
      100 +
      (Math.random() * 3 + 100) +
      (Math.random() * 3 + 100)) /
    3
  ).toFixed(2);

  channels =
    '[{ "channel":"1","temperature":' +
    temperature +
    ',"unit":"' +
    ' ℃ "},' +
    '{"channel":"2","voltage":' +
    voltage +
    ',"unit":"' +
    ' V" },' +
    '{"channel":"3","current": ' +
    current +
    ',"unit":"' +
    ' mA" } ]';
  alert += "[";
  if (temperature > config.maxTemperature) {
    alert += '{"channel":"1"' + ',"causedBy":"over Temperature"},';
  }
  if (temperature < config.minTemperature) {
    alert += '{"channel":"1"' + ',"causedBy":"Temperature too low"},';
  }
  if (voltage > config.maxVoltage) {
    alert += '{"channel":"2"' + ',"causedBy":"over Voltage"},';
  }
  if (voltage < config.minVoltage) {
    alert += '{"channel":"2"' + ',"causedBy":"Voltage too low"},';
  }
  if (current > config.maxCurrent) {
    alert += '{"channel":"3"' + ',"causedBy":"over Current"},';
  }
  if (current < config.minCurrent) {
    alert += '{"channel":"3"' + ',"causedBy":"Current too weak"},';
  }
  let index = alert.lastIndexOf(",");
  if (index != -1) alert = alert.substring(0, alert.lastIndexOf(","));
  alert += "]";
  let timer = new Date().toLocaleString();
  let data = {
    sensorId: id,
    reportTime: timer,
    channels: JSON.parse(channels),
    error: JSON.parse(error),
    alert: JSON.parse(alert),
    arcFault: arcFault
  };
  return data;
};
