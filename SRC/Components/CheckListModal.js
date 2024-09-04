import {FlatList, Icon} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import ImagePickerModal from './ImagePickerModal';
import TimingModal from './TimingModal';
import {Post} from '../Axios/AxiosInterceptorFunction';

const CheckListModal = ({
  setModalVisible,
  modal_visible,
  job_id,
  data,
  checklist_id,
}) => {
  const workdone = useSelector(state => state.commonReducer.workUpload);
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const [multiImages, setMultiImages] = useState([]);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [isvisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkListData, setCheckListData] = useState();
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState(null);
  const [newData, setNewData] = useState(
    data.checklist_items.map((item, index) => {
      return {
        ...item,
        answers: {
          rating: '',
          remarks: '',
        },
      };
    }),
  );

  const onPresSubmit = async () => {
    const url = `vendor/responce/${job_id}`;
    const apiBody = {
      location_id: job_id,
      checklist_id: data?.id,
      answers: newData.map(item => ({
        checklist_item_id: item.id,
        rating: item.answers.rating,
        remarks: item.answers.remarks,
      })),
    };
    console.log(JSON.stringify(apiBody, null, 2), 'boddddddddddyyyyyyyyyy');
    setIsLoading(true);
    const response = await Post(url, apiBody, apiHeader(token));
    console.log(response?.data?.message, '===========> reponse?.daaaaaaaaaaaaaataaaa');
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android' ?ToastAndroid.show(response?.data?.message,ToastAndroid.SHORT) :Alert.alert(response?.data?.message)
      setModalVisible(false);
    }
  };

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={modal_visible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: moderateScale(10, 0.3),
          width: windowWidth * 0.97,
          backgroundColor: 'white',
          height: windowHeight * 0.8,
          paddingBottom: moderateScale(10, 0.3),
        }}>
        <View style={styles.header}>
          <CustomText style={styles.headerText}>checklist</CustomText>
        </View>
        <FlatList
          data={newData}
          keyExtractor={item => item?.id}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(10, 0.6),
            paddingBottom: moderateScale(12, 0.6),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View key={item?.id} style={styles.card}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      backgroundColor: 'black',
                      borderRadius: 20,
                      position: 'absolute',
                      left: 0,
                      top: 18,
                    }}
                  />
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(13, 0.6),
                      paddingTop: moderateScale(10, 0.6),
                      width: '90%',
                    }}>
                    {item?.description}
                  </CustomText>
                </View>
                <View style={{marginLeft: moderateScale(15, 0.6)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: moderateScale(3, 0.6),
                      // justifyContent: 'space-between',
                    }}>
                    <CustomText
                      isBold
                      style={{
                        fontSize: moderateScale(13, 0.6),
                      }}>
                      rating :
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: moderateScale(3, 0.6),
                        justifyContent: 'space-between',
                        marginLeft: moderateScale(3, 0.6),
                      }}>
                      <TouchableOpacity
                        // onPress={() => setStatus('Green')}
                        onPress={() => {
                          setNewData(
                            prev => [...prev],
                            (newData[index].answers.rating = 'Green'),
                          );
                        }}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={[
                            styles.Circle,
                            {
                              backgroundColor: 'green',
                              borderWidth: 0,
                            },
                          ]}>
                          {item?.answers?.rating === 'Green' && (
                            <Icon
                              name={'check'}
                              as={Entypo}
                              size={moderateScale(15, 0.6)}
                              color={'white'}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setNewData(
                            prev => [...prev],
                            (newData[index].answers.rating = 'Yellow'),
                          );
                        }}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={[
                            styles.Circle,
                            {
                              backgroundColor: 'yellow',
                              borderWidth: 0,
                            },
                          ]}>
                          {item?.answers?.rating === 'Yellow' && (
                            <Icon
                              name={'check'}
                              as={Entypo}
                              size={moderateScale(15, 0.6)}
                              color={'white'}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setNewData(
                            prev => [...prev],
                            (newData[index].answers.rating = 'Red'),
                          );
                        }}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={[
                            styles.Circle,
                            {
                              backgroundColor: 'red',
                              borderWidth: 0,
                            },
                          ]}>
                          {item?.answers?.rating === 'Red' && (
                            <Icon
                              name={'check'}
                              as={Entypo}
                              size={moderateScale(15, 0.6)}
                              color={'white'}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(13, 0.6),
                    }}>
                    remarks :
                  </CustomText>
                  <View
                    style={{
                      width: Dimensions.get('window').width * 0.8,
                      height: Dimensions.get('window').height * 0.08,
                    }}>
                    <TextInput
                      multiline
                      onChangeText={text => {
                        setNewData(
                          prev => [...prev],
                          (newData[index].answers.remarks = text),
                        );
                      }}
                      value={item?.answers?.remarks}
                      backgroundColor={'#dfe1e6'}
                      placeholderColor={Color.themeLightGray}
                      borderRadius={moderateScale(15, 0.3)}
                      textAlign="left"
                      textAlignVertical="top"
                      style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'left',
                        paddingLeft: moderateScale(10, 0.6),
                        fontSize: moderateScale(12, 0.3),
                        color: 'black',
                      }}
                      placeholder="Add your remarks here"
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              'Submit'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.75}
          height={windowHeight * 0.07}
          marginTop={moderateScale(25, 0.3)}
          onPress={() => onPresSubmit()}
          isGradient
          bgColor={Color.vendorColor}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
          // disabled={multiImages?.length > 0 ? false : true}
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

export default CheckListModal;

const styles = StyleSheet.create({
  headerText: {
    color: Color.white,
    fontSize: moderateScale(18, 0.6),
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.97,
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
  Circle: {
    width: windowHeight * 0.025,
    height: windowHeight * 0.025,
    borderWidth: 1,
    marginHorizontal: moderateScale(5, 0.6),
    borderRadius: moderateScale(3, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(2, 0.6),
    marginRight: moderateScale(10, 0.6),
  },
  card: {
    backgroundColor: Color.white,
    // height: windowHeight * 0.2,
    marginTop: moderateScale(10, 0.6),
    borderRadius: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(12, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
