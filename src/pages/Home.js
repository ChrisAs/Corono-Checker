import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Home.css";
import NumberFormat from "react-number-format";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import RingLoader from "react-spinners/RingLoader";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { ReactComponent as Virus } from '../assets/virus.svg';

function Home(props) {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
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

  const filterCountry = results.filter((item) => {
    return searchCountries !== ""
      ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
      : item;
  });
  const countries = filterCountry.map((data, i) => {
    return (
      <Card
        key={i}
        bg={props.darkTheme ? "dark" : "light"}
        text={props.darkTheme ? "light" : "dark"}
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag}></Card.Img>
        <Card.Body>
          <Card.Title className="titleSize">{data.country}</Card.Title>
          <Card.Text className="mb-1">
            <span className="bolded"> Cases: </span>
            <NumberFormat
              thousandSeparator={true}
              value={data.cases}
              displayType={"text"}
            />{" "}
          </Card.Text>
          <Card.Text className="mb-1">
            <span className="bolded"> Deaths: </span>{" "}
            <NumberFormat
              thousandSeparator={true}
              value={data.deaths}
              displayType={"text"}
            />{" "}
          </Card.Text>
          <Card.Text className="mb-1">
            <span className="bolded"> Recovered: </span>{" "}
            <NumberFormat
              thousandSeparator={true}
              value={data.recovered}
              displayType={"text"}
            />{" "}
          </Card.Text>
          <Virus className="virus" alt="virus" style={{ fill: props.darkTheme ? "red" : "black"}}/>
          <Card.Text className="mb-2">
            <span className="bolded"> Today's cases: </span> {data.todayCases}{" "}
          </Card.Text>
          <Card.Text className="mb-2">
            <span className="bolded"> Today's deaths: </span> {data.todayDeaths}{" "}
          </Card.Text>
          <Card.Text className="mb-2">
            <span className="bolded"> Active: </span>{" "}
            <NumberFormat
              thousandSeparator={true}
              value={data.active}
              displayType={"text"}
            />{" "}
          </Card.Text>
          <Card.Text className="mb-2">
            <span className="bolded"> Critical: </span>
            <NumberFormat
              thousandSeparator={true}
              value={data.critical}
              displayType={"text"}
            />{" "}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });
  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

console.log("home.js", props.darkTheme)
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
      <h2>COVID-19 Live Stats</h2>

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
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;
