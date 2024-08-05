import {StyleSheet, Modal, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';

const NotificationModal = ({visible, onRequestClose}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      style={{
        flex: 1,
        backgroundColor: 'rgb(0, 0 , 0, 0.5)',
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.25,
            backgroundColor: '#D8F2FF',
            borderRadius: moderateScale(20, 0.6),
            borderWidth: 1,
            borderColor: '#5AD1FF',
            paddingHorizontal: moderateScale(20, 0.6),
            paddingVertical: moderateScale(20, 0.6),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText isBold={true} style={{fontSize: moderateScale(16, 0.6)}}>
            Notification
          </CustomText>
          <CustomText
            style={{textAlign: 'center', fontSize: moderateScale(12, 0.6)}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            maximus ut ipsum ac tincidunt. Phasellus nisl purus, iaculis ac nunc
            sit amet, consequat placerat eros. In a est sapien.
          </CustomText>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.3,
              height: moderateScale(25, 0.6),
              backgroundColor: Color.darkGray,
              borderRadius: moderateScale(20, 0.6),
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: moderateScale(20, 0.6),
            }}>
            <CustomText style={{color: Color.white}}>Ok</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({});
