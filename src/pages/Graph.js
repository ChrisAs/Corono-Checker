/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "../App.css";
import ReactApexChart from "react-apexcharts";
import "./Graph.css"
function Graph() {
     const series = [{
        name: 'Cases',
        data: [
          555,
          12038,
          69030,
          88369,
          167590,
          933313,
          2055423,
          3343777,
          4542347,
          6269790,
          7370261,
          7766952,
        ],
      },
      
      {
        name: 'Recovered',
        data: [28, 284, 9394, 42710, 76023, 191552, 501118, 1028748, 1595188, 2641974, 3397592, 3638453],
      },

      {
        name: 'Deaths',
        data: [17, 239, 1666, 2996, 6473, 49692, 140702, 238642, 307666, 375621, 416954, 429736,],
      },
    ];

      const options = {
 
     
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: [
            "1/22/20",
             "2/1/20",
             "2/15/20",
             "3/1/20",
              "3/15/20",
              "4/1/20",
              "4/15/20",
              "5/1/20",
              "5/15/20",
              "6/1/20",
              "6/10/20",
              "6/13/20",
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      }

  return (
    <div className="graphPage" >
      <br />
      <h2>COVID-19 Global Graphs🌎</h2>
      <br />
      <ReactApexChart 
      options={options} 
      series={series} 
      type="area" 
      height={350} 
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ReactApexChart 
      options={options} 
      series={series} 
      type="bar" 
      height={350} 
      />
    </div>
  );
};

export default Graph;