import {Text , View} from 'react-native'

export default function App(){
  return(
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#f5f5f5'
    }}>  
      <Text style = {{
        fontSize: 24,
        color: '#333'
      }}>
        Olá
      </Text>
    </View>
  );
}