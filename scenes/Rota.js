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
        entries: [
            {title: 'texto 6', url: 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'},
            {title: 'texto 5', url: 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'},
            {title: 'texto 4', url: 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'},
            {title: 'texto 3', url: 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'},
            {title: 'texto 2', url: 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'},
            {title: 'texto 1', url: 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'},
        ]
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Image
                    style={{width: Dimensions.get('window').width, height: 400}}
                    source={{uri: item.url}}
                />
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

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

    render () {
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
    };
}