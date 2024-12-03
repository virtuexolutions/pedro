import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import RatingComponent from './RatingComponent';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import moment from 'moment';

const JobCard = ({fromSeeAll, style, onPress, item, getProposal}) => {
  const navigation = useNavigation();
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#FFFFFF', '#FFFFFF89', '#FFFFFF00']}
      style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
        }}
        onPress={() =>
          navigation.navigate('DetailScreen', {
            job_id: item?.job_id,
            jobStatus: item?.status,
          })
        }>
        <View style={styles.imagecontainer}>
          <CustomImage
            onPress={() =>
              navigation.navigate('DetailScreen', {
                job_id: item?.id,
                jobStatus: item?.status,
              })
            }
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
            }}
            source={require('../Assets/Images/dummyman1.png')}
          />
        </View>
        {/* <View
          style={{
            // paddingVertical :moderateScale(2,.6) ,
            // paddingHorizontal: moderateScale(10, 0.6),
            // backgroundColor: item?.status == 'waiting for approval' ? '#fac637' :item?.status == 'accept'? '#91E7BF' : item?.status == 'reject' ?'red' :'#9CCFE7',
            // borderRadius: moderateScale(10, 0.6),
            // fontSize: moderateScale(9, 0.6),
            // color: Color.black,
            height:windowHeight*0.0,
            width:windowWidth*0.1,
            position: 'absolute',
            right: 10,
            top: -3,
          }}>
          <CustomImage style={{
            height:'100%',
            width:'100%',
            }} source={require('../Assets/Images/bookmark.png')}/>
            </View> */}
        <CustomText
          // isBold
          style={{
            paddingHorizontal: moderateScale(10, 0.6),
            backgroundColor:
              item?.status == 'waiting for approval'
                ? '#fac637'
                : item?.status == 'accepted'
                ? '#fac637'
                : item?.status == 'decline'
                ? 'red'
                : '#91de2c',
            borderRadius: moderateScale(10, 0.6),
            fontSize: moderateScale(11, 0.6),
            color: Color.black,
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          {item?.status}
        </CustomText>
        <View
          style={{
            paddingTop: moderateScale(25, 0.6),
          }}>
          <View style={styles.row}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(14, 0.6),
              }}>
              payment info :
            </CustomText>
            <CustomText
              isBold
              style={{
                marginHorizontal: moderateScale(5, 0.3),
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
                width: windowWidth * 0.3,
              }}>
              {item?.payment_info}
            </CustomText>
          </View>
          <View style={styles.row}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(14, 0.6),
              }}>
              priority :
            </CustomText>
            <CustomText
              isBold
              style={{
                marginHorizontal: moderateScale(5, 0.3),
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
                width: windowWidth * 0.2,
              }}>
              {item?.priority}
            </CustomText>
          </View>
          <View style={styles.timeRow}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(14, 0.6),
                paddingRight: moderateScale(10, 0.6),
              }}>
              deadline :
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
              }}>
              {moment(item?.deadline).format('l')}
              07:43 PM
            </CustomText>
          </View>
          <View
            style={[
              styles.row,
              {
                paddingVertical: moderateScale(2, 0.6),
              },
            ]}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(14, 0.6),
              }}>
              note :
            </CustomText>
            <CustomText
              numberOfLines={1}
              style={{
                width: windowWidth * 0.45,
                color: Color.black,
                fontSize: moderateScale(14, 0.6),
              }}>
              {item?.note}
            </CustomText>
          </View>
          {/* <RatingComponent
            key={item => item?.id}
            disable={true}
            rating={5}
            starColor={'#ffa534'}
            starStyle={{
              marginRight: moderateScale(1, 0.3),
              marginTop: moderateScale(1, 0.3),
            }}
            starSize={moderateScale(9, 0.3)}
          /> */}
        </View>
      </TouchableOpacity>
    </LinearGradient>
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
    paddingHorizontal: moderateScale(2, 0.6),
  },
  timeRow: {
    flexDirection: 'row',
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
    height: windowHeight * 0.16,
    //  backgroundColor:'red',
    borderWidth: 1,
    borderColor: 'white',
    // width: windowWidth * 0.9,
    borderTopLeftRadius: moderateScale(55, 0.6),
    borderBottomLeftRadius: moderateScale(55, 0.6),
    marginBottom: moderateScale(15, 0.3),
    borderTopRightRadius: moderateScale(5, 0.6),
    borderBottomRightRadius: moderateScale(5, 0.6),
    // flexDirection: 'row',
    // justifyContent:'center'
  },
  imagecontainer: {
    height: windowHeight * 0.14,
    width: windowHeight * 0.14,
    borderRadius: (windowHeight * 0.14) / 2,
    overflow: 'hidden',
    // backgroundColor:'red',
    marginHorizontal: moderateScale(6, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
  text: {
    paddingHorizontal: moderateScale(10, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
  },
});
