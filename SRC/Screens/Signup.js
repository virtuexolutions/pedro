import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import CustomStatusBar from '../Components/CustomStatusBar'
import Header from '../Components/Header'
import Color from '../Assets/Utilities/Color'
import {WebView} from "react-native-webview";
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import BackButton from '../Components/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
const Signup = () => {
  return (
    <>
    <CustomStatusBar 
   backgroundColor={Color.white}
   barStyle={'dark-content'}
    />
    {/* <Header/>
     */}
    <View style={styles.header}>
      <BackButton/>
    </View>
    <WebView
    source={{uri:"https://facilit8system.com/signup"}}
    />
    </>
  )
}

export default Signup

const styles = StyleSheet.create({
 header:{
  width: windowWidth,
  paddingVertical:moderateScale(10,.6),
  paddingHorizontal:moderateScale(10,.6),
  backgroundColor:Color.black,
 }
})