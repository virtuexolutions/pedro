import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getDistance} from 'geolib';
import {Icon, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import WorkUploadModal from '../Components/WorkUploadModal';
import {setUserCheckin} from '../Store/slices/auth';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CheckListModal from '../Components/CheckListModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckListStartModal from '../Components/CheckListStartModal';

const DetailScreen = props => {
  const job_id = props?.route?.params?.job_id;
  console.log('🚀 ~ DetailScreen ~ job_id:', job_id);
  const work_status = props?.route?.params?.jobStatus;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const granted = useSelector(state => state.commonReducer.LocationPermission);
  const workdone = useSelector(state => state.commonReducer.workUpload);
  const checkin = useSelector(state => state.authReducer.checkin);
  const [JobDetailData, setJobDetailData] = useState({});

  const [CheckListModalVisible, setCheckListModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ DetailScreen ~ loading:", loading)
  const [modal_visible, setModalVisible] = useState(false);
  const [accept, setaccpet] = useState(false);
  const [address, setAddress] = useState('');
  const [isInRadius, setisInRadius] = useState(false);
  const [inroutepress, setinroutepress] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [checkListStartModal, setcheckListStartModal] = useState(false);
  const [checkListData, setCheckListData] = useState();
  const [checklist_id, setCheckListId] = useState(null);
  const status = [
    {id: 1, status: 'Waiting For Approval'},
    {id: 2, status: 'Approved'},
    {id: 3, status: 'Pending'},
    {id: 4, status: 'Accept'},
  ];

  const isfocused = useIsFocused();
  useEffect(() => {
    jobDetail();
  }, [isfocused]);

  const jobDetail = async () => {
    const url = `vendor/manage_work_orders/${job_id}`;
    setisLoading(true);
    const response = await Get(url, token);
    console.log(
      '🚀 ~ jobDetail ~ response=-============================== :',
      JSON.stringify(response?.data, null, 2),
    );
    setisLoading(false);
    if (response != undefined) {
      setJobDetailData(response?.data);
    }
  };

  const jobAccept = async () => {
    const url = `vendor/manage_work_orders/accept/${job_id}`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setaccpet(true);
    }
  };

  const jobdecline = async () => {
    const url = `vendor/manage_work_orders/decline/${job_id}`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      navigation.goBack();
    }
  };

  // api for advance payment
  const quickPay = async () => {
    const url = `vendor/quick_pay/${job_id}`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      response?.data?.success == false
        ? Platform.OS == 'android'
          ? ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT)
          : alert(response?.data?.message)
        : Platform.OS == 'android'
        ? ToastAndroid.show(
            'request sent for advance payment',
            ToastAndroid.SHORT,
          )
        : alert('request sent for advance payment');
    }
  };

  const circleCenter = {
    latitude: JobDetailData?.work_order?.job_location?.latitude,
    longitude: JobDetailData?.work_order?.job_location?.longitude,
  };
  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            };
            resolve(coords);
            setLatitude(position?.coords?.latitude);
            setLongitude(position?.coords?.longitude);
            getAddressFromCoordinates(latitude, longitude);
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
          // 60000
          // 1000,
        );
      });

      const vendorLocation = {latitude, longitude};
      const checkDistanceBetween = getDistance(circleCenter, vendorLocation);
      let distance = Math.round(checkDistanceBetween / 100) / 10;
      console.log(checkDistanceBetween, 'distanceInKmmmmmmmmmm');
      if (distance <= 0.5) {
        console.log('----------->>> >>>');
        setisInRadius(true);
        dispatch(setUserCheckin(true));
      } else {
        setisInRadius(false);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const givenaddress = data.results[0].formatted_address;
        setAddress(givenaddress);
        // dispatch(setAddress());
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // api for on the way
  const enRoute = async () => {
    const url = `vendor/alert/${job_id}`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setinroutepress(true);
    }
  };

  const onPressCheckIn = async () => {
    const body = {
      job: job_id,
      latitude: latitude,
      longitude: longitude,
      address: address,
    };
    const url = `vendor/attendance/store`;
    setisLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setisLoading(false);
    if (response != undefined) {
      dispatch(setUserCheckin(true));
    }
  };

  // setInterval(() => {
  //   getCurrentLocation();
  // }, 60000);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        style={{
          height: windowHeight,
          flex: 1,
          alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={
          userRole == 'User'
            ? require('../Assets/Images/bg3.png')
            : userRole == 'vendor'
            ? require('../Assets/Images/bg2.png')
            : require('../Assets/Images/bg1.png')
        }>
        <ScrollView
          style={{
            width: windowWidth,
            zIndex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: moderateScale(50, 0.6),
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header_Row}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backbutton}>
              <Icon
                onPress={() => {
                  navigation.goBack();
                }}
                name="arrow-back"
                as={Ionicons}
                size={moderateScale(20, 0.6)}
                color={Color.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setcheckListStartModal(true);
              }}
              style={styles.backbutton}>
              <Icon
                onPress={() => {
                  setcheckListStartModal(true);
                }}
                style={{
                  width: windowWidth * 0.1,
                  // backgroundColor:'red',
                  textAlign: 'center',
                }}
                name="hands"
                as={FontAwesome5}
                size={moderateScale(20, 0.6)}
                color={Color.black}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: moderateScale(13, 0.6),
              height: windowHeight * 0.3,
              width: '100%',
            }}>
            <CustomImage
              source={{uri: JobDetailData?.image}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            <View style={styles.text_view}>
              <View>
                <CustomText style={styles.txtname} isBold={true}>
                  {`${JobDetailData?.first_name}${'  '}${
                    JobDetailData?.last_name
                  }`}
                </CustomText>
              </View>
              <CustomText isBold style={styles.price}>
                $ 20
              </CustomText>
            </View>
            <CustomText
              style={{
                color: 'white',
                fontSize: moderateScale(13, 0.6),
                width: windowWidth * 0.93,
                // backgroundColor:'red'
              }}>
              {JobDetailData?.job_sub_description}
            </CustomText>

            <CustomText isBold style={styles.job_status_text}>
              Job Status
            </CustomText>

            <View style={styles.status_row}>
              <CustomText
                style={[
                  styles.job_status,
                  {
                    backgroundColor:
                      work_status != 'accepted'
                        ? Color.themelightGreen
                        : 'transparent',
                  },
                ]}>
                {work_status != 'accepted' ? 'pending' : 'accepted'}
              </CustomText>
              <CustomText
                style={[
                  styles.job_status,
                  {
                    backgroundColor:
                      work_status == 'accepted' &&
                      checkin == true &&
                      workdone == false
                        ? Color.themelightGreen
                        : 'transparent',
                  },
                ]}>
                inprocess
              </CustomText>
              <CustomText
                style={[
                  styles.job_status,
                  {
                    backgroundColor:
                      work_status == 'accepted' &&
                      checkin == true &&
                      workdone == true
                        ? Color.themelightGreen
                        : 'transparent',
                  },
                ]}>
                on feedback
              </CustomText>
              <CustomText
                style={[
                  styles.job_status,
                  {
                    backgroundColor: 'transparent',
                  },
                ]}>
                approved
              </CustomText>
            </View>
            <View style={styles.jobDetailBox}>
              <CustomText isBold style={styles.job_Detail_text}>
                Job Detail
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  quickPay();
                }}>
                <Icon
                  onPress={() => {
                    quickPay();
                  }}
                  style={{
                    // width: windowWidth * 0.1,
                    marginTop: moderateScale(-5, 0.6),
                  }}
                  as={FontAwesome5}
                  name={'hand-holding-usd'}
                  color={'white'}
                  size={moderateScale(27, 0.6)}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <CustomText isBold style={styles.title}>
                job name :
              </CustomText>
              <CustomText style={styles.title2}>
                {JobDetailData?.name}
              </CustomText>
            </View>
            <View style={styles.row}>
              <CustomText isBold style={styles.title}>
                assigned tech :
              </CustomText>
              <CustomText style={styles.title2}>
                {JobDetailData?.assigned_tech}
              </CustomText>
            </View>
            <View style={styles.row}>
              <CustomText isBold style={styles.title}>
                agent :
              </CustomText>
              <CustomText style={styles.title2}>
                {JobDetailData?.agent}
              </CustomText>
            </View>
            <View style={styles.row}>
              <CustomText isBold style={styles.title}>
                start date :
              </CustomText>
              <CustomText style={styles.title2}>
                {JobDetailData?.start_date}
              </CustomText>
            </View>
            <View style={styles.row}>
              <CustomText isBold style={styles.title}>
                end date :
              </CustomText>
              <CustomText style={styles.title2}>
                {JobDetailData?.end_date}
              </CustomText>
            </View>
            <CustomText isBold style={styles.job_Des_text}>
              Job description
            </CustomText>
            <CustomText style={styles.detail_text}>
              {JobDetailData?.job_description}
            </CustomText>

            {work_status == 'pending' && (
              <View style={styles.buttonRow}>
                <CustomButton
                  onPress={() => {
                    jobAccept();
                  }}
                  text={
                    isLoading ? (
                      <ActivityIndicator size={'small'} color={Color.white} />
                    ) : (
                      'accept'
                    )
                  }
                  textColor={Color.white}
                  width={windowWidth * 0.45}
                  height={windowHeight * 0.065}
                  marginTop={moderateScale(35, 0.3)}
                  bgColor={Color.black}
                  borderRadius={moderateScale(30, 0.3)}
                />

                <CustomButton
                  onPress={() => {
                    jobdecline();
                  }}
                  text={
                    loading ? (
                      <ActivityIndicator size={'small'} color={Color.white} />
                    ) : (
                      'decline'
                    )
                  }
                  textColor={Color.white}
                  width={windowWidth * 0.45}
                  height={windowHeight * 0.065}
                  marginTop={moderateScale(35, 0.3)}
                  bgColor={Color.black}
                  borderRadius={moderateScale(30, 0.3)}
                />
              </View>
            )}

            {userRole != 'vendor' ? (
              <CustomButton
                onPress={() => {}}
                text={'Contact now'}
                textColor={Color.white}
                width={windowWidth * 0.9}
                height={windowHeight * 0.07}
                marginTop={moderateScale(35, 0.3)}
                bgColor={Color.black}
                borderRadius={moderateScale(30, 0.3)}
              />
            ) : (
              accept == true ||
              (work_status == 'accepted' && (
                <View style={styles.btnrow}>
                  <CustomButton
                    onPress={() => {
                      if (granted != granted) {
                        console.log('you dont have access to use location');
                        Linking.openSettings();
                      } else {
                        getCurrentLocation();
                        isInRadius ? onPressCheckIn : enRoute();
                      }
                    }}
                    text={
                      isLoading ? (
                        <ActivityIndicator size={'small'} color={'white'} />
                      ) : isInRadius ? (
                        'check in'
                      ) : (
                        'En Route'
                      )
                    }
                    textColor={Color.white}
                    width={windowWidth * 0.45}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(20, 0.3)}
                    bgColor={Color.black}
                    borderRadius={moderateScale(30, 0.3)}
                    disabled={inroutepress || !checkin}
                  />

                  <CustomButton
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    text={workdone ? 'checked out ' : 'check out'}
                    textColor={Color.white}
                    width={windowWidth * 0.45}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(20, 0.3)}
                    bgColor={Color.black}
                    borderRadius={moderateScale(30, 0.3)}
                    disabled={
                      (checkin ? false : true) ||
                      (checkin == true && workdone == true)
                        ? true
                        : false
                    }
                  />
                </View>
              ))
            )}
          </View>
          <WorkUploadModal
            job_id={job_id}
            uploadModal={modal_visible}
            setUploadModal={setModalVisible}
          />
          {JobDetailData?.inspection_response == null && (
            <CheckListStartModal
              data={JobDetailData?.inspection_checklists}
              modal_visible={checkListStartModal}
              setModalVisible={setcheckListStartModal}
              onpressItem={data => {
                setCheckListData(data);
                setCheckListModalVisible(true);
                setcheckListStartModal(false);
              }}
            />
          )}
          {CheckListModalVisible && (
            <CheckListModal
              job_id={job_id}
              modal_visible={CheckListModalVisible}
              setModalVisible={setCheckListModalVisible}
              data={checkListData}
              checklist_id={checklist_id}
            />
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  txtname: {
    color: Color.white,
    fontSize: moderateScale(25, 0.6),
  },
  detail_text: {
    color: Color.white,
    fontSize: moderateScale(15, 0.6),
    width: windowWidth * 0.95,
    marginBottom: moderateScale(10, 0.6),
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: moderateScale(25, 0.6),
    color: Color.white,
  },
  jobDetailBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: moderateScale(15, 0.6),
  },
  job_status_text: {
    fontSize: moderateScale(22, 0, 6),
    letterSpacing: 1.5,
    color: 'white',
    paddingVertical: moderateScale(5, 0.6),
  },
  job_status: {
    padding: moderateScale(8, 0.6),
    borderWidth: 1,
    borderRadius: moderateScale(15, 0.6),
    borderColor: 'white',
    fontSize: moderateScale(15, 0.6),
  },
  status_row: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
  },
  job_Detail_text: {
    fontSize: moderateScale(22, 0.6),
    color: 'white',
  },
  txt: {
    color: Color.black,
    fontSize: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  Circle: {
    backgroundColor: '#00ADEF',
    height: windowHeight * 0.01,
    width: windowHeight * 0.01,
    borderRadius: (windowHeight * 0.01) / 2,
  },
  card2: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(2, 0.6),
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(15, 0.6),
  },
  title2: {
    color: Color.white,
    paddingHorizontal: moderateScale(0, 0.6),
    width: windowWidth * 0.73,
    paddingHorizontal: moderateScale(5, 0.6),
    fontSize: moderateScale(15, 0.6),
  },
  job_Des_text: {
    fontSize: moderateScale(22, 0.6),
    color: 'white',
    paddingTop: moderateScale(10, 0.6),
  },
  header_Row: {
    height: windowHeight * 0.07,
    width: windowWidth,
    paddingTop: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(13, 0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backbutton: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.12,
    backgroundColor: 'white',
    borderRadius: moderateScale(5, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnrow: {
    flexDirection: 'row',
    width: windowWidth * 0.95,
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(0, 0.6),
  },
});
