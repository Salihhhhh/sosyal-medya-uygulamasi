import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList, Image, ScrollView, ActivityIndicator, TouchableOpacity,Modal,Alert,Button,TextInput } from 'react-native';
import { Video } from 'expo';
import Header from '../components/Header'
import firebase from '../components/FirebaseConfig'
import { ListItem, SearchBar } from 'react-native-elements';
import Profile2 from  '../main_pages/Profile2'
import YeniPost from  '../main_pages/YeniPost'
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class Kesfet extends React.Component {

  state = {yedekitem:[],items2:[],yorumm:"",isFetching: false,todos2:[],yeniuid:"",yorumSayisi:"",yeniid:"",isLikes:false,likeSayisi:0,yeniisim:"",yeniprofilurl:"",yeniurl:"",yenitype:"",modalVisible: false,katekontrol:"all", todos2: [], kolonsayi: 3, horizontal: 3, page: 2, isFetching: false, showIndicator: false, kontrol: false, start: 0,arrayHolder: [] }

static state={items:[]}
  constructor(props) {
    super(props);

}


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillMount() {
    this.setState({ isFetching: false })
    console.log("ilkkkkkkkkkkkkkkkkkkk")
    const text = this.props.navigation.getParam('text', 'normal')

    Header.degis("keşfet");
  }
  componentDidMount(){
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.state.items= [];
        if(this.state.katekontrol!=="all"){
          this.kategorisec(this.state.katekontrol);
        }
        else
        {   this.firebasegetData(); }
     
      }
    )  
  }

  componentWillUnmount () {
    this.willFocusSubscription.remove();
  }



  profil2(gelenitem){
    Profile2.degis(gelenitem)
    this.props.navigation.navigate('Profile2Screen')
}
yenipost(gelenitem){
  YeniPost.degis(gelenitem)
  this.props.navigation.navigate('YeniPostScreen')
}

  onRefresh(item) {
    this.setState({ isFetching: true ,items:[]}, function() { this.yenisayfa(item) });
 }

  handleLoadMore() {


    console.log("handle fgirdi")
    this.setState({
    start: this.state.page,
      page: this.state.page+2,
      showIndicator: true
    }, () => {
      console.log("handle ", this.state.page)

      this.setState({ arrayHolder:[] },() => this.firebasegetData2())
   


    });




  }
yonlendir(gelen){
this.setState({
  start:0,
    page:2
},() => {
this.kategorisec(gelen);
});

}
  firebasegetData2() {
    this.setState({ isFetching: false })

 


    var b = 1;
    

    const db = firebase.firestore();
    db.collection('Post2').orderBy('like',"desc").limit(this.state.page).get().then(snapshot => {snapshot .docs.forEach(doc =>
 {
    if(b>this.state.start && b<=this.state.page){

        var gen = Dimensions.get('window').width / 3;
        var yuk = Dimensions.get('window').height / 6;

      
        this.state.items.push({
          sayac: b,
          width: gen,
          height: yuk,
          uid:doc.data().uid,
          id: doc.id,
          type: doc.data().type,
          gelenUrl: doc.data().url,
          likeSayi:doc.data().like,
          yorumSayi:doc.data().yorumSayisi,
     
        });
      }
        b = b + 1;
      });
 


      this.setState({
        showIndicator: false,
      })

     this.setState({ arrayHolder:[...this.state.items] })







    })
   


  }

  handleLoadMore2() {



    this.setState({
    start: this.state.page,
      page: this.state.page+2,
      showIndicator: true
    }, () => {
      console.log("handle ", this.state.page)

      this.setState({ arrayHolder:[] },() => this.kategorisec2())
   


    });




  }
  kategorisec2() {
    this.setState({ isFetching: false })

 


    var b = 1;
    

    const db = firebase.firestore();
    db.collection('Post2').where("categories","==",this.state.katekontrol).limit(this.state.page).get().then(snapshot => {snapshot .docs.forEach(doc =>
 {
    if(b>this.state.start && b<=this.state.page){

        var gen = Dimensions.get('window').width / 3;
        var yuk = Dimensions.get('window').height / 6;

      
        this.state.items.push({
          sayac: b,
          width: gen,
          height: yuk,
          uid:doc.data().uid,
          id: doc.id,
          type: doc.data().type,
          gelenUrl: doc.data().url,
          likeSayi:doc.data().like,
          yorumSayi:doc.data().yorumSayisi,
     
        });
      }
        b = b + 1;
      });
 


      this.setState({
        showIndicator: false,
      })

     this.setState({ arrayHolder:[...this.state.items] })







    })
   


  }
  


  firebasegetData() {

    this.setState({
      start: this.state.start,
        page: this.state.page,
      
      }, () => {

        this.setState({ isFetching: false,
          items:[]
          })
      
          this.setState({katekontrol:"all"})
      
      
          var a = 1;
      
      
          const db = firebase.firestore();
         
      
            db.collection('Post2').orderBy('like',"desc").limit(this.state.page).get().then(snapshot => {snapshot .docs.forEach(doc =>
      
              {
      
          
      
              var gen = Dimensions.get('window').width / 3;
              var yuk = Dimensions.get('window').height / 6;
      
              console.log("a", doc.id + "sdsdsd" + a);
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
      
              a = a + 1;
            });
            console.log("asdpgl")
      
      
            this.setState({
              showIndicator: false,
            })
      
           this.setState({ arrayHolder:[...this.state.items] })
      
      
      
      
      
      
      
          })
         
  
  
      });



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
          <TouchableOpacity onPress={() => this.yenisayfa(item)}>
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
  
    kategorisec = (gelen) => {
this.setState({
      start: this.state.start,
        page: this.state.page,
     items:[]
      }, () => {
        this.setState({ arrayHolder:[...this.state.items] })
        this.setState({katekontrol:gelen})
        var gen = Dimensions.get('window').width / 3;
        var yuk = Dimensions.get('window').height / 6;
     var c=0;
    
          
          const db = firebase.firestore();
          db.collection('Post2').where("categories","==",gelen).limit(this.state.page).get().then(snapshot => {snapshot .docs.forEach(doc =>
    {
  
  
  
             this.state.items.push({
                sayac: c,
                width: gen,
                height: yuk,
                id: doc.id,
                uid:doc.data().uid,
                type: doc.data().type,
                gelenUrl: doc.data().url,
                likeSayi:doc.data().like,
                yorumSayi:doc.data().yorumSayisi,
    
    
            });
  
            c=c+1;
          
          });
          this.setState({ arrayHolder:[...this.state.items] })
          })

      });
      

    
      
    }
  render() {
    Header.degis("keşfet");


    if (this.state.showIndicator) {

      return (
        <View>
          {/*Code to show Activity Indicator*/}
          <ActivityIndicator size="large" color="#0000ff" />
          {/*Size can be large/ small*/}
        </View>
      );
    }
    else {

      return (


        <View style={styles.container} >
     
     <Header navigation={this.props.navigation} />


     

          <View style={{flex:1}}>
      
<View style={{height:90}}>
            <ScrollView
    
              horizontal={true}

              showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => this.yonlendir("pubg")}>
              <Image source={require('../../assets/lol.png')} style={{ width: 110, zIndex: 1, height: 90 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.yonlendir("csgo")}>
              <Image source={require('../../assets/pubg.jpg')} style={{ width: 110, zIndex: 1, height: 90 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.firebasegetData()}>
              <Image source={require('../../assets/csgo.jpg')} style={{ width: 110, zIndex: 1, height: 90 }} />
              </TouchableOpacity>
              <Image source={require('../../assets/fortnite.jpg')} style={{ width: 110, zIndex: 1, height: 90 }} />
              <Image source={require('../../assets/lol.png')} style={{ width: 110, zIndex: 1, height: 90 }} />
              <Image source={require('../../assets/pubg.jpg')} style={{ width: 110, zIndex: 1, height: 90 }} />
              <Image source={require('../../assets/csgo.jpg')} style={{ width: 110, zIndex: 1, height: 90 }} />
              <Image source={require('../../assets/fortnite.jpg')} style={{ width: 110, zIndex: 1, height: 90 }} />
            </ScrollView>
            </View>
            <FlatList
              numColumns={this.state.kolonsayi}
              data={this.state.arrayHolder}
          //    extraData={this.state.arrayHolder}
              renderItem={this.renderItem}
              style={{ marginTop: 2 }}
              keyExtractor={(item, index) => item.key}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
             
            //  display={'flex'}
            // flexWrap={'wrap'}
            //  horizontal={false}

            //  key={(this.state.horizontal ? 'h' : 'v')}
            />
        </View>


          { this.state.katekontrol === 'all' ?
          <TouchableOpacity onPress={() => this.handleLoadMore()}>
            <Text style={{ fontStyle: 'normal', paddingLeft: 15, fontSize: 15 }}>Daha fazlasını gör</Text>
          </TouchableOpacity>
:null}
  { this.state.katekontrol !== 'all' ?
          <TouchableOpacity onPress={() => this.handleLoadMore2()}>
            <Text style={{ fontStyle: 'normal', paddingLeft: 15, fontSize: 15 }}>Daha fazlasını gör</Text>
          </TouchableOpacity>
:null}


        </View>
        

      );
    }
  }
 
}


const styles = StyleSheet.create({

  container: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    top:0,
    flex: 1,
    flexDirection:"column"
   

  }

});
