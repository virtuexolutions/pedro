import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList, ImageBackground} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {ScrollView} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SearchContainer from '../Components/SearchContainer';
import JobCard from '../Components/JobCard';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log('🚀 ~ HomeScreen ~ userRole:', userRole);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedType] = useState(
    userRole ? userRole : 'Qbid Member',
  );
  const [selectedData, setSelectedData] = useState('');
  const [searchData, setSearchData] = useState('');

  const dummyArray = [
    {
      id: 1,
      name: 'john dee',
      jobdescription: 'hfdjhadjfhkadfkhadsdsdfsdfsdfsdfsdfsffjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 2,
      name: 'alexender metthew',
      jobdescription: 'hfdjhadjfhkadfsfsdfsdfsdfsdfsdfsfsdffkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },

    {
      id: 3,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 4,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },

    {
      id: 3,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 4,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },

    {
      id: 3,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 4,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    },
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
        {/* <Header
          showBack={true}
          headerColor={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00']}
        //   headerColor={ [Color.themeColor, 'red','green']}

        /> */}
{/* 
        <View style={styles.Header}>
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
          <CustomText
            style={{
              color: Color.white,
              width: windowWidth * 0.7,
              backgroundColor: 'green',
            //   textAlign:'center',
            
              fontSize: moderateScale(20, 0.6),
            //   paddingRight: moderateScale(20, 0.6),
            }}>
           LOGOHERE
          </CustomText>
          <></>
        </View> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
            paddingTop: windowHeight * 0.05,
          }}>
          <SearchContainer
            width={windowWidth * 0.8}
            inputStyle={{
              height: windowHeight * 0.05,
            }}
            style={{
              height: windowHeight * 0.06,
              marginBottom: moderateScale(10, 0.3),
              borderRadius: moderateScale(5, 0.3),
            }}
            data={searchData}
            setData={setSearchData}
            input={true}
          />
          <FlatList
            data={dummyArray}
            numColumns={1}
            contentContainerStyle={{
              paddingTop: moderateScale(25, 0.6),
              paddingHorizontal: moderateScale(15, 0.3),
              width: windowWidth,
            }}
            renderItem={(item, index) => {
              return <JobCard item={item?.item} />;
            }}
          />
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.02,
    height: windowHeight,
    width: windowWidth,
  },
  Header: {
    height: windowHeight * 0.15,
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor:'red',
    alignItems:'center'
  },
  imagecontainer: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    // backgroundColor:'red',
    marginHorizontal: moderateScale(6, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
});

export default HomeScreen;
