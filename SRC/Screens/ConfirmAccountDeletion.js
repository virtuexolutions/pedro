import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import { Icon } from 'native-base'
import Color from '../Assets/Utilities/Color'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText'
import CustomButton from '../Components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../Axios/AxiosInterceptorFunction'
import CustomImage from '../Components/CustomImage'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import { setSelectedRole, setUserData } from '../Store/slices/common'
import { setUserLogoutAuth, setUserToken } from '../Store/slices/auth'

const ConfirmAccountDeletion = ({navigation, route}) => {
    const dispatch = useDispatch();
    const data= route?.params?.data;
    const token = useSelector(state => state.authReducer.token);
    const userData = useSelector(state => state.commonReducer.userData);
    const [email, setEmail] = useState(userData?.email);

    const [isLoading, setIsLoading] = useState(false);
    
    const DeleteAccount = async () =>{
        const url="data-deletion/confirm";
        const body=  {
            email: data?.email,
            verification_code: data?.code,
            confirm_deletion: true
          };
        setIsLoading(true);
        const response = await Post(url, body, apiHeader(token));
        setIsLoading(false);
        console.log("🚀 ~ requestAccountDeletion ~ response:", response?.data)

        if(response != undefined){ 
            dispatch(setUserData({}));
            dispatch(setUserLogoutAuth());
            dispatch(setSelectedRole(""));
            Alert.alert("Account Deleted");
        }

    }
  return (
     <>
     <CustomStatusBar
       backgroundColor={Color.white}
       barStyle={'dark-content'}    
     />
           <ImageBackground
        style={{
          height: windowHeight,
          width: windowWidth,
          alignItems:"center",
          justifyContent:"center"
        }}
        source={
          // SelecteduserRole == 'User'
          //   ? require('../Assets/Images/bg3.png')
          //   : SelecteduserRole == 'vendor'
          //   ?
          require('../Assets/Images/bg2.png')
          // : require('../Assets/Images/bg1.png')
        }>
        <TouchableOpacity activeOpacity={0.8} style={styles.backbtn}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.black}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
     <View style={styles.imageContainer}>

        <CustomImage
        source={require("../Assets/Images/warning.png")}
        style={styles.image}
        />
        </View>
         
         <CustomText 
         style={styles.heading}
         children={"Are You Sure?"}
         isBold
         />
         <CustomText 
         style={styles.heading}
         children={"You Wanna delete your account ?"}
         isBold
         />
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
            backgroundColor={'#347c67'}
            marginTop={moderateScale(15, 0.6)}
            color={Color.white}
            placeholderColor={Color.white}
            borderRadius={moderateScale(25, 0.3)}
          />
            

        <View style={styles.actions}>
        <CustomButton
            text={'No'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            isBold={true}
            borderWidth={2}
            marginTop={moderateScale(10, 0.3)}
            fontSize={moderateScale(17, 0.6)}
            borderColor={Color.white}
            onPress={() => {
            //   Login();
            // requestAccountDeletion()
            }}
            bgColor={"transparent"}
            borderRadius={moderateScale(30, 0.3)}
          />
        <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Yes'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            isBold={true}
            marginTop={moderateScale(10, 0.3)}
            fontSize={moderateScale(17, 0.6)}
            onPress={() => {
                    DeleteAccount()
            }}
            bgColor={"#fa2930"}
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
        

        </ImageBackground>
     </>
  )
}

export default ConfirmAccountDeletion

const styles = StyleSheet.create({
    backbtn: {
        position: 'absolute',
        top: moderateScale(20, 0.3),
        left: moderateScale(20, 0.3),
        height: moderateScale(30, 0.3),
        width: moderateScale(30, 0.3),
        borderRadius: moderateScale(5, 0.3),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
      },
      heading:{
        fontSize:moderateScale(22,0.2),
        color:Color.white
      },
      actions:{
        flexDirection:"row",
        gap:scale(10),
        marginTop:verticalScale(20),
      },
      imageContainer:{
        width: windowWidth * 0.45,
        height:windowWidth * 0.45,
        overflow:"hidden"
      },
      image:{
        width:"100%",
        height:"100%"
      }
})