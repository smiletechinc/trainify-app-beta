import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';

import {COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from '../../../constants';
import HeaderWithText from '../../../global-components/header/HeaderWithText';
// import VideoRecorder from 'react-native-beautiful-video-recorder';

import styles from '../styles';
import globalStyles from '../../../global-styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const recordIcon = require('../../../assets/images/record-icon.png');


const RecordPracticeContainer: FunctionComponent = ({ navigation }) => {
  // const navigation = useNavigation();
  useEffect(() => {
  });
  // const start = () => {
  //   // 30 seconds
  //   setShowVideoRecorder(true);
  //   videoRecorder.open({ maxLength: 5 },(data) => {
  //     console.log('captured data', data);
  //   });
  // }
  
  
    return(
      <SafeAreaView style={styles.main_view}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <HeaderWithText
            text = "RECORD LEFT-HANDED SERVE"
            hideProfileSection = {true}
            navigation={navigation}
          />
         
        </KeyboardAwareScrollView>
        
      </SafeAreaView>
    )

};
export default RecordPracticeContainer;
