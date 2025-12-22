import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import { Icon } from 'native-base';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({isSignUp=true}) => {
  const navigation= useNavigation()
  return (
    <Pressable
    onPress={() => {
      navigation.goBack();
    }}
    style={{
      height: moderateScale(35, 0.3),
      width: moderateScale(35, 0.3),
      borderRadius: moderateScale(8, 0.3),
      marginHorizontal: moderateScale(10, 0.3),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isSignUp ? "transparent" : Color.white,
      borderColor:Color.white,
      borderWidth:1,
    }}>
    <Icon
              name={'arrowleft'}
              as={AntDesign}
              size={moderateScale(22, 0.3)}
          
      color={
        isSignUp ? Color.white :
        Color.black
      }
      onPress={() => {
        navigation.goBack();
      }}
     
    />
  </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})