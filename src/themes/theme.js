
import { StyleSheet} from 'react-native';
  
const styles = StyleSheet.create({
    tituloText:{ 
        marginVertical:'4%',
        fontSize: 28, color: '#620C31', letterSpacing: 1
    },
    topImage:{height: 190, width: 120 },
    bottomImage:{height: 80, width: 150 },
    titulo:{marginHorizontal:'2%', alignItems:'center', marginTop:10},
    consume:{ fontSize: 35, color: '#050545', letterSpacing: 1, fontFamily:'Izmir-Heavy'},
    hidalgo:{ fontSize: 35, color: 'rgba(160,33,66,1)', letterSpacing: 1, fontFamily:'Izmir-Heavy'},
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

 
  contenedor:{ 
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
  },   
  sesion:{ 
    fontSize:15,
    lineHeight:21,
    textAlign:'justify',
    color:'#000'
  },
  cabecera:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#BC945B', letterSpacing: 1
  },
  cabecera2:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#BC945B', letterSpacing: 1
  },



azul:{ 
    marginVertical:'4%',
    fontSize: 28, color: '#620C31', letterSpacing: 1
},
azulProductos:{
  marginTop:'-2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#620C31', letterSpacing: 1
},

azulServicios:{
  marginTop:'2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#620C31', letterSpacing: 1
},
rowEnd: {
  marginTop:'3%',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '5%'
},
 row: {   
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  Vw_1: {
    flex: 1,
    height: 100,
    marginRight:10,
    marginLeft:10,
  },
  Vw_2: {
    marginRight:10,
    marginLeft:10,
  },
  Touchable: {
    backgroundColor: '#620C31',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width:'80%',
    height:'40%',
    alignItems:'center',
    alignSelf:'center',
    marginTop:'6%',
  },
  TextoBoton:{
    color:'white',
  },
})

export default styles