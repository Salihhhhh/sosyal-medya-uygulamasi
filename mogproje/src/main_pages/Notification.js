import * as React from 'react';
import { View, StyleSheet, Text ,FlatList,Image,TouchableOpacity} from 'react-native';
import { Constants } from 'expo';
import Header from '../components/Header'
import Profile2 from  '../main_pages/Profile2'
import firebase from '../components/FirebaseConfig'



export default class Notification extends React.Component {
  state = {
    todos: [],
    kontrol:false
  };

  componentDidMount(){
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
    
   this.setState({kontrol:false})
          this.getNotification()
      }
    )  
  }
  
  componentWillUnmount () {
    this.willFocusSubscription.remove();
  }

  
  componentWillMount(){
  
  }

  profil2(gelenitem){
    Profile2.degis(gelenitem)
    this.props.navigation.push('Profile2Screen')
}

  getNotification(){
    var items = [];
    const db = firebase.firestore();
    console.log("aaaaa",firebase.auth().currentUser.uid);

      this.setState({data:null});
    db.collection('Users').doc(firebase.auth().currentUser.uid).collection('notifications').get().then(snapshot => {snapshot .docs.forEach(doc =>

      {
        
   
              console.log("asdsadsad",doc.id);
              var gelenid=doc.id;

                  items.push({
                    parentid:gelenid,
                    noti:doc.data().noti,
                    postid:doc.data().postid,
                    profilurl:"",
                    uid:doc.data().uid
                  });
                  
          
                  
           
    db.collection('Users').where("uid", "==",doc.data().uid ).get().then(snapshot => {snapshot .docs.forEach(doc1 =>

      {
        var index = items.findIndex(item => item.parentid === gelenid)
        items[index].profilurl= doc1.data().src
        this.setState({todos: items });
      });
              
    });
                  
       
              });


              this.setState({todos: items });
            
        }).then(() => {
         if(items.length===0){

          this.setState({todos: items,
          kontrol:true });
         }
          });
      
       



  }

  keyExtractor = (item) => item.id;
renderItem = ({item}) =>


<View style={{flexDirection:"row",margin:20,backgroundColor:"#fafafa",marginTop:20,alignItems:"center"}}>


<TouchableOpacity
                onPress={() => {
                  this.profil2(item.uid);
                }}>

  <Image style={{width:50,height:50,borderRadius:125,marginLeft:5,borderColor:'orange',borderWidth:2}} source={{ uri: item.profilurl }} />

  <Text>{item.noti}</Text>
  
   </TouchableOpacity>
  



    </View>

  render() {
    Header.degis("keşfet");
    return (


      <View style={styles.container} >
<Header navigation={this.props.navigation} />
{ this.state.kontrol===true ?
<View style={{justifyContent:"center",alignContent:"center"}}>

<Text>bildiirm yok</Text>

</View>


 :  <FlatList
 data = {this.state.todos}
    keyExtractor = {this.keyExtractor}
    renderItem = {this.renderItem}
  style={{marginTop: 10}}

    />}



      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',

 backgroundColor: '#fff',
paddingBottom:100
  }

});
