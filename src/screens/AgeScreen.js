import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { COLORS, FONTS } from "../assets/Strings";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgeScreen = ({navigation,route}) => {
  const [ageGroup, setAgeGroup] = useState([
    { title: "Under 18", id: 1, selected: false },
    { title: "18-24", id: 2, selected: false },
    { title: "25-34", id: 3, selected: false },
    { title: "35-44", id: 4, selected: false },
    { title: "45-54", id: 5, selected: false },
    { title: "55+", id: 6, selected: false },
  ]);
     const [progress, setProgress] = useState(0.45);
    
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
      prevAgeGroup.map(
        (item) =>
          item.id === selectedItem.id
            ? { ...item, selected: !item.selected } 
            : { ...item, selected: false } 
      )
    );
  };
    const handleContinue = async() => {
       
         if (!ageGroup.some(item=>item.selected==true)) {
              ToastAndroid.show("Please Select Age", 2000);
             return
             
        }
        const data = ageGroup.find((item) => item.selected === true);
        await AsyncStorage.setItem("age",JSON.stringify(data) );
    navigation.navigate('GenderScreen',{value:1})
}
  const renderAges = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => selectAge(item)}
          style={{
            flex: 1,
          }}>
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
              styles.heading,
              {
                color: "grey",
                fontSize: 14,
                textAlign: "center",
                fontFamily: FONTS.regular,
              },
            ]}>
            Great, Let’s make Mynd all about you!
          </Text>

          <Text
            style={{
              color: "black",
              fontSize: 30,
              fontFamily: FONTS.light,
            }}>
            How long have you been rocking this{" "}
            <Text
              style={[
                styles.heading,
                { color: COLORS.Primary, fontFamily: FONTS.bold },
              ]}>
              You?🎂
            </Text>
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ flex: 1, margin: 20 }}
          data={ageGroup}
          renderItem={renderAges}
          numColumns={2}
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

export default AgeScreen;

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
