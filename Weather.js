import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const weatherOptions = {
  Rain: {
    iconName: 'rainy',
    gradient: ['#00c6fb', '#005bea'],
  },
  Snow: {
    iconName: 'snow-outline',
    gradient: ['#7de2fc', '#b9b6e5'],
  },
  Clear: {
    iconName: 'sunny-outline',
    gradient: ['#56ccf2', '#2f80ed'],
  },
  Clouds: {
    iconName: 'cloudy-outline',
    gradient: ['#83a4d4', '#b6fbff'],
  },
  Thunderstorm: {
    iconName: 'thunderstorm-outline',
    gradient: ['#373b44', '#4286f4'],
  },
  Drizzle: {
    iconName: 'rainy-outline',
    gradient: ['#89f7fe', '#66a6ff'],
  },
  Atmosphere: {
    iconName: 'cloudy-outline',
    gradient: ['#89f7fe', '#66a6ff'],
  },
};

export default function Weather({ temp, condition, description, temp_min, temp_max, name, dailyForecast, hourlyForecast }) {
  const renderDayWeather = ({ item }) => (
    <View style={styles.dayContainer}>
      <Text style={styles.day}>{item.day}</Text>
      <Ionicons
        name={weatherOptions[item.condition]?.iconName || 'cloudy-outline'}
        size={40}
        color="white"
      />
      <Text style={styles.temp}>{`${Math.round(item.temp)}°C`}</Text>
    </View>
  );
  return (
    <LinearGradient colors={weatherOptions[condition]?.gradient || ['#4c669f', '#3b5998']} style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContent}>
        <Text style={styles.location}>{name}</Text>
        <Ionicons
          name={weatherOptions[condition]?.iconName || 'cloudy-outline'}
          size={50}
          color="white"
        />
        <Text style={styles.temp1}>{`${Math.round(temp)}°C`}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.details}>Мин: {temp_min}°C, Макс: {temp_max}°C</Text>
      </View>
      <View style={styles.hourlyContainer}>
        <FlatList
          data={hourlyForecast}
          renderItem={({ item }) => (
            <View style={styles.hourlyItem}>
              <Text style={styles.hourlyText}>{item.hour}</Text>
              <Ionicons
                name={weatherOptions[item.condition]?.iconName || 'cloudy-outline'}
                size={30}
                color="white"
              />
              <Text style={styles.hourlyText}>{Math.round(item.temp)}°C</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <View style={styles.forecastContainer}>
      <Text style={styles.weather10Days}>Weather for 10 days</Text>
        <FlatList
          data={dailyForecast}
          renderItem={renderDayWeather}
          keyExtractor={(item) => item.day}
          horizontal={false}
          contentContainerStyle={styles.forecastList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    'Thunderstorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Atmosphere',
    'Clear',
    'Clouds',
  ]).isRequired,
  description: PropTypes.string.isRequired,
  temp_min: PropTypes.number,
  temp_max: PropTypes.number,
  name: PropTypes.string,
  dailyForecast: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      condition: PropTypes.oneOf([
        'Thunderstorm',
        'Drizzle',
        'Rain',
        'Snow',
        'Atmosphere',
        'Clear',
        'Clouds',
      ]).isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop: '15%',
      backgroundColor: '#000', 
    },
    mainContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    temp: {
      fontSize: 22,
      color: 'white',
      fontWeight: '500',
    },
    temp1: {
      fontSize: 40,
      color: 'white',
      fontWeight: '500',
    },
    description: {
      fontSize: 18,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    location: {
      fontSize: 28,
      fontWeight: '600',
      color: 'white',
    },
    details: {
      paddingTop: 20,
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    forecastContainer: {
        margin:'auto',
      marginTop: '4%',
      alignItems: 'center',
      width: '90%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      paddingVertical: 15,
      borderRadius: 15,
      height: '50%',
    },
    forecastList: {
      width: '100%',
      alignItems: 'center',
    },
    dayContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
    },
    day: {
      fontSize: 20,
      color: 'white',
      flex: 1,
    },
    hourlyContainer: {
      margin:'auto',
      width: '90%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      paddingVertical: 15,
      borderRadius: 15,
      marginTop: '10%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: '5%',
    },
    hourlyItem: {
      alignItems: 'center',
      marginHorizontal: 5,
      width: 100,
    },
    hourlyText: {
      fontSize: 16,
      color: 'white',
    },
    flatListContent: {
      alignItems: 'center',
    },
    separator: {
      height: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginVertical: 5, 
    },
    weather10Days: {
      fontSize: 20,
      color: 'rgba(237,251,255,0.9)',
      marginBottom: 25,
      marginRight:'45%', 
    },
  });
  
  