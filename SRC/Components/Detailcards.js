import { Icon } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { windowWidth } from '../Utillity/utils';

const Detailcards = ({title, data, iconName, iconType , marginTop , containerStyle , textColor}) => {
    const userRole = useSelector(state => state.commonReducer.selectedRole);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent : 'space-between',
          width: windowWidth * 0.4,
          marginTop: marginTop,
          //  backgroundColor : 'green',
          //  marginLeft : moderateScale(10,0.3)
        }}>
        <View
          style={[{
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
            backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
          },containerStyle]}>
          <Icon
            name={iconName}
            as={iconType}
            size={moderateScale(15, 0.6)}
            color={  userRole == 'Qbid Member'
            ? Color.blue
            : userRole == 'Qbid Negotiator'
            ? Color.themeColor
            : Color.black
}
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          />
        </View>
        <View style={{marginLeft: moderateScale(6, 0.6)}}>
          <CustomText
            isBold
            style={{fontSize: moderateScale(11, 0.6), color: textColor ? textColor : Color.white}}>
            {title}
          </CustomText>
          <CustomText
            style={{fontSize: moderateScale(9, 0.6), color: textColor ? textColor : Color.white}}>
            {data}
          </CustomText>
        </View>
      </View>
    );
  };
  export default Detailcards ;