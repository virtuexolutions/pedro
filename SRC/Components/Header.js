import React, {useState} from 'react';
import {Icon} from 'native-base';
import {View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    close,
    navigateTO,
    headerType,
    Notify,
    Ismenu,
    hideUser,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    {label: 'Change Password', value: 'ChangePassword'},
    {label: 'Terms & Conditions', value: 'TermsAndConditions'},
    {label: 'Financial Breakdown', value: 'FinancialBreakDown'},
    {label: 'Logout', value: 'Logout'},
  ];

  return (
    <LinearGradient
      style={styles.header2}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        headerColor ? headerColor : [Color.themeColor, '#83D475', '#ABE098']
      }>
      <View
        style={[
          styles.header2,
          headerColor && {
            backgroundColor: headerColor,
          },
        ]}>
        {!hideUser ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // userRole == 'Qbid Member'
              //   ? navigationN.navigate('MyAccounts')
              //   : navigationN.navigate('NegotiatorPortfolio');
            }}
            style={{
              width: moderateScale(40, 0.3),
              height: moderateScale(40, 0.3),
              borderRadius: moderateScale(20, 0.3),
              backgroundColor: Color.white,
              // overflow: userRole == 'Qbid Member' ? 'visible' : 'hidden',
            }}>
            <CustomImage
              // onPress={() => {
              //   userRole == 'Qbid Member'
              //     ? alert('Action required')
              //     : navigationN.navigate('NegotiatorPortfolio');
              // }}
              source={
                // userRole == 'Qbid Member'
                //   ? require('../Assets/Images/user.png')
                user?.photo
                  ? {uri: `${user?.photo}`}
                  : require('../Assets/Images/user.png')
              }
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              height: moderateScale(35, 0.3),
              width: moderateScale(35, 0.3),
              borderRadius: moderateScale(25, 0.3),
              marginHorizontal: moderateScale(10, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: showBack || showList ? 'white' : 'transparent',
            }}>
            <Icon
              name={'arrowleft'}
              as={AntDesign}
              size={moderateScale(22, 0.3)}
              color={
                Color.black
              }
              onPress={() => {
                navigationN.goBack();
              }}
            />
          </View>
        )}

        <CustomImage
          resizeMode={'contain'}
          style={{
            width: windowWidth * 0.21,
            height: windowHeight * 0.1,
          }}
          source={require('../Assets/Images/logo.png')}
        />
          {
            Ismenu &&
               <View
            style={{
              height: moderateScale(35, 0.3),
              width: moderateScale(35, 0.3),
              borderRadius: moderateScale(25, 0.3),
              marginHorizontal: moderateScale(10, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: showBack || showList ? 'white' : 'transparent',
            }}>
            <Icon
              name={'menu'}
              as={Entypo}
              size={moderateScale(22, 0.3)}
              color={
                Color.black
              }
              onPress={() => {
                navigationN.goBack();
              }}
            />
          </View>
          }
        <View
          style={{
            height: moderateScale(35, 0.3),
            width: moderateScale(35, 0.3),
            borderRadius: moderateScale(25, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: showBack || showList ? 'white' : 'transparent',
          }}>
          {showBack ? (
            <Icon
              name={'arrowleft'}
              as={AntDesign}
              size={moderateScale(22, 0.3)}
              color={Color.white}
              onPress={() => {
                navigationN.goBack();
              }}
            />
          ) : showList ? (
            <Icon
              name={'menu'}
              as={Entypo}
              size={moderateScale(22, 0.3)}
              color={Color.black}
              onPress={() => navigationN.toggleDrawer()}
            />
          ) : (
            <View></View>
          )}
        </View>


      </View>
    </LinearGradient>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    marginTop: moderateScale(60, 0.3),
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    height: windowHeight * 0.08,
    backgroundColor: Color.themeColor,
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(8, 0.3),
    paddingTop: moderateScale(15, 0.3),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
