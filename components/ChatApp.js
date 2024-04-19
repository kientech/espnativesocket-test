import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import WebSocket from "react-native-websocket";

const SERVER_URL = "ws://192.168.1.3:8080";

const App = () => {
  const [serverResponse, setServerResponse] = useState(
    "Waiting for server response..."
  );
  const [messageToSend, setMessageToSend] = useState("");

  const handleOnMessage = (message) => {
    setServerResponse(message.data);
  };

  const handleOnError = (error) => {
    console.error("WebSocket error:", error.nativeEvent.description);
  };

  const handleSendMessage = () => {
    if (websocket) {
      websocket.send("on");
    }
  };

  let websocket;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Server response: {serverResponse}</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Button onPress={handleSendMessage} title="Send Message" />
      </View>
      <WebSocket
        ref={(ref) => (websocket = ref)}
        url={SERVER_URL}
        onMessage={handleOnMessage}
        onError={handleOnError}
      />
    </View>
  );
};

export default App;
