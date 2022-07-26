import React from 'react';
import { View ,Dimensions} from 'react-native';


const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
flex:1,
    padding:15,
   backgroundColor: '#fff',
   justifyContent: 'flex-start',

  }
};

export default Card;