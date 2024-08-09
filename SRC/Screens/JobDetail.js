import {StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import TimingModal from '../Components/TimingModal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import NotificationModal from '../Components/NotificationModal';
import ReviewModal from '../Components/ReviewModal';
import WorkUploadModal from '../Components/WorkUploadModal';
import {setUserCheckin, setUserchekin} from '../Store/slices/auth';

const JobDetail = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const checkin = useSelector(state => state.authReducer.checkin);
  console.log('===================>', checkin == true ? 'meerab' : 'kinza');
  const workdone = useSelector(state => state.commonReducer.workUpload);
  const RBSheet = useRef();
  // const dispatch =useDispatch()

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedType] = useState(
    userRole ? userRole : 'Qbid Member',
  );
  const [selectedData, setSelectedData] = useState('');
  const [searchData, setSearchData] = useState('');
  const [modal_visible, setModalVisible] = useState(false);
  const [rbRef, setRef] = useState(null);

  const dummyArray = [
    'in tempor turpis eget lorem mollis',
    'Etiam Blandit Ex Urna, Id Congue Nulla',
    'Donec Imperdiet Ipsum At Volutpat',
    'Sed Fringilla Arcu Eleifend Condimentum',
    'Ut Dapibus Lacus Sit Amet Aliquet Convallis',
  ];

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
        <Header
          showList={true}
          title={'logo here'}
          headerColor={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00']}
        />
        <View
          style={[
            styles.card,
            {
              marginTop: moderateScale(20, 0.6),
            },
          ]}>
          <View style={styles.userimage}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
              }}
              source={require('../Assets/Images/working_image.png')}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.imagecontainer}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                }}
                source={require('../Assets/Images/dummyman1.png')}
              />
            </View>
            <View
              style={{
                paddingTop: moderateScale(3, 0.6),
              }}>
              <CustomText isBold={true} style={styles.txtname}>
                Charles A. Lee
              </CustomText>
              <CustomText style={styles.txt1}>Lorem ipsum dolor</CustomText>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon
                name="eye"
                as={Entypo}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText style={styles.txt1}>last seen</CustomText>
              <CustomText style={styles.txt1}>7 hour ago</CustomText>
            </View>
            <View style={styles.lineview} />
            <View style={{alignItems: 'center'}}>
              <Icon
                name="clockcircle"
                as={AntDesign}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText style={styles.txt1}>job delivery time</CustomText>
              <CustomText style={styles.txt1}>3 days</CustomText>
            </View>
            <View style={styles.lineview} />
            <View style={{alignItems: 'center'}}>
              <Icon
                name="checkcircle"
                as={AntDesign}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText style={styles.txt1}>Last job delivery</CustomText>
              <CustomText style={styles.txt1}>Yesterday</CustomText>
            </View>
          </View>
        </View>
        {userRole == 'Vendor' && (
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.9,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingTop: moderateScale(8, 0.6),
            }}>
            <View
              style={[
                styles.statusColor,
                {backgroundColor: checkin == false ? 'green' : 'yellow'},
              ]}></View>
            <CustomText
              isBold
              style={[styles.txt3, {paddingHorizontal: moderateScale(5, 0.6)}]}>
              {(checkin == false ? 'pending' : 'inprocess') ||
              (checkin == false && workdone)
                ? 'waiting for approval'
                : 'approved'}
            </CustomText>
          </View>
        )}
        <View
          style={[
            styles.card,
            {
              marginTop: moderateScale(10, 0.6),
              height: windowHeight * 0.2,
            },
          ]}>
          <CustomText isBold style={styles.heading}>
            package include
          </CustomText>
          <FlatList
            showsVerticalScrollIndicat={false}
            data={dummyArray}
            scrollEnabled={false}
            renderItem={(item, index) => {
              return (
                <View style={styles.card2}>
                  <View style={styles.Circle}></View>
                  <CustomText style={styles.txt}>{item?.item}</CustomText>
                </View>
              );
            }}
          />
        </View>
        <CustomText style={styles.des}>
          Donec Imperdiet Ipsum At Volutpat Interdum. Morbi Ante Nulla, Tempor
          Id Magna Ac, Ultrices Dignissim Felis. Donec In Dignissim Nibh, Sed
          Malesuada Ena.
        </CustomText>
        {userRole != 'Vendor' ? (
          <CustomButton
            onPress={() => {
              setModalVisible(true);
              // rbRef.open()
            }}
            text={'Contact now'}
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(35, 0.3)}
            bgColor={Color.black}
            borderRadius={moderateScale(30, 0.3)}
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth,
              justifyContent: 'space-between',
              // backgroundColor:'red',
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            <CustomButton
              onPress={() => {
                dispatch(setUserCheckin(true));
              }}
              text={'check in'}
              textColor={Color.white}
              width={windowWidth * 0.45}
              height={windowHeight * 0.065}
              marginTop={moderateScale(35, 0.3)}
              bgColor={Color.black}
              borderRadius={moderateScale(30, 0.3)}
              disabled={checkin}
            />

            <CustomButton
              onPress={() => {
                setModalVisible(true);
                // rbRef.open()
              }}
              text={workdone ? 'checked out ' : 'check out'}
              textColor={Color.white}
              width={windowWidth * 0.45}
              height={windowHeight * 0.065}
              marginTop={moderateScale(35, 0.3)}
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
        )}
        {userRole != 'Vendor' && (
          <NotificationModal
            visible={modal_visible}
            setModalVisible={setModalVisible}
          />
        )}
        {/* <ReviewModal rbRef={rbRef} setRef={setRef} /> */}
        <WorkUploadModal
          uploadModal={modal_visible}
          setUploadModal={setModalVisible}
        />
      </ImageBackground>
    </>
  );
};

export default JobDetail;

const styles = StyleSheet.create({
  card: {
    height: windowHeight * 0.35,
    width: windowWidth * 0.98,
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10, 6),
    overflow: 'hidden',
  },
  imagecontainer: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.06) / 2,
    overflow: 'hidden',
    backgroundColor: 'red',
    marginTop: moderateScale(8, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
  des: {
    color: Color.white,
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  txt: {
    color: Color.black,
    fontSize: moderateScale(12, 0.6),
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
  heading: {
    color: Color.black,
    fontSize: moderateScale(18, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  txtname: {
    color: Color.black,
    fontSize: moderateScale(12, 0.6),
    paddingRight: moderateScale(8, 0.6),
  },
  txt1: {
    color: Color.black,
    fontSize: moderateScale(9, 0.6),
  },
  lineview: {
    height: moderateScale(30, 0.6),
    width: 1.5,
    backgroundColor: '#00ADEF',
    marginHorizontal: moderateScale(4, 0.6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8, 0.6),
  },
  userimage: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.25,
    backgroundColor: 'green',
    overflow: 'hidden',
    marginHorizontal: moderateScale(5, 0.3),
    marginVertical: moderateScale(5, 0.3),
    borderRadius: moderateScale(10, 0.6),
    alignSelf: 'center',
  },
  txt3: {
    fontSize: moderateScale(12, 0.6),
    textAlign: 'right',
  },
  statusColor: {
    height: windowHeight * 0.01,
    width: windowHeight * 0.01,
    borderRadius: (windowHeight * 0.01) / 2,
  },
});
