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
  console.log(latitude, longitude);

  const { data, loading } = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`
  );
  const [values, handleChange] = useForm({ searchTerm: "" });
  console.log("Data: ", data);
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
          {data && data.city && <Header as="h1">{data.city.name}</Header>}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default App;
