import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker ,Popup} from "react-map-gl";
import LogEntryForm from "./LogEntryForm";
import "./App.css";
import { listLogEntries } from "./Api";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup,setShowPopup] = useState({})
  const [addEntryLocation,setAddEntryLocation]  = useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.7461,
    longitude: 90.3742,
    zoom: 14,
  });

  const getEntries = async()=>{
    const logEntries = await listLogEntries(); 
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries()
  }, []);

  const showAddMarkerPopup =(e)=>{
    const [longitude,latitude] = e.lngLat
    setAddEntryLocation({
      latitude,
      longitude
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => (
      <Fragment key={entry._id}>
        <Marker
          latitude={entry.latitude}
          key={entry._id}
          longitude={entry.longitude}
          // offsetLeft={-20}
          // offsetTop={-10}
        >
         <div onClick={()=>setShowPopup({[entry._id]:true})}>
          <svg 
           
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="marker"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          </div>
          
        </Marker>
        
        {showPopup[entry._id] ? (<Popup
          latitude={entry.latitude}
          longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setShowPopup({[entry._id]:false})}
          anchor="top" >
          <div className="popup">
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
          </div>
        </Popup>): null}
      </Fragment>
       
      ))}
      {
        addEntryLocation ? (
        <>
        <Marker
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
    
        >
         <div>
          <svg 
           
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="marker"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          </div>
          
        </Marker>
          <Popup
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setAddEntryLocation(null)}
          anchor="top" >
          <div className="popup">
          <LogEntryForm onClose={()=>{
            setAddEntryLocation(null);
            getEntries();
          }} location={addEntryLocation}/>
          </div>
        </Popup>
        </>):null
      }
      
    </ReactMapGL>
  );
}

export default App;
