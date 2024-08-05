import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import LoginScreen from './Screens/LoginScreen';
import Walkthrough from './Screens/Walkthrough';
import Signup from './Screens/Signup';
import DrawerScreen from './Screens/DrawerScreen';
import HomeScreen from './Screens/HomeScreen';
import JobDetails from './Screens/JobDetails';
import Color from './Assets/Utilities/Color';
import ContactNow from './Screens/ContactNow';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: appNavigation.js:52 ~ AppNavigator ~ token:", token)
  const selectedRole = useSelector(state => state.commonReducer.selectedRole);
  console.log(
    '🚀 ~ file: appNavigation.js:53 ~ AppNavigator ~ selectedRole:',
    selectedRole,
  );
  const isMileage = useSelector(state => state.authReducer.isMileage);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen ='LoginScreen'
      // walkThrough == false
      //   ? 'Walkthrough'
      //   : token != null &&
      //     selectedRole == 'Business Qbidder' &&
      //     isMileage == false
      //   ? 'MileRange'
      //   : token != null
      //   ? 'TabNavigation'
      //   : 'LoginScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="Walkthrough" component={Walkthrough} />
          <RootNav.Screen name="DrawerScreen" component={DrawerScreen} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="HomeScreen" component={HomeScreen} />
          <RootNav.Screen name="JobDetails" component={JobDetails} />
          <RootNav.Screen name="ContactNow" component={ContactNow} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  // console.log(
  //   '🚀 ~ file: appNavigation.js:83 ~ TabNavigation ~ userRole:',
  //   userRole,
  // );
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.themeColor;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;

          if (
            route.name === 'HomeScreen' ||
            route.name === 'NegotiatorHomeScreen'
          ) {
            iconName = focused ? 'home' : 'home-outline';
            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'ChatScreen') {
            iconName = focused
              ? 'ios-chatbubble-ellipses-sharp'
              : 'ios-chatbubble-ellipses-outline';
            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'NotificationScreen') {
            type = FontAwesome;
            iconName = focused ? 'bell' : 'bell-o';

            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'CreateNew') {
            type = AntDesign;
            iconName = focused ? 'Plus' : 'Plus';

            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            iconName = focused ? 'settings-outline' : 'settings-sharp';
            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
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
                backgroundColor: Color.themeColor,
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
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      {/* <Tabs.Screen
        name={'NegotiatorHomeScreen'}
        component={NegotiatorHomeScreen}
      />
      <Tabs.Screen name={'NotificationScreen'} component={NotificationScreen} />

      <Tabs.Screen name={'CreateNew'} component={CreateNew} />

      <Tabs.Screen name={'ChatScreen'} component={ChatScreen} />
      <Tabs.Screen name={'Settings'} component={Settings} /> */}
    </Tabs.Navigator>
  );
};

export default AppNavigator;
