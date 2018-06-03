import React from 'react';
import ws from '../services/rest-para-onde-vou';
import { Image, Dimensions, StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Avatar, Button, Card, FormInput, FormLabel, Icon, List, ListItem, Text } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    }
});

export default class Rota extends React.Component {

    static navigationOptions = { title: 'Siga a rota abaixo' };
    state = {
        entries: []
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Image
                    style={{width: Dimensions.get('window').width, height: 350}}
                    source={{uri: 'https://para-onde-vou.herokuapp.com/imagem/' + item.imagem.id + '/imagem'}}
                />
                <View style={{marginTop: 30, alignItems: "center"}}>
                    <Text style={{ fontWeight: "bold", color: "rgb(0,0,0)", fontSize: 20}}>{ item.descricao }</Text>
                </View>
            </View>
        );
    }

    componentWillMount() {

        console.log(ws.getBaseURL() + '/percurso/' + this.props.navigation.getParam("idLocalPartida", 0) + '/' + this.props.navigation.getParam("idLocalDestino", 0)); 
  
        fetch(ws.getBaseURL() + '/percurso/' + this.props.navigation.getParam("idLocalPartida", 0) + '/' + this.props.navigation.getParam("idLocalDestino", 0), {
            method: 'GET',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}
          }).then((response) => response.json()).then((responseData) => {
              this.setState({entries: responseData});
              this.state.entries.map(
                  (l, i) => {console.log(l.idLocalPartida)}
              )
          }).catch((error) => {
            console.log(error);
          });

    }

    render () {
        if (this.state.entries.length === 0) {
            return (
                <ActivityIndicator size="large" color="#0000ff" />
            );
              } else {
            const { navigate } = this.props.navigation;    
        return (
            <View>
                <View>
                    <Carousel
                    //layout={'tinder'} 
                    //layoutCardOffset={3}
                    layout={'stack'} layoutCardOffset={18}
                    vertical={true}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    //sliderHeight={Dimensions.get('window').height}
                    //itemHeight={Dimensions.get('window').height}
                    sliderHeight={450}
                    itemHeight={450}
                    />
                </View>
                <View style={{position: "relative", alignItems: "center", marginTop: 10 }}>
                    <Text style={{fontSize: 16}}>Está perdido? Clique abaixo para</Text>
                    <Button
                        title='Ler QR Code'
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 150,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 10
                        }}
                    />
                </View>
                <View style={{flex: 1, flexDirection: "row", marginTop: 10, alignSelf: "center"}}>
                    <Button
                        title='Cancelar'
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            backgroundColor: "rgba(242, 91, 90, 1)",
                            width: 150,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 10
                        }}
                    />
                    <Button
                        title='Finalizar'
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            backgroundColor: "rgba(0, 190, 0, 1)",
                            width: 150,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 10
                        }}
                    />
                </View>
            </View>
        );
    }};
}