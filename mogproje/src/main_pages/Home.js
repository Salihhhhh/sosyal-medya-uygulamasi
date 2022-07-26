import * as React from 'react';
import { View, Text,Image,FlatList ,TouchableOpacity,TextInput,Button,Modal,TouchableHighlight,Alert,Share} from 'react-native';
import { Constants,Video } from 'expo';
import Header from '../components/Header'
import Profile2 from  '../main_pages/Profile2'
import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import firebase from '../components/FirebaseConfig'
import User from '../components/User';


export default class Home extends React.Component {



  state = {
    modalVisible: false,
    modalVisible2: false,
    temptime:0,
    temptime2:0
  };
state={gelenUrl:"",id:0,type:"",uid:"",likeSayisi:0,yorumSayisi:0,isLikes:false,likeKontrol:false,idtemp:"",imageicon:"",yorum:"",status:"",date:"",start:1,finish:2,a:[],tempid:"",
todos:[],items:[],isFetching: false,yorummodal:"",todos2:[],yorumsayi:0,notisrc:"",notiname:"",openmenu:""}

  componentWillMount() {
      this.setModalVisible(false);
      this.setModalVisible2(false);
/* 
kkkkkkkkkk aci7VBVLx2I74QqdHoKe
kkkkkkkkkk JBvPqAoUa47dQWt8PeHy
kkkkkkkkkk fd9UPyn2Iue8whl2v6ZL
*/
  
      const db = firebase.firestore();
  
      db.collection('Users').doc(firebase.auth().currentUser.uid).collection('feed').orderBy("time","desc").limit(1).get().then(snapshot => {snapshot .docs.forEach(maindoc =>

        {
  

          this.setState({
            tempid: maindoc.data().time
          },() => {
         console.log("kkkkkkkkkk",this.state.tempid)
       this.firebaseGetData();
              });
          


        });

      });
   
  
 

      



   // console.ignoredYellowBox = true;

  }
 
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModalVisible2(visible) {
    this.setState({modalVisible2: visible});
  }



getData(){
  const db = firebase.firestore();
  
  
  firebase.storage().ref('images/' + 'profileImage/' + firebase.auth().currentUser.uid + '/' + 'userProfileImage').getDownloadURL()
  .then((url) => {
 
    this.setState({ notisrc: url });

  }).catch( () => {

    this.setState({ notisrc:  'https://firebasestorage.googleapis.com/v0/b/mediaofgamers-e3c1a.appspot.com/o/images%2FprofileImage%2Fdefault%2Fperson-icon-flat.png?alt=media&token=f3806f51-f779-4d4a-84d2-8725ccfe4b13' });
       
      });


}
loadMore(){



  this.setState({
      start:this.state.start+1
  },() => {
this.firebaseGetData2();
  });

  
}
   firebaseGetData(){

    console.log("firegirdidiii",this.state.tempid)
     this.setState({isFetching:false
     })
 
    const db = firebase.firestore();
   

   

   return db.collection('Users').doc(firebase.auth().currentUser.uid).collection('feed').orderBy("time","desc").startAt(this.state.tempid).limit(2).get().then(snapshot => {snapshot.forEach(maindoc =>

      {
       
        this.setState({
          tempid: maindoc.data().time
        })
    




    let cityRef = db.collection('Post2').doc(maindoc.data().postid);
    let getDoc = cityRef.get()
      .then(doc => {
      
          var gelenid=doc.id;
     
          this.state.items.push({
            profilurl1:"",
            profilurl2:"",
            profiladi1:"",
            profiladi2:"",
            yorum1:"",
            yorum2:"",
            status:doc.data().status,
            date:doc.data().date,
            yorumSayisi:doc.data().yorumSayisi,
            isLikes:false,
            id: doc.id,
            likeSayisi:doc.data().like,
            uid:maindoc.data().uid,
          gelenUrl:doc.data().url,
            type:doc.data().type,
            name:"",
            src:"",
          });
  
    
          this.setState({
            todos: this.state.items
          })

          db.collection('Post2').doc(maindoc.data().postid).collection("likes").where("like", "==",firebase.auth().currentUser.uid).get().then(snapshot => {snapshot .docs.forEach(doc =>

            {

        
             var index = this.state.items.findIndex(item => item.id === gelenid)
             this.state.items[index].isLikes=true;
           
            });
       
        });
       


        var a=0;

        db.collection('Post2').doc(maindoc.data().postid).collection("yorumlar").get().then(snapshot => {snapshot .docs.forEach(doc =>

          {
            
              if(a==0){
                var index =  this.state.items.findIndex(item => item.id === gelenid)
                this.state.items[index].yorum1=doc.data().yorum;
 

                db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                  {
                
                    this.state.items[index].profiladi1=doc1.data().name;
                    this.state.items[index].profilurl1=doc1.data().src;
                    this.setState({
                      todos:this.state.items
                    })
                  });
                });

               
                

     
              }
            
              if(a==1){
                var index = this.state.items.findIndex(item => item.id === gelenid)
                this.state.items[index].yorum2=doc.data().yorum;

                db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                  {
                
                    this.state.items[index].profiladi2=doc1.data().name;
                    this.state.items[index].profilurl2=doc1.data().src;
                    console.log("micegridi")
                    this.setState({
                      todos:this.state.items
                    })
                  });
                });
               

              

              
              }

         
          
              a=a+1;
      
          
           
          });
         
       
               
    

 
        });
  
     var gelenid=doc.id;
  
     db.collection('Users').where("uid", "==",maindoc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc2 =>

      {
   
        var index = this.state.items.findIndex(item => item.id=== gelenid)
        this.state.items[index].name=doc2.data().name;
        this.state.items[index].src= doc2.data().src;
       
        this.setState({
          todos:this.state.items
        })
        
      });

    });
    
  
  
    
   
    
  });
});
  this.setState({
    todos:this.state.items
  })
        
        });
 
      

}

firebaseGetData2(){

  console.log("firegirdidiii",this.state.tempid)
   this.setState({isFetching:false
   })

  const db = firebase.firestore();
 

 

 return db.collection('Users').doc(firebase.auth().currentUser.uid).collection('feed').orderBy("time","desc").startAfter(this.state.tempid).limit(2).get().then(snapshot => {snapshot.forEach(maindoc =>
    {
     
      this.setState({
        tempid: maindoc.data().time
      })
  




  let cityRef = db.collection('Post2').doc(maindoc.data().postid);
  let getDoc = cityRef.get()
    .then(doc => {
    
        var gelenid=doc.id;
   
        this.state.items.push({
          profilurl1:"",
          profilurl2:"",
          profiladi1:"",
          profiladi2:"",
          yorum1:"",
          yorum2:"",
          status:doc.data().status,
          date:doc.data().date,
          yorumSayisi:doc.data().yorumSayisi,
          isLikes:false,
          id: doc.id,
          likeSayisi:doc.data().like,
          uid:maindoc.data().uid,
        gelenUrl:doc.data().url,
          type:doc.data().type,
          name:"",
          src:"",
        });

  
        this.setState({
          todos: this.state.items
        })

        db.collection('Post2').doc(maindoc.data().postid).collection("likes").where("like", "==",firebase.auth().currentUser.uid).get().then(snapshot => {snapshot .docs.forEach(doc =>

          {

      
           var index = this.state.items.findIndex(item => item.id === gelenid)
           this.state.items[index].isLikes=true;
         
          });
     
      });
     


      var a=0;

      db.collection('Post2').doc(maindoc.data().postid).collection("yorumlar").get().then(snapshot => {snapshot .docs.forEach(doc =>

        {
          
            if(a==0){
              var index =  this.state.items.findIndex(item => item.id === gelenid)
              this.state.items[index].yorum1=doc.data().yorum;


              db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                {
              
                  this.state.items[index].profiladi1=doc1.data().name;
                  this.state.items[index].profilurl1=doc1.data().src;
                  this.setState({
                    todos:this.state.items
                  })
                });
              });

             
              

   
            }
          
            if(a==1){
              var index = this.state.items.findIndex(item => item.id === gelenid)
              this.state.items[index].yorum2=doc.data().yorum;

              db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                {
              
                  this.state.items[index].profiladi2=doc1.data().name;
                  this.state.items[index].profilurl2=doc1.data().src;
                  console.log("micegridi")
                  this.setState({
                    todos:this.state.items
                  })
                });
              });
             

            

            
            }

       
        
            a=a+1;
    
        
         
        });
       
     
             
  


      });

   var gelenid=doc.id;

   db.collection('Users').where("uid", "==",maindoc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc2 =>

    {
 
      var index = this.state.items.findIndex(item => item.id=== gelenid)
      this.state.items[index].name=doc2.data().name;
      this.state.items[index].src= doc2.data().src;
     
      this.setState({
        todos:this.state.items
      })
      
    });

  });
  


  
 
  
});
});
this.setState({
  todos:this.state.items
})
      
      });

    

}



  likes(item)  {

 
    if(item.isLikes){
item.isLikes=false;
item.likeSayisi=item.likeSayisi-1;
this.setState({ data: null });


const db = firebase.firestore();
   



db.collection('Post2').doc(item.id).collection("likes").where("like", "==",firebase.auth().currentUser.uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

                  {
      
                    db.collection('Post2').doc(item.id).collection("likes").doc(doc1.id).delete().then(function() {
                      console.log("Document successfully deleted!");
                  }).catch(function(error) {
                      console.error("Error removing document: ", error);
                  });
                   
                  });
                 
              });


      

  
  //---------------------------------------------------------like azalt------------------------------------------------
          

  db.collection('Post2').doc(item.id).update({
            

    
    "like":item.likeSayisi

  })
    .then(function () {
      console.log("Document successfully updated!");

    });
//-------------------------- bildirimi geri al 

db.collection('Users').doc(item.uid).collection('notifications').where("type", "==","like").get().then(snapshot => {snapshot .docs.forEach(doc1 =>

  {
          if(doc1.data().postid===item.id && doc1.data().uid===firebase.auth().currentUser.uid){
    db.collection('Users').doc(item.uid).collection('notifications').doc(doc1.id).delete().then(function() {
      console.log("bilidirim successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

  });


 
});

   

    }
    
    else{

      item.isLikes=true;
      item.likeSayisi=item.likeSayisi+1
      this.setState({ data: null });

console.log("aa")


      const db = firebase.firestore();
      db.collection('Post2').doc(item.id).collection("likes").doc().set(
           
        {
       
        // followersSayisi : firebase.auth().currentUser.uid,
            like:firebase.auth().currentUser.uid
  
        
  
       })
                .then(function () {
        console.log("Document successfully updated!");
   
                });
  
  //---------------------------------------------------------like------------------------------------------------
          
  db.collection('Post2').doc(item.id).update({
            
                      "like":item.likeSayisi
              
                    })
                      .then(function () {
                        console.log("Document successfully aaaaaupdated!");
               
             
                      });
             //----------------------------------------------------------notifications---------------------

             if(item.uid!==firebase.auth().currentUser.uid){
              db.collection("Users").doc(item.uid).collection('notifications').doc().set(
           
                {
               
                // followersSayisi : firebase.auth().currentUser.uid,
                    noti:User.name+" senin gönderini beğendi",
                    postid:item.id,
                    uid:firebase.auth().currentUser.uid,
                    type:"like"
          
               })
                        .then(function () {
                console.log("Document successfully updated!");
           
                        });
                        
             }
             
            
    }


          
             
          
          


  
  }

  yenisayfa(item){
   

    this.setState({ data: null });
var items2 = [];
this.setState({todos2: items2});
const db = firebase.firestore();
db.collection('Post2').doc(item.id).collection("yorumlar").get().then(snapshot => {snapshot .docs.forEach(doc =>

  {

   
    var gelenid=doc.id;
      
    db.collection('Users').where("uid", "==",doc.data().uid).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

      {
        var index = items2.findIndex(item => item.id === gelenid)
        items2[index].profiladi=doc1.data().name;
        items2[index].url1= doc1.data().src;
     this.setState({ data: null });
       
      });
    });


        
     
    
              items2.push({
                yorumsayi:item.yorumSayisi,
                parentid:item.id,
                id:doc.id,
                yorummodal:doc.data().yorum,
                url1:"",
                profiladi:"",
                tarih:doc.data().tarih,
                uid:doc.data().uid,
                uid2:item.uid
             });
             this.setState({ data: null });
   
  })

}) .then(() => {

  this.setState({ data: null });

  console.log("set edildi")
this.setModalVisible(true);

}).catch( () => {

   
    });





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

  const db = firebase.firestore();

  
  this.setState({ data: null });

console.log("gelentiem parent id " , item.parentid)
  db.collection('Post2').doc(item.parentid).collection("yorumlar").doc(item.id).delete().then(function() {
    console.log("Document successfully deleted!");

}).catch(function(error) {
    console.error("Error removing document: ", error);
});


///-------------------

item.yorumsayi=item.yorumsayi-1
this.setState({ data: null });

        db.collection("Post2").doc(item.parentid).update({
          
                    "yorumSayisi":item.yorumsayi
            
                  })
                    .then(function () {
                      console.log("sildim lan sildimmmmmmmmmmmmmmmmmmmm!");
             
      
                  
                    });


              this.setModalVisible(false)
              this.onRefresh();
             
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
          yorum:item.yorum,
          uid:firebase.auth().currentUser.uid,
          tarih:tarih
      

     })
              .then(function () {
      console.log("yorum successfully updated!");
 
              });

//---------------------------------------------------------like------------------------------------------------
       
item.yorumSayisi=item.yorumSayisi+1
this.setState({ data: null });

        db.collection("Post2").doc(item.id).update({
          
                    "yorumSayisi":item.yorumSayisi
            
                  })
                    .then(function () {
                      console.log("Document successfully aaaaaupdated!");
             
           
                    });
           
  
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
        this.onRefresh();

          
     }

     onRefresh() {
      this.setState({ isFetching: true }, function() { this.firebaseGetData() });
   }



 keyExtractor = (item,index) => item.id;

 reported(gelenitem){
  Alert.alert(
    'Raporla',
    gelenitem.name +' kullanıcısının göndersini rapor etmek ister misiniz?',
    [
    
      {text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Evet', onPress: () => this.reportedSet(gelenitem)}
    ],
    { cancelable: false }
  )
  
     
 }

 reportedSet(gelenitem){
  const db = firebase.firestore();
  db.collection("Reported").doc().set(
           
    {
   

     uid:gelenitem.uid,
     src:gelenitem.gelenUrl,
     id:gelenitem.id
      
    

   })
            .then(function () {
              Alert.alert(
                'Raporlandı',
         '',
                [
                
                  {text: 'Tamam', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             
                ],
                { cancelable: false }
              )

            });
          }

           share(gelenitem){
            try {
              const result = Share.share({
                message:
                  'React Native | A framework for building native apps using React',
              })
        
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              alert(error.message);
            }
          }

          profil2(gelenitem){
               Profile2.degis(gelenitem.uid)
               this.setModalVisible2(true)
          }
        

renderItem = ({item}) =>
  

  <View style={{flexDirection:'column',paddingTop:10,flex:1}}>
    <View style={{flexDirection:'row',paddingBottom:7}}>
            <View>
            <Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}}  source={{ uri: item.src }}  />
            </View>
                              
                  <View style={{textAlign:'left',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                  <TouchableOpacity onPress={() => this.profil2(item)}>
                <Text style={{fontStyle:'normal',paddingLeft:15,fontSize:15}}>{item.name}</Text>
                </TouchableOpacity>
                </View>

                <View style={{textAlign:'right',justifyContent:'center',flex:1,alignSelf:"flex-end"}}>
             
                <MenuContext style={{textAlign:'right',justifyContent:'center',flex:1,alignSelf:"flex-end"}}>
                <Menu >
                <MenuTrigger>
            <Image style={{width:30,height:30}}  source={require('../../assets/menu.png')} />
           </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() =>  this.share(item)} text="Paylaş" />
              <MenuOption onSelect={() => this.reported(item)}>
                <Text style={{ color: 'red' }}>Bildir</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              />
            </MenuOptions>
          </Menu>
          </MenuContext>

            </View>
      </View>
        <View style={{width:'100%',height:300,paddingTop:5}}>
        
        { item.type === 'image' ? <Image source={{ uri: item.gelenUrl }} style={{ width: '100%', height: 300 }} />
: null }

{ item.type === 'video' ? <Video
source={{uri: item.gelenUrl}}
rate={1.0}
volume={1.0}
isMuted={false}
resizeMode="cover"

useNativeControls={true}
style={{ width: '100%', height: 300 }}
/> 
: null }
        </View>
<View style={{flexDirection:'row',paddingTop:4}}>
        <View >

  
        <TouchableOpacity onPress={() => this.likes(item)}>

       
        
        { item.isLikes === true ?
          <Image style={{width:20,height:20}} source={require('../../assets/fillkalp.png')} />

: null }

{ item.isLikes === false ?
<Image style={{width:20,height:20}} source={require('../../assets/kalp.png')} />
: null }
</TouchableOpacity>
</View>

<Text>{item.likeSayisi}</Text>

<View style={{paddingLeft:5}} >
<Image style={{width:20,height:20}} source={require('../../assets/xf5vv.gif')} />
</View>
<Text style={{paddingLeft:3}}>{item.yorumSayisi}</Text>

<View style={{flex:1}}>
<Text style={{textAlign:'right',fontSize:10,paddingRight:5}}>{item.date}</Text>
</View>

</View>

<View style={{flexDirection:'row',paddingTop:5}}>
<Text style={{fontWeight: "bold",paddingLeft:3,fontSize:12,}}>{item.name}</Text>
<Text style={{paddingLeft:5,fontSize:11,}}>{item.status}</Text>

        </View>

        <TouchableOpacity onPress={() => this.yenisayfa(item)}>
        <View style={{flexDirection:'row',paddingTop:5}}>

<Text style={{fontWeight: "bold",paddingLeft:3,fontSize:12,opacity:0.5}}>tüm yorumları gör</Text>


        </View>
        </TouchableOpacity>

  { item.profilurl1 != "" ?
            <View style={{flexDirection:'row',paddingTop:5}}>

                    <Image style={{width:35,height:35,borderRadius:125,borderColor:'orange',borderWidth:2}} source={{uri: item.profilurl1}} />
                    <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:11}}>{item.profiladi1} </Text>
            <Text style={{fontSize:11,textAlign:'center',opacity:0.8}}>{item.yorum1} </Text>
            </View>
                    </View>
      : null }

{ item.profilurl2 != "" ?
          <View style={{flexDirection:'row',paddingTop:5}}>
          <Image style={{width:35,height:35,borderRadius:125,borderColor:'orange',borderWidth:2}} source={{uri:item.profilurl2}} />
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:11}}>{item.profiladi2}  </Text>
          <Text style={{fontSize:11,textAlign:'center',opacity:0.8}}>{item.yorum2} </Text>
          </View>
          </View>
      : null }



      
       



        <View style={{flexDirection:'row',borderWidth:1,borderColor:'gray',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
  
        <Button
          style={{
            fontSize: 10, color: 'green',
            marginTop:5,
            marginBottom:5,
          }}
          styleDisabled={{ color: 'red' }}

      onPress={() => this.yorumla(item)}
    
          title="Yorumla"
        >
 
        </Button>
 
              <TextInput 
     value={item.yorum}
     onChangeText={yorum => item.yorum=yorum}
   

              style={{flex:4}}
        textAlign="center"
           placeholder="yorum giriniz"
           underlineColorAndroid="transparent"
           />



        </View>






 
  </View>;

keyExtractor2 = (item,index) => item.id;

renderItem2 = ({item}) =>
  
<View style={{flexDirection:"column",margin:20,backgroundColor:"#fafafa",marginTop:20}}>


<View style={{flexDirection:"row",margin:20,alignItems:"center",backgroundColor:"#fafafa"}}>
  

<Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}} source={{uri: item.url1}} />
<Text style={{paddingRight:15,paddingLeft:7}}>{item.profiladi}</Text>
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

</View>
<Text style={{right:0,textAlign:"right"}}>{item.tarih}</Text>

    </View>

  render() {
    
    Header.degis("Akış");

    return (
      
      <View style={styles.container}>
<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                   <Image style={{width:35,height:35}} source={require('../../assets/back.png')} />
              </TouchableHighlight>
          <View style={{marginTop: 22,alignContent:"center"}}>
            <View>
            <FlatList
         data = {this.state.todos2}
            keyExtractor = {this.keyExtractor2}
            renderItem = {this.renderItem2}
          style={{marginTop: 10}}

            />

            </View>
          
           
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity onPress={() => this.setModalVisible2(false)}>
          <Image style={{width:35,height:35}} source={require('../../assets/back.png')} />
</TouchableOpacity>
    
         <Profile2></Profile2>
   

        </Modal>


<Header navigation={this.props.navigation} />


<FlatList
         data = {this.state.todos}
            keyExtractor = {this.keyExtractor}
            renderItem = {this.renderItem}
          style={{marginTop: 2}}
          refreshing={this.state.isFetching}
          onRefresh={() => this.onRefresh()}
          onEndReached={() => this.loadMore()}
            />


                    
      </View>
       


    );
  }
}

const styles = ({

  container: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginBottom:60,
 backgroundColor: '#fff',


  }

});
