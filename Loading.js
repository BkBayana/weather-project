import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import loadingAnimation from "./assets/lottie/loading.json"; 

const AnimationScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={styles.animation}
        source={loadingAnimation} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d47a1",
  },
  animation: {
    width: 80,  // уменьшенный размер анимации
    height: 80, // уменьшенный размер анимации
  },
});

export default AnimationScreen;