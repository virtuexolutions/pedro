import React from 'react';
import {View} from 'react-native';
import {windowHeight} from '../Utillity/utils';
import CustomStatusBar from './CustomStatusBar';
import Header from './Header';

const ScreenBoiler = props => {
  const {
    navigation,
    showHeader,
    statusBarBackgroundColor,
    statusBarContentStyle,
    onPressSearch,
    onPressSearchInput,
    title,
    titleColor,
    showBack,
    showDrawer,
    useDebounce,
    headerIconStyle,
    children,
    headerColor,
    headerHeight,
    close,
    navigateTO,
    headerType,
    showList,
    Notify,
    hideUser
  } = props;

  return (
    <>
      <CustomStatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarContentStyle}
      />
      {showHeader && (
        <Header
          navigation={navigation}
          title={title}
          showBack={showBack}
          useDebounce={useDebounce}
          iconStyle={headerIconStyle}
          showDrawer={showDrawer}
          headerColor={headerColor}
          headerHeight={headerHeight}
          close={close}
          titleColor={titleColor}
          navigateTO={navigateTO}
          headerType={headerType}
          showList={showList}
          Notify={Notify}
          hideUser={hideUser}
        />
      )}
      {children}
    </>
  );
};

export default ScreenBoiler;
