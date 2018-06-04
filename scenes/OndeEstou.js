import React from 'react';
import ws from '../services/rest-para-onde-vou';
import NavigationBar from 'navigationbar-react-native';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Avatar, Button, Card, FormInput, FormLabel, Icon, List, ListItem, Text } from 'react-native-elements';
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit';

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
        camera: false,
        isCameraAuthorized: false,
        requestingCameraAuthorization: true,
        localOrigem: null,
        localDestino: null,
        idrota: null
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

    requestPermissions = async () => {
        const deviceCameraAuthorizationStatus = await CameraKitCamera.checkDeviceCameraAuthorizationStatus()
    
        if(deviceCameraAuthorizationStatus === true) {
            this.setState({ isCameraAuthorized: true })
        } else if(deviceCameraAuthorizationStatus === -1) {
            this.setState({ requestingCameraAuthorization: true })
            const isCameraAuthorized = await CameraKitCamera.requestDeviceCameraAuthorization()
    
            this.setState({
                requestingCameraAuthorization: false,
                isCameraAuthorized
            })
        }
    }
    

    render() {
        if (this.state.list.length === 0) {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        );
          } else if (this.state.camera == false) {
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
                        onPress={() => {
                            this.requestPermissions();
                            this.setState({camera: true});
                    }} 
                    />
                </View>
            </View>
        )
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
                })} //optional
            hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
            showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            offsetForScannerFrame = {30}   //(default 30) optional, offset from left and right side of the screen
            heightForScannerFrame = {600}  //(default 200) optional, change height of the scanner frame
            colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
        />)
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
                date: "03-06-2018",
                usuario: {
                    id: 1
                },
                localOrigem: {
                    id: this.state.localOrigem
                },
                localDestino: {
                    id: id
                },
                status: "EM_TRANSITO"
                })
            }).then((response) => {
                //this.setState({idrota: response.headers.get('Authorization')});
                navigate("RotaRoute", {idLocalPartida: this.state.localOrigem, idLocalDestino: id, rota: response.headers.get('Location'), token: this.props.navigation.getParam("token", 0)});
            }).catch((error) => {
                console.log(error);
            });
            }
        }
    }
}