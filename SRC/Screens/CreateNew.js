import { useNavigation } from '@react-navigation/native';
import { Icon, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Inoicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { windowHeight, windowWidth } from '../Utillity/utils';

const CreateNew = props => {
  const hire = props?.route?.params?.hire;
  const negotiater_id = props?.route?.params?.id;
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  const location = useSelector(state => state.commonReducer.location);

  const [qouteTitle, setQouteTitle] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [vendorQoutedPrice, setVendorQoutedPrice] = useState(0);
  const [askingPrice, setAskingPrice] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [offeringPercent, setOfferingPercent] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [multiImages, setMultiImages] = useState([]);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // const publishQuote = async () => {
  //   const url = 'auth/member/quote';
  //   const body = {
  //     lat: location?.latitude,
  //     lng: location?.longitude,
  //     title: qouteTitle,
  //     city: city,
  //     type: 'general',
  //     state: state,
  //     quoted_price: vendorQoutedPrice,
  //     asking_price: askingPrice,
  //     offering_percentage: offeringPercent,
  //     service_preference: selectedService,
  //   };
  //   const body2 = {
  //     quoted_price: vendorQoutedPrice,
  //     asking_price: askingPrice,
  //     offering_percentage: offeringPercent,
  //   };

  //   const formData = new FormData();

  //   for (let key in body) {
  //     if (body[key] == '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
  //         : Alert.alert(`${key} is required`);
  //     } else {
  //       formData.append(key, body[key]);
  //     }
  //   }

  //   for (let key in body2) {
  //     if (isNaN(body2[key])) {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(`${key}is not a number`, ToastAndroid.SHORT)
  //         : Alert.alert(`${key} is not a number `);
  //     }
  //   }

  //   if (!['' , undefined , null].includes(description)) {
  //     // return Platform.OS == 'android'
  //     //   ? ToastAndroid.show(
  //     //       `Description should be greater than 100 letters`,
  //     //       ToastAndroid.SHORT,
  //     //     )
  //     //   : Alert.alert(`Description should be greater than 100 letters`);
  //   formData.append('notes' , description)

  //   }

  //   if (multiImages.length == 0) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(`add atleast one image `, ToastAndroid.SHORT)
  //       : Alert.alert(`add atleast one image `);
  //   }

  //   multiImages?.map((item, index) =>
  //     formData.append(`images[${index}]`, item),
  //   );

  //   setIsLoading(true);
  //   const response = await Post(url, formData, apiHeader(token));
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     setCity('');
  //     setAskingPrice(0);
  //     setDescription('');
  //     setMultiImages([]);
  //     setOfferingPercent(0);
  //     setQouteTitle('');
  //     setState('');
  //     setSelectedService('');
  //     setVendorQoutedPrice(0);

  //     // console.log(
  //     //   '🚀 ~ file: CreateNew.js:81 ~ publishQuote ~ response:',
  //     //   response?.data,
  //     // );
  //     navigation.goBack();
  //   }
  // };

  // const sendRequest = async () => {
  //   console.log('In send request======>>>>');
  //   const url = 'auth/member/hiring/create';
  //   const body = {
  //     negotiator_id: negotiater_id,
  //     type: 'specific',
  //     title: qouteTitle,
  //     city: city,
  //     state: state,
  //     quoted_price: vendorQoutedPrice,
  //     asking_price: askingPrice,
  //     offering_percentage: offeringPercent,
  //     notes: description,
  //   };
  //   const body2 = {
  //     quoted_price: vendorQoutedPrice,
  //     asking_price: askingPrice,
  //     offering_percentage: offeringPercent,
  //   };

  //   const formData = new FormData();

  //   for (let key in body) {
  //     if (body[key] == '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
  //         : Alert.alert(`${key} is required`);
  //     } else {
  //       formData.append(key, body[key]);
  //     }
  //   }
  //   for (let key in body2) {
  //     if (isNaN(body2[key])) {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(`${key}is not a number`, ToastAndroid.SHORT)
  //         : Alert.alert(`${key} is not a number `);
  //     }
  //   }
  //   if (description.length < 100) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(`Description is too short`, ToastAndroid.SHORT)
  //       : Alert.alert(`Description is too short`);
  //   }
  //   multiImages?.map((item, index) =>
  //     formData.append(`images[${index}]`, item),
  //   );

  //   console.log(
  //     '🚀 ~ file: CreateNew.js:160 ~ sendRequest ~ formData:',
  //     formData,
  //   );
  //   setIsLoading(true);
  //   const response = await Post(url, formData, apiHeader(token));
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     // hire = false;
  //     // negotiater_id = undefined
  //     console.log(
  //       '🚀 ~ file: CreateNew.js:164 ~ sendRequest ~ response:',
  //       response?.data,
  //     );
  //     setCity('');
  //     setAskingPrice(0);
  //     setDescription('');
  //     setMultiImages([]);
  //     setOfferingPercent(0);
  //     setQouteTitle('');
  //     setState('');
  //     setSelectedService('');
  //     setVendorQoutedPrice(0);

  //     navigation.goBack();
  //   }
  // };

  // useEffect(() => {
  //   if (parseInt(askingPrice) > parseInt(vendorQoutedPrice)) {
  //     alert('asking price can not be higher than vendor quoted price ');
  //     setAskingPrice(0);
  //   }
  //   if (offeringPercent > 100) {
  //     alert('offering percentage can not be greater than 100');
  //   }
  // }, [askingPrice, offeringPercent]);

  return (
    <>
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/bg3.png')}>
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.08,
          }}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.icon}
            name="arrow-back"
            as={Inoicons}
            size={moderateScale(15, 0.6)}
            color={Color.black}
          />
        </View>

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: windowHeight * 0.2,
            }}>
            <CustomText isBold style={styles.header}>
              Create new job
            </CustomText>

            <TextInputWithTitle
              titleText={'Qoute Title'}
              secureText={false}
              placeholder={'Qoute Title'}
              setText={setQouteTitle}
              value={qouteTitle}
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              // border={1}
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
              // border={1}
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
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />

            <TextInputWithTitle
              titleText={'dead line'}
              secureText={false}
              placeholder={'Dead line'}
              setText={setDeadline}
              value={deadline}
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              keyboardType={'numeric'}
            />

            <TextInputWithTitle
              titleText={'Vendor Qouted Price'}
              secureText={false}
              placeholder={'Vendor Qouted Price'}
              setText={setVendorQoutedPrice}
              value={vendorQoutedPrice}
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              keyboardType={'numeric'}
            />

            {/* 
          <TextInputWithTitle
            titleText={'Offering percent to negotiator from saving'}
            secureText={false}
            placeholder={'Offering percent to negotiator from saving'}
            setText={setOfferingPercent}
            value={offeringPercent}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            keyboardType={'numeric'}
          /> */}
            <CustomText
              isBold
              style={[
                styles.header,
                {
                  paddingTop: moderateScale(0, 0.6),
                  fontSize: moderateScale(12, 0.3),
                  marginTop: moderateScale(10, 0.3),
                  marginLeft: moderateScale(10, 0.3),
                },
              ]}>
              Upload vendor Qouted list
            </CustomText>
            <View style={styles.imagesContainer}>
              <FlatList
                horizontal
                data={multiImages}
                showsHorizontalScrollIndicator={false}
                style={{
                  flexGrow: 0,
                }}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={[
                        styles.addImageContainer,
                        {borderWidth: 0, borderRadius: moderateScale(10, 0.3)},
                      ]}>
                      <Icon
                        name={'close'}
                        as={FontAwesome}
                        color={Color.themeColor}
                        size={moderateScale(12, 0.3)}
                        style={{
                          position: 'absolute',
                          right: 1,
                          top: 1,
                          zIndex: 1,
                        }}
                        onPress={() => {
                          let newArray = [...multiImages];
                          newArray.splice(index, 1);
                          setMultiImages(newArray);
                        }}
                      />
                      <CustomImage
                        source={{uri: item?.uri}}
                        resizeMode={'stretch'}
                        style={{
                          width: moderateScale(50, 0.3),
                          height: moderateScale(60, 0.3),
                        }}
                      />
                    </View>
                  );
                }}
              />

              <View style={styles.addImageContainer}>
                <Icon
                  name={'plus'}
                  as={AntDesign}
                  color={Color.themeColor}
                  size={moderateScale(30, 0.3)}
                  onPress={() => {
                    setShowMultiImageModal(true);
                  }}
                />
              </View>
            </View> 
            <TextInputWithTitle
              titleText={'job description'}
              secureText={false}
              placeholder={'Job Description'}
              setText={setDescription}
              value={description}
              viewHeight={0.2}
              viewWidth={0.9}
              inputWidth={0.8}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              multiline
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Publish'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                // console.log('here');
                hire ? sendRequest() : publishQuote();
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
          </ScrollView>
        </KeyboardAwareScrollView>
      </ImageBackground>

      <ImagePickerModal
        show={showMultiImageModal}
        setShow={setShowMultiImageModal}
        setMultiImages={setMultiImages}
        // setFileObject={setImage}
      />
    </>
  );
};

export default CreateNew;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
  },
  icon: {
    height: windowHeight * 0.035,
    width: windowWidth * 0.09,
    backgroundColor: 'white',
    borderRadius: moderateScale(5, 0.6),
    position: 'absolute',
    top: 25,
    left: 25,
    textAlign: 'center',
    paddingTop: moderateScale(5, 0.6),
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
  addImageContainer: {
    width: windowWidth * 0.14,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 2,
    borderColor: Color.blue,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    overflow: 'hidden',
  },
  imagesContainer: {
    marginTop: moderateScale(10, 0.3),
    width: windowWidth * 0.9,
    marginLeft: moderateScale(10, 0.3),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  header: {
    paddingTop: windowHeight * 0.03,
    color: Color.white,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
});
