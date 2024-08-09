import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'native-base';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';
import ImagePickerModal from './ImagePickerModal';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import TimingModal from './TimingModal';
import { useDispatch, useSelector } from 'react-redux';
import { setworkUpload } from '../Store/slices/common';

const WorkUploadModal = ({
  title,
  listArray,
  ModalVisible,
  setModalVisible,
  setTimingModal,
  data,
  uploadModal,
  setUploadModal,
  setData,
}) => {
  const [multiImages, setMultiImages] = useState([]);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [isvisible, setIsVisible] = useState(false);
  const dispatch =useDispatch()
  const workdone = useSelector(state=>state.commonReducer.workUpload) 
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={uploadModal}
      onBackdropPress={() => {
        setUploadModal(false);
      }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: moderateScale(10, 0.3),
          width: windowWidth * 0.9,
          backgroundColor: 'white',
          alignItems: 'center',
          // padding:moderateScale(10,.6),
          // height: windowHeight * 0.6,
          paddingBottom: moderateScale(10, 0.3),
        }}>
        <View style={styles.header}>
          <CustomText style={styles.headerText}>
            Please upload the completed work
          </CustomText>
        </View>

        <View style={styles.imagesContainer}>
          <FlatList
            horizontal
            data={multiImages}
            showsHorizontalScrollIndicator={false}
            style={{
              flexGrow: 0,
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    styles.addImageContainer,
                    {borderWidth: 0, borderRadius: moderateScale(10, 0.3)},
                  ]}>
                  <Icon
                    name={'close'}
                    as={FontAwesome}
                    color={Color.themeColor}
                    size={moderateScale(12, 0.3)}
                    style={{
                      position: 'absolute',
                      right: 1,
                      top: 1,
                      zIndex: 1,
                    }}
                    onPress={() => {
                      let newArray = [...multiImages];
                      newArray.splice(index, 1);
                      setMultiImages(newArray);
                    }}
                  />
                  <CustomImage
                    source={{uri: item?.uri}}
                    resizeMode={'stretch'}
                    style={{
                      width: moderateScale(70, 0.3),
                      height: moderateScale(80, 0.3),
                    }}
                  />
                </View>
              );
            }}
          />

          <View style={styles.addImageContainer}>
            <Icon
              name={'plus'}
              as={AntDesign}
              color={Color.themeColor}
              size={moderateScale(30, 0.3)}
              onPress={() => {
                setShowMultiImageModal(true);
              }}
            />
          </View>
        </View>
        {/* <FlatList
          bounces={false}
          style={{
            width: '100%',
          }}
          data={listArray}
          renderItem={({item, index}) => {
            return (
              <CustomText
                onPress={() => {
                  setData(item);
                  setIsModalVisible(false);
                }}
                style={[
                  styles.listData,
                  data == item && {backgroundColor: Color.themePink},
                ]}>
                {item}
              </CustomText>
            );
          }}
        /> */}
        <CustomButton
          text={'submit'}
          textColor={Color.white}
          width={windowWidth * 0.75}
          height={windowHeight * 0.07}
          marginTop={moderateScale(25, 0.3)}
          onPress={() => {
            setUploadModal(false);
            setMultiImages([]);
            dispatch(setworkUpload(true))
          }}
          isGradient
          bgColor={Color.vendorColor}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
          disabled={multiImages?.length > 0 ? false : true}
        />
      </View>
      <TimingModal
        isModalVisible={isvisible}
        setIsModalVisible={setIsVisible}
        fromuploadwork={true}
      />
      <ImagePickerModal
        show={showMultiImageModal}
        setShow={setShowMultiImageModal}
        setMultiImages={setMultiImages}
        // setFileObject={setImage}
      />
    </Modal>
  );
};

export default WorkUploadModal;

const styles = StyleSheet.create({
  headerText: {
    color: Color.white,
    fontSize: moderateScale(15, 0.6),
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    backgroundColor: Color.themeGreen,
  },
  listData: {
    height: windowHeight * 0.05,
    borderBottomWidth: 1,
    borderColor: Color.themeLightGray,
    fontSize: moderateScale(15, 0.3),
    color: Color.black,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
  },
  imagesContainer: {
    marginTop: moderateScale(10, 0.3),
    width: windowWidth * 0.9,
    marginLeft: moderateScale(10, 0.3),
    flexWrap: 'wrap',
    flexDirection: 'row',
    // borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // // borderRadius: moderateScale(5, 0.6),
    // // borderColor: Color.green,
  },
  addImageContainer: {
    width: windowWidth * 0.19,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 2,
    borderColor: Color.blue,
    height: windowHeight * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    // marginTop: moderateScale(5, 0.3),
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    overflow: 'hidden',
  },
});
