// DISASTERMESH - FULL ESP32 CODES
// Includes:
// 1. Mesh Node Code (Node A / Node B)
// 2. Gateway Node Code (LoRa -> WiFi -> Backend)
// Hardware:
// ESP32 DevKit v1
// SX1278 LoRa RA-02 (433 MHz)
// ==========================================================



// ==========================================================
// PART 1: STANDARD MESH NODE CODE
// Flash this to Node A and Node B
// Change NODE_ID for each board
// ==========================================================

#include <SPI.h>
#include <LoRa.h>

#define SS 5
#define RST 4
#define DIO0 2

#define LED_PIN 25

String NODE_ID = "NODE_A";   // Change to NODE_B for second node

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);

  LoRa.setPins(SS, RST, DIO0);

  Serial.println("Starting LoRa Node...");

  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (true);
  }

  Serial.println("LoRa Started");
}

void loop() {

  // Send demo message every 10 sec
  static unsigned long lastSend = 0;

  if (millis() - lastSend > 10000) {
    lastSend = millis();

    String msg = NODE_ID + "|SOS|13.0827,80.2707|Need Help";

    LoRa.beginPacket();
    LoRa.print(msg);
    LoRa.endPacket();

    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);

    Serial.println("Sent: " + msg);
  }

  // Receive packets
  int packetSize = LoRa.parsePacket();

  if (packetSize) {
    String incoming = "";

    while (LoRa.available()) {
      incoming += (char)LoRa.read();
    }

    Serial.println("Received: " + incoming);

    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
  }
}




// ==========================================================
// PART 2: GATEWAY NODE CODE
// Flash this to third ESP32
// Receives LoRa and forwards to backend
// ==========================================================

#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SS 5
#define RST 4
#define DIO0 2

#define LED_PIN 25

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

String backendURL = "http://192.168.1.100:3000/api/message";

void connectWiFi() {
  WiFi.begin(ssid, password);

  Serial.print("Connecting WiFi");

  unsigned long start = millis();

  while (WiFi.status() != WL_CONNECTED && millis() - start < 10000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi Failed");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);

  connectWiFi();

  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (true);
  }

  Serial.println("Gateway Ready");
}

void sendToBackend(String payload) {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("No WiFi. Mesh-only mode.");
    return;
  }

  HTTPClient http;
  http.begin(backendURL);
  http.addHeader("Content-Type", "application/json");

  String json =
    "{"
    "\"nodeId\":\"GATEWAY\","
    "\"type\":\"SOS\","
    "\"message\":\"" + payload + "\""
    "}";

  int code = http.POST(json);

  Serial.print("HTTP Response: ");
  Serial.println(code);

  http.end();
}

void loop() {

  int packetSize = LoRa.parsePacket();

  if (packetSize) {
    String incoming = "";

    while (LoRa.available()) {
      incoming += (char)LoRa.read();
    }

    Serial.println("Received via LoRa:");
    Serial.println(incoming);

    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);

    sendToBackend(incoming);
  }

  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }
}




// ==========================================================
// PART 3: OPTIONAL MANUAL SOS BUTTON NODE
// Press button -> sends emergency instantly
// ==========================================================

#include <SPI.h>
#include <LoRa.h>

#define SS 5
#define RST 4
#define DIO0 2

#define BUTTON_PIN 14
#define LED_PIN 25

void setup() {
  Serial.begin(115200);

  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);

  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(433E6)) {
    while (true);
  }

  Serial.println("SOS Button Node Ready");
}

void loop() {

  if (digitalRead(BUTTON_PIN) == LOW) {

    String msg = "BUTTON_NODE|SOS|13.0827,80.2707|Emergency";

    LoRa.beginPacket();
    LoRa.print(msg);
    LoRa.endPacket();

    digitalWrite(LED_PIN, HIGH);
    delay(300);
    digitalWrite(LED_PIN, LOW);

    Serial.println("SOS Sent");

    delay(1000);
  }
}
