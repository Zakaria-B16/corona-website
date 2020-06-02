import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Chart, CountryPicker, Cards } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.svg";
import coronaImageWhite from "./images/image1.svg";

const ThemeSwitch = withStyles({
  switchBase: {
    color: "#bdbdbd",
    "&$checked": {
      color: "#eceff1",
    },
    "&$checked + $track": {
      backgroundColor: "#b0bec5",
    },
  },
  checked: {},
  track: {},
})(Switch);

const App = () => {
  const [data, setData] = useState({});

  const [country, setCountry] = useState("");

  const [darkMode, setdarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      background: {
        default: "#303030",
      },
      type: darkMode ? "dark" : "light",
    },
    overrides: {
      light: {},
    },
  });

  useEffect(() => {
    const fetcher = async () => {
      setData(await fetchData());
    };
    fetcher();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setCountry(country);
    setData(fetchedData);
    console.log(country);
    return { data, country };
  };

  console.log(data);

  return (
    // <Paper className={!darkMode ? styles.Paper : null}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Paper className={!darkMode ? styles.MuiPaper : styles.paper}>
          <div className={styles.container}>
            <ThemeSwitch
              className={styles.switcher}
              defaultChecked
              color="default"
              checked={darkMode}
              onChange={() => setdarkMode(!darkMode)}
            ></ThemeSwitch>
            <img
              className={styles.image}
              src={darkMode ? coronaImageWhite : coronaImage}
              alt="COVID-19"
            ></img>
            <Cards data={data}></Cards>
            <CountryPicker
              handleCountryChange={handleCountryChange}
            ></CountryPicker>
            <Chart data={data} country={country} darkMode={darkMode}></Chart>
          </div>
        </Paper>
      </CssBaseline>
    </ThemeProvider>
    // </Paper>
  );
};

export default App;
