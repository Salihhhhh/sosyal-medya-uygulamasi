import React from 'react'
import { StyleSheet,Text ,View,
    } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

        
export default class ProfileBackMenu extends React.Component {
 
    constructor(props){
        super(props);
      
      }
 
          static degis(gelen){
            yazi=gelen;
            }
   

    render() {
        return (


            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingTop:30,marginBottom:10}}>
                
            <Ionicons

            name="md-arrow-back"
            color="#000000"
            size={25}
            style={styles.menuIcon}
            onPress={() => this.props.navigation.navigate(yazi)}
            />  


        <Text style={{textAlign:'center'}}>{yazi}</Text>
  

            </View>

            
        );

    }

}

const styles =StyleSheet.create({
    menuIcon:{
        zIndex:9,
            position:'absolute',
            left:10,
paddingTop:30

    },


})