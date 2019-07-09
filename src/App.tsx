import React from "react";
import { Input, Header, Icon, Grid } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import useFetch from "./useFetch";
import { useForm } from "./useForm";
import { useLocation } from "./useLocation";

// const apiKey = "52b396372af4c4bf7864e78b59e0002d";
const apiKey = "489a01eaa9ace34146514ce743d5325c";

const App: React.FC = () => {
  const { forecast, latitude, longitude } = useLocation();
  const url =
    latitude && longitude
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`
      : null;
  const { data, loading, history } = useFetch(url);
  const [values, handleChange] = useForm({ searchTerm: "" });

  return (
    <Grid style={{ width: "100%", height: "100vh" }}>
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
          {data && history && data.city && (
            <Grid.Row>
              <Header as="h1">{data.city.name}</Header>
              <Header as="h2">{history[0].main.temp.toString()} ℃</Header>
            </Grid.Row>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default App;
