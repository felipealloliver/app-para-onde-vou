import React from 'react';
import ws from '../services/rest-para-onde-vou';
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



// const list = [
//    {
//        local: 'Átrio Central',
//        image: 'https://para-onde-vou.herokuapp.com/imagem/11/imagem'
//    },
//    {
//        local: 'Nelson Mandela',
//        image: 'https://para-onde-vou.herokuapp.com/imagem/41/imagem'
//    },
//]

export default class ParaOndeVou extends React.Component {
    
    static navigationOptions = { title: 'Para onde vou?' };
    state = {
        list: []
      };

    componentWillMount() {
        fetch(ws.getBaseURL() + '/local', {
            method: 'GET',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}
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
                        color='red'
                        size={100} 
                    />
                </View>
                <ScrollView>
                    <List>
                        {
                            this.state.list.map((l, i) => {
                                return <ListItem
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
                                        fontWeight: 'bold'
                                    }}
                                />
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
                        onPress={() => navigate('RotaRoute')} 
                    />
                </View>
            </View>
        )
    }};
}