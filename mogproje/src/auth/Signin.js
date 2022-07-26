import * as React from 'react';
import { Alert, Text, View, TextInput, Image, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import * as firebase from "firebase";
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import User from '../components/User';
import FirebaseConfig from '../components/FirebaseConfig'



// You can import from local files



// or any pure javascript modules available in npm


export default class Signin extends React.Component {

  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      emailValidate: true,


    }

  }

  componentWillMount() {
    this.checkifLoggedIn();
  }
  componentWillUnmount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }

  }

  state = { email: '', password: '', loading: false };

  checkifLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.props.navigation.navigate('MainBottom');
      }
      else {
        //  Actions.SignUpScreen();
      }


    }.bind(this)
    );
  };

  clickLogin() {

    const { email } = this.state;
    const { password } = this.state;




    if (email == "" || password == "") {
      Alert.alert(
        'Bir takım hatalar var',
        'Email ve Şifre boş olamaz',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );

    }
    else {

      console.log(' click logine girdi ');



      this.setState({ loading: true });
      const { email, password } = this.state;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.loginSucces.bind(this))
        .then(this.loginSucces.bind(this))
        .catch(this.loginFail.bind(this));



    }
  }



  loginSucces() {

    console.log('başarılı oldu');



    this.props.navigation.navigate('MainBottom');



  }

  loginFail() {
    this.validate();
    console.log('Hatalı oldu ');
  }


  async loginWithFacebook() {

    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('404003290367896', { permissions: ['public_profile'] })

    if (type == 'success') {
      console.log('sadasdasd');
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error)
      })


    }
  }

  renderButton() {


    return <Button onPress={this.clickLogin.bind(this)}> GİRİŞ </Button>;


  }


  validate() {

    Alert.alert(
      'Bir takım hatalar var',
      'Lütfen bilgileri kontrol edip tekrar deneyiniz',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );

  }
  state = { color: 'green' };





  render() {
    const { navigation } = this.props;
    const { inputStyle, imageStyle, textStyle, viewStyle, imageStyle2 } = styles;
    return (



      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>



        <Card>

          <View style={{ backgroundColor: '#fdfdfd', paddingTop: 10, justifyContent: 'center', flexDirection: "row", }}>
            <Text style={{ color: '#5f6161' }} > Kayıtlı değil misiniz ?</Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('SignUpScreen')}>
              <Text style={{ fontWeight: "bold" }} > Kaydol </Text>
            </TouchableHighlight>
          </View>


          <CardSection>
            <Image style={imageStyle} source={require('../../assets/personicon.png')} />
          </CardSection>


          <View style={viewStyle}>
            <Image
              style={styles.imageStyle2}
              source={require('../../assets/emailicon.png')}
            />
            <TextInput
              style={inputStyle}
              value={this.state.email}


              onChangeText={email => this.setState({ email })}
              placeholder="Email"

              underlineColorAndroid="transparent"
            />

          </View>

          <View style={viewStyle}>
            <Image
              style={styles.imageStyle2}
              source={require('../../assets/outline_lock_black_48dp.png')}
            />

            <TextInput
              secureTextEntry
              style={inputStyle}

              placeholder={"Parola"}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </View>


          <CardSection >
            {this.renderButton()}
          </CardSection>





          <View

            style={{

              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',

            }}


          >
            <TouchableHighlight onPress={() => this.loginWithFacebook()}>

              <Image
                style={{
                  width: 150,
                  height: 45
                }}
                source={require('../../assets/facelogo.png')} />




            </TouchableHighlight>

          </View>


          <View>
            <Text style={{ textDecorationLine: "underline", paddingTop: 7, fontSize: 10, justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}> Şifremi unuttum </Text>
          </View>






        </Card>







      </KeyboardAvoidingView>



    );
  }
}
const styles = {
  inputStyle: {
    fontSize: 15,
    flex: 1,
    height: 40,

    paddingLeft: 5,


  },




  imageStyle: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    flex: 1,
  },


  textStyle: {
    color: 'gray',
  },
  viewStyle: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 20

  },

  imageStyle2: {
    height: 25,
    width: 15,
    resizeMode: 'contain',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  container: {
    flex: 1,

    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  error: {
    borderWidth: 3,
    borderColor: 'red'
  },
};
