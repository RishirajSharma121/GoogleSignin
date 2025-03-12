

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
Text,TextInput
} from 'react-native';

import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './AuthContext';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: "Poppins-Regular" };

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = { fontFamily: "Poppins-Regular" };


function App() {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content"/>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
}



export default App;
