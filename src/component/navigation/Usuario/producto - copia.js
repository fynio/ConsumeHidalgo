/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Modal, Pressable, Linking, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, Avatar} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

    
const MyCard = () => {

    const [modalVisible, setModalVisible] = useState(false);
    


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
                <Title style={{ color: '#0080dc', }}>{titulo}</Title>
                    <Paragraph style={{textAlign: 'justify', marginBottom: 10}}>{descripcion}</Paragraph>
                     {/* <View style={styles.container}> */}
                            {/* <View style={[styles.box, styles.box1]}> */}
                                
                                {sucursales.length?
                                    <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Sucursales:</Text>
                                :
                                    <View></View>
                                }                                
                                {sucursales.map((sucursal, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'sucursal' + i}>{sucursal}</Text>
                                    );
                                })}
                            {/* </View> */}
                            {/* <View style={[styles.box, styles.box2]}> */}
                                <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Direccion:</Text>
                                {direcciones.map((direccion, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'direccion' + i}>{direccion}</Text>
                                    );
                                })}

                               
                               {masinformacion.metodosentrega.length?
                                <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Métodos de entrega:</Text>
                                :
                                <View></View>
                               }                                
                                {masinformacion.metodosentrega.map((entrega, i) => {
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
                                <Avatar.Image  marginVertical='3%' size={190} source={require('../../../../assets/img/sin_logo.png')}
                                />
                            </View>
                                :
                            <View>
                                <Avatar.Image  marginVertical='3%' size={190} source={{ uri: '' + masinformacion.logo }}
                                />                                
                            </View> 
                            }
                            <View style={styles.contenedor_contenidoModal}>
                                <View style={styles.box}>
                                    <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Horario de Atención:</Text>
                                    {                                        
                                 
                                         masinformacion.horario.map((horariod, i) => {
                                            return(
                                                <Text style={styles.horariosModal} key={'texti' + i}>{horariod}</Text>
                                            );
                                        })
                                    }
                                </View>
                                <View style={styles.box2}>
                                    <Text style={{ color: '#0080dc', fontWeight: 'bold', }}>Métodos de Pago:</Text>
                                    {
                                         masinformacion.metodospago.map((metodopago, i) => {
                                            return(
                                                <Text style={styles.horariosModal} key={'texti' + i}>{metodopago}</Text>
                                            );
                                        }) 
                                    }
                                </View>
                            </View>
                            <View style={styles.redes}>
                                
                                {masinformacion.tel?
                                    <View style={[styles.redA]}>
                                        <IconButton
                                            flexDirection='row'
                                            icon="phone"
                                            color="#007bff"
                                            size={27}
                                            onPress={() => { Linking.openURL('tel:+' + masinformacion.tel) }}
                                        />
                                    </View>
                                :
                                    <View></View>
                                }

                                {masinformacion.what?
                                    <View style={[styles.red0]}>                                   
                                        <IconButton
                                            flexDirection='row'
                                            icon="whatsapp"
                                            color="#28a745"
                                            size={35}
                                            onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=' + masinformacion.whatsapp)}
                                        />
                                    </View>
                                    :
                                    <View></View>
                                }
                                                                
                                {masinformacion.face?                                    
                                    <View style={[styles.red0]}>
                                        <IconButton
                                            flexDirection='row'
                                            icon="facebook"
                                            color="#007bff"
                                            size={35}
                                            onPress={() => Linking.openURL(masinformacion.facebook)}/>
                                    </View>
                                :
                                    <View></View>
                                } 
                                
                                {masinformacion.inst?
                                    <View style={[styles.red0]}>                                   
                                        <IconButton
                                            flexDirection='row'
                                            icon="instagram"
                                            color="#F71529"
                                            size={35}
                                            onPress={() => Linking.openURL(masinformacion.inst)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                                {masinformacion.twit?
                                    <View style={[styles.red0]}>                                   
                                        <IconButton
                                            flexDirection='row'
                                            icon="twitter"
                                            color="#0DCDE3"
                                            size={35}
                                            onPress={() => Linking.openURL(masinformacion.twit)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                                {masinformacion.myap?
                                    <View style={[styles.red0]}>                                    
                                        <IconButton
                                            flexDirection='row'
                                            icon="store"
                                            color="#D4D713"
                                            size={35}
                                            onPress={() => Linking.openURL(masinformacion.myap)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }

                                {masinformacion.web?
                                    <View style={[styles.red0]}>                                    
                                        <IconButton
                                            flexDirection='row'
                                            icon="laptop"
                                            color="#858580"
                                            size={35}
                                            onPress={() => Linking.openURL(masinformacion.web)}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                                {masinformacion.email?
                                    <View style={[styles.red0]}>                                    
                                        <IconButton
                                            flexDirection='row'
                                            icon="email"
                                            color="#F38808"
                                            size={35}
                                            onPress={() => {Linking.openURL('mailto:' + masinformacion.email + '?subject=Consume Hidalgo')}}
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
