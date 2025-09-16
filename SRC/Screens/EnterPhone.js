import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  Alert,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../navigationService';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const EnterPhone = props => {
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const fromForgot = props?.route?.params?.fromForgot;
  console.log('here=>', fromForgot);
  const [phone, setPhone] = useState('');
  console.log('🚀 ~ EnterPhone ~ phone:', phone);
  const [isLoading, setIsLoading] = useState(false);
  const navigationN = useNavigation();

  const sendOTP = async () => {
    const url = 'password/email';
    if (['', null, undefined].includes(phone)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is required', ToastAndroid.SHORT)
        : Alert.alert('email is required');
    }
    setIsLoading(true);
    const response = await Post(url, {email: phone}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phone}`, ToastAndroid.SHORT)
        : Alert.alert(`OTP sent to ${phone}`);
      fromForgot
        ? navigationService.navigate('VerifyNumber', {
            fromForgot: fromForgot,
            phoneNumber: `${phone}`,
          })
        : navigationService.navigate('VerifyNumber', {
            phoneNumber: `${phone}`,
          });
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
        source={
          // SelecteduserRole == 'User'
          //   ? require('../Assets/Images/bg3.png')
          //   : SelecteduserRole == 'vendor'
          //   ?
          require('../Assets/Images/bg2.png')
          // : require('../Assets/Images/bg1.png')
        }>
        <ScrollView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: moderateScale(20, 0.3),
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: windowHeight,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                position: 'absolute',
                top: moderateScale(20, 0.3),
                left: moderateScale(20, 0.3),
                height: moderateScale(30, 0.3),
                width: moderateScale(30, 0.3),
                borderRadius: moderateScale(5, 0.3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                zIndex: 1,
              }}>
              <Icon
                name={'arrowleft'}
                as={AntDesign}
                size={moderateScale(22, 0.3)}
                color={Color.black}
                onPress={() => {
                  navigationN.goBack();
                }}
              />
            </TouchableOpacity>

            {/* <CardContainer
              style={{
                paddingVertical: moderateScale(30, 0.3),
                alignItems: 'center',
              }}> */}
            <CustomText isBold style={styles.txt2}>
              Forget Password
            </CustomText>
            <CustomText style={styles.txt3}>
              Forgot your password ? don't worry, jsut take a simple step and
              create your new password!
            </CustomText>

            <TextInputWithTitle
              titleText={'Enter your Email'}
              secureText={false}
              placeholder={'Enter your Email'}
              setText={setPhone}
              value={phone}
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.82}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(35, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Submit'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.9}
              isBold={true}
              fontSize={moderateScale(17, 0.6)}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                sendOTP();
                //  navigationService.navigate('VerifyNumber', {phoneNumber : phone})
              }}
              bgColor={
                SelecteduserRole == 'Qbid member' ? Color.blue : Color.black
              }
              // borderColor={Color.white}
              // borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
            />

            <View style={styles.container2}>
              <CustomText style={styles.txt5}>
                {'Already have an account? '}
              </CustomText>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{marginLeft: moderateScale(1, 0.3)}}
                onPress={() => navigationService.navigate('LoginScreen')}>
                <CustomText style={styles.txt4}>{'Sign In'}</CustomText>
              </TouchableOpacity>
            </View>
            {/* </CardContainer> */}
          </KeyboardAwareScrollView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.white,
    fontSize: moderateScale(26, 0.6),
  },
  txt3: {
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.themeColor,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(13, 0.6),
  },
});

export default EnterPhone;
