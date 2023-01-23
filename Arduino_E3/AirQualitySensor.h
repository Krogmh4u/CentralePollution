#include <Air_Quality_Sensor.h>
#include <WString.h>

#include"Arduino.h"

class AQSensor
{
  public :
    AQSensor(const int pin) : current_quality(-1)
    {
      this->m_sensor = new AirQualitySensor(pin);
      this->m_sensor->init();
    }

    int getValue()
    {
      this->current_quality = this->m_sensor->slope();
      return current_quality;
    }

    String getQuality()
    {
      switch(this->current_quality)
      {
        case 0 :  return "High pollution! Force signal active"; break;
        case 1 :  return "High pollution!"; break;
        case 2 :  return "Low pollution!"; break;
        case 3 :  return "Fresh air"; break;
      }
    }
    

  private : 
    AirQualitySensor* m_sensor;
    int current_quality;
};
