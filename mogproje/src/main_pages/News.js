import * as React from 'react';
import { View, Image,Text, FlatList,StyleSheet,WebView ,TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Container, Content ,Button,Icon, ActionSheet} from 'native-base';
import Header from '../components/Header'
import * as firebase from "firebase";
import { FlatGrid } from 'react-native-super-grid';
import Kesfet from './Kesfet';



export default class Kategoriler extends React.Component {
  constructor(props){
    super(props);


  }

 

  render() {


    return (

      <View style={styles.container} >
      
<Header navigation={this.props.navigation} />
<WebView
        source={{uri: 'http://haber.mediaofgamers.com'}}
        style={{marginTop: 20}}
      />


</View>





    );
  }
}

const styles = StyleSheet.create({

  
  container: {
    flex:1
  }

});