import {Pressable, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../assets/Strings';
import {ProgressBar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NameScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const handleSubmitName =async () => {
    if (!name.length) {
      ToastAndroid.show("Please Enter name", 2000);
      return
    }
    await AsyncStorage.setItem('name', name);
    navigation.navigate('AgeScreen',{value:0.65})
  }
   const [progress, setProgress] = useState(0.2);

  useEffect(() => {
   
     console.log("kjndskfndskfds")
     let interval;
     if (progress < 1) {
       interval = setTimeout(() => {
         setProgress(route?.params?.value); // Increase by 5% every 100ms
       }, 500);
     }
     return () => clearTimeout(interval);
   }, [progress]);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 85,
        backgroundColor: "white",
      }}>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <ProgressBar
          progress={progress}
          color={COLORS.Primary}
          style={{ marginHorizontal: 30 }}
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
            Let’s get to know each other
          </Text>

          <Text
            style={{
              color: COLORS.Primary,
              fontSize: 30,
              fontFamily: FONTS.bold,
            }}>
            What{" "}
            <Text
              style={[
                styles.heading,
                { color: "black", fontFamily: FONTS.light },
              ]}>
              Should We Call{" "}
            </Text>
            <Text style={[styles.heading, { color: "black" }]}>You</Text>
            <Text style={[styles.heading, { color: "black" }]}>?</Text>
          </Text>
        </View>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={"black"}
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
          <Pressable style={[styles.Button]} onPress={handleSubmitName}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                fontFamily: FONTS.regular,
              }}>
              Continue
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    margin: 10,
    // gap: 20,
    // borderRadius: 30,
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
  heading: {color: COLORS.Primary, fontSize: 30, },
  input: {
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 15,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    color: 'black',
  },
});
