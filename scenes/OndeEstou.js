import React from 'react';
import ws from '../services/rest-para-onde-vou';
import NavigationBar from 'navigationbar-react-native';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Avatar, Button, Card, FormInput, FormLabel, Icon, List, ListItem, Text } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    listaLocais: {
        flex: 1,
        flexDirection: 'column',
        height: 300,
        backgroundColor: 'yellow'
    },
    listaLocaisFoto: {
        width: 128,
        height: 128,
        backgroundColor: 'red'
    },
    listaLocaisTitulo: {
        width: 200,
        backgroundColor: 'blue'
    },
});

export default class OndeEStou extends React.Component {
    static navigationOptions = { title: '', header: null };
    //static navigationOptions = { title: 'Onde Estou?' };
    state = {
        list: [],
        localOrigem: null,
        localDestino: null,
        rota_id: null
      };

    componentWillMount() {
        fetch(ws.getBaseURL() + '/local', {
            method: 'GET',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization' : this.props.navigation.getParam("token", 0)}
          }).then((response) => response.json()).then((responseData) => {
              this.setState({list: responseData});
              this.state.list.map(
                  (l, i) => {console.log(l.nomeLocal)}
              )
          }).catch((error) => {
            console.log(error);
          });

    }

    render() {
        if (this.state.list.length === 0) {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        );
          } else {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.container}>
                <View>
                    <Icon
                        name='location-on'
                        type='materialIcons'
                        color={this.state.localOrigem == null ? 'green' : 'red'} 
                        size={80} 
                    />
                    <Text h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {this.state.localOrigem == null ? 'Selecione o Local que você está.':'Para onde deseja ir?'}
                    </Text>
                </View>
                <ScrollView>
                    <List>
                        {
                            this.state.list.map((l, i) => {
                                return (<ListItem
                                    subtitle = {l.id == this.state.localOrigem ? 'Local de Partida':''}
                                    onPress={() => this.selecionaLocal(l.id)}
                                    avatar={
                                        <Avatar
                                            large
                                            source={{uri:'https://para-onde-vou.herokuapp.com/imagem/' + l.imagem.id + '/imagem'}}
                                        />
                                    }
                                    key={i}
                                    title={l.nomeLocal}
                                    titleStyle={{
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                    }}
                                    containerStyle={{
                                        backgroundColor: [l.id == this.state.localOrigem ? '#228b2211':'#fff']
                                    }}
                                />)
                            })
                        }
                    </List>
                </ScrollView>
                <View>
                    <Button 
                        large
                        iconRight={{name: 'check', type: 'entypo'}}
                        title='Ler QR CODE' 
                        backgroundColor='rgb(0,185,230)'
                        borderRadius={10}
                        onPress={() => navigate('ParaOndeVouRoute')} 
                    />
                </View>
            </View>
        )
    }};

    selecionaLocal = (id) => {
        const { navigate } = this.props.navigation;
        /*
        this.setState({
            list: this.state.list.filter((j, i) => j.id !== id)
          });
        */
        if (this.state.localOrigem === null) {
            this.setState({localOrigem: id});
        } else {
            if (this.state.localOrigem != id) {
            this.setState({localDestino: id});
            fetch(ws.getBaseURL() + '/rota', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': this.props.navigation.getParam("token", 0)},
                body: JSON.stringify({
                date: "2018-06-03",
                usuario: {
                    id: 1
                },
                localOrigem: {
                    id: this.state.localOrigem
                },
                localDestino: {
                    id: this.state.localDestino
                },
                status: "EM_TRANSITO"
                })
            }).then((response) => {
                this.setState({rota_id: response.headers.get('Location')});
            }).catch((error) => {
                console.log(error);
            });
            navigate("RotaRoute", {idLocalPartida: this.state.localOrigem, idLocalDestino: id, rota: this.state.rota_id, token: this.props.navigation.getParam("token", 0)});
            }
        }
    }
}