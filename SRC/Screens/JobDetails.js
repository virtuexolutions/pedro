import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Detailcards from '../Components/Detailcards';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import Header from '../Components/Header';
import ImagePickerModal from '../Components/ImagePickerModal';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {windowHeight, windowWidth} from '../Utillity/utils';

const JobDetails = props => {
  const data1 = props?.route?.params?.item;
  const type = props?.route?.params?.type;
  const user = useSelector(state => state.commonReducer.userData);
  // console.log('🚀 ~ JobDetails ~ user:', user);
  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const UserCoverLetterArray = useSelector(
    state => state.commonReducer.servicesArray,
  );

  const navigation = useNavigation();
  const [data, setData] = useState(data1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState(user?.first_name);
  const [Email, setEmail] = useState(user?.email);
  const [number, setNumber] = useState(user?.phone);
  const [desc, setDesc] = useState('');
  const isFocused = useIsFocused();
  const [coverletterRole, setCoverLetterRole] = useState('Expertise In');
  const [userData, setUserData] = useState({});
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [finalImagesArray, setFinalImagesArray] = useState([]);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [selectedRole, setSelectedType] = useState(
    userRole ? userRole : 'Customer',
  );
  const [attachmentImage, setAttachmentImage] = useState({});

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <LinearGradient
        style={{
          height: windowHeight * 0.97,
        }}
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={
          selectedRole == 'Customer'
            ? ['#16222A', '#3A6073']
            : selectedRole == 'Vendor'
            ? ['#1f4037', '#99f2c8']
            : ['#000046', '#1CB5E0']
        }>
        <Header
          showList={true}
          title={'Job Details'}
          headerColor={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00']}
        />
        {/* <View style={styles.header}>
          <View
            style={{
              height: moderateScale(30, 0.3),
              width: moderateScale(30, 0.3),
              borderRadius: moderateScale(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Icon
              name={'arrowleft'}
              as={AntDesign}
              size={moderateScale(22, 0.3)}
              color={Color.black}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // userRole == 'Qbid Member'
            //   ? navigation.navigate('MyAccounts')
            //   : navigation.navigate('NegotiatorPortfolio');
          }}
          style={{
            width: moderateScale(40, 0.3),
            height: moderateScale(40, 0.3),
            borderRadius: moderateScale(20, 0.3),
            backgroundColor: Color.white,
            overflow: userRole == 'Qbid Member' ? 'visible' : 'hidden',
          }}>
          <CustomImage
            onPress={() => {
              // userRole == 'Qbid Member'
              //   ? alert('Action required')
              //   : navigation.navigate('NegotiatorPortfolio');
            }}
            source={
              userRole == 'Qbid Member'
              ? require('../Assets/Images/Group.png')
              :
              user?.photo
                ? {uri: `${user?.photo}`}
                : require('../Assets/Images/man1.jpg')
            }
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        
        </TouchableOpacity>

        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: windowHeight * 0.8}}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.6),
            paddingTop: moderateScale(40, 0.6),
            paddingLeft: moderateScale(15, 0.6),
            // backgroundColor:'redx'
          }}>
          {isLoading ? (
            <View
              style={{
                width: windowWidth * 0.95,
                height: windowHeight * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor :'red'
                }}>
                <View
                  style={{
                    width: moderateScale(60, 0.3),
                    height: moderateScale(50, 0.3),
                    borderRadius: moderateScale(10, 0.3),
                    overflow: 'hidden',
                  }}>
                  <CustomImage
                    source={
                      data?.images?.length > 0
                        ? {uri: data?.images[0]?.image}
                        : require('../Assets/Images/dummyman1.png')
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: moderateScale(5, 0.3),
                    // backgroundColor :'green'
                  }}>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      // backgroundColor :'red',
                      fontSize: moderateScale(17, 0.6),
                    }}>
                    {data?.title}
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(11, 0.6),
                    }}>
                    {data?.service_preference}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: moderateScale(10, 0.3),
                    right: moderateScale(30, 0.3),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: moderateScale(6, 0.6),
                      height: moderateScale(6, 0.6),
                      borderRadius: moderateScale(3, 0.6),
                      backgroundColor:
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : userRole == 'Qbid Negotiator'
                          ? Color.themeColor
                          : Color.black,
                    }}
                  />
                  <CustomText
                    style={{
                      fontSize: moderateScale(8, 0.6),
                      color: Color.white,
                      // backgroundColor : 'red',
                      marginLeft: moderateScale(3, 0.3),
                    }}>
                    {data?.status}
                  </CustomText>
                </View>
              </View>
              {type == 'quote' && (
                <ShowMoreAndShowLessText minTextLength={50} style={styles.desc}>
                  {data?.notes ? data?.notes : data?.coverletter}
                </ShowMoreAndShowLessText>
              )}
              <CustomText
                onPress={() => {
                  if (finalImagesArray.length > 0) {
                    setImageModalVisible(true);
                  } else {
                    return Platform.OS == 'android'
                      ? ToastAndroid.show('No attachments', ToastAndroid.SHORT)
                      : Alert.alert('No Attachments');
                  }
                }}
                isBold
                style={{
                  color: Color.blue,
                  fontSize: moderateScale(12, 0.6),
                  marginTop: moderateScale(10, 0.3),
                }}>
                Attachments...
              </CustomText>
              <CustomText
                isBold
                style={{
                  color: Color.white,
                  fontSize: moderateScale(17, 0.6),
                  marginTop: moderateScale(20, 0.3),
                }}>
                job Details
              </CustomText>
              <View style={styles.row}>
                <Detailcards
                  data={'dfsdfdfsdf'}
                  iconName={'vcard'}
                  title={'Member Name'}
                  iconType={FontAwesome}
                  marginTop={moderateScale(10, 0.3)}
                />

                <Detailcards
                  data={'dfhsdgfhsgsd'}
                  iconName={'building'}
                  title={'City'}
                  iconType={FontAwesome}
                  marginTop={moderateScale(30, 0.3)}
                />

                <Detailcards
                  data={data?.service_preference}
                  iconName={'briefcase'}
                  title={'job descripteion'}
                  iconType={Entypo}
                  marginTop={moderateScale(30, 0.3)}
                />
              </View>

              {/* <>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                      marginBottom: moderateScale(10, 0.3),
                      marginTop: moderateScale(20, 0.3),
                    }}>
                    The Best Quote for your Project
                  </CustomText>
                  <FlatList
                    data={
                      data?.bids?.some(item => item?.status == 'accept')
                        ? [data?.bids?.find(item => item?.status == 'accept')]
                        : data?.bids
                    }
                    ListEmptyComponent={() => {
                      return (
                        <NoData
                          style={{
                            width: windowWidth * 0.95,
                            height: windowHeight * 0.18,
                            // backgroundColor: 'green',
                            alignItems: 'center',
                          }}
                          text={'No requests yet'}
                        />
                      );
                    }}
                    contentContainerStyle={{
                      paddingBottom: moderateScale(30, 0.6),
                    }}
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <BidderDetail
                            item={{
                              image: item?.user_info?.photo,
                              name: item?.user_info?.company_name,
                              rating: item?.rating,
                              review: data1?.review,
                              description: item?.coverletter,
                              status: item?.status,
                              id: item?.id,
                              attachment: item?.images,
                            }}
                          />
                          {data?.status == 'pending' &&
                            item?.status == 'pending' && (
                              <View
                                key={index}
                                style={{
                                  flexDirection: 'row',
                                  // backgroundColor: 'black',
                                  justifyContent: 'space-between',
                                  width: windowWidth * 0.55,
                                  alignSelf: 'center',
                                  paddingVertical: moderateScale(5, 0.6),
                                  alignItems: 'center',
                                  marginBottom: moderateScale(5, 0.6),
                                }}>
                                <CustomButton
                                  isBold
                                  text={
                                    isLoading ? (
                                      <ActivityIndicator
                                        color={'white'}
                                        size={moderateScale(20, 0.6)}
                                      />
                                    ) : (
                                      'Accept'
                                    )
                                  }
                                  textColor={Color.white}
                                  width={windowWidth * 0.25}
                                  height={windowHeight * 0.04}
                                  bgColor={
                                    userRole == 'Qbid Member'
                                      ? Color.blue
                                      : userRole == 'Qbid Negotiator'
                                      ? Color.themeColor
                                      : Color.black
                                  }
                                  borderRadius={moderateScale(30, 0.3)}
                                  fontSize={moderateScale(11, 0.6)}
                                  onPress={() => {
                                    // changeStatus('accept', item?.id);
                                  }}
                                />
                                <CustomButton
                                  isBold
                                  text={'Decline'}
                                  textColor={Color.white}
                                  width={windowWidth * 0.25}
                                  height={windowHeight * 0.04}
                                  bgColor={
                                    userRole == 'Qbid Member'
                                      ? Color.blue
                                      : userRole == 'Qbid Negotiator'
                                      ? Color.themeColor
                                      : Color.black
                                  }
                                  borderRadius={moderateScale(30, 0.3)}
                                  fontSize={moderateScale(11, 0.6)}
                                  onPress={() => {
                                    // changeStatus('reject', item?.id);
                                  }}
                                />
                              </View>
                            )}
                        </>
                      );
                    }}
                  />
                </>
          
                <>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                      marginVertical: moderateScale(20, 0.3),
                    }}>
                    Your Bid Details
                  </CustomText>
                  <BidderDetail
                    item={{
                      image: user?.photo,
                      name: user?.first_name,
                      rating: user?.rating,
                      description: userData?.coverletter
                        ? userData?.coverletter
                        : desc,
                      // status: data?.status,
                      status: data?.bids?.status,
                      id: data?.id,
                      // attachment :
                    }}
                  />
                </> */}
            </>
          )}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: windowWidth,
            paddingHorizontal: moderateScale(15, 0.3),
            height: windowHeight * 0.2,
            // backgroundColor:'red'
          }}>
          <CustomButton
            text={'Bid'}
            textColor={Color.white}
            width={windowWidth * 0.92}
            height={windowHeight * 0.07}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              toggleModal();
            }}
            bgColor={
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
            }
            borderRadius={moderateScale(30, 0.3)}
            alignSelf={'flex-start'}
          />
        </View>
      </LinearGradient>

      <ImageView
        images={finalImagesArray}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setFullName('');
          setEmail('');
          setNumber('');
          setCoverLetterRole('');
          setDesc('');
          setModalVisible(false);
        }}>
        <View
          style={{
            width: windowWidth * 0.9,

            height: windowHeight * 0.9,
            borderRadius: moderateScale(15, 0.3),
            backgroundColor: '#f2fce4',
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingVertical: moderateScale(5, 0.6),
              alignItems: 'center',
            }}>
            <View style={{marginTop: moderateScale(20, 0.3)}}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.6),
                }}>
                QBid Proposal
              </CustomText>
            </View>

            <View style={{marginTop: moderateScale(10, 0.3)}}>
              <TextInputWithTitle
                secureText={false}
                placeholder={'Full Name'}
                setText={setFullName}
                value={fullName}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.68}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
              <TextInputWithTitle
                secureText={false}
                placeholder={'Enter your Email'}
                setText={setEmail}
                value={Email}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.68}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
              <TextInputWithTitle
                secureText={false}
                placeholder={'Phone Number'}
                setText={setNumber}
                value={number}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.68}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                keyboardType={'numeric'}
              />
              <DropDownSingleSelect
                array={UserCoverLetterArray}
                backgroundColor={'white'}
                item={coverletterRole}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                borderWidth={1}
                marginTop={moderateScale(20, 0.6)}
                setItem={setCoverLetterRole}
                placeholder={coverletterRole}
                placeholderColor={Color.themeLightGray}
                width={windowWidth * 0.75}
                dropDownHeight={windowHeight * 0.06}
                dropdownStyle={{
                  width: windowWidth * 0.75,
                }}
              />

              <TextInputWithTitle
                multiline={true}
                secureText={false}
                placeholder={'Cover Letter'}
                setText={setDesc}
                value={desc}
                viewHeight={0.15}
                viewWidth={0.75}
                inputWidth={0.66}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
              <CustomText
                style={[
                  styles.title,
                  {
                    marginTop: moderateScale(10, 0.3),
                    width: windowWidth * 0.25,
                  },
                ]}
                isBold={true}
                children={'attachments'}
              />

              <View style={styles.imagesContainer}>
                <FlatList
                  horizontal
                  data={multiImages}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    flexGrow: 0,
                  }}
                  renderItem={({item, index}) => {
                    console.log(
                      '🚀 ~ JobDetails ~ item ================= < here :',
                      item,
                    );
                    return (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            borderWidth: 0,
                            borderRadius: moderateScale(10, 0.3),
                          },
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
                            // setAttachmentImage({})
                            let newArray = [...multiImages];
                            newArray.splice(index, 1);
                            setMultiImages(newArray);
                          }}
                        />
                        <CustomImage
                          // source={require('../Assets/Images/dummyman1.png')}
                          source={{uri: item?.uri}}
                          // source={{uri :attachmentImage?.uri}}
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
                      setImagePickerVisible(true);
                    }}
                  />
                </View>
              </View>

              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                  ) : (
                    'Done'
                  )
                }
                textColor={Color.white}
                width={windowWidth * 0.45}
                height={windowHeight * 0.06}
                marginTop={moderateScale(5, 0.3)}
                onPress={() => {
                  bidNow();
                }}
                bgColor={
                  userRole == 'Qbid Member'
                    ? Color.blue
                    : userRole == 'Qbid Negotiator'
                    ? Color.themeColor
                    : Color.black
                }
                borderRadius={moderateScale(30, 0.3)}
                disabled={isLoading ? true : false}
              />

              <ImagePickerModal
                show={imagePickerVisible}
                setShow={setImagePickerVisible}
                setMultiImages={setMultiImages}
                // setFileObject={setAttachmentImage}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default JobDetails;

const styles = ScaledSheet.create({
  desc: {
    width: windowWidth * 0.9,
    lineHeight: moderateScale(20, 0.3),
    color: Color.white,
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.3),
  },
  imagesContainer: {
    marginTop: moderateScale(10, 0.3),
    width: windowWidth * 0.8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addImageContainer: {
    marginTop: moderateScale(10, 0.3),
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
  attachmentContainer: {
    backgroundColor: Color.white,
    borderColor: Color.black,
    borderWidth: 1,
    height: windowHeight * 0.08,
    width: windowHeight * 0.13,
    borderRadius: moderateScale(10, 0.6),
    textAlign: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.95,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: moderateScale(15, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    marginleft: moderateScale(10, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
  header: {
    // backgroundColor:'red',
    height: windowHeight * 0.09,
    alignItems: 'center',
    paddingHorizontal: moderateScale(12, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
