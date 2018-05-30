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
                    style={{width: Dimensions.get('window').width, height: 400}}
                    source={{uri: 'https://para-onde-vou.herokuapp.com/imagem/' + item.imagem.id + '/imagem'}}
                />
                <View style={{ 
                    backgroundColor: 'rgb(6,90,157)', 
                    borderRadius: 10, 
                    marginLeft: 30, 
                    marginRight: 30, 
                    marginTop: -40,
                    position: 'relative', zIndex: 1
                }}>
                <Text style={styles.title}>{ item.descricao }</Text>
                </View>
            </View>
        );
    }

    componentWillMount() {
        fetch(ws.getBaseURL() + '/percurso/1/11', {
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
            <Carousel
              layout={'tinder'} 
              layoutCardOffset={3}
              vertical={true}
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              sliderHeight={Dimensions.get('window').height}
              itemHeight={Dimensions.get('window').height}
            />
        );
    }};
}