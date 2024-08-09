import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetUserRole,
  setIsVerifed,
  setUserLogoutAuth,
} from '../Store/slices/auth';
import {setUserLogOut} from '../Store/slices/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {background} from 'native-base/lib/typescript/theme/styled-system';

const Drawer = () => {
  const userData = useSelector(state => state.commonReducer.userData);

  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = [
    {
      id: 1,
      name: 'Home',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
    },
   
    // {
    //   id: 2,
    //   name: 'post new job',
    //   iconName: 'plus',
    //   iconType: Entypo,
    //   onPress: () => {
    //     navigation.navigate('CreateNew');
    //   },
    // },
    {
      id: 3,
      name: 'profile',
      iconName: 'user',
      iconType: FontAwesome,
      onPress: () => {
        // navigation.navigate('Profile');
      },
    },
    {
      id: 4,
      name: 'Change Password',
      iconName: 'key',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('ChangePassword');
      },
    },
    {
      id: 5,
      name: 'privacy policy',
      iconName: 'privacy-tip',
      iconType: MaterialIcons,
      onPress: () => {
        // navigation.navigate('PrivacyPolicy');
      },
    },
    {
      id: 6,
      name: 'Terms & Conditions',
      iconName: 'file-text',
      iconType: Feather,
      onPress: () => {
        // navigation.navigate('TermsAndConditions');
      },
    },
    // {
    //   id: 7,
    //   name: 'App Guide',
    //   iconName: 'file-text',
    //   iconType: Feather,
    //   onPress: () => {
    //     // navigation.navigate('AppGuideScreen');
    //   },
    // },

    // {
    //   name: 'Settings',
    //   iconName: 'settings',
    //   iconType: Feather,
    //   onPress: () => {
    //     navigation.navigate('settings');
    //   },
    // },
  ];

  return (
    <>
      <ScreenBoiler
        style={{backgroundColor: 'red'}}
        statusBarBackgroundColor={'black'}
        statusBarContentStyle={'light-content'}>
        {/* <View
          style={{
            overflow: 'hidden',
            width: windowWidth * 0.71,
            backgroundColor: '#D3D3D3',
            height: windowHeight*.97,
            borderBottomRightRadius: moderateScale(35, 0.6),
          }}> */}
        <ImageBackground
          style={{
            height: windowHeight * 0.25,
            justifyContent: 'center',
          }}
          source={
            userRole == 'Customer'
              ? require('../Assets/Images/bg3.png')
              : userRole == 'Vendor'
              ? require('../Assets/Images/bg2.png')
              : require('../Assets/Images/bg1.png')
          }>
          <View
            style={{
              height: windowHeight * 0.25,
              justifyContent: 'center',
            }}>
            <View style={styles.imageContainer}>
              <View style={styles.Profile}>
                <CustomImage
                  resizeMode={'cover'}
                  source={
                    userData?.photo
                      ? {uri: userData?.photo}
                      : require('../Assets/Images/user.png')
                  }
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <View style={{marginLeft: moderateScale(10, 0.3)}}>
                <CustomText style={styles.text1} isBold>
                  Arron john
                </CustomText>

                <CustomText isBold style={styles.text3}>
                  Arron@gmail.com
                </CustomText>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.btn2View}>
          {data?.map((item, index) => (
            <>
              <TouchableOpacity
                Key={item.id}
                onPress={item?.onPress}
                style={styles.btn2}>
                <Icon
                  name={item?.iconName}
                  as={item?.iconType}
                  size={moderateScale(20, 0.3)}
                  color={'#1F1D2B'}
                  onPress={item?.onPress}
                />
                <CustomText isBold style={styles.text}>
                  {item.name}
                </CustomText>
              </TouchableOpacity>
            </>
          ))}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setUserLogoutAuth());
              dispatch(setUserLogOut());
            }}
            style={styles.btn}>
            <Icon
              name={'logout'}
              as={AntDesign}
              style={styles.icon2}
              color={'#1F1D2B'}
              size={moderateScale(20, 0.3)}
            />

            <CustomText isBold style={styles.text}>
              Log out
            </CustomText>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </ScreenBoiler>
    </>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
  btnView: {
    marginLeft: moderateScale(10, 0.3),
    marginTop: moderateScale(40, 0.3),
    position: 'absolute',
    bottom: 40,
  },
  btn: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.5,
    margin: moderateScale(15, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: moderateScale(16, 0.6),
    color: Color.black,
  },
  text: {
    fontSize: moderateScale(13, 0.6),
    color: '#1F1D2B',
    marginLeft: moderateScale(10, 0.3),
  },
  imageContainer: {
    alignItems: 'center',
    // backgroundColor:'red',
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
    alignItems: 'center',
    marginLeft: moderateScale(10, 0.3),
  },
  btn2: {
    width: windowWidth * 0.5,
    borderColor: Color.black,
    margin: moderateScale(15, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn2View: {
    // paddingTop: moderateScale(5, 0.6),
    // marginTop: moderateScale(60, 0.3),
    height: windowHeight * 0.85,
    // backgroundColor:'red'
  },
  text3: {
    width: windowWidth * 0.4,
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
  },
  back: {
    // backgroundColor: 'red',
    width: windowWidth * 0.1,
    marginVertical: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    elevation: 10,
  },
  row: {
    height: windowHeight * 0.25,
    width: '100%',
  },
});
