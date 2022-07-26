import React from 'react';
import { View } from 'react-native';


const CardSection = (props) => {
  return (
    <View style={styles.subContainerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  subContainerStyle: {     
    backgroundColor: '#fff',

    flexDirection: 'row',
    borderColor: 'black',
    position: 'relative',
    paddingTop: 6,

  },
};

export default CardSection;