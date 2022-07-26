import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator,
    DrawerItems
} from 'react-navigation';
import { View,SafeAreaView, Image,Text,StyleSheet, ActivityIndicator,Dimensions,TouchableOpacity,Modal,TextInput,Alert,Button,WebView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Home from './Home';
import Kesfet from './Kesfet';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Profile2 from './Profile2';
import Upload from './Upload';
import News from './News';
import Notification from './Notification';
import YeniPost from './YeniPost';
import GelenScreen from '../mesaj/GelenKutusu';
import ChatScreen from '../mesaj/ChatScreen';
import ProfilList from './ProfilList';
import { ScrollView } from 'react-native-gesture-handler';
import { Drawer } from 'native-base';
import User from '../components/User';
import MogTv from './MogTv';
export default class MainBottom extends React.Component {


    render() {


        return (

        
            <MainContainer />



        );
    }
}
const CustomDrawerComponent = (props) => (

<SafeAreaView style={{flex:1}}> 
<TouchableOpacity onPress={() => props.navigation.navigate("Ana Sayfa")}>
    <View style={{height:150,backgroundColor:"white",alignItems:"center",justifyContent:"center",paddingTop:80}}>
    <Image source={{uri:User.url}}
                        style={{ width:120,height:120,borderRadius:60,borderWidth:2,borderColor:'orange'}}
           />
           <Text style={{textAlig:"center"}}>  {User.name} </Text>
    </View>
</TouchableOpacity>
    <ScrollView style={{paddingTop:40}}>
        <DrawerItems {...props} />
    </ScrollView>
</SafeAreaView>


)

const TabNavigator = createBottomTabNavigator({
    KesfetTab: {
        screen: Kesfet,
        navigationOptions: {
            tabBarLabel: 'Keşfet',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-flame' size={24} color={tintColor} />
     
        }
    },
    ProfileTab: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profil',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-person' size={24} color={tintColor} />
        }
        
    },
    HomeTab: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Ana Sayfa',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={24} color={tintColor} />
        }
    },

  
    UploadTab: {
        screen: Upload,
        navigationOptions: {
            tabBarLabel: 'Yükle',
            tabBarIcon: ({ tintColor }) => <Ionicons name='md-arrow-round-up' size={24} color={tintColor} />,
     
        }
    },  Notification: {
        screen: Notification,
        navigationOptions: {
            tabBarLabel: 'Bildirimler',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-notifications' size={24} color={tintColor} />,
     
        }
    },
  




      },
      {
tabBarOptions:{
    activeTintColor:'#1ad4de',
    inactiveTintColor:'#bb2d2d'
}
      });
    

const Mydrawer = createDrawerNavigator({
    'Ana Sayfa': {
        screen: TabNavigator,
        navigationOptions: {
            title: 'Ana Sayfa',
            drawerIcon: ({ tintColor }) => <Ionicons name='ios-home' size={24} color={tintColor} />,
        },
    },

   
    Kategoriler: {
        screen: News,
        navigationOptions: {
            title: 'Haberler',
            drawerIcon: ({ tintColor }) => <Ionicons name='ios-list' size={24} color={tintColor} />,
        }
    },
    MogTv: {
        screen: MogTv,
        navigationOptions: {
            title: 'MogTv',
            drawerIcon: ({ tintColor }) =>  <Entypo name='game-controller' size={24} color={tintColor} />
        }
    },
  
    Cikis: {
        screen: Profile,
        navigationOptions: {
            title: 'Çıkış yap',
            drawerIcon: ({ tintColor }) => <Ionicons name='ios-exit' size={24} color={tintColor} />
        }
    }

},{
    contentComponent:CustomDrawerComponent
});




     const SwitchNavigator = createStackNavigator({
        aa: {
            screen: Mydrawer,
            navigationOptions: {
                headerVisible: false,
                header: null,
              }
          },
         
          ProfileEditScreen: {
            screen: ProfileEdit,
            navigationOptions: {
                headerVisible: false,
                header: null,
              }
          },
          ProfileScreen: {
            screen: Profile,
            navigationOptions: {
                headerVisible: false,
                header: null,
              }
          },
          Profile2Screen: {
            screen: Profile2,
          
          },
          GelenScreen: {
            screen: GelenScreen,
         
          },
          ChatScreen: {
            screen: ChatScreen,
        
          },
           YeniPostScreen: {
            screen: YeniPost,
        
          },
          
          ProfilListScreen: {
              screen: ProfilList
            }
          
          
      
      
         
        
      });

      


      
const MainContainer = createAppContainer(SwitchNavigator);

