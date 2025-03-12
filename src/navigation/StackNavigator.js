import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../../AuthContext";
import NameScreen from "../screens/NameScreen";
import AgeScreen from "../screens/AgeScreen";
import GenderScreen from "../screens/GenderScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { token } = useContext(AuthContext);
  const [Token, setToken] = useState(null);
  const fetchUserData = async () => {
    const usertToken = await AsyncStorage.getItem("authToken");
    console.log(usertToken, "ftom sdtasck");
    if (usertToken) {
      setToken(usertToken);
    }
  };
  useEffect(() => {
    fetchUserData();
    setToken(token);
  }, [token]);

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{ animation: "slide_from_right", animationDuration: 1 }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NameScreen"
          component={NameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgeScreen"
          component={AgeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {Token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
