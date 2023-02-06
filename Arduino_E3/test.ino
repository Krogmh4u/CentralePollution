#include "communication.h"
#include "AirQualitySensor.h"
#include "co2covSensor.h"

// CAPTEURS UTILISES
#define AIR_QUALITY_SENSOR

// PINS
#ifdef AIR_QUALITY_SENSOR
  #define AIR_QUALITY_SENSOR_PIN A0
#endif

#define BAUD_RATE 9600
  
Communication* communication;
AQSensor *airQualitySensor;
Co2VocSensor *co2covSensor;

void setup() {
    Serial.begin(BAUD_RATE);
    communication = new Communication();
      
    airQualitySensor = new AQSensor(AIR_QUALITY_SENSOR_PIN);
    co2covSensor = new Co2VocSensor();
}

void loop() {
  delay(500);
  
  communication->SendData("airquality", airQualitySensor->getValue());
  communication->SendData("CO2", co2covSensor->GetCO2());
  communication->SendData("COV", co2covSensor->GetCOV());
}
