import * as React from 'react';
import { createAppContainer, createSwitchNavigator ,DrawerNavigator } from 'react-navigation';
import SignUp from './src/auth/SignUp';
import SignIn from './src/auth/Signin';
import Home from './src/main_pages/Home';
import Profile from './src/main_pages/Profile';
import MainBottom from './src/main_pages/MainBottom';
import ProfileEdit from './src/main_pages/ProfileEdit';
import Upload from './src/main_pages/Upload';
import Profile2 from './src/main_pages/Profile2';

 export default class App extends React.Component {


  render() {

    return (

<AppContainer/>

    

    );
  }
}


const SwitchNavigator = createSwitchNavigator({
  SignInScreen: {
    screen: SignIn
  },

  UploadScreen: {
    screen: Upload
  },

  ProfileEdit: {
    screen: ProfileEdit
  },


  SignUpScreen: {
    screen: SignUp
  },






  ProfileScreen: {
    screen: Profile
  },

    HomeScreen: {
      screen: Home
    },
    MainBottom: {
      screen: MainBottom
    },

});




const AppContainer = createAppContainer(SwitchNavigator);