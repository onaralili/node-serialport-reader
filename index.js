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
  serialPortChoices.name = "serialport";
  let listOfdevices = [];
  ports.forEach(element => {
    listOfdevices.push(element.comName);
  });
  serialPortChoices.choices = listOfdevices
  listofports.push(serialPortChoices);

  // generate interaction
  inquirer.prompt(listofports)
  .then(answer => {
    openPortAndOutputData(answer.serialport);
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
