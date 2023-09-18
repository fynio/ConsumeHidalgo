/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Modal, Pressable, Linking, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, Avatar} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LogBox} from "react-native";

LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    ])
    
const MyCard = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    
    const [tel, setTel] = useState(props.masinformacion.tel);
    const [face, setFace] = useState(props.masinformacion.facebook);
    const [what, setWhat] = useState(props.masinformacion.whatsapp);
    const [email, setEmail] = useState(props.masinformacion.email);
    const [web, setWeb] = useState(props.masinformacion.web);
    const [inst, setInst] = useState(props.masinformacion.instagram);
    const [twit, setTwit] = useState(props.masinformacion.twitter);
    const [myap, setMyap] = useState(props.masinformacion.myapp);
    const [logops, setLogops] = useState(props.masinformacion.logo);

    const cargarListado = (dataArray) => {
        const lista_horarios = [];
        for (let index = 0; index < dataArray.length; index++) {
            lista_horarios.push(<Text style={styles.horariosModal} key={'texti' + index}>{dataArray[index]}</Text>);
        }
        return lista_horarios;
    };

    

    return (
        <View style={{height:400}}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <ScrollView>
            <Card>
                <Card.Content>
                <Title style={{ color: '#0080dc', }}>{props.titulo}</Title>
                    <Paragraph style={{textAlign: 'justify', marginBottom: 10}}>{props.descripcion}</Paragraph>
                     {/* <View style={styles.container}> */}
                            {/* <View style={[styles.box, styles.box1]}> */}
                                
                                {props.sucursales.length?
                                    <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Sucursales:</Text>
                                :
                                    <View></View>
                                }                                
                                {props.sucursales.map((sucursal, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'sucursal' + i}>{sucursal}</Text>
                                    );
                                })}
                            {/* </View> */}
                            {/* <View style={[styles.box, styles.box2]}> */}
                                <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Direccion:</Text>
                                {props.direcciones.map((direccion, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'direccion' + i}>{direccion}</Text>
                                    );
                                })}

                               
                               {props.masinformacion.metodosentrega.length?
                                <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Métodos de entrega:</Text>
                                :
                                <View></View>
                               }                                
                                {props.masinformacion.metodosentrega.map((entrega, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'entrega' + i}>{entrega}</Text>
                                    );
                                })}

                            {/* </View>  */}
                     {/* </View>  */}
                </Card.Content>
            </Card>
            </ScrollView>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }} >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>                            
                            {logops ==='https://dev.upmh.edu.mx/consumeHidalgo/logo_negocio/'?
                            <View>
                                <Avatar.Image  marginVertical='3%' size={190} source={require('../../assets/img/sin_logo.png')}
                                />
                            </View>
                                :
                            <View>
                                <Avatar.Image  marginVertical='3%' size={190} source={{ uri: '' + props.masinformacion.logo }}
                                />                                
                            </View> 
                            }
                            <View style={styles.contenedor_contenidoModal}>
                                <View style={styles.box}>
                                    <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Horario de Atención:</Text>
                                    {                                        
                                         //{cargarListado(props.masinformacion.horario)} 
                                         props.masinformacion.horario.map((horariod, i) => {
                                            return(
                                                <Text style={styles.horariosModal} key={'texti' + i}>{horariod}</Text>
                                            );
                                        })
                                    }
                                </View>
                                <View style={styles.box2}>
                                    <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Métodos de Pago:</Text>
                                    {
                                        /* {cargarListado(props.masinformacion.metodospago)} */
                                         props.masinformacion.metodospago.map((metodopago, i) => {
                                            return(
                                                <Text style={styles.horariosModal} key={'texti' + i}>{metodopago}</Text>
                                            );
                                        }) 
                                    }
                                </View>
                            </View>
                            <View style={styles.redes}>
                                
                                {tel?
                                    <View style={[styles.redA]}>
                                        <IconButton
                                            flexDirection='row'
                                            icon="phone"
                                            color="#007bff"
                                            size={27}
                                            onPress={() => { Linking.openURL('tel:+' + props.masinformacion.tel) }}
                                        />
                                    </View>
                                :
                                    <View></View>
                                }

                                {what?
                                    <View style={[styles.red0]}>                                   
                                        <IconButton
                                            flexDirection='row'
                                            icon="whatsapp"
                                            color="#28a745"
                                            size={35}
                                            onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=' + props.masinformacion.whatsapp)}
                                        />
                                    </View>
                                    :
                                    <View></View>
                                }
                                                                
                                {face?                                    
                                    <View style={[styles.red0]}>
                                        <IconButton
                                            flexDirection='row'
                                            icon="facebook"
                                            color="#007bff"
                                            size={35}
                                            onPress={() => Linking.openURL(props.masinformacion.facebook)}/>
                                    </View>
                                :
                                    <View></View>
                                } 
                                
                                {inst?
                                    <View style={[styles.red0]}>                                   
                                        <IconButton
                                            flexDirection='row'
                                            icon="instagram"
                                            color="#F71529"
                                            size={35}
                                            onPress={() => Linking.openURL(inst)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                                {twit?
                                    <View style={[styles.red0]}>                                   
                                        <IconButton
                                            flexDirection='row'
                                            icon="twitter"
                                            color="#0DCDE3"
                                            size={35}
                                            onPress={() => Linking.openURL(twit)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                                {myap?
                                    <View style={[styles.red0]}>                                    
                                        <IconButton
                                            flexDirection='row'
                                            icon="store"
                                            color="#D4D713"
                                            size={35}
                                            onPress={() => Linking.openURL(myap)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }

                                {web?
                                    <View style={[styles.red0]}>                                    
                                        <IconButton
                                            flexDirection='row'
                                            icon="laptop"
                                            color="#858580"
                                            size={35}
                                            onPress={() => Linking.openURL(web)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                                {email?
                                    <View style={[styles.red0]}>                                    
                                        <IconButton
                                            flexDirection='row'
                                            icon="email"
                                            color="#F38808"
                                            size={35}
                                            onPress={() => {Linking.openURL('mailto:' + email + '?subject=Consume Hidalgo')}}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)} >
                                <Text style={{ color: 'white', fontWeight: 'bold', }}>Seguir explorando</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    box: { flex: 1, backgroundColor: 'white', },
    box2: { backgroundColor: 'white' },
    container: { flex: 1, flexDirection: 'row', justifyContent: 'center', },
    // de aqui hacia abajo son estilos de la modal
    contenedor_contenidoModal: { flexDirection: 'row', },
    horariosModal: { fontSize: 12, color: 'black', },
    centeredView: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 },
    modalView: { margin: 10, backgroundColor: "white", borderRadius: 20, padding: 10, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    button: { borderRadius: 20, padding: 10, elevation: 2, marginTop: '5%', },
    buttonClose: { backgroundColor: "#2196F3", },
    textStyle: { color: "black", fontWeight: "bold", textAlign: "center" },
    imagenModal: { width: 200, height: 200, marginBottom: '1%', marginTop: '2%', },

    redes: {
        flexDirection: 'row',
        marginHorizontal: '20%',
        marginVertical: '6%',
    },
    red0: {
        height: '80%',
        marginHorizontal: '-5%',
    },
    redA: {
        height: '80%',
        marginHorizontal: '-4%',
        marginTop:10
    },
    red1: {
        backgroundColor: '#2196F3',
        height: '100%',
        marginHorizontal: '2%',
    },
    red2: {
        backgroundColor: '#8BC34A',
        height: '100%',
        marginHorizontal: '2%',
    },
    // red3: {
    //   backgroundColor: '#e3aa1a',
    //   height:'100%',
    //   marginHorizontal:'2%',
    // }
});

export default MyCard;
