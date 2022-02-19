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
import { AuthContext } from './../../../context/auth-context';

const recordIcon = require('../../../assets/images/record-icon.png');
const uploadIcon = require('../../../assets/images/upload-service.png');
const analysisIcon = require('../../../assets/images/analysis-icon.png');

const ServePracticeContainer: FunctionComponent = ({ navigation }) => {

  const { authUser, setAuthUser } = React.useContext(AuthContext);
  const {playerstyle} = authUser ? authUser : "";

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
            text = "Serve Practice"
            navigation={navigation}
          />


          {playerstyle === "LeftHanded" ? <View
            style={{flexDirection: 'row', marginTop: 28,}}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={()=> {
                navigation.navigate('UploadPractice', {title:'Upload LEFT-Handed Serve'});
              }}
            >
              <AutoHeightImage source={uploadIcon} width={((SCREEN_WIDTH * 0.9) / 2) - 23} />
              <Text style={[globalStyles.medium, styles.record_and_upload_text]}>Upload LEFT-Handed Serve</Text>
            </TouchableOpacity>

            <TouchableOpacity
          activeOpacity={0.8}
          delayPressIn={0}
          style={{
            marginLeft: 23,
          }}
          onPress={()=> {
            // navigation.navigate('RecordPractice');
            navigation.navigate('UsamaCameraContainer', {title:'RECORD LEFT-HANDED SERVE'});
          }}
        >
          <AutoHeightImage source={recordIcon} width={((SCREEN_WIDTH * 0.9) / 2) - 23} />
          <Text style={[globalStyles.medium, styles.record_and_upload_text]}>Record LEFT-Handed Serve</Text>
        </TouchableOpacity>

          </View>
        :
        <View
        style={{flexDirection: 'row', marginTop: 28,}}
      >
                    <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={()=> {
                navigation.navigate('UploadPractice', {title:'Upload RIGHT-Handed Serve'});
              }}
            >
              <AutoHeightImage source={uploadIcon} width={((SCREEN_WIDTH * 0.9) / 2) - 23} />
              <Text style={[globalStyles.medium, styles.record_and_upload_text]}>Upload RIGHT-Handed Serve</Text>
            </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          delayPressIn={0}
          style={{
            marginLeft: 23,
          }}
          onPress={()=> {
            // navigation.navigate('RecordPractice');
            // navigation.navigate('TensorCameraContainer', {title:'RECORD RIGHT-HANDED SERVE'});
            navigation.navigate('UsamaCameraContainer', {title: 'RECORD RIGHT-HANDED SERVE'})
            
          }}
        >
          <AutoHeightImage source={recordIcon} width={((SCREEN_WIDTH * 0.9) / 2) - 23} />
          <Text style={[globalStyles.medium, styles.record_and_upload_text]}>Record RIGHT-Handed Serve</Text>
        </TouchableOpacity>
      </View>
        }

          <View
            style={{flexDirection: 'row', marginTop: 18,}}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={()=> {
                // navigation.navigate('ServePractice');
              }}
            >
              <AutoHeightImage source={analysisIcon} width={((SCREEN_WIDTH * 0.9) / 2) - 23} />
              <Text style={[globalStyles.medium, styles.record_and_upload_text]}>Analysis Reports</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 400}}>
          {/* <VideoRecorder
            ref={(ref) => { setVideoRecorder(ref); }}
            cameraOptions={{}}
            durationTextStyle={styles.video_duration_text}
            buttonCloseStyle={{
              bottom: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 10,
              left: (SCREEN_WIDTH / 2) - 23,
            }}
          /> */}
        </View>
        </KeyboardAwareScrollView>
        
      </SafeAreaView>
    )

};
export default ServePracticeContainer;