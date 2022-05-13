import './App.css';
import React, { useState, Fragment } from 'react';
import mqtt from 'mqtt/dist/mqtt' 
import Speedometer from "./speedometer";

var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'b0908853nivu' 	
};
// var client  = mqtt.connect('mqtt://broker.hivemq.com:8000/mqtt', options);
let client = mqtt.connect('mqtt://test.mosquitto.org:8081', options) // create a client


// preciouschicken.com is the MQTT topic
client.subscribe('nivukgx');
client.setMaxListeners(1);

function App() {
  var note;
  
  // Sets default React state 
  const [mesg, setMesg] = useState(null);
  const [data, setData] = useState({'nivu':34});

  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note);
    const jsonNote = JSON.parse(note);
    // client.end();
    let oldData= {...data};
    console.log(oldData);
    oldData[Object.keys(jsonNote)[0]] = Object.values(jsonNote)[0];
    console.log(Object.keys(jsonNote)[0], Object.values(jsonNote)[0]);
    setData(oldData);
    });


  const sidebar = (
    <ul>
      {Object.keys(data).map((key) =>
        <li key={key}>
          key: {key}, value: {data[key]}
        </li>
      )}
    </ul>
  );

  return (
    <div className="App">
    <p>The message is: {mesg}</p>
    {sidebar}
		
    {
      Object.keys(data).map((key) => 
        <Speedometer
        id="speedometer"
        key={key}
        value={data[key]}
        title="Acceleration X"
      />
)}
      </div>
      
    
  
  );
}

export default App;
