import React from 'react';
import NavigationBar from 'navigationbar-react-native';

import { Image, StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Picker } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, Card, Divider, FormInput, FormLabel, FormValidationMessage, Header, Icon, List, ListItem, PricingCard, SocialIcon, Text } from 'react-native-elements';

 const list = [
  {
    name: 'Felipe Allan de Oliveira',
    avatar_url: 'https://scontent.fnat3-1.fna.fbcdn.net/v/t1.0-1/15578967_1253164171416698_1423193258812771964_n.jpg?_nc_cat=0&oh=501b38e2c4bccb4a62595a0eacfdc9a7&oe=5B945EF3'
  },
  {
    name: 'Vinicius Coelho',
    avatar_url: 'https://scontent.fnat3-1.fna.fbcdn.net/v/t1.0-1/21616419_1773106859388599_3211115652434570361_n.jpg?_nc_cat=0&oh=151655f8f5873e658141c555853c9c5b&oe=5B8374AA'
  },
  {
    name: 'Felipe Lima',
    avatar_url: 'https://scontent.fnat3-1.fna.fbcdn.net/v/t1.0-9/13434851_985404518238714_8928287183389429673_n.jpg?_nc_cat=0&oh=57929383c1f05389cc7dd72a8b9fc310&oe=5B82CB7C'
  },
  {
    name: 'Samuel Junior',
    avatar_url: 'https://scontent.fnat3-1.fna.fbcdn.net/v/t1.0-9/14045676_1027338950720505_2911036952893746930_n.jpg?_nc_cat=0&oh=355f9eed85c0d00ed5879267f5fb2b0a&oe=5B979676'
  },
  {
    name: 'Jarbson Costa',
    avatar_url: 'https://scontent.fnat3-1.fna.fbcdn.net/v/t1.0-9/27336444_1563180387129687_5800785321149983021_n.jpg?_nc_cat=0&oh=1f61a86575dde3e868f27ebf7b29c449&oe=5B52E3B8'
  },
]
 
 export default class OndeEstou extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View>
          <Header 
            style={{ paddingTop:-30 }}
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Onde estou?', style: { color: '#fff', fontSize: 20 } }}
          />
        </View>
        <View>
          <Icon
            name='location-on'
            type='materialIcons'
            color='red'
            size={100}
          />
        </View>
        <View> 
          <List containerStyle={{marginBottom: 20}}>
            {
              list.map((l, i) => (
                <ListItem
                  roundAvatar
                  avatar={{uri:l.avatar_url}}
                  key={i}
                  title={l.name}
                />
              ))
            }
          </List>
          
        </View>
        <View>
          <Text style={{textAlign:'center'}}>Caso não saiba onde está</Text>
          <Icon
            name='qrcode'
            type='font-awesome'
            color='grey'
            size={70}
          />
          <Button
            large
            iconRight={{name: 'check', type: 'entypo'}}
            title='Ler QR CODE' 
            backgroundColor='rgb(0,185,230)'
            borderRadius={10}
            onPress={() => navigate('LoginRoute')}
          />
        </View>
      </ScrollView>
    );
  }
}