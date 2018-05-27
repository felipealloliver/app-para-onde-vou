import React from 'react';
import ws from '../services/rest-para-onde-vou';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
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

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View>
                <Text>Teste</Text>


            </View>
        )
    };
}