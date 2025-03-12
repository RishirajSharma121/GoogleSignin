import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { COLORS, FONTS } from "../assets/Strings";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import LinearGradient from "react-native-linear-gradient";

const HomeScreen = ({navigation}) => {
  const { userId, setUserId, setToken, userInfo, setUserInfo } =
    useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    const response = await axios.get(`http://localhost:8000/user/${userId}`);
    setUser(response.data);
  };
  console.log(user?.email);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
     const isSignedIn = await GoogleSignin.hasPreviousSignIn();
      console.log(isSignedIn)
     if (isSignedIn) {
       await GoogleSignin.revokeAccess();
       await GoogleSignin.signOut();
     }
      await AsyncStorage.clear()
      setToken("");
      navigation.reset({ routes: [{ name: "Login" }] });
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
       {user?.picture && <Image
          source={{ uri: user?.picture }}
          style={{ height: 100, width: 100, margin: 30, borderRadius: 100 }}
        />}

        <Text style={{ color: "black", fontFamily: FONTS.bold, fontSize: 20 }}>
          {user?.name}
        </Text>
        <Text style={{ color: "grey", fontFamily: FONTS.light }}>
          {user?.email}
        </Text>
       
      </View>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <LinearGradient
          colors={[COLORS.Secondry, COLORS.Primary]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            margin: 50,
            borderRadius: 60,
          }}>
          <Pressable style={[styles.Button]} onPress={logout}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                fontFamily: FONTS.medium,
              }}>
              Logout
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
    margin: 12,
    gap: 20,
    borderRadius: 30,
    position: "relative",
    marginTop: 20,
  },
});
