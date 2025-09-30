import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, RefreshControl, ScrollView, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';

import {useNavigation} from '@react-navigation/native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import JobCard from '../Components/JobCard';
import {windowHeight, windowWidth} from '../Utillity/utils';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const userData = useSelector(state => state.commonReducer.userData);

  const token = useSelector(state => state.authReducer.token);

  const [isLoading, setIsLoading] = useState(false);
  // const [selectedRole, setSelectedType] = useState(
  //   userRole ? userRole : 'Vendor',
  // );
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedData, setSelectedData] = useState('');
  const [searchData, setSearchData] = useState('');
  const [jobData, setJobData] = useState([]);
  const [userJobList, setUserJobList] = useState([]);

  const dummyArray = [
    {
      id: 1,
      name: 'john dee',
      jobdescription: 'hfdjhadjfhkadfkhadsdsdfsdfsdfsdfsdfsffjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'accept',
    },
    {
      id: 2,
      name: 'alexender metthew',
      jobdescription: 'hfdjhadjfhkadfsfsdfsdfsdfsdfsdfsfsdffkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'accept',
    },

    {
      id: 3,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'pending',
    },
    {
      id: 4,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'waiting for approval',
    },

    {
      id: 5,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'accept',
    },
    {
      id: 6,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'reject',
    },

    {
      id: 7,
      name: 'chris jordan',
      jobdescription: 'hfdjhadjfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'pending',
    },
    {
      id: 8,
      name: 'arron john',
      jobdescription: 'hfdjhadjfsdfsdfhkadfkhadfjhadkfh',
      price: '10$',
      image: require('../Assets/Images/dummyman1.png'),
      status: 'reject',
    },
  ];

  const getWorkOrders = async () => {
    const url = 'vendor/manage_work_orders';
    setIsLoading(true);
    const response = await Get(url, token);
    console.log(
      '🚀 ~ getWorkOrders ~ response:',
      JSON.stringify(response?.data, null, 2),
    );
    setIsLoading(false);
    if (response != undefined) {
      setJobData(response?.data);
    }
  };


    const onRefresh = () => {
    console.log('oonnnnnnnnnnn refersh ========== >>>>>>>');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getWorkOrders()
      
    }, 2000);
  };
  // const userJObList = async () => {
  //   const url = 'user/joblist';
  //   setIsLoading(true);
  //   const response = await Get(url, token);
  //   console.log('🚀 ~ userJObList ~ response:',JSON.stringify(response ,null ,2));
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     setUserJobList(response?.data?.job);
  //   }
  // };

  useEffect(() => {
    getWorkOrders();
    // userRole == 'vendor' ? getWorkOrders()
    // : userJObList();
  }, []);

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
          // userRole == 'User'
          //   ? require('../Assets/Images/bg3.png')
          //   : userRole == 'vendor'
          //   : require('../Assets/Images/bg1.png')
          //   ?
          require('../Assets/Images/bg2.png')
        }>
        <Header
          showList={true}
          title={' '}
          Isme
          headerColor={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00']}
        />

        {/* <SearchContainer
          width={windowWidth * 0.92}
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.06,
            marginBottom: moderateScale(10, 0.3),
            borderRadius: moderateScale(25, 0.3),
            marginTop: moderateScale(25, 0.6),
          }}
          data={searchData}
          setData={setSearchData}
          input={true}
        /> */}

        {/* {userRole == 'vendor' && (
          <View style={styles.card_view}>
            <CustomText style={styles.today_text}>total earning</CustomText>
            <CustomText isBold={true} style={styles.price_text}>
              $ 249.6
            </CustomText>
            <View style={styles.lines} />
            <View style={styles.rides_view}>
              <View style={styles.ride_sub_view}>
                <Icon
                  name="suitcase"
                  as={FontAwesome5}
                  color={Color.blue_color}
                />
                <CustomText isBold={true} style={styles.text}>
                  14 jobs
                </CustomText>
              </View>
              <View style={styles.ride_sub_view}>
                <Icon name="clock" as={FontAwesome5} color={Color.blue_color} />
                <CustomText isBold={true} style={styles.text}>
                  14 Hours
                </CustomText>
              </View>
            </View>
          </View>
        )} */}
          <ScrollView
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Proposals
            {/* {userRole == 
            'User' ? 'jobs' : 'Proposals'} */}
          </CustomText>
          {/* <CustomText
            style={[
              styles.text,
              {color: 'white', paddingTop: moderateScale(3, 0.6)},
            ]}>
            view all
          </CustomText> */}
        </View>

        {/* {userRole == 'accountmanager' ? (
          <>
            <FlatList
              horizontal
              scrollEnabled={true}
              keyExtractor={item => {
                item?.id;
              }}
              showsHorizontalScrollIndicator={false}
              data={dummyArray}
              style={{
                height: windowHeight * 0.4,
              }}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
              }}
              renderItem={(item, index) => {
                console.log('🚀 ~ HomeScreen ~ item:', item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('JobDetail');
                    }}>
                    <LinearGradient
                      start={{x: 0.0, y: 0.25}}
                      end={{x: 0.5, y: 1.0}}
                      colors={['#FFFFFF', '#FFFFFF89', '#FFFFFF00']}
                      style={styles.card}>
                      <View style={styles.userImage}>
                        <CustomImage
                          onPress={() => {
                            navigation.navigate('JobDetail');
                          }}
                          style={{height: '100%', width: '100%'}}
                          source={require('../Assets/Images/dummyman1.png')}
                        />
                      </View>
                      <View style={styles.card_row}>
                        <CustomText isBold style={styles.nametxt}>
                          job title
                        </CustomText>
                        <CustomText style={styles.emailtxt}>
                          {item?.item?.name}
                        </CustomText>
                        <CustomText style={styles.emailtxt}>
                          chris@gmail.com
                        </CustomText>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={<CustomText>nodata found</CustomText>}
            />
            <View style={styles.row}>
              <CustomText isBold style={styles.heading}>
                vendor Proposals
              </CustomText>
              <CustomText
                style={[
                  styles.text,
                  {color: 'white', paddingTop: moderateScale(3, 0.6)},
                ]}>
                view all
              </CustomText>
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
                return <JobCard item={item?.item} />;
              }}
                 ListEmptyComponent={<CustomText>nodata found</CustomText>}
            />
          </>
        ) : ( */}
        <>
          {isLoading ? (
            <ActivityIndicator
              style={{
                height: '50%',
              }}
              size={'large'}
              color={Color.white}
            />
          ) : (
            <FlatList
              // data={userRole != 'vendor' ? userJobList : jobData}
              data={jobData}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              key={key => key?.id}
              keyExtractor={item => item?.id}
              contentContainerStyle={{
                paddingTop: moderateScale(5, 0.6),
                paddingHorizontal: moderateScale(15, 0.3),
                width: windowWidth,
              }}
              renderItem={({item, index}) => {
                console.log('🚀 ~ item=========================== Faltlist', JSON.stringify(item?.jobname ,null, 2));
                // return userRole == 'User' ? (
                //   <CustomerCard item={item} />
                // ) : (
                return <JobCard item={item} />;
                // );
              }}
              ListEmptyComponent={
                <CustomText
                  isBold
                  style={{
                    color: Color.white,
                    alignSelf: 'center',
                    fontSize: moderateScale(14, 0.6),
                    marginTop: windowHeight * 0.2,
                  }}>
                  no data found !
                </CustomText>
              }
            />
          )}
        </>
        </ScrollView>
        {/* // )} */}
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
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),

    alignItems: 'center',
  },
  heading: {
    letterSpacing: 1,
    color: 'white',
    fontSize: moderateScale(20, 0.6),
  },
  text: {
    letterSpacing: 1,
    color: 'white',
    fontSize: moderateScale(12, 0.6),
  },
  card_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.17,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15, 0.6),
    shadowColor: Color.blue,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 7,
    marginTop: moderateScale(15, 0.6),
  },
  lines: {
    backgroundColor: Color.lightGrey,
    height: 1.5,
    width: '90%',
    marginTop: moderateScale(10, 0.6),
  },
  rides_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(5, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.8,
  },
  ride_sub_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today_text: {fontSize: moderateScale(16, 0.6), color: Color.grey},
  price_text: {fontSize: moderateScale(25, 0.6), color: Color.black},
  text: {fontSize: moderateScale(13, 0.6), marginLeft: moderateScale(5, 0.6)},
  card: {
    height: windowHeight * 0.18,
    width: windowWidth * 0.4,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(5, 0.6),
    overflow: 'hidden',
  },
  userImage: {
    height: windowHeight * 0.1,
    width: '100%',
  },
  nametxt: {
    fontSize: moderateScale(12, 0.6),
    letterSpacing: 0.5,
  },
  card_row: {
    paddingHorizontal: moderateScale(5, 0.6),
  },
  emailtxt: {
    fontSize: moderateScale(11, 0.6),
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
