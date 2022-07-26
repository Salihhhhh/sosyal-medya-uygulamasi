import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import User from '../components/User';
import firebase from 'firebase';
import { ListItem, SearchBar } from 'react-native-elements';
import { __param } from 'tslib';
import ReversedFlatList from 'react-native-reversed-flat-list';


export default class GelenKutusu extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: (
                <View style={{flex:1}}>

                
<Text>Gelen Kutusu</Text>                
                </View>

            ),
            //  title:    
        }
    }

    constructor(props) {
        super(props);
    this.state = {
        loading: true,
        data: [],
        data2: [],
        error: null,
        kontrol: false,
        value: "",
     modalVisible2:false
      }
 
      this.arrayholder = [];
    }
  

    componentWillMount(){

    
    }
  componentDidMount() {

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.state.data2= [];
        this.getir(); 
      }
    )  
  }
 
    getir = async () => {

    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  var a=[];

  this.setState({
    data2:a
  }, () => {
  
    firebase.database().ref('messages').child(firebase.auth().currentUser.uid).orderByChild("tarih").on('child_added', (val) => {
        this.setState((prevState) => {
          return {
  
            data2: [...prevState.data2, val.val()]
          }
        })
 
    })
});
 
  }


  componentWillUnmount () {
    this.willFocusSubscription.remove();
  }


  

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  
  searchbarData(gelen) {


    const db = firebase.firestore();
    var a = [];

    var person = [];

    this.setState({
      arrayholder: a,
      data: a,
      person: a,
      kontrol: false
    }, () => {



        db.collection("Users").doc(firebase.auth().currentUser.uid).collection("following")
        .orderBy("username").startAt(gelen).limit(2).get().then(snapshot => {
          snapshot.docs.forEach(doc=> {


            let cityRef = db.collection('Users').doc(doc.data().following);
            let getDoc = cityRef.get()
              .then(doc1 => {
           
                person.push({
                    username: doc1.data().username,
                    id: doc1.data().uid,
                    url: doc1.data().src,
                    name:doc1.data().name,
                    email:doc1.data().email,
                  
                    
                  })
                  this.setState({
                    arrayholder: person,
                    data: person
                  })
        
      
              })
              .catch(err => {
                console.log('Error getting document', err);
              });




        });

    });



    });




  }



  searchFilterFunction(text) {



    this.searchbarData(text.toLowerCase());



    if (text === "") {
      this.setState({
        kontrol: false
      })
    }
    else {
      this.setState({
        kontrol: true
      })
    }

this.setState({
  value:text
})




  };




  renderRow = ({ item }) => {
    console.log('fırattttttttt', item)
    return (
      <View>
        <TouchableOpacity
       
onPress={() => this.props.navigation.navigate('ChatScreen',item
)}
          style={{ padding: 5, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>

          <ListItem
          leftAvatar={{ source: { uri: item.url } }}
            title={`${item.username}`}
            subtitle={`${item.name}`}
            
          />
        </TouchableOpacity>
      </View>
    )
  }


    ;
  renderRow2 = ({ item }) => {

    console.log('ufukkkkk', item.data);
    if(item.data.name != null) {

    return (


      <View style={{ flex: 1, flexDirection: "row", margin: 3} }>


 


        {item.data.durum === '1' ?
          <Image
            source={{ uri: item.data.url }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              borderWidth: 5,
              borderColor: 'orange'      // ff7f00   yenisi//FF4500
            }} />
          : <Image
            source={{ uri: item.data.url }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              borderWidth: 2,
              borderColor: 'orange'    //f18b42     yenisi///#FFA500
            }} />
        }
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ChatScreen', item.data)}
          style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 0 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.data.name}</Text>
        </TouchableOpacity>
      </View>
     
    )
      }

      else {

      }
  }

  render() {
    return (
      <SafeAreaView style={{paddingTop:10}}>
   

<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>



</View>
<View>
           
<SearchBar
  placeholder="Arama..."


  onChangeText={text => this.searchFilterFunction(text)}

  lightTheme

  value={this.state.value}
/>

{this.state.kontrol === true ?
<FlatList

data={this.state.data}
renderItem={this.renderRow}
keyExtractor={item => item.id}

lightTheme={false}
platform={"wrong-platform"}


/>
: null}
</View>

<FlatList
         inverted
          data={this.state.data2}
          renderItem={this.renderRow2}
          keyExtractor={(item) => item.data.id}
        ></FlatList>
      </SafeAreaView>
    );
  }
}

