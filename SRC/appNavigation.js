import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import LoginScreen from './Screens/LoginScreen';
import Walkthrough from './Screens/Walkthrough';
import Signup from './Screens/Signup';
import Drawer from './Drawer/Drawer';
import HomeScreen from './Screens/HomeScreen';
import JobDetails from './Screens/JobDetails';
import Color from './Assets/Utilities/Color';
// import ContactNow from './Screens/ContactNow';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CreateNew from './Screens/CreateNew';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Icon} from 'native-base';
import {View} from 'react-native';
import {windowHeight} from './Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import NotificationsScreen from './Screens/NotificationsScreen';
import ChatScreen from './Screens/ChatScreen';
import Settings from './Screens/Settings';
import JobDetail from './Screens/JobDetail';
import ChangePassword from './Screens/ChangePassword';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import DetailScreen from './Screens/DetailScreen';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const selectedRole = useSelector(state => state.commonReducer.selectedRole);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    // const firstScreen = 'LoginScreen';
    // walkThrough == false
    //   ? 'Walkthrough'
    //   : token != null &&
    //     selectedRole == 'Business Qbidder' &&
    //     isMileage == false
    //   ? 'MileRange'
    //   : token != null
    //   ? ''
    //   : 'LoginScreen';
    const firstScreen =
      // walkThrough == false
      //   ? 'WalkThroughScreen'
         token == null
        ? 'LoginScreen'
        : 'drawer';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="DetailScreen" component={DetailScreen} />
          <RootNav.Screen name="JobDetail" component={JobDetail} />
          <RootNav.Screen name="CreateNew" component={CreateNew} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />


        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      // style={{ backgroundColor: 'green' }}

      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.white;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;

          if (
            route.name === 'HomeScreen' ||
            route.name === 'NegotiatorHomeScreen'
          ) {
            iconName = focused ? 'home' : 'home-outline';
            color = focused
              ? userRole == 'Customer'
                ? Color.blue
                : userRole == 'Vendor'
                ? '#91E7BF'
                : '#000147'
              : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'ChatScreen') {
            type = Ionicons;
            iconName = focused
              ? 'chatbubble-ellipses-sharp'
              : 'chatbubble-ellipses-outline';
            color = focused
              ? userRole == 'Customer'
                ? Color.blue
                : userRole == 'Vendor'
                ? '#91E7BF'
                : '#000147'
              : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'NotificationScreen') {
            type = FontAwesome;
            iconName = focused ? 'bell' : 'bell-o';

            color = focused
              ? userRole == 'Customer'
                ? Color.blue
                : userRole == 'Vendor'
                ? '#91E7BF'
                : '#000147'
              : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'CreateNew') {
            type = AntDesign;
            iconName = focused ? 'Plus' : 'Plus';
            color = focused
              ? userRole == 'Customer'
                ? Color.blue
                : userRole == 'Vendor'
                ? '#91E7BF'
                : '#000147'
              : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            iconName = focused ? 'settings-outline' : 'settings-sharp';
            color = focused
              ? userRole == 'Customer'
                ? Color.blue
                : userRole == 'Vendor'
                ? '#91E7BF'
                : '#000147'
              : Color.white;

            // color = focused  && ? ? Color.blue : userRole == 'Vendor' ? '#91E7BF' : userRole == 'Manager'? '#000147'  : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
          return route.name == 'CreateNew' ? (
            <View
              style={{
                borderWidth: 5,
                borderColor: Color.lightGrey,
                height: moderateScale(60, 0.3),
                width: moderateScale(60, 0.3),
                borderRadius: moderateScale(30, 0.3),
                backgroundColor: '#16232B',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: moderateScale(-30, 0.3),
              }}>
              <Icon
                name={'plus'}
                as={type}
                color={Color.white}
                size={moderateScale(30, 0.3)}
              />
            </View>
          ) : (
            <Icon name={iconName} as={type} color={color} size={size} />
          );
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              // backgroundColor: 'red',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#16232B', '#464646']}
              style={{height: windowHeight * 0.1}}
            />
          </View>
        ),
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      {/* <Tabs.Screen
        name={'NegotiatorHomeScreen'}
        component={NegotiatorHomeScreen}
        />
        {' '} */}
      <Tabs.Screen
        name={'NotificationScreen'}
        component={NotificationsScreen}
      />
      {userRole == 'Customer' && (
        <Tabs.Screen name={'CreateNew'} component={CreateNew} />
      )}
      <Tabs.Screen name={'ChatScreen'} component={ChatScreen} />
      <Tabs.Screen name={'Settings'} component={Settings} />
      {/* <Tabs.Screen name={'MyDrawer'} component={MyDrawer} /> */}
    </Tabs.Navigator>
  );
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const role = useSelector(state => state.authReducer.role);
  const firstScreen = 'HomeScreen';

  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      {/* <DrawerNavigation.Screen
        name={'TabNavigation'}
        component={TabNavigation}
      /> */}
      <DrawerNavigation.Screen name={'HomeScreen'} component={HomeScreen} />
      <DrawerNavigation.Screen name={'DetailScreen'} component={DetailScreen} />
      <DrawerNavigation.Screen name={'JobDetail'} component={JobDetail} />
      <DrawerNavigation.Screen name={'CreateNew'} component={CreateNew} />

      {/* {/* <DrawerNavigation.Screen name={'Signup'} component={Signup} /> */}
      <DrawerNavigation.Screen
        name={'ChangePassword'}
        component={ChangePassword}
      />
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;
