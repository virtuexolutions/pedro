import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {TouchableOpacity} from 'react-native';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const Card = ({item}) => {
  const token = useSelector(state=> state.authReducer.token)
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const changeStatus = async value => {
    const url = `auth/negotiator/bid_help/${item?.id}`;
    setLoading(true);
    const response = await Post(url, {status: value}, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      setModalVisible(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(!modalVisible);
      }}
      style={styles.cardstyle}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={styles.cardImage}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={
              item?.user_info?.photo
              ? {uri: item?.user_info?.photo}
              : require('../Assets/Images/man1.jpg')}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <CustomText
            style={[
              styles.Text,
              {
                fontSize: 17,
              },
            ]}
            isBold>
            {item?.bid_name}
          </CustomText>

          <CustomText style={styles.Text}>
            {item?.user_info?.first_name}
          </CustomText>
          <CustomText style={styles.Text}>{item?.service_type}</CustomText>
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
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
          }}>
          <View
            style={{
              width: windowWidth * 0.2,
              height: windowWidth * 0.2,
              borderRadius: (windowWidth * 0.2) / 2,
              borderWidth: 2,
              borderColor: Color.blue,
              overflow: 'hidden',
            }}>
            <CustomImage
              source={
               require('../Assets/Images/Avatar2.jpg')}
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>
          
          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              marginTop: moderateScale(10, 0.3),
              color: Color.black,
              fontSize: moderateScale(14, 0.3),
              marginHorizontal: moderateScale(10, 0.3),
            }}>
            <CustomText
              isBold>
              {`title : `}
            </CustomText>
            {item?.bid_name}
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              marginTop: moderateScale(10, 0.3),
              color: Color.black,
              fontSize: moderateScale(14, 0.3),
              marginHorizontal: moderateScale(10, 0.3),
            }}>
            <CustomText
              isBold>
              {`name : `}
            </CustomText>
            {item?.user_info?.first_name}
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              marginTop: moderateScale(10, 0.3),
              color: Color.black,
              fontSize: moderateScale(14, 0.3),
              paddingBottom: moderateScale(14, 0.3),
            }}>
            <CustomText
              isBold>
             { `Email : `}
            </CustomText>
            {item?.user_info?.email}
          </CustomText>

          <CustomText
            numberOfLines={2}
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(70, 0.3),
              color: Color.grey,
              fontSize: moderateScale(14, 0.3),
            }}>
            {item?.description}
            kgflsdgkkrfgkrdfeojrieorfuioedprfu'wrueowoperjweorjikejfk
          </CustomText>

          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              marginTop: moderateScale(10, 0.3),
              color: Color.black,
              fontSize: moderateScale(14, 0.3),
            }}>
            Are you Sure You want to Help.?
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
              text={'Accept'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                changeStatus('accept');
              }}
            />
            <CustomButton
              isBold
              text={'Decline'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.red}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                changeStatus('reject');
              }}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardstyle: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.9,
    paddingHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 7,
    overflow: 'hidden',
    backgroundColor: Color.white,
    marginVertical:moderateScale(5,0.3),
  },
  cardImage: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.24,
    overflow: 'hidden',
    borderRadius: 12,
  },
  Text: {fontWeight: '600', color: 'black', paddingVertical: 5},
});
