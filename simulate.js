const util = require("util");
module.exports = function message(id) {
  let temperature;
  let voltage;
  let current;
  let message;
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

  message =
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
  if (temperature > 20.8) {
    alert += '{"channel":"1"' + ',"causedBy":"over Temperature"},';
  }
  if (temperature < 20.2) {
    alert += '{"channel":"1"' + ',"causedBy":"Temperature too low"},';
  }
  if (voltage > 20.8) {
    alert += '{"channel":"2"' + ',"causedBy":"over Voltage"},';
  }
  if (voltage < 218.2) {
    alert += '{"channel":"2"' + ',"causedBy":"Voltage too low"},';
  }
  if (current > 102.8) {
    alert += '{"channel":"3"' + ',"causedBy":"over Current"},';
  }
  if (current < 100.2) {
    alert += '{"channel":"3"' + ',"causedBy":"Current too weak"},';
  }
  let index = alert.lastIndexOf(",");
  if (index != -1) alert = alert.substring(0, alert.lastIndexOf(","));
  alert += "]";
  let timer = new Date().toLocaleString();
  let data = {
    sensorId: id,
    reportTime: timer,
    message: JSON.parse(message),
    error: JSON.parse(error),
    alert: JSON.parse(alert),
    arcFault: arcFault
  };
  return data;
};
