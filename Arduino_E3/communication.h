#include <WString.h>
#include <Arduino.h>
#include <HardwareSerial.h>

class Communication 
{
  public :
    template<typename T> inline void SendData(const String name, T data) const noexcept
    {
      Serial.println("{" + name + "}" + "[" + String(data) + "]");
    }
};
