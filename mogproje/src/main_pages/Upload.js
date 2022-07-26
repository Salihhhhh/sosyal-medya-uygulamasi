import * as React from 'react';
import {
  ScrollView,
  View,
  Text, Image, KeyboardAvoidingView, Button, TouchableHighlight, TextInput, Picker,Alert,Dimensions
} from 'react-native';
import { ImagePicker, Constants ,Video } from 'expo';
import Header from '../components/Header'
import {Container} from 'native-base';
import firebase from '../components/FirebaseConfig'
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const programmingGames = [
  {
    label: 'Kategori Seçin',
    value: 'kategori',
  },
  {
    label: 'Pubg',
    value: 'pubg',
  },
  {
    label: 'Csgo',
    value: 'csgo',
  },
  {
    label: 'Lol',
    value: 'lol',
  },
  {
    label: 'Pubg Mobile',
    value: 'pubgmobile',
  },
  {
    label: 'Fortnite',
    value: 'fortnite',
  },
  {
    label: 'Call of duty series',
    value: 'codseries',
  },

];
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class Upload extends React.Component {



      state = {
        progress: 20,
        progressWithOnComplete: 0,
        progressCustomized: 0,
        image: null,
        type:null,
        uri:'',
        filename:'',
        status:'',
        uid:'',


      }


    
      
      



    _pickImage = async () => {


  

      
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
          mediaTypes:'All',
          quality:0.5,
        
          
     
         
        });

    
        console.log(result);
    
        if (!result.cancelled) {
    this.setState({ image: result.uri });
    this.setState({ uri: result.uri });
    var fileName = result.uri.substring(result.uri.lastIndexOf("/") + 1);
          this.setState({
            filename:fileName
          })

  this.setState({
    type:result.type
  })
        }
      }
    

  uploadImage = async () => {

if(this.state.image === null)
{
Alert.alert("gönderi seçiniz");
}
else
{
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
      xhr.open('GET', this.state.uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child('Posts/' + firebase.auth().currentUser.uid + '/' + this.state.filename);

 
      const a1 = ref.put(blob);
      

      a1.on(
        'state_changed',
        (snapshot) => {

          const progressWithOnComplete = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progressWithOnComplete});
          console.log('Upload is ' + progressWithOnComplete + '% done');
   
              if(progressWithOnComplete===100){
          

         
            
       
               sleep(5000).then(() => {
          
                
                firebase.storage().ref('Posts/' + firebase.auth().currentUser.uid + '/' + this.state.filename).getDownloadURL().then(url1 => {
    this.setState({url: url1});
   this.Kaydet();
              })
           
            });
           


  
       
              }

        });




  



    return await snapshot.ref.getDownloadURL();

   // We're done with the blob, close and release it
      }

  }

  Kaydet(){

  


    var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes



        if(min===1||min===2||min===3||min===4||min===5||min===6||min===7||min===8||min===9){
          min=0+""+min;
        }
        if(hours===1||hours===2||hours===3||hours===4||hours===5||hours===6||hours===7||hours===8||hours===9){
          hours=0+""+hours;
        }
        if(month===1){
          month="ocak"
        }
        if(month===2){
          month="şubat"
        }
        if(month===3){
          month="mart"
        }
        if(month===4){
          month="nisan"
        }
        if(month===5){
          month="mayıs"
        }
        if(month===6){
          month="haziran"
        }
        if(month===7){
          month="temmuz"
        }
        if(month===8){
          month="ağustos"
        }
        if(month===9){
          month="eylül"
        }
        if(month===10){
          month="ekim"
        }
        if(month===11){
          month="kasım"
        }
        if(month===12){
          month="aralık"
        }
       
 
        var  tarih=date+" "+month+" "+year+"-"+(hours)+":"+min
console.log('asdasdasd',this.state.image)


firebase.firestore().collection('Post2').add({
  status: this.state.status,
  url:this.state.url,
  date:tarih,
  type:this.state.type,
  like:1,
  categories:"pubg",
  yorumSayisi:0,
  uid:firebase.auth().currentUser.uid
}).then(ref => {


  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection("posts").doc().set(
           
    {
   
    // followersSayisi : firebase.auth().currentUser.uid,
        date:tarih,
   id:ref.id
   })
            .then(function () {
    console.log("Document successfully updated!");

            });
  console.log('Added document with ID: ', ref.id);


  /////--------------------------------
  const timestamp = Date.now(); 
  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('followers').get().then(snapshot => {snapshot .docs.forEach(maindoc =>

    {
       
      firebase.firestore().collection('Users').doc(maindoc.data().followers).collection("feed").doc().set(
             
        {
          uid:firebase.auth().currentUser.uid,
          postid:ref.id,
          time:timestamp
       
       })
                .then(function () {
        console.log("Document successfully updated!");
    
                });
  
  
  
  
  
  
    });
    });
  
});
//-



let cityRef = firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid);
 let getDoc = cityRef.get().then(doc => {




firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).update({
  
  post:doc.data().post+1


})
  .then(function () {
    console.log("Document  updated!");
  
  });


});


  


  }


  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const { inputStyle } = styles;
    Header.degis("Yükle");

 
    return (





<Container style={{ flex: 1, backgroundColor: '#ffffff' }} >
<Header navigation={this.props.navigation} />


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




{ this.state.type === 'image' ? <Image source={{ uri: this.state.image }} style={{ width: 150, height: 120, borderRadius: 150, borderWidth: 2, borderColor: 'orange' }} />
        : null }

        { this.state.type === 'video' ? <Video
        source={{ uri: this.state.image }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
  
        style={{ width: 300, height: 300 }}
        /> 
        : null }


  
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
          alignItems: 'center', textAlign: 'center', alignContent: 'center', flex: 1,paddingTop:15
        }}
      >
 <ProgressBarAnimated
            width={barWidth}
            value={this.state.progressWithOnComplete}
            onComplete={() => {
              Alert.alert('Video başarı ile yülendi. Lets Go');
        
    
            }}
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

<Picker
            selectedValue={this.state.game}
            onValueChange={itemValue => this.setState({ game: itemValue })}>
            {programmingGames.map((i, index) => (
              <Picker.Item key={index} label={i.label} value={i.value} />
            ))}
          </Picker>

        <Button
          style={{
            fontSize: 20, color: 'green',
            paddingTop: 15,
            paddingLeft:25
          }}
          styleDisabled={{ color: 'red' }}
          onPress={() => this.uploadImage()}
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

const styles = ({

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

});
