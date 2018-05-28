import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Picker } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavigationBar from 'navigationbar-react-native';

import Login from './scenes/Login';
import Cadastro from './scenes/Cadastro';
import OndeEstou from './scenes/OndeEstou';
import ParaOndeVou from './scenes/ParaOndeVou';
import Rota from './scenes/Rota';

 export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    LoginRoute: { screen: Login },
    CadastroRoute: { screen: Cadastro },
    OndeEstouRoute: { screen: OndeEstou },
    ParaOndeVouRoute: { screen: ParaOndeVou },
    RotaRoute: { screen: Rota }
  },
  {
    headerMode: 'screen',
    initialRouteName: 'LoginRoute'
  }
);
