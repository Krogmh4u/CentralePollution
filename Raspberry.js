const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

var mysql = require('mysql');
const { validateHeaderName } = require('http');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "centralepollution"
});

con.connect(function(err) {
if (err) throw err;
console.log("[+] Connected to database");
});


const comPort1 = new SerialPort({
    path: 'COM4',
    parser: new ReadlineParser('\n'),
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
});

function SendData(type, value)
{
    let sql = "INSERT INTO mesures (Capteur, Mesure) VALUES('" + type.toString() + "', '" + value.toString() + "')";
    con.query(sql, function (err, result) {
        if (err) console.log("[-] " + err);
    });
}

comPort1.on('data', data => readSerialData(data.toString()));


//enum statements
const BEGIN_NAME = 0;
const END_NAME = 1;
const BEGIN_VALUE = 2;
const END_VALUE = 3;
const UNKNOWN_STMT = 4;

var currentDataName = "";
var currentDataValueStr = "";

var currentStatement = UNKNOWN_STMT;

function readSerialData(data) {
    for (var i = 0; i < data.toString().length; i++) {
        switch(data[i]){
            case '{' : currentStatement = BEGIN_NAME; break;
            case '}' : currentStatement = END_NAME; break;
            case '[' : currentStatement = BEGIN_VALUE; break;
            case ']' : currentStatement = END_VALUE; break;
            default : 
                if(currentStatement == BEGIN_NAME) currentDataName+= data[i];
                else if(currentStatement == BEGIN_VALUE) currentDataValueStr += data[i];
                else if(currentStatement == END_VALUE){
                    SendData(currentDataName, number(currentDataValueStr));
                    currentDataName = "";
                    currentDataValueStr ="";
                }
            break;
        }
    }
}
