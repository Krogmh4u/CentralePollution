#include <Air_Quality_Sensor.h>
#include <WString.h>

#include"Arduino.h"

class AQSensor : public AirQualitySensor
{
  public :
    AQSensor(const int pin) : AirQualitySensor(pin), current_quality(-1)
    {
      this->pin = pin;
      this->init();
    }

    int getValue()
    {
      this->current_quality = this->slope();
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
    int pin;
    int current_quality;
};
