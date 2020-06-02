import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";

import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths },
  country,
  darkMode,
}) => {
  const [dailyData, setdailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setdailyData(await fetchDailyData());
    };
    // console.log(dailyData);
    fetchAPI();
  }, []);

  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba( 255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
        options={{
          legend: {
            display: true,
            labels: {
              fontColor: darkMode ? "#bdbdbd" : "grey",
            },
          },
          scales: {
            yAxes: [
              {
                ticks: { fontColor: darkMode ? "#bdbdbd" : "grey" },
                gridLines: {
                  color: !darkMode ? "#bdbdbd" : "grey",
                },
              },
            ],
            xAxes: [
              {
                ticks: { fontColor: darkMode ? "#bdbdbd" : "grey" },
                gridLines: {
                  color: !darkMode ? "#bdbdbd" : "grey",
                },
              },
            ],
          },
        }}
      ></Line>
    ) : null;

  console.log(confirmed, recovered, deaths);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba( 0, 0, 255, 0.5)",
              "rgba( 0, 250, 0, 0.5)",
              "rgba( 255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      option={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    ></Bar>
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
