#include "communication.h"
#include "AirQualitySensor.h"
#include "co2covSensor.h"

// CAPTEURS UTILISES
#define AIR_QUALITY_SENSOR

// PINS

#ifdef AIR_QUALITY_SENSOR
#define AIR_QUALITY_SENSOR_PIN A0
#endif

Com *server;
AQSensor *airQualitySensor;
Co2VocSensor *co2covSensor;

void setup() {
  Serial.begin(230400);
  server = new Com();
  airQualitySensor = new AQSensor(AIR_QUALITY_SENSOR_PIN);
  co2covSensor = new Co2VocSensor();
}

void loop() {
  delay(500);
  server->SendData("airquality", airQualitySensor->getValue());
  server->SendData("CO2", co2covSensor->GetCO2());
  server->SendData("COV", co2covSensor->GetCOV());
}
