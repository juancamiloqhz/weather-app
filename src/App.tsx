import React, { useState, useEffect, useCallback } from "react";
import { Input, Header, Icon, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import useFetch from "./useFetch";
import { useForm } from "./useForm";
import { useLocation } from "./useLocation";
require("dotenv").config();

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const accessUnsplashKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const randomNumber = Math.floor(Math.random() * 10);

const App: React.FC = () => {
  const [backgroundImage, setBackground] = useState("");
  const { forecast, latitude, longitude } = useLocation();
  const url =
    latitude && longitude
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`
      : null;
  const { data, loading } = useFetch(url);

  const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=medellin$orientation=portrait}`;
  const getImageFromCity = useCallback(
    async (city?: string) => {
      fetch(unsplashUrl, {
        headers: {
          Authorization: `Client-ID ${accessUnsplashKey}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setBackground(data.results[randomNumber].urls.regular);
        });
    },
    [unsplashUrl]
  );
  useEffect(() => {
    if (data && data.city) {
      getImageFromCity(data.city.name);
    }
  }, [data, getImageFromCity]);

  const [values, handleChange] = useForm({ searchTerm: "" });

  return (
    <Grid
      style={{
        width: "100%",
        height: "100vh",
        background: `url(${backgroundImage}) no-repeat center center`
      }}
    >
      <Grid.Row columns={1} verticalAlign="middle">
        <Grid.Column textAlign="center">
          <Header as="h1" icon textAlign="center">
            <Icon name="cloud" circular />
            <Header.Content>Weather App</Header.Content>
          </Header>
          <Header as="h3">
            A simple Weather App build on top of React w/ Typescript and
            Semantic Ui for styling
          </Header>
          <Input
            loading={loading}
            name="searchTerm"
            placeholder="Search..."
            value={values.searchTerm}
            onChange={handleChange}
          />
          {data && data.city && (
            <Grid.Row>
              <Header as="h1">{data.city.name}</Header>
              <Header as="h2">{data.list[0].main.temp.toString()} ℃</Header>
            </Grid.Row>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default App;
