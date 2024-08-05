import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import {ScrollView} from 'native-base';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import navigationService from '../navigationService';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation =useNavigation()
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedType] = useState(
    userRole ? userRole : 'Customer',
  );

  const servicesArray = ['Manager', 'Vendor','Customer'];



  // const Login = async () => {
  //   const body = {
  //     email: email,
  //     password: password,
  //   };

  //   for (let key in body) {
  //     if (body[key] == '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
  //         : Alert.alert(` ${key} field is empty`);
  //     }
  //   }

  //   if (!validateEmail(email)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
  //       : Alert.alert('email is not validate');
  //   }
  //   if (password.length < 8) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Password should atleast 8 character long',
  //           ToastAndroid.SHORT,
  //         )
  //       : Alert.alert('Password should atleast 8 character long');
  //   }

  //   const url = 'login';
  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     if (selectedRole == response?.data?.user_info?.role) {
  //       dispatch(
  //         setUserData({
  //           ...response?.data?.user_info,
  //           average_rating: response?.data?.average_rating,
  //         }),
  //       );
  //       dispatch(setSelectedRole(response?.data?.user_info?.role));
  //       dispatch(setUserToken({token: response?.data?.token}));
  //       dispatch(
  //         setMilageRing(
  //           ['', null, 'null', undefined, 0].includes(
  //             response?.data?.user_info?.radius,
  //           )
  //             ? false
  //             : true,
  //         ),
  //       );
  //     } else {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show('unauthenticated', ToastAndroid.SHORT)
  //         : Alert.alert('unauthenticated');
  //     }
  //   }
  // };

  useEffect(() => {
    dispatch(setSelectedRole(selectedRole));
  }, [selectedRole]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={
          userRole == 'Qbid Member'
            ? Color.blue
            : userRole == 'Qbid Negotiator'
            ? Color.themeColor
            : Color.black
        }
        barStyle={'light-content'}
      />
     <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={selectedRole == 'Customer' ?[ '#16222A','#3A6073',]:selectedRole == 'Vendor' ? ['#1f4037'   ,'#99f2c8' ] : ['#000046' , '#1CB5E0' , ]}
        style={styles.container}>


        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          style={{
            width: '100%',
            paddingTop: windowHeight * 0.1,
            // flexGrow: 0,
          }}>
          <View style={[styles?.textContainer]}>
            <CustomImage
              source={
              require('../Assets/Images/logo.png')
              }
              resizeMode={'contain'}
              style={[styles.bottomImage]}
            />
          </View>

          <DropDownSingleSelect
            array={servicesArray}
            item={selectedRole}
            setItem={setSelectedType}
            placeholder={selectedRole}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            dropdownStyle={{
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
              marginTop: moderateScale(30, 0.6),
            }}
          />

          <TextInputWithTitle
            titleText={'Enter your Email'}
            secureText={false}
            placeholder={'Enter your Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.6)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Enter your password'}
            secureText={true}
            placeholder={'Enter your password'}
            setText={setPassword}
            value={password}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.6)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
          />
          <CustomText
            onPress={() => {
              navigationService.navigate('EnterPhone', {fromForgot: true});
            }}
            style={
              styles.txt3
            }>
            {'Forgot Password?'}
          </CustomText>

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Login'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
                  navigation.navigate('HomeScreen')
              // Login();
            }}
            bgColor={Color.black
            }
      
            borderRadius={moderateScale(30, 0.3)}
          />

          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {"Don't have an account? "}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: windowWidth * 0.01}}
              onPress={() => navigationService.navigate('Signup')}>
              <CustomText
                style={[
                  styles.txt4,
                  {
                  color: Color.black,
                  },
                ]}>
                {'Sign Up'}
              </CustomText>
            </TouchableOpacity>
          </View>
        

      
        </ScrollView>


        </LinearGradient>



    </>
  );
};


const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.02,
    height: windowHeight * 0.9,
    width: windowWidth,
  },
  bottomImage: {
    width: windowWidth * 0.4,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image1: {
    width: 200,
    height: 200,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(15, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
});

export default LoginScreen;
