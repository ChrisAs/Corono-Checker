/* eslint-disable jsx-a11y/alt-text */
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Map.css";
import RingLoader from "react-spinners/RingLoader";
import NumberFormat from "react-number-format";
import Toggle from "react-toggle";
import "react-toggle/style.css";
function Map(props) {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])

      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();


  
  const contriesLocations = results.map((data, i) => {
      return (
        
       <div 
       className="mapStyle"
       
          lat={data.countryInfo.lat}
          lng={data.countryInfo.long}
      >
          <img height="10px" src={data.countryInfo.flag} />
          <br/>
          <NumberFormat
                value={data.cases}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "10px" }}
              />
          
      </div>
      );
  });
  return (
    <div
      style={{
        backgroundColor: props.darkTheme ? "black" : "white",
        color: props.darkTheme ? "white" : "black",
      }}
    >
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RingLoader size={90} color={"blue"} loading={loading} />
      </div>

      <div>
        <br />
        <div style={{ textAlign: "center" }}>
          <Toggle
            defaultChecked={false}
            icons={{
              checked: "☀️",
              unchecked: "🌙",
            }}
            onChange={props.themeChange}
          />
        </div>

        <br />
        <h2>COVID-19 Map</h2>


        <br />
        <CardDeck>
          <Card
            bg="secondary"
            text="white"
            className="text-center"
            style={{ margin: "10px" }}
          >
            <Card.Body>
              <Card.Title>Cases</Card.Title>

              <NumberFormat
                value={latest.cases}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Body>
            <Card.Footer>
              <small>Last updated {lastUpdated}</small>
            </Card.Footer>
          </Card>
          <Card
            bg="danger"
            text={"white"}
            className="text-center"
            style={{ margin: "10px" }}
          >
            <Card.Body>
              <Card.Title>Deaths</Card.Title>

              <NumberFormat
                value={latest.deaths}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Body>
            <Card.Footer>
              <small>Last updated {lastUpdated}</small>
            </Card.Footer>
          </Card>
          <Card
            bg="success"
            text={"white"}
            className="text-center"
            style={{ margin: "10px" }}
          >
            <Card.Body>
              <Card.Title>Recovered</Card.Title>

              <NumberFormat
                value={latest.recovered}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Body>
            <Card.Footer>
              <small>Last updated {lastUpdated}</small>
            </Card.Footer>
          </Card>
        </CardDeck>
        <br />
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCcTc3Kul3s9JdSbhvS3Z_PSeo0pBgipjg",
            }}
            defaultCenter={{ lat: 59.95, lng: 30.33 }}
            defaultZoom={4.5}
          >
              {contriesLocations}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}

export default Map;
