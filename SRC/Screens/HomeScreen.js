import React, {useState} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';

import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import JobCard from '../Components/JobCard';
import SearchContainer from '../Components/SearchContainer';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomerCard from '../Components/CustomerCard';

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
      status:'accept'
    },
    {
      id: 2,
      name: 'alexender metthew',
      jobdescription: 'hfdjhadjfhkadfsfsdfsdfsdfsdfsdfsfsdffkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status:'accept'

    },

    {
      id: 3,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status:'pending'

    },
    {
      id: 4,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status:'waiting for approval'
    },

    {
      id: 5,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
    status:'accept'
    },
    {
      id: 6,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status:'reject'
    },

    {
      id: 7,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status:'pending'
    },
    {
      id: 8,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status:'reject'
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
          height: windowHeight * 0.92,
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

        <SearchContainer
          width={windowWidth * 0.92}
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.05,
            marginBottom: moderateScale(10, 0.3),
            borderRadius: moderateScale(25, 0.3),
            marginTop: moderateScale(25, 0.6),
          }}
          data={searchData}
          setData={setSearchData}
          input={true}
        />
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            {userRole == 'Customer' ? 'your posted jobs' : 'Proposals'}
          </CustomText>
          <CustomText style={styles.text}>view all</CustomText>
        </View>
        <FlatList
          data={dummyArray}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={item => item?.id}
          contentContainerStyle={{
            paddingTop: moderateScale(5, 0.6),
            paddingHorizontal: moderateScale(15, 0.3),
            width: windowWidth,
          }}
          renderItem={(item, index) => {
            return userRole == 'Customer' ? (
              <CustomerCard />
            ) : (
              <JobCard item={item?.item} />
            );
          }}
        />
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
    backgroundColor: 'red',
    alignItems: 'center',
  },
  imagecontainer: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    marginHorizontal: moderateScale(6, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
  row: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  heading: {
    letterSpacing: 1,
    color: 'white',
    fontSize: moderateScale(15, 0.6),
  },
  text: {
    letterSpacing: 1,
    color: 'white',
    fontSize: moderateScale(11, 0.6),
  },
});

export default HomeScreen;
