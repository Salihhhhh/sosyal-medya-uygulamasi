import * as React from 'react';
import { View,FlatList, Image,Text,StyleSheet, ActivityIndicator,Dimensions,TouchableOpacity,Modal,TextInput,Alert,WebView,Button} from 'react-native';
import { Video } from 'expo';
import { Container, Content, ActionSheet} from 'native-base';
import Header from '../components/Header'
import YeniPost from  '../main_pages/YeniPost'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'
import * as firebase from "firebase";
import { FlatGrid } from 'react-native-super-grid';
import User from '../components/User';


export default class Profile extends React.Component {
  
  state = {  butonColor:"red", yedekitem:[],items2:[],yorumm:"",
  isFetching: false,todos2:[],yeniuid:"",yorumSayisi:"",yeniid:"",
  isLikes:false,likeSayisi:0,yeniisim:"",yeniprofilurl:"",yeniurl:"",
  yenitype:"",name: '', username: '', email: '', password: '', loading: false ,
  followers:'',following:'',post:'',
  avatar:'https://firebasestorage.googleapis.com/v0/b/mediaofgamers-e3c1a.appspot.com/o/images%2FprofileImage%2Fdefault%2Fperson-icon-flat.png?alt=media&token=f3806f51-f779-4d4a-84d2-8725ccfe4b13',interest:'',status:'',uid:'',twitchuser:'',youtubeuser:""};


constructor(props) {
  super(props)

  this.state = {
    scene:false,
start:10,
page:10,
  showIndicator:true,
  items:[],
  arrayHolder:[],
  modalVisible:false,
  butonYazi:"Takip Ediliyor",
  modalVisible2:false,
  itemFollowers:[],
  }

}
yenipost(gelenitem){
  YeniPost.degis(gelenitem)
  this.props.navigation.push('YeniPostScreen')
}

componentDidMount(){
  this.willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    () => {
  
      const db = firebase.firestore();

      db.collection('Users').where("uid", "==",gelenuuid).get().then(snapshot => {snapshot .docs.forEach(doc =>
  
          {
  
   
            this.setState({followers:doc.data().followers})
  
  
              this.setState({following:doc.data().following})
      
         
          });
          
      });
  
   
    }
  )  
}

componentWillUnmount () {
  this.willFocusSubscription.remove();
}

  componentWillMount(){
 
    this.readImage();
  this.readUserData();
  this.firebasegetData();
  this.takipEdiliyormu();

  }


  
  static degis(gelen){ gelenuuid=gelen
  
  console.log("uidddddddd",gelenuuid)
}
  setScene(scene) {
    this.setState({scene: scene});
  }
  yonlendir(gelen){

    this.props.navigation.push('ProfilListScreen',{yazi:gelen,uid:gelenuuid})
   }
  takipEdiliyormu(){
    console.log('ASdasd',gelenuuid)
    const db = firebase.firestore();
    this.setState({butonYazi:'Takip Et'})
    db.collection('Users').doc(firebase.auth().currentUser.uid).collection('following').where("following", "==",gelenuuid).get().then(snapshot => {snapshot .docs.forEach(doc =>

        {
  
  
         this.setState({butonYazi:'Takip Ediliyor'})
        
         this.setState({butonColor:'red'})
        });
        
    });
  }
 
  firebasegetData() {

    this.setState({
      start: 10,
        page: 10,
      
      }, () => {

        this.setState({ isFetching: false,
          items:[]
          })
   
      
          var a = 1;
      
      
          const db = firebase.firestore();
  
          db.collection('Users').doc(gelenuuid).collection("posts").orderBy("date").limit(15).get().then( snapshot => {
            snapshot.forEach((doc1) => {
       

              
              let cityRef = db.collection('Post2').doc(doc1.data().id);
               let getDoc = cityRef.get().then(doc => {
      
     
            
          var gen = Dimensions.get('window').width / 3;
          var yuk = Dimensions.get('window').height / 6;
   


          this.state.items.push({
            sayac: a,
            width: gen,
            height: yuk,
            id: doc.id,
            uid:doc.data().uid,
            type: doc.data().type,
            gelenUrl: doc.data().url,
            likeSayi:doc.data().like,
            yorumSayi:doc.data().yorumSayisi,
          });
        
           
          this.setState({ arrayHolder:[...this.state.items] })
        
          a = a + 1;
        });
        
 

            })
            .catch(err => {
              console.log('Error getting document', err);
            });
                        
     
      
      
      
          }).then(() => {
      
     
         
          });
     
  
      });

    
     
   

  }

  
  takipEt =() =>{
    console.log("takipetettedt")
    this.setState({
      butonYazi:'Takip Ediliyor',
     butonColor:'red'
       })

    this.setState({ uid:gelenuuid });
    const db = firebase.firestore();

    db.collection('Users').where("uid", "==",gelenuuid).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        let a =doc.data().followers+1;
        this.setState({followers:a})
        this.setState({followersSayisi:a+''});


        db.collection("Users").doc(doc.id).update({

          followers: a
     

        })
          .then(function () {
            console.log("Document successfully updated!");
          
          });

        






        db.collection("Users").doc(doc.id).collection('followers').doc(this.state.uid).set(
         
            {
           
            // followersSayisi : gelenuuid,
                followers:firebase.auth().currentUser.uid,
  
            

           })
                    .then(function () {
            console.log("Document successfully updated!");
       
                    });
               

      });
    });
//////////-----------------------following

db.collection('Users').where("uid", "==",firebase.auth().currentUser.uid).get().then(snapshot => {
  snapshot.docs.forEach(doc => {

    let b =doc.data().following+1;


   


    db.collection("Users").doc(firebase.auth().currentUser.uid).update({

      'following': b,

    })
      .then(function () {
        console.log("Document dfffffffffffffff updated!");
      
      });

    






    db.collection("Users").doc(firebase.auth().currentUser.uid).collection('following').doc(gelenuuid).set(
     
        {
       
        // followersSayisi : gelenuuid,
            following:gelenuuid,

        

       })
                .then(function () {
        console.log("Document successfully updated!");
             
                });


  });
});



    
            }
          takipEdildi(){
          

  this.setState({ uid: gelenuuid});
    const db = firebase.firestore();

    db.collection('Users').where("uid", "==", gelenuuid).get().then(snapshot => {
      snapshot.docs.forEach(doc => {

        let b =doc.data().following+1;

   
   


        db.collection("Users").doc(doc.id).update({

          'following': b
     

        })
          .then(function () {
            console.log("Document successfully updated!");
          
          });

        






        db.collection("Users").doc(this.state.uid).collection('following').doc(gelenuuid).set(
         
            {
           
            // followersSayisi : gelenuuid,
                following:gelenuuid,
  
            

           })
                    .then(function () {
            console.log("Document successfully updated!");
                 
                    });


      });
    });

            }
            takipCıkar(){
              this.setState({
             butonYazi:'Takip Et',
            butonColor:'orange'
              })

            
          
              this.setState({ uid: gelenuuid});
              const db = firebase.firestore();
          
              db.collection('Users').where("uid", "==", gelenuuid).get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                  let a =doc.data().followers-1;
                  this.setState({followers:a})
                  this.setState({followersSayisi:a+''});
          
            
 


                  db.collection("Users").doc(doc.id).update({
          
                    followers: a
               
          
                  })
                    .then(function () {
                      console.log("Document delete updated!");
                    
                    });
          
                  
                       
                    db.collection("Users").doc(gelenuuid).collection("followers").doc(firebase.auth().currentUser.uid).delete().then(function() {
                      console.log("Document successfully deleted!");
                  }).catch(function(error) {
                      console.error("Error removing document: ", error);
                  });
          
          
                 


          this.takipedilenCıkar();
                });
              });
          


              
            }

            takipedilenCıkar(){
              
          
              this.setState({ uid: gelenuuid });
              const db = firebase.firestore();
          
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
          
                  
                       
                    db.collection("Users").doc(firebase.auth().currentUser.uid).collection("following").doc(gelenuuid).delete().then(function() {
                      console.log("Document successfully deleted!");
                  }).catch(function(error) {
                      console.error("Error removing document: ", error);
                  });
          
          
                 


          
                });
              });
          
//////////////////feed çıkar

console.log("aadggggggggggggggggggggggggg",gelenuuid);
db.collection('Users').doc(firebase.auth().currentUser.uid).collection("feed").where("uid", "==",gelenuuid).get().then(snapshot => {snapshot .docs.forEach(doc =>

  {


console.log("asddddddda",doc.data().postid);
 
  });

});

          }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModalVisible2(visible) {
    this.setState({modalVisible2: visible});
  }
  readUserData() {
  //  this.setState({ uid: gelenuuid});

    const db = firebase.firestore();

    db.collection('Users').where("uid", "==",gelenuuid).get().then(snapshot => {snapshot .docs.forEach(doc =>

        {
          console.log(doc.data().name)
  
         this.setState({username:doc.data().username})
         this.setState({name:doc.data().name})
         this.setState({twitchuser:doc.data().twitchuser})
         this.setState({youtubeuser:doc.data().youtubeuser})
         this.setState({status:doc.data().status})
         this.setState({avatar:doc.data().avatar})


            this.setState({post:doc.data().post})
          
          this.setState({followers:doc.data().followers})


            this.setState({following:doc.data().following})
        
          this.setState({
            showIndicator:false,
          })
        });
        
    });
  }
  readImage () {
    console.log('1111111' );
    setTimeout(() => {
      firebase.storage().ref('images/'+'profileImage/'+gelenuuid+'/'+'userProfileImage').getDownloadURL()
        .then((url) => {
        console.log('asdsad' ,url);
        


          this.setState({imgSource: url});
   
      
        }).catch( () => {
          this.setState({imgSource:'https://firebasestorage.googleapis.com/v0/b/mediaofgamers-e3c1a.appspot.com/o/images%2FprofileImage%2Fdefault%2Fperson-icon-flat.png?alt=media&token=f3806f51-f779-4d4a-84d2-8725ccfe4b13'});
    
            });
      }, 1000);
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
   
    // followersSayisi : gelenuuid,
        yorum:this.state.yorumm,
        uid:gelenuuid,
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
     
this.setState({yorumSayisi:item.yorumSayi+1})

var gelenid=item.id;
var index = this.state.items.findIndex(item => item.id === gelenid)

let items = [...this.state.items];
items[index].yorumSayi = item.yorumSayi+1;
this.setState({items});



      db.collection("Post2").doc(item.id).update
      ({
        
                  "yorumSayisi":item.yorumSayi
          
                })
                  .then(function () {
                    console.log("Document successfully aaaaaupdated!");
           
         
                  });
         

//--------------------------------------------------notifiction--------------

if(item.uid!==gelenuuid){
db.collection("Users").doc(item.uid).collection('notifications').doc().set(
         
  {
 

      noti:this.state.notiname+" senin gönderine yorum yaptı",
      postid:item.id,
      uid:gelenuuid,
      type:"comment"
  

 })
          .then(function () {
  console.log("Document successfully updated!");
  
          });
        }


        
   }







keyExtractor=(item) => item.id


  renderItem = ({ item }) =>


    <View>

      {item.type === 'image' ?


        <View style={{ paddingTop: 2, paddingRight: 3 }}>
          <View style={{ zIndex: 2, position: "absolute" }}>
            <Text> {item.sayac}</Text>
            
            <Image source={require('../../assets/imageicon.png')} style={{ opacity: 0.5, width: 30, zIndex: 1, height: 30 }} />

          </View>
          <View style={{ zIndex: 1 }}>
            
        <TouchableOpacity onPress={() => this.yenipost(item)}>
            <Image source={{ uri: item.gelenUrl }} style={{ paddingRight: 3, width: item.width, height: item.height }} />
            </TouchableOpacity>
          </View>
        </View>





        : null}






      {item.type === 'video' ?

        <View style={{ paddingTop: 2, paddingRight: 3 }}>
          <View style={{ zIndex: 2, position: "absolute" }}>
            <Image source={require('../../assets/video.png')} style={{ opacity: 0.5, width: 30, height: 30, zIndex: 1, right: 0 }} />
          </View>
          <View style={{ zIndex: 1 }}>
          <TouchableOpacity onPress={() => this.yenipost(item)}>
            <Video
              source={{ uri: item.gelenUrl }}
              rate={1.0}
              volume={1.0}
              resizeMode="stretch"

              style={{ width: item.width, height: item.height, paddingRight: 3 }}
            />
              </TouchableOpacity>
          </View>
        </View>
        : null}



    </View>;



  render() {

 


    
  
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
      
      

     
<View style={{flex:1 }} >



               


  

    

          <View style={{ flexDirection:'row',paddingTop:8}}>
            <Image source={{uri:this.state.imgSource}}
                        style={{ flex: 1,width:75,height:75,borderRadius:85,marginLeft:15,borderWidth:2,borderColor:'orange'}}
            ></Image>
            

            <View style={{paddingTop: 20,paddingLeft:15,paddingRight:10,flex:3,flexdirection:'row'}}>
            <Text style={{fontSize:14}}>
             {this.state.name+""}
              </Text>
              <Text style={{fontSize:12,fontStyle:'italic',opacity:0.8}}>
             {this.state.status}
              </Text>



            </View>
          </View>
 



   
          <View style={{flex:3,paddingTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-around',borderWidth:1,borderColor:'#f0f0f0'}}>

          <View style={{alignItems:'center',borderWidth:1,borderColor:'#f0f0f0',flex:1}}>
            <Text> {this.state.post} </Text>
            <Text style={{fontSize:10,color:'grey'}}> Gönderi</Text>
            </View>
  

        <View style={{flex:1,alignItems:'center',borderWidth:1,borderColor:'#f0f0f0'}}>
        <TouchableOpacity  onPress={() => {
                 this.yonlendir("followers");
                }}>

            <Text>  {this.state.followers} </Text>
            <Text style={{fontSize:10,color:'grey'}}> Takipçi</Text>
            </TouchableOpacity>
            </View>
     


        <View style={{alignItems:'center',borderWidth:1,borderColor:'#f0f0f0',flex:1}}>

        <TouchableOpacity  onPress={() => {
                 this.yonlendir("following");
                }}>

            <Text>  {this.state.following} </Text>
            <Text style={{fontSize:10,color:'grey'}}> Takip</Text>
            </TouchableOpacity>
            </View>
          </View>
  

<View
    style={{ flexDirection: 'column',flex:1}}>

<View
    style={{ flexDirection: 'row',marginTop:5}}>



<View
    style={{ flexDirection: 'row' }}>

         { this.state.butonYazi === 'Takip Et' ?


    <Button   onPress={() => 
    
    
      this.takipEt()
    
    
  
        
  }
  title={this.state.butonYazi}    style={{backgroundColor:this.state.butonColor,flex: 3, marginLeft: 10,justifyContent: 'center', height: 30 ,borderColor:'grey'}}></Button>



  : null}


{ this.state.butonYazi === 'Takip Ediliyor' ?


<Button   onPress={() => 


  this.takipCıkar()



    
}
title={this.state.butonYazi}    style={{backgroundColor:this.state.butonColor,flex: 3, marginLeft: 10,justifyContent: 'center', height: 30 ,borderColor:'grey'}}></Button>



: null}

<Button
        style={{backgroundColor:'#970303', flex: 3, marginLeft: 2, marginRight: 10,justifyContent: 'center', height: 30 ,borderColor:'grey'}} 
        onPress={() => this.props.navigation.navigate('ChatScreen',{id:gelenuuid ,name:this.state.name,email:this.state.email,url:this.state.imgSource})}
        title="Mesaj"
        >
          </Button>




</View>

</View>
<View style={{flex:1}}>  

<ScrollableTabView

renderTabBar={() => (
  <ScrollableTabBar
    style={styles.scrollStyle}
    tabStyle={styles.tabStyle}
  />
)}
tabBarTextStyle={styles.tabBarTextStyle}
tabBarInactiveTextColor={'grey'}
tabBarActiveTextColor={'black'}
tabBar
tabBarUnderlineStyle={styles.underlineStyle}
initialPage={0}
>


<FlatList
              numColumns={3}
          
              data={this.state.arrayHolder}
              key={'1'} tabLabel={'Postlar'} tab
              renderItem={this.renderItem}
              style={{ marginTop: 2 }}
              keyExtractor={(item, index) => item.key}
             
             
 
            />
            
            {this.state.twitchuser === 'belirtilmemiş' ?

<Text   key={'2'} tabLabel={'Twitch'} > Kullanıcı twitch profilini kaydetmemiş </Text>

:null}

{this.state.twitchuser !== 'belirtilmemiş' ?
            <WebView

source={{uri: "https://www.twitch.tv/"+this.state.twitchuser}}
              scalesPageToFit={true}
               startInLoadingState={true}
               key={'2'} tabLabel={'Twitch'} 
                    javaScriptEnabled={true}
                    style={{flex:1}}
                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    mixedContentMode='always'
            />

            :null}

{this.state.youtubeuser === 'belirtilmemiş' ?

<Text   key={'3'} tabLabel={'Youtube'} > Kullanıcı youtube profilini kaydetmemiş </Text>

:null}

{this.state.youtubeuser !== 'belirtilmemiş' ?
            <WebView

source={{uri:this.state.youtubeuser}}
              scalesPageToFit={true}
               startInLoadingState={true}
               key={'3'} tabLabel={'Youtube'} 
                    javaScriptEnabled={true}
                    style={{flex:1}}
                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    mixedContentMode='always'
            />

            :null}



</ScrollableTabView>

</View>



</View>{/**End edit profile**/}


     </View>


 
        
     </View>



    );
        }

}
}



const styles = StyleSheet.create({
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
 
  
     justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  
  },
  underlineStyle: {
    height: 3,
   
    backgroundColor: 'black',
    borderRadius: 3,
    width: 15,
  },
  container: {
      flex: 1,
     
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
