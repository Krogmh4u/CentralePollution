#include <WString.h>
#include <Arduino.h>

#include "sensirion_common.h"
#include "sgp30.h"

class Co2VocSensor 
{
  public :

  Co2VocSensor() : err(0)
  {
    s16 err;
    u32 ah = 0;
    

    while (sgp_probe() != STATUS_OK) {
        Serial.println("error:SGPFAILED");
        while (1);
    }

    err = sgp_measure_signals_blocking_read(&this->scaled_ethanol_signal,
                                            &this->scaled_h2_signal);

    // IMPLEMENTER HUMIDITE
    
    sgp_set_absolute_humidity(50000);
    err = sgp_iaq_init();
  }

  int GetCO2()
  {
    this->measure();
    return (int)this->co2_eq_ppm;
  }

  int GetCOV()
  {
    this->measure();
    return (int)this->tvoc_ppb;
  }

  s16 GetLastError() const
  {
    return this->err;
  }

  private :

  void measure()
  {
    this->err = sgp_measure_iaq_blocking_read(&this->tvoc_ppb, &this->co2_eq_ppm);
  }


  u16 scaled_ethanol_signal, scaled_h2_signal;
  s16 err;
  u16 tvoc_ppb, co2_eq_ppm;
};
