import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButton from '../Components/CustomButton';
import {Icon, ScrollView} from 'native-base';
import {
  setMilageRing,
  setUserLogin,
  setUserToken,
  setWalkThrough,
} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import navigationService from '../navigationService';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';
import ImagePickerModal from '../Components/ImagePickerModal';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {validateEmail} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const dispatch = useDispatch();
  const navigation =useNavigation()

  const [image, setImage] = useState({});
  const [selectedRole, setselectedRole] = useState(
    userRole ? userRole : 'Qbid Member',
  );
  console.log('hfjsdhfjsdjkf' ,selectedRole)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState(''); 
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [services, setServices] = useState([]); 
  const [language, setLanguage] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  // const formData = new FormData();
  // const Register = async () => {
  //   const body = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email: email,
  //     phone: contact,
  //     address: address,
  //     city: city,
  //     state: state,
  //     zip: zipCode,
  //     password: password,
  //     confirm_password: confirmPassword,
  //     role: selectedRole,
  //     company_name :companyName,
  //   };

  //   for (let key in body) {
  //     if (body[key] == '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
  //         : Alert.alert(` ${key} field is empty`);
  //     }
  //     formData.append(key, body[key]);
  //   }

  //   if (Object.keys(image).length > 0) {
  //     formData.append('photo', image);
  //   } else {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(`Profile image is required`, ToastAndroid.SHORT)
  //       : Alert.alert(`Profile image is required`);
  //   }

  //   if (isNaN(zipCode)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('zipCode is not a number', ToastAndroid.SHORT)
  //       : Alert.alert('zipCode is not a number');
  //   }
  //   if (isNaN(contact)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
  //       : Alert.alert('phone is not a number');
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
  //   if (password != confirmPassword) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
  //       : Alert.alert('Password does not match');
  //   }

  //   if (selectedRole == 'Qbid Negotiator' || selectedRole == 'Business Qbidder' ) {
  //     if (companyName == '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(
  //             'company name is required',
  //             ToastAndroid.SHORT,
  //           )
  //         : Alert.alert('company name required');
  //     }
  //   }

  //   if (
  //     selectedRole != 'Qbid Member' &&
  //     (language.length == 0 || services.length == 0)
  //   ) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Languages and expertise are required',
  //           ToastAndroid.SHORT,
  //         )
  //       : Alert.alert('Languages and expertise are required');
  //   } else {
  //     language?.map((item, index) =>
  //       formData.append(`language[${index}]`, item),
  //     );
  //     services?.map((item, index) =>
  //       formData.append(`expertise[${index}]`, item),
  //     );
  //   }

  //   if (!checked) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Please accept terms and conditions',
  //           ToastAndroid.SHORT,
  //         )
  //       : Alert.alert('Please accept terms and conditions');
  //   }

  //   const url = 'register';
  //   setIsLoading(true);
  //   const response = await Post(url, formData, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     dispatch(setUserData(response?.data?.user_info));
  //     dispatch(setSelectedRole(response?.data?.user_info?.role));
  //     dispatch(setUserLogin(response?.data?.token));
  //     dispatch(setUserToken({token: response?.data?.token}));
  //     dispatch(setMilageRing(false));
  //   }
  // };
  // const UserRoleArray = [ 'Qbid Member', 'Business Qbidder'];

  const UserRoleArray = ['Manager', 'Vendor','Customer'];
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
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={
          userRole == 'Customer'
            ? require('../Assets/Images/bg3.png')
            : userRole == 'Vendor'
            ? require('../Assets/Images/bg2.png')
            : require('../Assets/Images/bg1.png')
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingTop: windowHeight * 0.1,
            paddingBottom: moderateScale(20, 0.3),
          }}
          style={{
            width: '100%',
            flexGrow: 0,
          }}>
          <View>
            {Object.keys(image).length > 0 ? (
              <CustomImage source={{uri: image?.uri}} style={styles.image} />
            ) : (
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/user3.jpg')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={[
                styles.edit,
                {
                  backgroundColor:
                    userRole == 'Qbid Member'
                      ? Color.blue
                      : userRole == 'Qbid Negotiator'
                      ? Color.themeColor
                      : Color.black,
                },
              ]}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
          </View>
          <DropDownSingleSelect
            array={UserRoleArray}
            item={userRole}
            setItem={setselectedRole}
            placeholder={userRole}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            dropdownStyle={{
              // backgroundColor : 'red',
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
              marginTop: moderateScale(20, 0.3),
            }}
          />
          <TextInputWithTitle
            titleText={'First Name'}
            secureText={false}
            placeholder={'First Name'}
            setText={setFirstName}
            value={firstName}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Last Name'}
            secureText={false}
            placeholder={'Last Name'}
            setText={setLastName}
            value={lastName}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          {userRole == 'Qbid Negotiator' || userRole == 'Business Qbidder' && (
            <>
              <TextInputWithTitle
                titleText={'Company Name'}
                secureText={false}
                placeholder={'Company Name'}
                setText={setCompanyName}
                value={companyName}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                borderColor={'#ffffff'}
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.3)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
            </>
          )}
          <TextInputWithTitle
            titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Contact'}
            secureText={false}
            placeholder={'Contact'}
            setText={setContact}
            value={contact}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            keyboardType={'numeric'}
          />
          <TextInputWithTitle
            titleText={'Address'}
            secureText={false}
            placeholder={'Address'}
            setText={setAddress}
            value={address}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'City'}
            secureText={false}
            placeholder={'City'}
            setText={setCity}
            value={city}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'State'}
            secureText={false}
            placeholder={'State'}
            setText={setState}
            value={state}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Zip code'}
            secureText={false}
            placeholder={'Zip code'}
            setText={setZipCode}
            value={zipCode}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            keyboardType={'numeric'}
          />
          <TextInputWithTitle
            titleText={'Password'}
            secureText={true}
            placeholder={'Password'}
            setText={setPassword}
            value={password}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Confirm Password'}
            secureText={true}
            placeholder={'Confirm Password'}
            setText={setConfirmPassword}
            value={confirmPassword}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          {userRole != 'Qbid Member' && (
            <>
              <CustomDropDownMultiSelect
                title={'Pick Languages'}
                array={[
                  {name: 'English', id: 'English'},
                  {name: 'Dutch', id: 'Dutch'},
                  {name: 'Spanish', id: 'Spanish'},
                  {name: 'French', id: 'French'},
                  {name: 'Portugese', id: 'Portugese'},
                ]}
                item={language}
                setItem={setLanguage}
                maxHeight={windowHeight * 0.2}
                marginTop={moderateScale(8, 0.3)}
                containerStyle={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.07,
                }}
              />
              {/* <CustomDropDownMultiSelect
                title={'Pick Expertise'}
                array={servicesArray}
                item={services}
                setItem={setServices}
                maxHeight={windowHeight * 0.3}
                containerStyle={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.07,
                }}
              /> */}
            </>
          )}
          {/* <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.85,
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
            }}>
            <Icon
              name={checked ? 'check-square-o' : 'checkbox-passive'}
              as={checked ? FontAwesome : Fontisto}
              color={Color.purple}
              onPress={() => {
                setChecked(!checked);
              }}
              size={moderateScale(13, 0.3)}
            />
            <CustomText
              onPress={() => {}}
              style={[
                styles.txt3,
                {
                  color: Color.white,
                  marginHorizontal: moderateScale(10, 0.3),
                },
              ]}>
              I Accept{' '}
              {
                <CustomText
                  isBold
                  style={[
                    styles.txt3,
                    {
                      color:
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : userRole == 'Qbid Negotiator'
                          ? Color.themeColor
                          : Color.black,
                    },
                  ]}>
                  Terms And Conditions
                </CustomText>
              }
            </CustomText>
          </View> */}
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Register'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              // Register();
              navigation.navigate('HomeScreen')
            }}
            bgColor={
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
            }
            borderRadius={moderateScale(30, 0.3)}
          />
          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {'Already have an account? '}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: windowWidth * 0.01}}
              onPress={() => navigationService.navigate('LoginScreen')}>
              <CustomText
                style={[
                  styles.txt4,
                  {
                    color:
                      userRole == 'Qbid Member'
                        ? Color.blue
                        : userRole == 'Qbid Negotiator'
                        ? Color.themeColor
                        : Color.black,
                  },
                ]}>
                {'Sign In'}
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
      </ImageBackground>
    </>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    color: Color.blue,
    fontSize: moderateScale(12, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.blue,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(13, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
  edit: {
    backgroundColor: Color.blue,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    // marginLeft: moderateScale(2.5, 0.3),
    // marginTop: moderateScale(2.5, 0.3),
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    paddingTop: moderateScale(20, 0.3),
    paddingBottom: moderateScale(10, 0.3),
    // marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: moderateScale(14, 0.3),
    width: moderateScale(14, 0.3),
    borderRadius: moderateScale(7, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
    // fontWeight : 'bold'
    // backgroundColor : 'red'
  },
});
