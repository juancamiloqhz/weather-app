import React, { useState, useEffect, useCallback } from "react";
import { Input, Header, Icon, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import useFetch from "./useFetch";
import { useForm } from "./useForm";
import { useLocation } from "./useLocation";
import { useDebounce } from "./useDebounce";

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const accessUnsplashKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const randomNumber = Math.floor(Math.random() * 10);
const defaultImagesArr = ["https://unsplash.com/photos/IcAtXrAZx8E", "https://unsplash.com/photos/8kDOOrs608I", "https://unsplash.com/photos/RpS21EjSMgM", "https://unsplash.com/photos/Z-4kOr93RCI", "https://unsplash.com/photos/o2vx3hOPbUM"]

const App: React.FC = () => {
	const [values, handleValuesChange] = useForm({ searchTerm: "" });
	const [backgroundImageUrl, setBackgroundImageUrl] = useState(defaultImagesArr[Math.floor(Math.random() * defaultImagesArr.length - 1)]);
	const { errorMessage, latitude, longitude } = useLocation();
	console.log("lat long: ", latitude, longitude, "errorMessage: ", errorMessage);
	const debouncedSearchTerm = useDebounce(values.searchTerm, 500);

	const weatherApiUrl =
		latitude && longitude
			? `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`
			: null;
	const { data, loading } = useFetch(weatherApiUrl);


	const getImageFromCity = useCallback(
		async (city?: string) => {
			fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}$orientation=portrait}`, {
				headers: {
					Authorization: `Client-ID ${accessUnsplashKey}`
				}
			})
				.then(res => res.json())
				.then(data => {
					setBackgroundImageUrl(data.results[randomNumber].urls.regular);
				});
		},
		[]
	);
	useEffect(() => {
		if (data && data.city) {
			getImageFromCity(data.city.name);
		}
	}, [data, getImageFromCity]);

	return (
		<Grid
			verticalAlign='middle'
			centered
			style={{
				width: "100%",
				height: "100vh",
				margin: 0,
				background: `url(${backgroundImageUrl}) no-repeat center center`
			}}
		>
			<Grid.Row centered>
				<Grid.Column>
					<Header as="h1" icon>
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
						onChange={handleValuesChange}
					/>
					{data && data.city && (
						<>
							<Header as="h1" >{data.city.name}</Header>
							<Header as="h2">{data.list[0].main.temp.toString()} ℃</Header>
						</>
					)}
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default App;
