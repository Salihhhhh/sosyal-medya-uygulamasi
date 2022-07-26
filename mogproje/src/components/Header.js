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
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: null,
      kontrol: false,
      value: "",

    };

    this.arrayholder = [];

  }

  componentWillMount() {



  }

  profil2(gelenitem){
    Profile2.degis(gelenitem)
    this.props.navigation.navigate('Profile2Screen')
}


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





      db.collection("Users")
        .orderBy("username").startAt(gelen).limit(5).get().then(snapshot => {
          snapshot.docs.forEach(doc1 => {


            person.push({
              username: doc1.data().username,
              uid: doc1.data().uid,
              src: doc1.data().src,
              name:doc1.data().name
            })








          });

          this.setState({
            arrayholder: person,
            data: person
          })





        });

    });




  }



  static degis(gelenyazi) {

    if(gelenyazi==="keşfet"){

        renk="#DFE6EC"
     
    }

    else{
    
        renk="white"
    
    }
    name = gelenyazi;
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
      value: text,

    });





  };




  renderRow = ({ item }) => {
    console.log('fırattttttttt', item)
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.profil2(item.uid)}
          style={{ padding: 5, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>

          <ListItem
          leftAvatar={{ source: { uri: item.src } }}
            title={`${item.username}`}
            subtitle={`${item.name}`}
            
          />
        </TouchableOpacity>
      </View>
    )
  }


    ;


  render() {
    return (
<View>


      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingTop:25,backgroundColor:renk}}>
     
          {name !== 'keşfet' ?
       

     
                <Ionicons

                  name="md-menu"
                  color="#000000"
                  size={25}

                  style={styles.menuIcon}
                  onPress={() => this.props.navigation.toggleDrawer()}
                ></Ionicons>
     




          
            : null}

{name !== 'keşfet' ?
<Text style={{ textAlign: "center", justifyContent: "center" ,zIndex:9,alignItems:"center",alignContent:"center"}}> {name}</Text>
               : null}


          {name == 'keşfet' ?





                <Ionicons

                  name="md-menu"
                  color="#000000"
                  size={25}

                  style={styles.menuIcons}
                  onPress={() => this.props.navigation.toggleDrawer()}
                />


            : null}

{name == 'keşfet' ?




<View style={{flex:1,paddingLeft:30}}>

<SearchBar
  placeholder="Arama..."


  onChangeText={text => this.searchFilterFunction(text)}

  lightTheme

  value={this.state.value}
/>
</View>
: null}
            </View>
        <View>
          {name == 'keşfet' && this.state.kontrol == true ?
            <FlatList

              data={this.state.data}
              renderItem={this.renderRow}
              keyExtractor={item => item.id}

          lightTheme={false}
          platform={"wrong-platform"}


            />
            : null}
        </View>
  
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