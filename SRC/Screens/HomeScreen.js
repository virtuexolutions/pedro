import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
FlatList,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {ScrollView} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SearchContainer from '../Components/SearchContainer';
import JobCard from '../Components/JobCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);

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
      name: 'chris jordan' ,
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
        name: 'chris jordan' ,
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
        name: 'chris jordan' ,
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
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={
          selectedRole == 'Customer'
            ? ['#16222A', '#3A6073']
            : selectedRole == 'Vendor'
            ? ['#1f4037', '#99f2c8']
            : ['#000046', '#1CB5E0']
        }
        style={styles.container}>
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
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15, 0.3),
              width: windowWidth,
            }}
            renderItem={(item, index) => {
              return <JobCard item={item?.item} />;
            }}
          />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.02,
    height: windowHeight,
    width: windowWidth,
  },
 

 



 
  
 });

export default HomeScreen;
