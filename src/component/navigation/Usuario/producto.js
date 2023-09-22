/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Modal, Pressable, Linking, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, Avatar} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LogBox} from "react-native";

 
    
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
        <View style={{backgroundColor:'white', paddingVertical:20}}>
        <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
            <ScrollView >
            <Card>
                <Card.Content>


                {logops ==='https://consume.hidalgo.gob.mx/logo_negocio/' + props.masinformacion.logo ?
                            <View style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                                <Avatar.Image  style={{border:10, borderColor:'red'}} marginVertical='3%' size={80} source={require('../../../../assets/img/sin_logo.png')}
                                />
                            </View>
                                :
                            <View style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                                <Avatar.Image style={{border:10, borderStyle:'solid', borderColor:'red', display:'flex'}} marginVertical='3%' size={80} source={{ uri: '' + props.masinformacion.logo }}
                                />                                
                            </View> 
                            }
                            <Text></Text>

                    <Title style={{ fontWeight:'bold', textTransform:'uppercase',  textAlign:'center', width:'100%', color: 'rgba(160,33,66,1)', paddingHorizontal:20 }}>{props.titulo}</Title>
                    <Text></Text>
                    <Text></Text>
                    <Paragraph style={{textAlign: 'justify', marginBottom: 10}}>{props.descripcion}</Paragraph>
                     {/* <View style={styles.container}> */}
                            {/* <View style={[styles.box, styles.box1]}> */}
                                
                                {props.sucursales.length?
                                    <Text style={{ color: 'rgba(160,33,66,1)', fontWeight: 'bold', }}>Sucursales:</Text>
                                :
                                    <View></View>
                                }                                
                                {props.sucursales.map((sucursal, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'sucursal' + i}>{sucursal}</Text>
                                    );
                                })}
                         
                                <Text style={{ color: 'rgba(160,33,66,1)', fontWeight: 'bold', }}>Direccion:</Text>
                                {props.direcciones.map((direccion, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'direccion' + i}>{direccion}</Text>
                                    );
                                })}

                               
                               {props.masinformacion.metodosentrega.length?
                                <Text style={{ color: 'rgba(160,33,66,1)', fontWeight: 'bold', }}>Métodos de entrega:</Text>
                                :
                                <View></View>
                               }                                
                                {props.masinformacion.metodosentrega.map((entrega, i) => {
                                    return(
                                        <Text style={{ color: 'black', fontStyle: 'italic' }} key={'entrega' + i}>{entrega}</Text>
                                    );
                                })}

<View>
<Text></Text>
<Text></Text>
<Text style={{width:'100%',  
  backgroundColor:'rgb(188,149,91)'}}></Text>

</View>


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
  
                    <View style={{width:'100%', position:'relative', zIndex:99}} >
                        <Button 
                            style={{ position:'absolute', backgroundColor:'#620C31', minHeight:40, minWidth:40, right:0, height:40, width:40,  color:'orange'}}
                                onPress={() => setModalVisible(!modalVisible)} >
                                <Text style={{zIndex:999, color:'white'}}>X</Text>
                                </Button>
                    </View>

                        <View style={styles.modalView}>    

                        
                  
                            {logops ==='https://consume.hidalgo.gob.mx/logo_negocio/' +props.masinformacion.logo ?
                            <View>
                                <Avatar.Image  marginVertical='3%' size={190} source={require('../../../../assets/img/sin_logo.png')}
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
                                  {
                                    props.masinformacion.horario.length>=1?<Text style={{ color: 'rgba(160,33,66,1)', fontWeight: 'bold', }}>Horario de Atención:</Text>
                                    :<View></View>
                                }
                                 

                           
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
                                {
                                    props.masinformacion.metodospago.length>=1?  <Text style={{ color: 'rgba(160,33,66,1)', fontWeight: 'bold', }}>Métodos de Pago:</Text>
                                    :<View></View>
                                }
                                  
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
                                            size={35}
                                            onPress={() => {Linking.openURL('mailto:' + email + '?subject=Consume Hidalgo')}}
                                            />
                                    </View>
                                :
                                    <View></View>
                                }
                            </View>
                       
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
    buttonClose: { backgroundColor: "rgba(105, 28, 49, 1)", },
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
        backgroundColor: 'rgba(105, 28, 49, 1)',
        height: '100%',
        marginHorizontal: '2%',
    },
    red2: {
        backgroundColor: 'rgba(221,201,163,1)',
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
