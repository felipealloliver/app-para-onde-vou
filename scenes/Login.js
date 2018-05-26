import React from 'react';
import NavigationBar from 'navigationbar-react-native';
import ws from '../services/rest-para-onde-vou';

import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Picker } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { CheckBox, Button, Card, Divider, FormInput, FormLabel, FormValidationMessage, Header, Icon, PricingCard, SocialIcon, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'
  },

  card: {
    backgroundColor: 'red',
  },
});

export default class Login extends React.Component {
  state = {
    saveSession: false,
    errorMessage: null,
    inputEmail: '',
    inputSenha: '',
  };

  static navigationOptions = { title: '', header: null };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
      <View style={{
          padding: 0,
          marginTop: 30,
        }}>
        <Icon
            name='location-on'
            type='materialIcons'
            color='red'
            size={100} />

        <Text h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>PARA ONDE VOU?</Text>
      </View>
      <View style={{ marginTop: 20, position: 'relative', }}> 
        <View style={{ alignItems: 'center', marginTop: 20, position: 'relative', zIndex: 2}}>
            <Icon 
                  reverse
                  name='lock'
                  type='entypo'
                  color='rgb(229,229,232)'
                  size={25}
                  iconStyle={{ color: 'grey', alignSelf: 'center', }}
                  onPress={() => console.log('hello')} 
                />
        </View> 
        <View style={{ 
          backgroundColor: 'rgb(6,90,157)', 
          borderRadius: 10, 
          marginLeft: 30, 
          marginRight: 30, 
          marginTop: -40,
          position: 'relative', zIndex: 1
          }}>
          <FormInput 
            containerStyle={{ marginTop: 50, padding: (5,5,5,5), backgroundColor: '#FFF', borderRadius: 5}}
            inputStyle={{ color: '#000', fontSize: 20, paddingLeft: 15 }} 
            placeholderTextColor='#BDBDBD' 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder='E-Mail' shake={true}
            onChangeText={(text) => this.setState({inputEmail: text})}>
          </FormInput>
          <FormInput 
            secureTextEntry={true}
            containerStyle={{ marginTop: 10, padding: (5,5,5,5), backgroundColor: '#FFF', borderRadius: 5}}
            inputStyle={{ color: '#000', fontSize: 20, paddingLeft: 15 }} 
            placeholderTextColor='#BDBDBD' 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder='Senha' shake={true}
            onChangeText={(text) => this.setState({inputSenha: text})}
          >
          </FormInput>
          <View style={{marginTop: 10, marginBottom: 20}}>
            <Button
              large
              title='Entrar'
              backgroundColor='rgb(0,185,230)'
              borderRadius={5}
              onPress={ this.validateLogin }
              //onPress={() => {this.validateLogin}}
              //onPress={() => navigate('OndeEstouRoute')}
            />
          </View>
        </View>
      </View>

      <CheckBox
        center
        containerStyle={{backgroundColor: '#FFF', borderWidth: 0}}
        title='Lembrar meus dados de acesso.'
        iconType='material'
        checkedIcon='done'
        uncheckedIcon='clear'
        checkedColor='green'
        onPress={() => this.setState({checked: !this.state.saveSession})}
        checked={this.state.saveSession}
      />

      <Text style={{ textAlign: 'center', marginBottom: 10 }}>Não sei a minha senha</Text>
      <TouchableOpacity>
        <Text style={{ textAlign: 'center' }} onPress={() => navigate('CadastroRoute')}>Você é novo? Cadastre-se</Text>
      </TouchableOpacity>

      </ScrollView>
    )
  };

  validateLogin = () => {
    const { navigate } = this.props.navigation;
    const autenticar = fetch(ws.getBaseURL() + '/usuario/autenticar', {
      method: 'POST',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.inputEmail,
        senha: this.state.inputSenha
      })
    }).then((response) => response.json()).then((responseData) => {
      navigate('OndeEstouRoute');
    }).catch((error) => {
      console.log("Erro na autenticação!");
    });
  };
}