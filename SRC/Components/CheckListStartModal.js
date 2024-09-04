import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';

const CheckListStartModal = ({
  setModalVisible,
  modal_visible,
  data,
  onpressItem,
}) => {
  console.log(JSON.stringify(data, null, 2), 'dataaaaaaaaaaaaaaa');
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
          width: windowWidth * 0.95,
          backgroundColor: 'grey',
          alignSelf: 'center',
          paddingVertical: moderateScale(20, 0.6),
        }}>
        <View style={styles.header}>
          <CustomText style={styles.headerText}>
            Select an one CheckList
          </CustomText>
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{marginTop: moderateScale(30, 0.6)}}
          renderItem={({item, inder}) => {
            return (
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => onpressItem(item)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <CustomText
                      style={{fontSize: moderateScale(13, 0.6)}}
                      isBold>
                      CheckList Name:{' '}
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(13, 0.6),
                      }}>
                      {item?.name}
                    </CustomText>
                  </View>
                  <Icon
                    name="right"
                    as={AntDesign}
                    size={moderateScale(20, 0.3)}
                    color={'black'}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default CheckListStartModal;

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
    position: 'absolute',
    top: 0,
  },
  card: {
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    height: moderateScale(40, 0.6),
    marginTop: moderateScale(20, 0.6),
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
});
