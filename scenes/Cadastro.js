import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { 
  Button,
  Card,
  FormInput,
  FormLabel,
  Icon,
  Text
 } from 'react-native-elements';

import ws from '../services/rest-para-onde-vou';

export default class Cadastro extends React.Component {
    
    static navigationOptions = { title: 'Cadastro' };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <Card>
                    <View>
                        <Icon
                            name='location-on'
                            type='materialIcons'
                            color='red'
                            size={100} 
                        />
                    </View>
                    <View>
                        <FormLabel labelStyle={{fontWeight: 'bold'}}>Nome</FormLabel>
                        <FormInput 
                            placeholder='Digite seu nome' 
                            shake={true}
                            onChangeText={(text) => this.setState({inputNome: text})}
                        >
                        </FormInput>
                    
                        <FormLabel labelStyle={{fontWeight: 'bold'}}>E-mail</FormLabel>
                        <FormInput 
                            placeholder='Digite seu e-mail' 
                            shake={true}
                            onChangeText={(text) => this.setState({inputEmail: text})}
                        >
                        </FormInput>

                        <FormLabel labelStyle={{fontWeight: 'bold'}}>Senha</FormLabel>
                        <FormInput 
                            placeholder='Digite sua senha' 
                            shake={true}
                            onChangeText={(text) => this.setState({inputSenha: text})}
                        >
                        </FormInput>
                        <FormLabel labelStyle={{fontWeight: 'bold'}}>Confirme sua senha</FormLabel>
                        <FormInput placeholder='Confirme sua senha' shake={true}></FormInput>
                    </View>

                    <Text></Text>
                    <Text></Text>
                    <Text></Text>

                    <View>
                        <Button
                            large
                            iconRight={{name: 'check', type: 'entypo'}}
                            title='Cadastrar' 
                            backgroundColor='rgb(0,185,230)'
                            borderRadius= {10}
                            onPress={ this.validateCadastro }
                        />
                    </View>
                </Card>
            </ScrollView>
        )
    };

    validateCadastro = () => {
        const { navigate } = this.props.navigation;
        const cadastrar = fetch(ws.getBaseURL() + '/usuario', {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({
                id: null,
                email: this.state.inputEmail,
                nome: this.state.inputNome,
                senha: this.state.inputSenha
            })
        }).then((response) => response.json()).then((responseStatus) => {
            //console.log(responseData);
            navigate('OndeEstouRoute');
        }).then((error) => {
            console.log("Erro ao cadastrar!");
        });
    };
}