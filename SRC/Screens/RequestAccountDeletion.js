import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Header from '../Components/Header'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import CustomButton from '../Components/CustomButton'
import CustomText from '../Components/CustomText'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'

const RequestAccountDeletion = ({navigation, route}) => {
    const token = useSelector(state => state.authReducer.token);
    const userData = useSelector(state => state.commonReducer.userData);
    const [email, setEmail] = useState(userData?.email);

    const [isLoading, setIsLoading] = useState(false);
    
    const requestAccountDeletion = async () =>{
    //    return navigation.navigate("VerifyNumber", {
    //         data: {email:"user@gmail.com"},
    //         fromAccountDeletion : true})
        const url="data-deletion/request";
        const body={
            email:email,
        };
        setIsLoading(true);
        const response = await Post(url, body, apiHeader(token));
        setIsLoading(false);
    //   return  console.log("🚀 ~ requestAccountDeletion ~ response:", response?.data)

        if(response != undefined){ 

            Alert.alert(response?.data?.message);
            navigation.navigate("VerifyNumber", {
                data: response?.data?.data,
                fromAccountDeletion : true})

        }

    }
  return (
    <>
    <CustomStatusBar
      backgroundColor={Color.black}
      barStyle={'light-content'}
    />
          <Header
        //   showBack
        //   hideUser={true}
            showList={true}
            title={' '}
            style={{
                paddingVertical:verticalScale(20),
            }}
            // Ismenu={true}
            // Isme
            headerColor={["#204639cf", "#204639ec"]}
          />
    <ImageBackground
      style={{
        height: windowHeight * 0.92,
        // flex: 1,
        // justifyContent:"center",
        alignItems: 'center',
      }}
      resizeMode={'stretch'}
      source={
        require('../Assets/Images/bg2.png')
      }>
        <CustomText
        children={"Request Account Deletion"}
        style={styles.heading}
        isBold
        />
        <CustomText
        children={"We respect your privacy and your right to control your personal data. If you wish to permanently delete your account and all associated data from our system, please submit your request below."}
        style={styles.text1}
        />
        {/* <View style={styles.warningBox}>

        <CustomText
        children={"This action is permanent and irreversible. Once confirmed, the following data will be permanently deleted:"}
        style={styles.text2}
        />

        <CustomText
        children={"We respect your privacy and your right to control your personal data. If you wish to permanently delete your account and all associated data from our system, please submit your request below."}
        style={styles.text3}
        />
        </View> */}

        <TextInputWithTitle
            titleText={'Enter your Email'}
            secureText={false}
            placeholder={'Enter your Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={verticalScale(25)}
            color={Color.black}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Continue to Verification'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            isBold={true}
            marginTop={moderateScale(10, 0.3)}
            fontSize={moderateScale(17, 0.6)}
            onPress={() => {
            //   Login();
            requestAccountDeletion()
            }}
            bgColor={Color.black}
            borderRadius={moderateScale(30, 0.3)}
          />
      </ImageBackground>
      </>
  )
}

export default RequestAccountDeletion

const styles = StyleSheet.create({
    text1:{
        marginTop:verticalScale(10),
        width: windowWidth * 0.85,
        color:Color.white,
        fontSize:moderateScale(14,0.2),
        textAlign:"center"
    },
    warningBox:{
        width: windowWidth * 0.85,
        // color:"#f6dba2",
        // fontSize:moderateScale(14,0.2),
        // textAlign:"justify",
        borderWidth:1,
        borderColor:"#f6dba2",
        paddingHorizontal:scale(8)
    },
    heading:{
        marginTop:windowHeight * 0.2,
        color:Color.white,
        fontSize:moderateScale(24,0.3)
    },
    text2:{
        // width: windowWidth * 0.85,
        color:Color.white,
        fontSize:moderateScale(14,0.2),
        textAlign:"justify",
        fontWeight:"bold"
        // borderWidth:1,
        // borderColor:"#f6dba2",
        // paddingHorizontal:scale(8)
    },
    text3:{
        // width: windowWidth * 0.85,
        color:"#f6dba2",
        fontSize:moderateScale(14,0.2),
        textAlign:"justify",
        // borderWidth:1,
        // borderColor:"#f6dba2",
        // paddingHorizontal:scale(8)
    },


})
