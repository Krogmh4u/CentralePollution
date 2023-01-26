#include "communication.h"
#include "AirQualitySensor.h"
#include "co2covSensor.h"

#define USING_SOFTWARE_SERIAL //Retirer cette ligne pour debug avec le moniteur série

// CAPTEURS UTILISES
#define AIR_QUALITY_SENSOR

// PINS
#ifdef AIR_QUALITY_SENSOR
  #define AIR_QUALITY_SENSOR_PIN A0
#endif

#ifdef USING_SOFTWARE_SERIAL
  #define TX_PIN 10
  #define RX_PIN 11
  Communication* communication;
#endif 

AQSensor *airQualitySensor;
Co2VocSensor *co2covSensor;

void setup() {
  
  #ifdef USING_SOFTWARE_SERIAL
    communication = new Communication(TX_PIN, RX_PIN, BAUD_RATE);
  #else 
    Serial.begin(BAUD_RATE)
  #endif 
      
  airQualitySensor = new AQSensor(AIR_QUALITY_SENSOR_PIN);
  co2covSensor = new Co2VocSensor();
}

void loop() {
  delay(500);
  #ifdef USING_SOFTWARE_SERIAL
    communication->SendData("airquality", airQualitySensor->getValue());
    communication->SendData("CO2", co2covSensor->GetCO2());
    communication->SendData("COV", co2covSensor->GetCOV());
  #else
    Serial.println("airquality: %d", );
    Serial.println("CO2: %d", co2covSensor->GetCO2());
    Serial.println("COV: %d", co2covSensor->GetCOV());
  #endif
}
