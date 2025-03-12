import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { COLORS, FONTS } from "../assets/Strings";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthContext";

const GenderScreen = ({ navigation, route }) => {
     const {token, setToken} = useContext(AuthContext);
  const [ageGroup, setAgeGroup] = useState([
    { title: "Female", id: 1, selected: false },
    { title: "Male", id: 2, selected: false },
    { title: "Non-Binary", id: 3, selected: false },
    { title: "Other", id: 4, selected: false },
  ]);
  const [progress, setProgress] = useState(0.65);

  useEffect(() => {
    let interval;
    if (progress < 1) {
      interval = setTimeout(() => {
        setProgress(route?.params?.value);
      }, 500);
    }
    return () => clearTimeout(interval);
  }, [progress]);
  const selectAge = (selectedItem) => {
    setAgeGroup((prevAgeGroup) =>
      prevAgeGroup.map((item) =>
        item.id === selectedItem.id
          ? { ...item, selected: !item.selected }
          : { ...item, selected: false }
      )
    );
  };
  const handleContinue = async () => {
    if (!ageGroup.some((item) => item.selected == true)) {
      ToastAndroid.show("Please Select Gender", 2000);
      return;
    }
    const data = ageGroup.find((item) => item.selected === true);
      await AsyncStorage.setItem("age", JSON.stringify(data));
      const token = await AsyncStorage.getItem("authToken");
      setToken(token);
  };
  const renderAges = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => selectAge(item)}>
        <LinearGradient
          style={{
            padding: 20,
            margin: 10,
            borderRadius: 30,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={
            item.selected
              ? [COLORS.Secondry, COLORS.Primary]
              : ["#F4F6F7", "#F4F6F7"]
          }>
          <Text
            style={{
              color: item.selected ? "white" : "grey",
              fontFamily: FONTS.medium,
            }}>
            {item.title}
          </Text>
          {item.selected && <Text style={{ color: "white" }}>✓</Text>}
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 85,
        backgroundColor: "white",
      }}>
      <View style={{ flex: 2 }}>
        <ProgressBar
          progress={progress}
          color={COLORS.Primary}
          style={{ marginHorizontal: 30, marginVertical: 45 }}
        />
        <View style={{ alignItems: "center", marginHorizontal: 40 }}>
          <Text
            style={[
              {
                color: "black",
                fontSize: 30,
                fontFamily: FONTS.light,
              },
            ]}>
            Choose the{" "}
            <Text
              style={[
                styles.heading,
                { color: COLORS.Primary, fontFamily: FONTS.bold },
              ]}>
              identity{" "}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 30,
                fontFamily: FONTS.light,
              }}>
              hat feels right for{" "}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 30,
                fontFamily: FONTS.bold,
              }}>
              You{" "}
            </Text>
            ?
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ flex: 1, margin: 20 }}
          data={ageGroup}
          renderItem={renderAges}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <LinearGradient
          colors={[COLORS.Secondry, COLORS.Primary]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            margin: 50,
            borderRadius: 60,
          }}>
          <Pressable style={[styles.Button]} onPress={handleContinue}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                fontFamily: FONTS.medium,
              }}>
              Continue
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  Button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    margin: 10,
    // gap: 20,
    // borderRadius: 30,
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "black",
  },
  heading: { color: COLORS.Primary, fontSize: 30, fontWeight: "300" },
  input: {
    borderWidth: 0.5,
    borderColor: "black",
    padding: 15,
    width: "80%",
    alignSelf: "center",
    borderRadius: 30,
    color: "black",
  },
});
