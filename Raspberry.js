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

var AirQuality = 0;
var CO2 = 0;
var COV = 0;
var Temp = 0;

const comPort1 = new SerialPort({
    path: 'COM4',
    parser: new ReadlineParser('\n'),
    baudRate: 230400,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
});

function SendData(type, value)
{
    let valuestr = '';
    for (var i = 0; i < value.toString().length; i++) {
        if(value[i] != '\n' && value[i] != '\r' && value[i] != '\n\r')
          valuestr+= value[i];
    }
    let sql = "INSERT INTO mesures (Capteur, Mesure) VALUES('" + type.toString() + "', '" + valuestr + "')";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) console.log("[-] " + err);
    });
}

comPort1.on('data', data => readSerialData(data.toString()));

function readSerialData(data) {
    data.replace(/(\r\n|\n|\r)/gm, "");
    if (data.indexOf(':') > -1)
    {
        var splitData = data.toString().split(":");
        if(splitData.length == 2)
        {
            switch(splitData[0])
            {
                case 'airquality' :
                    if(Number(splitData[1].toString()) >= 0 && Number(splitData[1].toString()) <= 3){
                        AirQuality = Number(splitData[1].toString());
                        SendData(splitData[0], splitData[1]);
                    }
                    break;
                case 'CO2':
                    if(Number(splitData[1].toString()) >= 0 && Number(splitData[1].toString()) <= 20000){
                        CO2 = Number(splitData[1].toString());
                        SendData(splitData[0], splitData[1]);
                    }
                    break;
                case 'COV':
                    if(Number(splitData[1].toString()) >= 0.0 && Number(splitData[1].toString()) <= 50.0){
                        COV = parseFloat(splitData[1].toString());
                        SendData(splitData[0], splitData[1]);
                    }
                    break;
                case 'temperature':
                    if(parseFloat(splitData[1].toString()) >= 0.0 && parseFloat(splitData[1].toString()) <= 50.0){
                        Temp = parseFloat(splitData[1].toString());
                        SendData(splitData[0], splitData[1]);
                    }
                    break;
            }
        } 
    } 

    /*console.log("Air Quality : " + AirQuality.toString());
    console.log("CO2 : " + CO2.toString() + "ppm");
    console.log("COV : " + COV.toString() + "ppb");
    console.log("Temperature : " + Temp.toString() + "°C");
    console.log("====================================");
   */
}