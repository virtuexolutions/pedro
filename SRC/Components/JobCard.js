import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import numeral from 'numeral';
import {Post} from '../Axios/AxiosInterceptorFunction';
import ImageView from 'react-native-image-viewing';
import { useNavigation } from '@react-navigation/native';

const JobCard = ({fromSeeAll, style, onPress, item, getProposal}) => {
  const navigation= useNavigation()
  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const [loading, setLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const imagesArray = (
    item?.images ? item?.images : item?.quote_info?.images
  )?.map(item => {
    return {uri: item?.image};
  });

  // const changeStatus = async value => {
  //   const url = `auth/negotiator/hiring/update/${item?.id}`;
  //   value == 'onGoing' ? setLoading(true) : setDeclineLoading(true);
  //   const response = await Post(url, {status: value}, apiHeader(token));
  //   value == 'onGoing' ? setLoading(false) : setDeclineLoading(false);
  //   if (response != undefined) {
     
  //     setModalVisible(false);
  //     getProposal()
  //   }
  // };

  return (
    <>
      <TouchableOpacity
        // onPress={() => {
        //   onPress ? onPress() : setModalVisible(!modalVisible);
        // }}
        activeOpacity={0.9}
        style={[
          styles.joccard,
          fromSeeAll && {
            width: windowWidth * 0.46,
            paddingVertical: moderateScale(10, 0.6),
          },
          style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: fromSeeAll
                ? moderateScale(50, 0.3)
                : moderateScale(36, 0.3),
              height: fromSeeAll
                ? moderateScale(50, 0.3)
                : moderateScale(36, 0.3),
              borderRadius: fromSeeAll
                ? moderateScale(25, 0.3)
                : moderateScale(18, 0.3),

              overflow: 'hidden',
            }}>
            <CustomImage
              source={item?.images?.length > 0 ? {uri:item?.images[0]?.image} :
                item?.quote_info?.images.length > 0
                  ? {uri: item?.quote_info?.images[0]?.image}
                  : require('../Assets/Images/man1.jpg')
              }
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
          <CustomText
            isBold
            numberOfLines={2}
            style={{
              width: windowWidth * 0.2,
              fontSize: fromSeeAll
                ? moderateScale(11, 0.6)
                : moderateScale(9, 0.6),
              marginLeft: moderateScale(5, 0.3),
            }}>
            {item?.name}
          </CustomText>
        </View>
        <CustomText
          numberOfLines={3}
          style={{
            fontSize: fromSeeAll
              ? moderateScale(9, 0.6)
              : moderateScale(8, 0.6),
            color: '#575757',
            marginTop: moderateScale(5, 0.3),
          }}>
          {item?.notes ? item?.notes : item?.quote_info?.notes}
        </CustomText>
        <View style={styles.row}>
          <View>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              {numeral(
                item?.price
              ).format('$0,0a')}
            </CustomText>
            <CustomText
            numberOfLines={2}
              style={{
                fontSize: moderateScale(8, 0.6),
                width:windowWidth*0.4,
              }}>
           {item?.jobdescription}
            </CustomText>
          </View>
          {/* <View
            style={{
              alignItems: 'center',
              marginRight: moderateScale(2, 0.3),
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              {`${
                item?.offering_percentage
                  ? item?.offering_percentage
                  : item?.quote_info?.offering_percentage
              }%`}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(8, 0.6),
              }}>
              Offering
            </CustomText>
          </View> */}
        </View>

        <CustomButton
          text={'View Details'}
          textColor={Color.white}
          width={fromSeeAll && windowWidth * 0.19}
          height={fromSeeAll && windowHeight * 0.04}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
          navigation.navigate('JobDetails')  
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
          fontSize={fromSeeAll ? moderateScale(8, 0.6) : moderateScale(8, 0.6)}
        />
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.mainViewModal}>
          <View style={styles.container}>
            <CustomImage
              source={require('../Assets/Images/Avatar2.jpg')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <CustomText style={[styles.text, {}]} isBold>
            {item?.title}
          </CustomText>
          <CustomText style={styles.text}>
            {item?.coverletter ? item?.coverletter : item?.notes}
          </CustomText>
          <CustomText
            onPress={() => {
              if (
                (item?.images
                  ? item?.images.length
                  : item?.quote_info?.images.length) > 0
              ) {
                setImageModal(true);
              } else {
                Platform.OS == 'android'
                  ? ToastAndroid.show('No attachments', ToastAndroid.SHORT)
                  : Alert.alert('No attachments');
              }
            }}
            style={[styles.text, {color: Color.blue}]}>
            attachments...
          </CustomText>


          <View
            style={{
              width: windowWidth * 0.6,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: moderateScale(10, 0.3),
              marginBottom: moderateScale(10, 0.3),
            }}>
            <CustomButton
              isBold
              text={
                loading ? (
                  <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Accept'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                changeStatus('onGoing');
                // setModalVisible(false);
              }}
            />
            <CustomButton
              isBold
              text={
                declineLoading ? (
                  <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Decline'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.red}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                changeStatus('rejected');
                // setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <ImageView
        images={imagesArray}
        imageIndex={0}
        visible={imageModal}
        onRequestClose={() => setImageModal(false)}
      />
    </>
  );
};

export default JobCard;

const styles = ScaledSheet.create({
  joccard: {
    marginHorizontal: moderateScale(5, 0.6),
    width: windowWidth * 0.43,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    overflow: 'hidden',
    paddingLeft: moderateScale(5, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(2, 0.6),
  },
  mainViewModal: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(20, 0.6),
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.3),
    backgroundColor: Color.white,
    borderWidth: 2,
    borderColor: Color.blue,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  container: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 2,
    borderColor: Color.blue,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    paddingHorizontal: moderateScale(10, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
  },
});
