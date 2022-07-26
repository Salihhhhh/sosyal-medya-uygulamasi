import React from 'react'
import {
  StyleSheet, Text, View, ScrollView,
  Image, FlatList,
  Animated,
  TouchableOpacity,
  ActivityIndicator,

} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from '../components/FirebaseConfig'
import Profile2 from  '../main_pages/Profile2'
import { ListItem, SearchBar } from 'react-native-elements';
import User from '../components/User';

export default class ProfilList extends React.Component {


    state={todos3:[],itemFollowers:[],itemFollowing:[],itemlİkes:[]}
  constructor(props) {
    super(props);

    
     yazi = props.navigation.getParam('yazi',"gelen");

     uid = props.navigation.getParam('uid',"gelenuuid");
     
    
console.log("uidddddddddddd",uid)
   
  }

  componentWillMount() {
    console.log("giridiiiiiiiiiiii")
    console.log("uidddddhhddddddd",uid)
if(yazi==="followers"){
this.getFollowers();
}
else if(yazi==="like"){
this.getLike(uid);
}
else{
this.getFollowing();
}


  }

  profil2(gelenitem){
    Profile2.degis(gelenitem)
    this.props.navigation.push('Profile2Screen')
}
getLike(gelenid)
{
  var a=[];
  var yazi="takipEdiliyor"
    this.setState({
      modalVisible2:true,
      itemFollowers:a
    })
    const db = firebase.firestore();
  
    db.collection('Post2').doc(gelenid ).collection("likes").get().then(snapshot => {snapshot .docs.forEach(doc =>
  
        {
  
  
      
  
          let cityRef = db.collection('Users').doc(doc.data().like);
              let getDoc = cityRef.get().then(doc1 => {
   
  this.state.itemFollowers.push({
                    username: doc1.data().username,
                    uid: doc1.data().uid,
                    src: doc1.data().src,
                    name:doc1.data().name,
                    takipKontrol:"takipEt"
                  })
                  this.setState({
                    todos3:this.state.itemFollowers
                  })
                });
           
                db.collection('Users').doc(firebase.auth().currentUser.uid).collection('following').where("following", "==",doc.data().like).get().then(snapshot => {snapshot .docs.forEach(doc1 =>
  
                  {
                    var gelenid=doc.data().like;
                    if(doc.data().like===doc1.data().following){
            
                      var index = this.state.itemFollowers.findIndex(gelenitem => gelenitem.uid === gelenid)
                      this.state.itemFollowers[index].takipKontrol="takipEdiliyor";
                      this.setState({
                        todos3:this.state.itemFollowers
                      })
                    }
                  
              
                
                  })
               
              }).then(() => {
                 
              }).
                catch(() => {
             
       
              });
              
        
  
        });
      
    });
}

 getFollowers(){
  var a=[];
var yazi="takipEdiliyor"
  this.setState({
    modalVisible2:true,
    itemFollowers:a
  })
  const db = firebase.firestore();

  db.collection('Users').doc(uid ).collection("followers").get().then(snapshot => {snapshot .docs.forEach(doc =>

      {


    

        let cityRef = db.collection('Users').doc(doc.data().followers);
            let getDoc = cityRef.get().then(doc1 => {
              console.log("jılj",doc.data().followers)
this.state.itemFollowers.push({
                  username: doc1.data().username,
                  uid: doc1.data().uid,
                  src: doc1.data().src,
                  name:doc1.data().name,
                  takipKontrol:"takipEt"
                })
                this.setState({
                  todos3:this.state.itemFollowers
                })
              });
         
              db.collection('Users').doc(firebase.auth().currentUser.uid).collection('following').where("following", "==",doc.data().followers).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                {
                  var gelenid=doc.data().followers;
                  if(doc.data().followers===doc1.data().following){
          
                    var index = this.state.itemFollowers.findIndex(gelenitem => gelenitem.uid === gelenid)
                    this.state.itemFollowers[index].takipKontrol="takipEdiliyor";
                    this.setState({
                      todos3:this.state.itemFollowers
                    })
                  }
                
            
              
                })
             
            }).then(() => {
               
            }).
              catch(() => {
           
     
            });
            
      

      });
    
  });
  ////<Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}} source={{uri: item.url1}} />
}

getFollowing(){
  var a=[];
var yazi="takipEdiliyor"
  this.setState({
    modalVisible2:true,
    itemFollowers:a
  })
  const db = firebase.firestore();

  db.collection('Users').doc(uid).collection("following").get().then(snapshot => {snapshot .docs.forEach(doc =>

      {


    

        let cityRef = db.collection('Users').doc(doc.data().following);
            let getDoc = cityRef.get().then(doc1 => {
              console.log("jılj",doc.data().followers)
this.state.itemFollowers.push({
                  username: doc1.data().username,
                  uid: doc1.data().uid,
                  src: doc1.data().src,
                  name:doc1.data().name,
                  takipKontrol:"takipEt"
                })
                this.setState({
                  todos3:this.state.itemFollowers
                })
              });
         
              db.collection('Users').doc(firebase.auth().currentUser.uid).collection('following').where("following", "==",doc.data().following).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                {
                  var gelenid=doc.data().following;
                  if(doc.data().following===doc1.data().following){
          
                    var index = this.state.itemFollowers.findIndex(gelenitem => gelenitem.uid === gelenid)
                    this.state.itemFollowers[index].takipKontrol="takipEdiliyor";
                    this.setState({
                      todos3:this.state.itemFollowers
                    })
                  }
                
            
              
                })
             
            }).then(() => {
               
            }).
              catch(() => {
           
     
            });
            
      

      });
    
  });
  ////<Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}} source={{uri: item.url1}} />
}

goControl(gelenitem){
    var gelenid=gelenitem.uid;
    var index = this.state.itemFollowers.findIndex(gelenitem => gelenitem.uid === gelenid)

    const db = firebase.firestore();
          


    if(gelenitem.takipKontrol==="takipEdiliyor"){
      this.state.itemFollowers[index].takipKontrol="takipEt";

      db.collection('Users').where("uid", "==", gelenitem.uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          let a =doc.data().followers-1;
   
  
    



          db.collection("Users").doc(gelenitem.uid).update({
  
            followers:a
       
  
          })
            .then(function () {
              console.log("Document delete updated!");
            
            });
  
          
               
            db.collection("Users").doc(gelenitem.uid).collection("followers").doc(firebase.auth().currentUser.uid).delete().then(function() {
              console.log("Document successfully deleted!");
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
  
        });
      });

/////-----------------following çıkar
      db.collection('Users').where("uid", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          let a =doc.data().following-1;
          this.setState({following:a})
          this.setState({followingSayisi:a+''});
  
    



          db.collection("Users").doc(firebase.auth().currentUser.uid).update({
  
            following: a
       
  
          })
            .then(function () {
              console.log("Document delete updated!");
            
            });
  
          
               
            db.collection("Users").doc(firebase.auth().currentUser.uid).collection("following").doc(gelenitem.uid).delete().then(function() {
              console.log("Document successfully deleted!");
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
  
  
         


  
        });
      });
  


    }
    else{
      this.state.itemFollowers[index].takipKontrol="takipEdiliyor";


      ///takip et --------------------------------following-------------------------------------


      db.collection('Users').where("uid", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
  
          let b =doc.data().following+1;
  
          this.setState({following:b+''});
          this.setState({followingSayisi:b+''});
  
  
          db.collection("Users").doc(firebase.auth().currentUser.uid).update({
  
            'following': b,
            "username":User.username
  
          })
            .then(function () {
              console.log("Document successfully updated!");
            
            });
  
          
  
  
  
  
  
  
          db.collection("Users").doc(firebase.auth().currentUser.uid).collection('following').doc(gelenitem.uid).set(
           
              {
             
              // followersSayisi : firebase.auth().currentUser.uid,
                  following:gelenitem.uid,
    
              
  
             })
                      .then(function () {
              console.log("Document successfully updated!");
                   
                      });
  
  
        });
      });
  

//////////----onun followersı



db.collection('Users').where("uid", "==",gelenitem.uid).get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    let a =doc.data().followers+1;



    db.collection("Users").doc(gelenitem.uid).update({

      followers: a
 

    })
      .then(function () {
        console.log("Document successfully updated!");
      
      });

    






    db.collection("Users").doc(gelenitem.uid).collection('followers').doc(firebase.auth().currentUser.uid).set(
     
        {
       
        // followersSayisi : firebase.auth().currentUser.uid,
            followers:firebase.auth().currentUser.uid,

        

       })
                .then(function () {
        console.log("Document successfully updated!");
   
                });

              });
            });
    }

    this.setState({
      todos3:this.state.itemFollowers
    })

   
  }
keyExtractor3 = (item) => item.id;

renderItem3 = ({item}) =>
       

<View style={{flexDirection:"column",margin:20,backgroundColor:"#fafafa",marginTop:20}}>


<View style={{flexDirection:"row",margin:20,alignItems:"center",backgroundColor:"#fafafa"}}>
<TouchableOpacity onPress={() => this.profil2(item.uid)}>

<Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}} source={{uri: item.src}} />
<Text style={{paddingRight:15,paddingLeft:7}}>{item.name}</Text>
</TouchableOpacity>



<Text style={{flex:4}}>{item.username}</Text>
   {item.takipKontrol === 'takipEt' ?


  <TouchableOpacity style={{     paddingTop:10,
       paddingBottom:10,
       backgroundColor:'#009688',
       borderRadius:5,
       marginBottom: 20}} 
       activeOpacity = { .5 }

       onPress={() => this.goControl(item)}
    
        
       >

<Text style={{   color:'#fff',
         textAlign:'center',}}> Takip Et </Text>

</TouchableOpacity>
   : null}


{item.takipKontrol === 'takipEdiliyor' ?


<TouchableOpacity style={{     paddingTop:10,
     paddingBottom:10,
     backgroundColor:'#009688',
     borderRadius:5,
     marginBottom: 20}} 
     activeOpacity = { .5 }

     onPress={() => this.goControl(item)}
  
      
     >

<Text style={{   color:'#fff',
       textAlign:'center',}}> Takip Ediliyor </Text>

</TouchableOpacity>
 : null}

</View>


    </View>
 

  render() {
    return (
<View>

<FlatList
                    data = {this.state.todos3}
                        keyExtractor = {this.keyExtractor3}
                        renderItem = {this.renderItem3}
                      style={{marginTop: 10}}
  
                        />



   
  
  </View>


    );

  }

}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    left: 10,
    paddingTop: 25,


  },
  menuIcons: {
    zIndex: 9,
    position: 'absolute',
    left: 10,
    paddingTop: 25,
    marginTop: 15,
   
  },


  menuIcon3: {
    zIndex: 9,
    position: 'absolute',
    right: 10,
    paddingTop: 25

  },

})