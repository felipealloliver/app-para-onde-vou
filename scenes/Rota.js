import React from 'react';
import ws from '../services/rest-para-onde-vou';
import { Image, Dimensions, StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Avatar, Button, Card, FormInput, FormLabel, Icon, List, ListItem, Text } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit';

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
        entries: [],
        localOrigem: null,
        localDestino: null,
        camera: false,
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
            headers: {'Content-Type': 'application/json', 'Authorization': this.props.navigation.getParam("token", 0)}
          }).then((response) => response.json()).then((responseData) => {
              this.setState({entries: responseData});
              this.state.entries.map(
                  (l, i) => {console.log(l.idLocalPartida)}
              )
          }).catch((error) => {
            console.log(error);
          });
    }

    realocarRota(id) {
        const cancelar = fetch(ws.getBaseURL() + '/rota' + this.props.navigation.getParam("rota"), {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', 'Authorization': this.props.navigation.getParam("token", 0)}
        }).then((response) => {
            console.log(ws.getBaseURL() + '/percurso/' + id + '/' + this.props.navigation.getParam("idLocalDestino", 0));
            fetch(ws.getBaseURL() + '/percurso/' + id + '/' + this.props.navigation.getParam("idLocalDestino", 0), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': this.props.navigation.getParam("token", 0)}
              }).then((response) => response.json()).then((responseData) => {
                  this.setState({entries: responseData});
                  this.state.entries.map(
                      (l, i) => {console.log(l.idLocalPartida)}
                  )
              }).catch((error) => {
                console.log(error);
              }); 
        }).catch((error) => {
          console.log(error);
          Alert.alert(
            'Falha ao cancelar a Rota',
            this.props.navigation.getParam("rota",0),
            [
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        });
    }

    render () {
        console.log(this.state.camera)
        if (this.state.entries.length === 0) {
            return (
                <ActivityIndicator size="large" color="#0000ff" />
            );
              } else if (this.state.camera == false) {
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
                    sliderHeight={400}
                    itemHeight={400}
                    />
                </View>
                <View style={{position: "relative", alignItems: "center", marginTop: 10 }}>
                    <Text style={{fontSize: 16}}>Está perdido? Clique abaixo para</Text>
                    <Button
                        title='Ler QR Code'
                        titleStyle={{ fontWeight: "700" }}
                        onPress={() => {this.setState({camera: true})}}
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
                        onPress={ this.cancelarRota }
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
                        onPress={ this.finalizarRota }
                    />
                </View>
            </View>
        );
    } else {
        return (
            <CameraKitCameraScreen
                actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                onBottomButtonPressed={(event) => this.setState({camera: false})}
                scanBarcode={true}
                laserColor={"blue"}
                frameColor={"green"}
    
                onReadCode={((event) => {
                        console.log(event.nativeEvent.codeStringValue);
                        this.setState({camera: false});
                        this.realocarRota(event.nativeEvent.codeStringValue);
                    })} //optional
                hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
                showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
                offsetForScannerFrame = {30}   //(default 30) optional, offset from left and right side of the screen
                heightForScannerFrame = {600}  //(default 200) optional, change height of the scanner frame
                colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
            />)
    }};


    finalizarRota = () => {
        const { navigate } = this.props.navigation;
        const finalizar = fetch(ws.getBaseURL() + '/rota' + this.props.navigation.getParam("rota"), {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json', 'Authorization': this.props.navigation.getParam("token", 0)}
        }).then((response) => {
          navigate("OndeEstouRoute", { token: this.props.navigation.getParam("token", 0) });
        }).catch((error) => {
          console.log(error);
          Alert.alert(
            'Falha ao encerrar a Rota',
            this.props.navigation.getParam("rota",0),
            [
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        });
      };

      cancelarRota = () => {
        const { navigate } = this.props.navigation;
        const cancelar = fetch(ws.getBaseURL() + '/rota' + this.props.navigation.getParam("rota"), {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', 'Authorization': this.props.navigation.getParam("token", 0)}
        }).then((response) => {
          navigate("OndeEstouRoute", { token: this.props.navigation.getParam("token", 0) });
        }).catch((error) => {
          console.log(error);
          Alert.alert(
            'Falha ao cancelar a Rota',
            this.props.navigation.getParam("rota",0),
            [
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        });
      };
}