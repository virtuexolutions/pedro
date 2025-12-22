import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import CustomStatusBar from '../Components/CustomStatusBar'
import Header from '../Components/Header'
import Color from '../Assets/Utilities/Color'
import {WebView} from "react-native-webview";
import { windowWidth } from '../Utillity/utils'
import { scale, verticalScale } from 'react-native-size-matters'
import BackButton from '../Components/BackButton'
const Signup = () => {
  return (
    <>
    {/* <CustomStatusBar 
    
    backgroundColor={Color.black}
    /> */}
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
  paddingVertical:verticalScale(5),
  paddingHorizontal:scale(10),
  backgroundColor:Color.black
 }
})