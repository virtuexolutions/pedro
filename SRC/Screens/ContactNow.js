import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList, ImageBackground} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Icon, ScrollView} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SearchContainer from '../Components/SearchContainer';
import JobCard from '../Components/JobCard';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import NotificationModal from '../Components/NotificationModal';

const ContactNow = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log('🚀 ~ HomeScreen ~ userRole:', userRole);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedType] = useState(
    userRole ? userRole : 'Qbid Member',
  );
  const [selectedData, setSelectedData] = useState('');
  const [searchData, setSearchData] = useState('');
  const [modal_visible, setModalVisible] = useState(false);

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
        <View style={styles.card}>
          <View
            style={{
              width: windowWidth * 0.95,
              height: windowHeight * 0.25,
              backgroundColor: 'green',
              overflow: 'hidden',
              marginHorizontal: moderateScale(5, 0.3),
              marginVertical: moderateScale(5, 0.3),
              borderRadius: moderateScale(10, 0.6),
              alignSelf: 'center',
            }}>
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: moderateScale(8, 0.6),
            }}>
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
                paddingTop: moderateScale(10, 0.6),
              }}>
              <CustomText
                isBold={true}
                style={{
                  color: Color.black,
                  fontSize: moderateScale(12, 0.6),
                  paddingRight: moderateScale(8, 0.6),
                }}>
                Charles A. Lee
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(10, 0.6),
                  color: Color.darkGray,
                }}>
                Lorem ipsum dolor
              </CustomText>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon
                name="eye"
                as={Entypo}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                last seen
              </CustomText>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                7 hour ago
              </CustomText>
            </View>
            <View
              style={{
                height: moderateScale(30, 0.6),
                width: 1.5,
                backgroundColor: '#00ADEF',
                marginHorizontal: moderateScale(4, 0.6),
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Icon
                name="clockcircle"
                as={AntDesign}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                job delivery time
              </CustomText>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                3 days
              </CustomText>
            </View>
            <View
              style={{
                height: moderateScale(30, 0.6),
                width: 1.5,
                backgroundColor: '#00ADEF',
                marginHorizontal: moderateScale(4, 0.6),
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Icon
                name="checkcircle"
                as={AntDesign}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                Last job delivery
              </CustomText>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                Yesterday
              </CustomText>
            </View>
            {/* <View
              style={{
                alignItems: 'center',
                marginLeft: moderateScale(5, 0.3),
                width: windowWidth * 0.17,
                borderRightWidth: 1,
                borderColor: '#00ADEF',
              }}>
              <Icon
                name="eye"
                as={Entypo}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                last seen
              </CustomText>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                7 hour ago
              </CustomText>
            </View>
            <View
              style={{
                width: windowWidth * 0.17,
                alignItems: 'center',
                borderRightWidth: 1,
                borderColor: '#00ADEF',
              }}>
              <Icon
                name="clockcircle"
                as={AntDesign}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                job delivery time
              </CustomText>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                3 days
              </CustomText>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: windowWidth * 0.2,
              }}>
              <Icon
                name="checkcircle"
                as={AntDesign}
                size={moderateScale(14, 0.6)}
                color={'#00ADEF'}
              />
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                Last job delivery
              </CustomText>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(9, 0.6),
                }}>
                Yesterday
              </CustomText>
            </View> */}
          </View>
        </View>
        <View
          style={[
            styles.card,
            {
              height: windowHeight * 0.2,
            },
          ]}>
          <CustomText
            isBold
            style={{
              color: Color.black,
              fontSize: moderateScale(18, 0.6),
              paddingHorizontal: moderateScale(20, 0.6),
              paddingTop: moderateScale(5, 0.6),
            }}>
            package include
          </CustomText>
          <FlatList
            data={dummyArray}
            scrollEnabled={false}
            renderItem={(item, index) => {
              console.log('🚀 ~ ContactNow ~ item:', item);
              return (
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(2, 0.6),
                  }}>
                  <View
                    style={{
                      backgroundColor: '#00ADEF',
                      height: windowHeight * 0.01,
                      width: windowHeight * 0.01,
                      borderRadius: (windowHeight * 0.01) / 2,
                    }}></View>
                  <CustomText
                    style={{
                      color: Color.black,
                      fontSize: moderateScale(12, 0.6),
                      paddingHorizontal: moderateScale(15, 0.6),
                      paddingTop: moderateScale(5, 0.6),
                    }}>
                    {item?.item}
                  </CustomText>
                </View>
              );
            }}
          />
        </View>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(12, 0.6),
            paddingHorizontal: moderateScale(15, 0.6),
            paddingTop: moderateScale(5, 0.6),
          }}>
          Donec Imperdiet Ipsum At Volutpat Interdum. Morbi Ante Nulla, Tempor
          Id Magna Ac, Ultrices Dignissim Felis. Donec In Dignissim Nibh, Sed
          Malesuada Ena.
        </CustomText>
        <CustomButton
          onPress={() => setModalVisible(true)}
          text={'Contact now'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          marginTop={moderateScale(10, 0.3)}
          // onPress={() => {
          //   //   navigation.navigate('HomeScreen')
          //   // Login();
          // }}
          bgColor={Color.black}
          borderRadius={moderateScale(30, 0.3)}
        />
        {/* <NotificationModal visible={modal_visible} /> */}
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  card: {
    height: windowHeight * 0.35,
    width: windowWidth * 0.98,
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10, 6),
    overflow: 'hidden',
    marginBottom: moderateScale(20, 0.3),
  },
  imagecontainer: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.06) / 2,
    overflow: 'hidden',
    // marginHorizontal: moderateScale(6, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
});

export default ContactNow;
