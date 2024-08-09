import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import WorkUploadModal from './WorkUploadModal';

const TimingModal = ({
  setTimingModal,
  timingmodal,
  fromuploadwork,
  setIsModalVisible,
  isModalVisible,
}) => {
  const [isvisible, setisVisible] = useState(false);

  return (
    <>
      <Modal
        hasBackdrop={true}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        isVisible={timingmodal}
        onBackdropPress={() => {
          setTimingModal(false);
        }}>
        <View style={styles.card}>
          <View
            style={{
              width: windowWidth * 0.76,
              overflow: 'hidden',
              backgroundColor: '#214339',
              paddingVertical: moderateScale(10, 0.6),
              alignItems: 'center',
            }}>
            <CustomText isBold style={styles.txt}>
              lorem ipsum lorem ipsum
            </CustomText>
          </View>
          {/* <View
          style={{
            marginTop: moderateScale(15, 0.3),
            height: windowHeight * 0.1,
            width: windowWidth * 0.25,
            // backgroundColor: 'red',
          }}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/reactions.png')}
          />
        </View>
        <CustomText
        isBold
          style={styles.txt}>
          you are unable to checkin
        </CustomText>
        <CustomText
          style={styles.txt2}>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
        </CustomText> */}

          <CustomButton
            text={'Check in '}
            textColor={Color.white}
            width={windowWidth * 0.5}
            height={windowHeight * 0.06}
            marginTop={moderateScale(30, 0.3)}
            onPress={() => {
              {
                setTimingModal(false);
              }
              // sendReview();
            }}
            isGradient
            bgColor={Color.vendorColor}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(15, 0.3)}
            // disabled={true}
          />
          <CustomButton
            text={'upload your work '}
            textColor={Color.white}
            width={windowWidth * 0.5}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              setisVisible(true);
              setTimingModal(false);
            }}
            isGradient
            bgColor={Color.vendorColor}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(15, 0.3)}
            // disabled={true}
          />
        </View>
      </Modal>
      <WorkUploadModal
        uploadModal={isvisible}
        setUploadModal={setisVisible}
        setTimingModal={setTimingModal}
      />
    </>
  );
};

export default TimingModal;

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: moderateScale(20, 0.3),
    width: windowWidth * 0.76,
    backgroundColor: 'white',
    alignItems: 'center',
    // padding: moderateScale(15, 0.6),
    // height: windowHeight * 0.4,
    paddingBottom: moderateScale(10, 0.3),
  },
  txt: {
    letterSpacing: 0.8,
    // paddingVertical: moderateScale(10, 0.6),
    fontSize: moderateScale(16, 0.6),
    color: Color.white,
  },
  txt2: {
    color: Color.mediumGray,
    textAlign: 'center',
    // width: windowWidth * 0.65,
    // backgroundColor:'red',
    letterSpacing: 0.8,
    // paddingVertical:moderateScale(10,.6),
    fontSize: moderateScale(11, 0.6),
  },
});
