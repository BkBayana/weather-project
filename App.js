import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = '7fe34a8c9255d5a892f8c855c4d00c4e';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temp: null,
    condition: null,
    description: null,
    temp_min: null,
    temp_max: null,
    name: null,
    dailyForecast: [],
    hourlyForecast:[],
  };

  getWeather = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      
      const hourlyForecast = data.list.slice(0, 7).map(item => ({
        hour: new Date(item.dt_txt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
        temp: item.main.temp,
        condition: item.weather[0].main,
      }));
  
      const dailyForecast = data.list.reduce((acc, item) => {
        const day = new Date(item.dt_txt).toLocaleDateString('en', { weekday: 'long' });
        if (!acc.some(forecast => forecast.day === day)) {
          acc.push({
            day,
            temp: item.main.temp,
            condition: item.weather[0].main,
          });
        }
        return acc;
      }, []);
  
      this.setState({
        isLoading: false,
        temp: data.list[0].main.temp,
        condition: data.list[0].weather[0].main,
        description: data.list[0].weather[0].description,
        temp_min: data.list[0].main.temp_min,
        temp_max: data.list[0].main.temp_max,
        name: data.city.name,
        dailyForecast: dailyForecast.slice(0, 7),
        hourlyForecast, 
      });
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось получить данные о погоде.');
      console.error("Ошибка при запросе к API:", error.response ? error.response.data : error);
    }
  };


  getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Ошибка', 'Доступ к местоположению запрещен.');
        this.setState({ isLoading: false });
        return;
      }
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert('Ошибка', 'Не могу определить местоположение.');
      console.error("Ошибка определения местоположения:", error);
    }

  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition, description, temp_min, temp_max, name, dailyForecast,hourlyForecast} = this.state;

    return (
      isLoading
        ? <Loading />
        : <Weather 
          temp={temp} 
          condition={condition} 
          description={description}
          temp_min={temp_min}
          temp_max={temp_max}
          name={name}
          dailyForecast={dailyForecast}
          hourlyForecast={hourlyForecast}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});
