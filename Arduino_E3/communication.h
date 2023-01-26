class Communication : public SoftwareSerial
{
  public :

  Communication(const int TX_PIN, const int RX_PIN, const int BAUD_RATE = 9600) :
    SoftwareSerial(RX_PIN, TX_PIN), 
    TX_Pin(TX_PIN), RX_Pin(RX_PIN), BaudRate(BAUD_RATE)
    {
      begin(BaudRate);
    }

    template<typename T> inline void SendData(const String name, T data) const noexcept
    {
      Serial.println(name + ":" + String(data));
    }

  private : 

  int TX_Pin, RX_Pin;
  int BaudRate;
};
