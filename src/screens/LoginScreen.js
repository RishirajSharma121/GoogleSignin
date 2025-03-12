import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthContext";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../assets/Strings";
import { ProgressBar } from "react-native-paper";
import { jwtDecode } from "jwt-decode";
import { CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { AccessToken, LoginManager, Settings } from "react-native-fbsdk-next";

GoogleSignin.configure({
  webClientId: CLIENT_ID,
  forceCodeForRefreshToken: false,
  iosClientId: IOS_CLIENT_ID,
});
Settings.initializeSDK();
const LoginScreen = ({ navigation }) => {
  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("u", userInfo);
    return userInfo;
  };

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      console.log(response, "idToken idToken idToken");
      const { idToken } = response;
      const extractedIdToken = idToken || response.data.idToken;
      console.log(extractedIdToken);
      if (extractedIdToken) {
        // const backendResponse = await axios.post(
        //   'http://10.0.2.2:4000/google-login',
        //   {
        //     idToken: extractedIdToken,
        //   },
        // );

        await AsyncStorage.setItem("authToken", extractedIdToken);

        navigation.navigate("NameScreen", { value: 0.45 });
      }
    } catch (error) {
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        ToastAndroid.show("Login Cancelled");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        ToastAndroid.show("Something went wrong!");
        return;
      }

      console.log("Access Token:", data.accessToken.toString());
    } catch (error) {
      console.error("Facebook Login Error", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}>
      <View />
      <ProgressBar
        progress={0.2}
        color={COLORS.Primary}
        style={{ marginHorizontal: 30 }}
      />
      <View style={{ alignItems: "center", margin: 50 }}>
        <Text style={styles.heading}>Begin Your</Text>
        <Text
          style={{
            color: COLORS.Primary,
            fontSize: 30,
            fontFamily: FONTS.bold,
          }}>
          Mindful Journey
        </Text>
        <Text
          style={[
            styles.heading,
            {
              color: "grey",
              fontSize: 14,
              textAlign: "center",
            },
          ]}>
          Log in or sign up to begin your journey with personalized, human-like
          wellness support
        </Text>
      </View>
      <LinearGradient
        colors={[COLORS.Secondry, COLORS.Primary]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{
          padding: 30,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}>
        <Pressable
          // onPress={() => navigation.navigate("NameScreen",{value:0.45})}
          style={[styles.Button, { backgroundColor: "black" }]}>
          <Image
            source={require("../assets/icon/apple-logo.png")}
            style={{ height: 30, width: 30, tintColor: "white" }}
          />
          <Text
            style={[
              styles.title,
              { textAlign: "center", fontSize: 15, color: "white" },
            ]}>
            Continue With Apple
          </Text>
        </Pressable>
        <Pressable
          onPress={handleGoogleLogin}
          style={[styles.Button, { backgroundColor: "white" }]}>
          <Image
            source={require("../assets/icon/google.png")}
            style={{ height: 30, width: 30 }}
          />
          <Text style={styles.title}>Continue With Google</Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
            alignItems: "center",
          }}>
          <View style={{ backgroundColor: "white", width: "40%", height: 1 }} />
          <Text
            style={{
              marginHorizontal: 10,
              color: "white",
              fontFamily: FONTS.light,
            }}>
            or
          </Text>
          <View style={{ backgroundColor: "white", width: "40%", height: 1 }} />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: FONTS.medium,
          }}>
          I agree to{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            Privacy Policy
          </Text>{" "}
          &{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            Terms of Service
          </Text>
        </Text>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  Button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
    margin: 12,
    gap: 20,
    borderRadius: 30,
    position: "relative",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    color: "black",
    fontFamily: FONTS.medium,
  },
  heading: { color: COLORS.Primary, fontSize: 30, fontFamily: FONTS.light },
});
