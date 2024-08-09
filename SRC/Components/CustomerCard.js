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
import {position} from 'native-base/lib/typescript/theme/styled-system';

const CustomerCard = ({fromSeeAll, style, onPress, item, getProposal}) => {
  const navigation = useNavigation();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  return (
    <TouchableOpacity
      //   style={styles.container}
      onPress={() => navigation.navigate('JobDetail')}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={['#FFFFFF', '#FFFFFF89', '#FFFFFF00']}
        style={styles.container}>
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
        {/* <View style={styles.status}> */}
        <CustomText
          // isBold
          style={{
            // paddingVertical :moderateScale(2,.6) ,
            paddingHorizontal: moderateScale(10, 0.6),
            backgroundColor: '#91E7BF',
            borderRadius: moderateScale(10, 0.6),
            fontSize: moderateScale(9, 0.6),
            color: Color.black,
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          accpet
        </CustomText>
        {/* </View> */}
        <View
          style={{
            paddingTop: moderateScale(8, 0.6),
            paddingHorizontal: moderateScale(5, 0.6),
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            job title
          </CustomText>
          <CustomText
            numberOfLines={2}
            style={{
              color: Color.black,
              width: windowWidth * 0.6,
              fontSize: moderateScale(10, 0.6),
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </CustomText>
          <View style={styles.row}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(10, 0.6),
              }}>
              price :
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(10, 0.6),
                color: Color.black,
              }}>
              $500.00
            </CustomText>
          </View>
          {/* <View style={styles.row}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(12, 0.6),
              }}>
              Negotiator :
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(12, 0.6),
                color: Color.black,
              }}>
              $400.00
            </CustomText>
          </View> */}
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
          {/* <View style={styles.timeRow}>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(9, 0.6),
                paddingRight: moderateScale(10, 0.6),
              }}>
              10/06/2022
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(9, 0.6),
                color: Color.black,
              }}>
              07:43 PM
            </CustomText>
          </View> */}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.2,
    paddingHorizontal: moderateScale(2, 0.6),
  },
  timeRow: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(2, 0.6),
  },
  container: {
    borderWidth: 1,
    borderColor: 'white',
    width: windowWidth * 0.9,
    marginBottom: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    flexDirection: 'row',
  },
  imagecontainer: {
    height: windowHeight * 0.1,
    width: windowHeight * 0.1,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    marginHorizontal: moderateScale(6, 0.3),
    marginVertical: moderateScale(5, 0.3),
  },
  text: {
    paddingHorizontal: moderateScale(10, 0.6),
    textAlign: 'center',
    backgroundColor: 'green',
    marginTop: moderateScale(10, 0.3),
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
  },
  status: {
    padding: moderateScale(10, 0.6),
    backgroundColor: 'red',
  },
});
