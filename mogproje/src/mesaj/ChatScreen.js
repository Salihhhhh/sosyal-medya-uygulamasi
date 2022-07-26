import React from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, ActivityIndicator, Dimensions, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import styles from '../components/Styles';
import User from '../components/User';
import firebase from 'firebase';
import ReversedFlatList from 'react-native-reversed-flat-list';

export default class ChatScreen extends React.PureComponent {

    // hata kalksın diye enpm startn son ekledimmmmm..
    // _isMounted = false;
    static navigationOptions = ({ navigation }) => {

        return {

            headerTitle: (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image
                        source={{ uri: navigation.getParam('url') }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            borderWidth: 2,
                            borderColor: 'orange'
                        }}
                    />
                    <Text style={{ flex: 1, flexDirection: 'row', fontSize: 16, fontWeight: 'bold', paddingTop: 6, paddingLeft: 4 }} >
                        {navigation.getParam('name', null)}
                    </Text>
                </View>

            ),

            //  title:    
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                id: props.navigation.getParam('id'),
                email: props.navigation.getParam('email'),
                url: props.navigation.getParam('url'),

            },
            avatar: '',
            textMessage: '',
            messageList: [],
            loading: true,
            error: null,
            limit: 12,
         zaman:0


        }
    }


    loadmore() {
        this.setState({
            limit: this.state.limit + 5
           
        }, () => {
            this.getir();
        });
    }




    
    //burdaki ' componentWillMount ' du aşağıdaki ile değiştim hata kalktı
    componentDidMount() {
       
  


this.getir();
    }


    getir = async() => {
     
        console.log("didmounta girid")
        //  _isMounted = true;
       
        //  
        //  firebase.database().ref('poast1').child(this.state.person.id)
        //   .on('child_added', (val) => {
        this.setState({ avatar: this.state.person.url });
        //    });
       console.log("personnnnnid" ,User.id, this.state.person.id)

            firebase.database().ref('messages').child(User.id).child(this.state.person.id)
                .limitToLast(this.state.limit).on('value', value=> {
                    this.setState({
                        zaman:0
                    })
                    this.state.zaman=0;
                    var yeni = [];
    
                    value.forEach(child => {
                     
                        let d = new Date(child.val().time);
                        let gun = d.getDay();
                       
                        console.log("dsdfdsfghjjjjjjjjjjjjjjj", gun,this.state.zaman,this.state.loading)
                        if (child.val().message) {
    
                            if (this.state.zaman === gun) {
                                yeni.push({
                                    from: child.val().from,
                                    message: child.val().message,
                                    time: "non",
                                    sure:child.val().sure
                                });
                            } else {
                          this.state.zaman=gun;
                                yeni.push({
                                    from: child.val().from,
                                    message: child.val().message,
                                    time: child.val().time,
                                    sure:child.val().sure
                                });
                            }
    
                        }
                        else {
    
                        }
    
                    });
                    this.setState({
                        messageList: yeni,
                        loading:false
                    })
    
                    /*     this.setState((prevState) => {
                             //  this.setState({loading:fal se});
                             return {
                                 messageList: [...prevState.messageList, value.val()],
                                 error: value.val().error || null,
                                 loading: false,
                             }
     
                         })
                         */
    
    
                    console.log('mesajdan gelen veriler', this.state.messageList)
               
            //   .catch(error => {
            //         this.setState({ error, loading: true });
            //   });
    
    


            firebase.database().ref('messages').child(User.id).child(this.state.person.id)
                .child('data').update({ durum: '0' });





        });

    }
    handleChange = key => val => {
        this.setState({ [key]: val })
    }


    convertTime = (time) => {

        console.log("aaaaaaaa",time)

        if(time==="non"){
              return ""  
        }

        else{

        
   let result=""
        /*   var date = new Date().getDate();
           //Current Date
   
           var month = new Date().getMonth() + 1; //Current Month
   
           var year = new Date().getFullYear();
   
           var hours = new Date().getHours();
           //Current Hours
   
           var min = new Date().getMinutes();
           //Current Minutes
   
           if (min === 1 || min === 2 || min === 3 || min === 4 || min === 5 || min === 6 || min === 7 || min === 8 || min === 9) {
   
               min = 0 + "" + min;
           }
   
           if (hours === 1 || hours === 2 || hours === 3 || hours === 4 || hours === 5 || hours === 6 || hours === 7 || hours === 8 || hours === 9) {
   
               hours = 0 + "" + hours;
           }
   
           var tarih = date + "." + month + "." + year + "  " + (hours) + ":" + min;
   
   
           return tarih;
   */
 

        let d = new Date(time);
   let month= d.getMonth();
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

            result = d.getDate()+ " "+ month
          
  
            return result;
        }
    }
    sendMessage = async () => {


 
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
         
      
          var  tarih=(hours)+":"+min

        ///  let d = new Date(time);
   








        ///-----






        if (this.state.textMessage.length > 0) {
         
         
/*
            
firebase.database().ref("messages").child(User.id).child(this.state.person.id).child("tarih").on('child_added', (value) => {
    let d = new Date(value.val());
    let c = new Date();

   console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", value.val());

    if(d.getDay()===c.getDay()){
        zaman=""
    }
    else{
        zaman=firebase.database.ServerValue.TIMESTAMP;
    }

});
*/
        
            firebase.database().ref('messages').child(this.state.person.id).child(User.id).child('data')
                .set({
                    name: User.name,
                    url: User.url,
                    id: User.id,
                    email: User.email,
                    phone: User.id,
                    durum: '1'
                })

            firebase.database().ref('messages').child(User.id).child(this.state.person.id).update({
                tarih: firebase.database.ServerValue.TIMESTAMP
            })


            firebase.database().ref('messages').child(User.id).child(this.state.person.id).child('data')
                .set({
                    name: this.state.person.name,
                    url: this.state.person.url,
                    id: this.state.person.id,
                    email: this.state.person.email,
                    phone: this.state.person.id,
                    durum: '0'
                })

            let msgId = firebase.database().ref('messages').child(User.id).child(this.state.person.id).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                from: User.id,
               time:firebase.database.ServerValue.TIMESTAMP,
               sure:tarih

            }
            updates['messages/' + User.id + '/' + this.state.person.id + '/' + msgId] = message;
            updates['messages/' + this.state.person.id + '/' + User.id + '/' + msgId] = message;
           firebase.database().ref().update(updates);

        

            this.setState({ textMessage: "" });


        }

    }
    renderRow = ({ item }) => {
    
        return (

            
              
            <View>
                <View style={{ alignSelf: 'center', padding: 5 }}>
                    <Text style={{ color: '#000', opacity: .54, fontSize: 16 }}>
                        {this.convertTime(item.time)}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignSelf: item.from === User.id ? 'flex-end' : 'flex-start',
                    borderRadius: 5,
                    marginBottom: 10
                }}>
                    <View >

                        {item.from === User.id ? null
                            : <Image
                                source={{ uri: this.state.avatar }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40,
                                    borderWidth: 2,
                                    borderColor: 'orange'
                                }} />
                        }

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        //width: '60%',
                        maxWidth: '60%',
                        alignSelf: item.from === User.id ? 'flex-end' : 'flex-start',
                        backgroundColor: item.from === User.id ? '#ffa500' : '#f2f2f2',        ///'#00897b' : '#7cb342',
                        borderRadius: 5,
                        marginBottom: 10
                    }}>
                        <View>
                            <View >
                                <Text style={{ color: 'black', padding: 7, fontSize: 16 }}>
                                    {item.message}
                                </Text>
                                <Text style={{ color: 'black', padding: 7, fontSize: 16 }}>
                                    {item.sure}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window');
        if (this.state.loading) {
            return (

                <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        else {
            return (


                <SafeAreaView style={{ flex: 1 }}>

                    <TouchableOpacity onPress={() => {
                        this.loadmore();
                    }}>


                        <Image style={{ width: 20, height: 20 }} source={require('../../assets/x.png')} />


                    </TouchableOpacity>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ flex: 1 }}
                    >
                        <ReversedFlatList
                            style={{
                                padding: 10, height: height * 0.8,

                            }}

                            data={this.state.messageList}
                            renderItem={this.renderRow}
                            keyExtractor={(item, index) => index.toString()} >
                        </ReversedFlatList>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                            <TextInput
                                style={styles.input}
                                value={this.state.textMessage}
                                placeholder='Type message...'
                                onChangeText={this.handleChange('textMessage')}
                            ></TextInput>

                            <TouchableOpacity onPress={this.sendMessage}
                                style={{ paddingBottom: 10, marginLeft: 5 }} >
                                <Text style={styles.btnText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>

            )
        };
    }
}

