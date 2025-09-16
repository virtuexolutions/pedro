import {Icon} from 'native-base';
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {setWalkThrough} from '../Store/slices/auth';
import {windowHeight, windowWidth} from '../Utillity/utils';

const Walkthrough = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      text: 'The easiest way to handle your assigned jobs and keep your work organised. ',
      logo: require('../Assets/Images/walkthrough2.jpg'),
    },
    {
      key: '2',
      text: 'Instantly view your assigned jobs with customer info, address, and instructions. ',
      logo: require('../Assets/Images/electrician.jpg'),
    },
    {
      key: '3',
      text: 'Share your location and status so the admin always knows your progress.',
      logo: require('../Assets/Images/plumber.jpg'),
    },
  ];

  const RenderSlider = ({item}) => {
    return (
      <ImageBackground
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
        source={require('../Assets/Images/bg2.png')}>
        <Image
          source={item.logo}
          // resizeMode={'contain'}
          style={{
            height: windowHeight * 0.74,
            width: windowWidth,
            borderBottomLeftRadius: moderateScale(30, 0.3),
            borderBottomRightRadius: moderateScale(30, 0.3),
          }}
        />

        <Text style={styles.subText}>{item.text}</Text>
      </ImageBackground>
    );
  };

  const RenderNextBtn = () => {
    return (
      <View
        style={{
          width: moderateScale(60, 0.6),
          height: moderateScale(60, 0.6),
          borderRadius: moderateScale(30, 0.6),
          backgroundColor: 'rgba(255,255,255,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(-20, 0.3),
        }}>
        <Icon
          name="arrowright"
          as={AntDesign}
          color={Color.black}
          size={moderateScale(25, 0.6)}
        />
      </View>
      // <CustomText style={[styles.generalBtn, styles.btnRight]}>Next</CustomText>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  const RenderBackBtn = () => {
    return (
      <CustomText isBold style={[styles.generalBtn, styles.btnLeft]}>
        Back
      </CustomText>
    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.black, Color.black]}
      statusBarContentStyle={'light-content'}>
      <AppIntroSlider
        renderItem={RenderSlider}
        data={slides}
        showSkipButton={true}
        showPrevButton={true}
        activeDotStyle={{
          backgroundColor: Color.white,
          marginBottom: moderateScale(20, 0.3),
        }}
        dotStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Color.white,
          marginBottom: moderateScale(20, 0.3),
        }}
        renderDoneButton={RenderDoneBtn}
        renderNextButton={RenderNextBtn}
        renderSkipButton={RenderSkipBtn}
        renderPrevButton={RenderBackBtn}
      />
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  SliderContainer: {
    flex: 1,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: Color.red,
    overflow: 'hidden',
  },
  title: {
    color: Color.black,
    fontWeight: '700',
    fontSize: moderateScale(20, 0.6),
    textAlign: 'center',
    width: windowWidth * 0.9,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    overflow: 'scroll',
    marginTop: moderateScale(-20, 0.3),
    alignItems: 'center',
  },
  subText: {
    color: Color.white,
    fontWeight: '400',
    fontSize: moderateScale(15, 0.6),
    width: windowWidth * 0.9,
    marginTop: moderateScale(20, 0.3),
    lineHeight: moderateScale(18, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  generalBtn: {
    justifyContent: 'center',
    paddingVertical: moderateScale(18, 0.6),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(16, 0.6),
  },
  btnLeft: {
    color: Color.black,
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: moderateScale(30, 0.6),
    backgroundColor: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: moderateScale(-20, 0.3),
  },
  btnRight: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: moderateScale(30, 0.6),
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(-20, 0.3),
  },
});

export default Walkthrough;
