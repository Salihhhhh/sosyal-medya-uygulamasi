import * as React from 'react';
import {
  ScrollView,
  View,
  Text, Image, KeyboardAvoidingView, Button, TouchableHighlight, ImageBackground,ActivityIndicator
} from 'react-native';

import firebase from '../components/FirebaseConfig'
import { Container } from 'native-base';
import ProfileBackMenu from '../components/ProfileBackMenu'
import { TextInput } from 'react-native-gesture-handler';

import { ImagePicker, Constants } from 'expo';




export default class SignUp extends React.Component {
  state = {showIndicator:true}
  constructor(props) {
    super(props);
    //this.dataUpdate=this.dataUpdate.bind(this);
    this.state = {

      showIndicator:true
      }
    
  }
  state = {
    image: null,
  };
  state = { name: '', username: '', email: '', twitchuser: '',youtubeuser:"", status: '' ,url2:""};


  componentWillMount() {
    this.readUserData();
    this.readImage();

  }
  readUserData() {
    //  this.setState({ uid: firebase.auth().currentUser.uid });

    const db = firebase.firestore();

    db.collection('Users').where("uid", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data().name)

        this.setState({ username: doc.data().username })
        this.setState({ twitchuser: doc.data().twitchuser })
        this.setState({ status: doc.data().status })
        this.setState({ name: doc.data().name })
        this.setState({ email: doc.data().email })
        this.setState({ youtubeuser: doc.data().youtubeuser })

        this.setState({
          showIndicator:false,
        })
      });

    });
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.uploadImage(result.uri);

    }
  }






  dataUpdate = () => {
    const db = firebase.firestore();

    db.collection('Users').where("uid", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
      snapshot.docs.forEach(doc => {

        db.collection("Users").doc(doc.id).update({

          "twitchuser": this.state.twitchuser,
          "status": this.state.status,
          "name": this.state.name,
          "src":this.state.url2,
          "youtubeuser":this.state.youtubeuser
        })
          .then(function () {
            console.log("Document successfully updated!");

          });


      });



    });

  }

  uploadImage = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child('images/' + 'profileImage/' + firebase.auth().currentUser.uid + '/' + 'userProfileImage');
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();


   
      firebase.storage().ref('images/' + 'profileImage/' + firebase.auth().currentUser.uid + '/' + 'userProfileImage').getDownloadURL()
        .then((url) => {
          console.log(url);
          this.setState({ url2: url });

        }).catch( () => {
          this.setState({url2:'https://firebasestorage.googleapis.com/v0/b/mediaofgamers-e3c1a.appspot.com/o/images%2FprofileImage%2Fdefault%2Fperson-icon-flat.png?alt=media&token=f3806f51-f779-4d4a-84d2-8725ccfe4b13'});
     
            });
    
    return await snapshot.ref.getDownloadURL();

  }

  readImage() {

    setTimeout(() => {
      firebase.storage().ref('images/' + 'profileImage/' + firebase.auth().currentUser.uid + '/' + 'userProfileImage').getDownloadURL()
        .then((url) => {
          console.log(url);
          this.setState({ image: url });

        }).catch( () => {
          this.setState({image:'https://firebasestorage.googleapis.com/v0/b/mediaofgamers-e3c1a.appspot.com/o/images%2FprofileImage%2Fdefault%2Fperson-icon-flat.png?alt=media&token=f3806f51-f779-4d4a-84d2-8725ccfe4b13'});
     
            });
    }, 1000);
  }





  render() {

    ProfileBackMenu.degis("ProfileTab");
    let { image } = this.state;
    const { inputStyle } = styles;

    if(this.state.showIndicator){
      
      return (
        <View style={styles.container}>
          {/*Code to show Activity Indicator*/}
          <ActivityIndicator size="large" color="#0000ff" />
          {/*Size can be large/ small*/}
        </View>
      );  
    }
    else{

    return (

      <Container style={{ flex: 1, backgroundColor: '#ffffff' }} >

        <ProfileBackMenu navigation={this.props.navigation} />

        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ScrollView contentContainerStyle={styles.contentContainer}>





            <View style={{


              backgroundColor: '#fffdfd',
              paddingLeft: 15,
              paddingRight: 15,
              justifyContent: 'center',
              textAlign: 'center', alignContent: 'center', flex: 1, paddingBottom: 10
            }}>


              <View style={{

                    paddingTop:100,
                backgroundColor: '#fffdfd',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center', alignContent: 'center', paddingBottom: 10
              }}>



<View style={{  position: 'absolute', zIndex: 0,}}>


              {image &&
                  <Image source={{ uri: image }} style={{ width: 150, height: 120, borderRadius: 150, borderWidth: 2, borderColor: 'orange' }} />
                }


                  
</View>

          
<View style={{  position: 'absolute', zIndex: 1,bottom:0,backgroundColor: 'orange',opacity:0.5}}>
   <TouchableHighlight onPress={this._pickImage}>
                  <Image
                    style={{ backgroundColor: 'white', flex: 1  ,position: 'absolute', zIndex: 0,bottomRight:10}}
                    style={styles.button}
                    source={require('../../assets/plus.png')}
                    style={{ width: 25, height: 25 }}
                  />

                </TouchableHighlight>

               
                </View> 

              </View>


              <View

                style={{
                  justifyContent: 'center',
                  alignItems: 'center', textAlign: 'center', alignContent: 'center', flex: 1,
                }}
              >


              </View>

              <Text style={{ paddingTop: 10, paddingLeft: 10, opacity: 0.5 }}>İsim</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>




                <TextInput
                  style={inputStyle}
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}

                  underlineColorAndroid="transparent"
                />
              </View>
              <Text style={{ textAlign: 'center', paddingTop: 10 }}>Kullanıcı Adı</Text>





<View style={{backgroundColor:'#f8f8f9', paddingLeft: 10, paddingRight: 10,  borderRadius: 14,borderColor:'gray'}}>

              <Text style={{ textAlign: 'center', paddingTop: 10, color: 'gray' ,flex:1}}> {this.state.username} </Text>
              </View>


              <Text style={{ textAlign: 'center', paddingTop: 10 }}>Email</Text>






              <View style={{backgroundColor:'#f8f8f9', paddingLeft: 10, paddingRight: 10,  borderRadius: 14,borderColor:'gray'}}>

              <Text style={{ textAlign: 'center', paddingTop: 10, color: 'gray' }}> {this.state.email} </Text>
</View>
              <Text style={{ paddingLeft: 10, paddingTop: 10, opacity: 0.5 }}>Twitch adı</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>





                <TextInput
                  style={inputStyle}
                  value={this.state.twitchuser}
                  onChangeText={twitchuser => this.setState({ twitchuser })}

                  underlineColorAndroid="transparent"
                />
              </View>

              <Text style={{ paddingLeft: 10, paddingTop: 10, opacity: 0.5 }}>Youtube Kanal url</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>





                <TextInput
                  style={inputStyle}
                  value={this.state.youtubeuser}
                  onChangeText={youtubeuser => this.setState({ youtubeuser })}

                  underlineColorAndroid="transparent"
                />
              </View>


              <Text style={{ paddingLeft: 10, paddingTop: 10, opacity: 0.5 }}>Açıklama</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>



                <TextInput
                  style={inputStyle}
                  value={this.state.status}
                  onChangeText={status => this.setState({ status })}

                  underlineColorAndroid="transparent"
                />

              </View>
              <View style={{
                paddingTop: 13,
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                textAlign: 'center', alignContent: 'center', flex: 1,
              }}>
                <Button
                  style={{
                    fontSize: 20, color: 'green',
                    paddingTop: 15,
                    paddingLeft:25
                  }}
                  styleDisabled={{ color: 'red' }}
                  onPress={() => this.dataUpdate()}
                  title="Kaydet"
                >

                </Button>
              </View>
            </View>



          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
                }
  }


}
const styles = {

  inputStyle: {
    fontSize: 15,
    height: 40,
    paddingLeft: 5,
    borderWidth: 1,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 14,

  }, container: {


    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    flex: 1
  },
  contentContainer: {

  }
}