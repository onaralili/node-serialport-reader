'use strict';
var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var inquirer = require('inquirer');

var listofports = [];
SerialPort.list(function (e, ports) {
  // prepare list for user interaction
  let serialPortChoices = {};
  serialPortChoices.type = 'list';
  serialPortChoices.message = 'Choose serial port you would like to connect:'
  serialPortChoices.name = "theme";
  let listOfdevices = [];
  ports.forEach(element => {
    listOfdevices.push(element.comName);
  });
  serialPortChoices.choices = listOfdevices
  listofports.push(serialPortChoices);
  // Location: 41.894750,12.502400  Date/Time: 6/1/2080 00:00:11.80

  // generate questionarie
  inquirer.prompt(listofports)
  .then(answer => {
    // let serialport = JSON.stringify(answer.theme);
    console.log(answer.theme)
    openPortAndOutputData(answer.theme);
  })
})

function openPortAndOutputData(serialport){
  var port = new SerialPort(serialport, {
    baudRate: 9600
  }, function (err) {
    if (err) {
      return console.log('Error: ', err.message)
    }
  });
  
  var parser = new Readline()
  port.pipe(parser)
  parser.on('data', function (data) {
    console.log('data received: ' + data)
    // data handling 
  })
};
// console.log(serialport);
