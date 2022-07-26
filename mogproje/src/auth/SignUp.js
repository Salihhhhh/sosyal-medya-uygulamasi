import * as React from 'react';
import {
  Alert,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
  
} from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';

import firebase1 from '../components/FirebaseConfig'
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';


// You can import from local files


// or any pure javascript modules available in npm

export default class SignUp extends React.Component {
  
  state = { name: '', username: '', email: '', password: '', loading: false ,followers:0,following:0,post:0,interest:'',status:'',uid:'',twitchuser:''};

  constructor(props) {

    super(props);


    this.state = {
      username: '',
      email: '',
      followers: 0,
      following:0,
      post:0,
      status:'herhangi bir açıklama girilmedi',

      interest:'',
      uid:'',
      twitchuser:'belirtilmemiş',
      youtubeuser:"belirtilmemiş"
    };
  }

  componentWillUnmount() {
   
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
 
  }

  clickLogin() {

    const { name }  = this.state ;
    const { username }  = this.state ;
    const { email }  = this.state ;
    const { password }  = this.state ;
   
  
  
    if (email == "" || password=="" ||name == "" || username=="" ){
      Alert.alert(
        'Bir takım hatalar var',
        'lütfen boş alanları doldurunuz',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
  
      }

      else{
  
  

    this.setState({ loading: true });
    const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginSucces.bind(this))
       .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.loginSucces.bind(this))
          .catch(this.loginFail.bind(this));

      });

    }
  }
  loginSucces() {
    console.log('başargiriş başarılılı');
    this.setState({ loading: false });
    this.saveData();
  }

  loginFail() {
    this.validate();
    console.log('Hatalı');
  }

  saveData(){
    this.setState({ uid: firebase.auth().currentUser.uid });
    this.ref = firebase1.firestore().collection('Users').doc(this.state.uid);
    console.log('asdasd');

    this.ref.set({
      email: this.state.email,
      username: this.state.username,
      name:this.state.name,
      followers:this.state.followers,
      post:this.state.post,
      following:this.state.following,
      status:this.state.status,
    src:"https://firebasestorage.googleapis.com/v0/b/mediaofgamers-e3c1a.appspot.com/o/person-icon-flat.png?alt=media&token=e42fb229-7f24-4727-9c46-bdcb037e02c7",
      interest:this.state.interest,
      uid:this.state.uid,
      twitchuser:this.state.twitchuser,
      youtubeuser:this.state.youtubeuser
   
    }).then((docRef) => {
      this.setState({
        email: '',
        username: '',
        name:'',


      });
   
    })
    .catch((error) => {
   
      console.error("Error adding document: ", error);
      this.setState({
    
      });
    });

  }

  
  validate(){
    
    Alert.alert(
      'Bir takım hatalar var',
      'Lütfen email ve şifre bilgilerinizi kontrol edip tekrar deneyiniz',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    
}

  



  render() {

    
    const {
      inputStyle,
      imageStyle,
      textStyle,
      viewStyle,
    } = styles;

    return (
     


<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView >

  

<Card>

 <View style={{ backgroundColor:'#fdfdfd', paddingTop:10, justifyContent: 'center', flexDirection:"row", }}> 
 <Text style={{color: '#5f6161' }} > Kayıtlı mısınız ?</Text>
  <TouchableHighlight onPress={() => this.props.navigation.navigate('SignInScreen')}>
   <Text style={{fontWeight:"bold"}} > Giriş Yap</Text>
    </TouchableHighlight>
     </View>


 
     
  
          <CardSection>
            <Image style={imageStyle} source={require('../../assets/mog.png')} />
          </CardSection>

      

          <View style={viewStyle}>
            <Image
              style={styles.imageStyle2}
              source={require('../../assets/nameicon.png')}
            />

            <TextInput
              style={inputStyle}
              value={this.state.name}
            placeholder="İsim"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
            />
          </View>

        

          <View style={viewStyle}>
            <Image
              style={styles.imageStyle2}
              source={require('../../assets/personoutline.png')}
            />

            <TextInput
              style={inputStyle}
              value={this.state.username}
        placeholder="Kullanıcı Adı"
              underlineColorAndroid="transparent"
              onChangeText={username => this.setState({ username })}
            />
          </View>

    

          <View style={viewStyle}>
            <Image
              style={styles.imageStyle2}
              source={require('../../assets/emailicon.png')}
            />

            <TextInput
              style={inputStyle}
              value={this.state.email}

              placeholder="Email"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
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

            placeholder="Şifre"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <Button onPress={this.clickLogin.bind(this)}> Kayıt Ol </Button>


          

          <CardSection>
            <Text
              style={{
                fontSize: 10,
                opacity: 0.5,
          flex:1,
                textAlign: 'center',
              }}>
              Kaydolarak, Koşullar'ı ve Veri İlkesi'ni kabul etmiş olursun.
            </Text>
          </CardSection>
         
          </Card>
              </ScrollView>

          </KeyboardAvoidingView>





  
    );
  }
}
const styles = {
  inputStyle: {
    fontSize: 15,
    flex: 1,
    height: 40,
    color: 'black',
    paddingLeft: 5


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
    borderRadius: 14,
    backgroundColor: '#fff',
    marginTop:15

  },

  imageStyle2: {
    height: 25,
    width: 15,
    resizeMode: 'contain',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  container: {


    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
flex:1
  },
};
