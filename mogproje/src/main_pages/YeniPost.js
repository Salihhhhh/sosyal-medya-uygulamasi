import React from 'react'
import {
  StyleSheet, Text, View, ScrollView,
  Image, FlatList,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,

} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from '../components/FirebaseConfig'
import Profile2 from  '../main_pages/Profile2'
import Kesfet from  '../main_pages/Kesfet'
import { ListItem, SearchBar } from 'react-native-elements';
import User from '../components/User';

export default class YeniPost extends React.Component {

    
state = {yedekitem:[],items2:[],yorumm:"",isFetching: false,todos2:[],yeniuid:"",yorumSayisi:0,yeniid:"",isLikes:false,likeSayisi:0,yeniisim:"",yeniprofilurl:"",yeniurl:"",yenitype:"",modalVisible: false,katekontrol:"all", todos2: [], kolonsayi: 3, horizontal: 3, page: 2, isFetching: false, showIndicator: false, kontrol: false, start: 0,arrayHolder: [] }


  constructor(props) {
    super(props);


  }
  profil2(gelenitem){
    Profile2.degis(gelenitem)
    this.props.navigation.navigate('Profile2Screen')
}
yonlendir(gelen){

  this.props.navigation.navigate('ProfilListScreen',{yazi:gelen,uid:gelenitem2.id})
 }
  componentWillMount() {

    this.yenisayfa(gelenitem2);

  }


  static degis(gelenitem) {
gelenitem2=gelenitem;
       
  }


  

yenisayfa(item){

    

    this.setState({ yedekitem: item });
    this.setState({ isFetching: false });
 this.setState({isLikes:false,yeniurl:item.gelenUrl,modalVisible:true,yenitype:item.type,yeniuid:item.uid,yeniid:item.id});
 const db = firebase.firestore();
 console.log("aa", item.id)

///--


let cityRef = db.collection('Post2').doc(item.id);
let getDoc = cityRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.setState({
        yorumSayisi:doc.data().yorumSayisi,
        likeSayisi:doc.data().like
      })
    }
  })



//------------------------

db.collection('Post2').doc(item.id).collection("likes").where("like", "==",firebase.auth().currentUser.uid).get().then(snapshot => {snapshot .docs.forEach(doc =>

  {


    this.setState({isLikes: true });
   
  });

});

 db.collection('Users').where("uid", "==",item.uid).get().then(snapshot => {snapshot .docs.forEach(doc =>

  {
    console.log("userrs");
   this.setState({yeniisim:doc.data().name,
                  yeniprofilurl:doc.data().src
  })
 



    
  });
})
//////yorumları çekkk


this.setState({items2:[]});

this.setState({todos2: this.state.items2});

db.collection('Post2').doc(item.id).collection("yorumlar").get().then(snapshot => {snapshot .docs.forEach(doc =>

  {

    this.state.items2.push({

     parentid:item.id,
      id:doc.id,
      yorummodal:doc.data().yorum,
      url1:"",
      profiladi:"",
      tarih:doc.data().tarih,
      uid:doc.data().uid,
      uid2:item.uid
   });
   
    var gelenid=doc.id;
      
    db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

      {
        var index = this.state.items2.findIndex(item => item.id === gelenid)
        this.state.items2[index].profiladi=doc1.data().name;
        this.state.items2[index].url1=doc1.data().src;
       
      });
      this.setState({todos2: this.state.items2});
      console.log("sildmmmmmmmmmmmm!",this.state.items2);
    });


        
     
    
       
   
  })

}) .then(() => {

  this.setState({todos2: this.state.items2});

//this.setModalVisible(true);

}).catch( () => {

   
    });


  }

  likes(item){

    const db = firebase.firestore();
    
    
    if(this.state.isLikes){
      this.setState({isLikes: false });




   
      this.setState({likeSayisi: this.state.likeSayisi-1 }, () => {

              



      //-----
        db.collection('Post2').doc(this.state.yeniid).update({

    
          "like":this.state.likeSayisi
      
        })
          .then(function () {
            console.log("Document successfully updated!");
      
          });
    });
   



   




db.collection('Post2').doc(this.state.yeniid).collection("likes").where("like", "==",firebase.auth().currentUser.uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

  {

    db.collection('Post2').doc(this.state.yeniid).collection("likes").doc(doc1.id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
   
  });
 
});


      

  
  //---------------------------------------------------------like azalt------------------------------------------------
          
 
//-------------------------- bildirimi geri al 

db.collection('Users').doc(this.state.yeniuid).collection('notifications').where("type", "==","like").get().then(snapshot => {snapshot .docs.forEach(doc1 =>

  {
          if(doc1.data().postid===this.state.yeniid && doc1.data().uid===firebase.auth().currentUser.uid){
    db.collection('Users').doc(this.state.yeniuid).collection('notifications').doc(doc1.id).delete().then(function() {
      console.log("bilidirim successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

  });


 
});

   

    }
    
    else{

      this.setState({isLikes: true });
   
      this.setState({likeSayisi: this.state.likeSayisi+1 }, () => {


        
  

        //----
        db.collection('Post2').doc(this.state.yeniid).update({

    
          "like":this.state.likeSayisi
      
        })
          .then(function () {
            console.log("Document successfully updated!");
      
          });
    });
   


      console.log("beğeniyortun")


      const db = firebase.firestore();
      db.collection('Post2').doc(this.state.yeniid).collection("likes").doc().set(
           
        {
       
        // followersSayisi : firebase.auth().currentUser.uid,
            like:firebase.auth().currentUser.uid
  
        
  
       })
                .then(function () {
        console.log("Document successfully updated!");
   
                });
  
  //---------------------------------------------------------like------------------------------------------------
          

             //----------------------------------------------------------notifications---------------------

             if(this.state.yeniuid!==firebase.auth().currentUser.uid){
              db.collection("Users").doc(this.state.yeniuid).collection('notifications').doc().set(
           
                {
               
                // followersSayisi : firebase.auth().currentUser.uid,
                    noti:User.name+" senin gönderini beğendi",
                    postid:this.state.yeniuid,
                    uid:firebase.auth().currentUser.uid,
                    type:"like"
          
               })
                        .then(function () {
                console.log("Document successfully updated!");
           
                        });
                        
             }
            }
  }
  yorumla(item){



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


    var  tarih=date+"."+month+"."+year+"-"+(hours)+":"+min

    const db = firebase.firestore();
    db.collection("Post2").doc(item.id).collection("yorumlar").doc().set(
         
      {
     
      // followersSayisi : firebase.auth().currentUser.uid,
          yorum:this.state.yorumm,
          uid:firebase.auth().currentUser.uid,
          tarih:tarih
      

     })
              .then(function () {
      console.log("yorum successfully updated!");
   
   
              });



              //----------copy+++++++++++++++++++++++++

              

this.setState({items2:[]});

this.setState({todos2: this.state.items2});

db.collection('Post2').doc(item.id).collection("yorumlar").get().then(snapshot => {snapshot .docs.forEach(doc =>

  {

    this.state.items2.push({

     parentid:item.id,
      id:doc.id,
      yorummodal:doc.data().yorum,
      url1:"",
      profiladi:"",
      tarih:doc.data().tarih,
      uid:doc.data().uid,
      uid2:item.uid
   });
   
    var gelenid=doc.id;
      
    db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

      {
        var index = this.state.items2.findIndex(item => item.id === gelenid)
        this.state.items2[index].profiladi=doc1.data().name;

        this.state.items2[index].url1=doc1.data().src;
      });
      this.setState({todos2: this.state.items2});
      console.log("sildmmmmmmmmmmmm!",this.state.items2);
    });


        
         
    
    
       
   
  })

}) .then(() => {

  this.setState({todos2: this.state.items2});

//this.setModalVisible(true);

}).catch( () => {

   
    });

//---------------------------------------------------------paste------------------------------------------------
       






        db.collection("Post2").doc(item.id).update
        ({
          
                    "yorumSayisi":this.state.yorumSayisi+1
            
                  })
                    .then(function () {
                      console.log("Document successfully aaaaaupdated!");
             
           
                    });
                    this.setState({yorumSayisi:this.state.yorumSayisi+1})
  
  //--------------------------------------------------notifiction--------------
  
  if(item.uid!==firebase.auth().currentUser.uid){
  db.collection("Users").doc(item.uid).collection('notifications').doc().set(
           
    {
   

        noti:User.name+" senin gönderine yorum yaptı",
        postid:item.id,
        uid:firebase.auth().currentUser.uid,
        type:"comment"
    

   })
            .then(function () {
    console.log("Document successfully updated!");
    
            });
          }


          
     }

  yorumSil(item){


    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.deletecomment(item)},
      ],
      { cancelable: false }
    )
    
                
  }



  
  deletecomment(item){
    this.setState({yorumSayisi:this.state.yorumSayisi-1}, () => {


   
        

  });
//--------



//----------


  


    const db = firebase.firestore();
if(this.state.items2.length===1){
console.log("asfdspglfdpgfdgfdg")

  this.state.items2.pop();
  this.setState({todos2:this.state.items2})
}
else{

    var gelenid=item.id;
    var index = this.state.items2.findIndex(item => item.id === gelenid)
    console.log("indexxxx",index)
    this.state.items2.splice(index, 1);

}

    db.collection('Post2').doc(item.parentid).collection("yorumlar").doc(item.id).delete().then(function() {
      console.log("Document successfully deleted!");
     
  }).then(function() {

  });
  
  





  
          db.collection("Post2").doc(item.parentid).update({
            
                      "yorumSayisi":this.state.yorumSayisi
              
                    })
                      .then(function () {
               
   
                          this.setState({todos2:this.state.items2})
                         //  this.yenisayfa(item);
                    
                      });
  
  
           
               
  }


keyExtractor2 = (item) => item.id;

renderItem2 = ({item}) =>
  
<View style={{flexDirection:"column",margin:5,backgroundColor:"#fafafa",marginTop:5}}>

<TouchableOpacity  onPress={() => {
    this.profil2(item.uid);
  }}>
<View style={{flexDirection:"row",margin:5,alignItems:"center",backgroundColor:"#fafafa"}}>


<Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}} source={{uri: item.url1}} />
<Text style={{paddingRight:15,paddingLeft:7}}>{item.profiladi}</Text>

</View>
</TouchableOpacity>

<Text style={{flex:4}}>{item.yorummodal}</Text>

<View>
{ item.uid === firebase.auth().currentUser.uid? 


  
  <TouchableOpacity  onPress={() => {
    this.yorumSil(item);
  }}>


<Image style={{width:20,height:20}} source={require('../../assets/x.png')} />


</TouchableOpacity>

  
: null }
</View>


<Text style={{right:0,textAlign:"right"}}>{item.tarih}</Text>


    </View>;


  

    ;


  render() {
    return (
<View>

<TouchableOpacity onPress={() => this.profil2(this.state.yedekitem.uid)}>
<View style={{flexDirection:'row',paddingBottom:7}}>

            <View>
            <Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}}  source={{ uri: this.state.yeniprofilurl }}  />
            </View>
                              
                  <View style={{textAlign:'left',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
       
                <Text style={{fontStyle:'normal',paddingLeft:15,fontSize:15}}>{this.state.yeniisim}</Text>
             
                </View>
     
                </View>
                </TouchableOpacity>
      {this.state.yenitype === 'image' ?


<View style={{ paddingTop: 2, paddingRight: 3 }}>


    

    <Image source={{ uri: this.state.yeniurl}} style={{ paddingRight: 3, width: '100%', height: 300 ,resizeMode:"stretch"}} />

  </View>






: null}






{this.state.yenitype === 'video' ?

<View style={{ paddingTop: 2, paddingRight: 3 }}>


    <Video
      source={{ uri:this.state.yeniurl}}
      rate={1.0}
      volume={1.0}

      isMuted={false}
      resizeMode="cover"
      
      useNativeControls={true}
      style={{ width: '100%', height: 300, paddingRight: 3 }}
    />


</View>
: null}
   <View style={{flexDirection:"row"}}>

  
<TouchableOpacity onPress={() => this.likes(this.state.yedekitem)}>



{ this.state.isLikes === true ?
  <Image style={{width:20,height:20}} source={require('../../assets/fillkalp.png')} />

: null }

{ this.state.isLikes === false ?
<Image style={{width:20,height:20}} source={require('../../assets/kalp.png')} />
: null }
</TouchableOpacity>
<TouchableOpacity  onPress={() => {
    this.yonlendir("like");
  }}>


<Text>{this.state.likeSayisi}</Text>
</TouchableOpacity>
<Image style={{width:20,height:20}} source={require('../../assets/xf5vv.gif')} />
<Text style={{paddingLeft:3}}>{this.state.yorumSayisi}</Text>
</View>

<View style={{flexDirection:'row',borderWidth:1,borderColor:'gray'}}>
  
  <Button
    style={{
      fontSize: 10, color: 'green',
      marginTop:5,
      marginBottom:5,
    }}
    styleDisabled={{ color: 'red' }}

onPress={() => this.yorumla(this.state.yedekitem)}

    title="Yorumla"
  >

  </Button>

        <TextInput 
value={this.state.yorumm}
  
    
onChangeText={yorumm => this.setState({ yorumm })}

        style={{flex:4}}
  textAlign="center"
     placeholder="yorum giriniz"
     underlineColorAndroid="transparent"
     />



  </View>




            <FlatList
         data = {this.state.todos2}
            keyExtractor = {this.keyExtractor2}
            renderItem = {this.renderItem2}
          style={{marginTop: 10}}
  refreshing={this.state.isFetching}
          onRefresh={() => this.onRefresh()}
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