import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import RecordScreen from 'react-native-record-screen';

import HeaderWithText from '../../../../global-components/header/HeaderWithText';

import styles from '../../styles';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from './../../../../context/auth-context';

const recordIcon = require('../../../../assets/images/record_icon_image.png');
const analysisIcon = require('../../../../assets/images/analysis_icon.png');

type Props = {
  navigation: any;
};
const ServePracticeContainer: FunctionComponent<Props> = ({navigation}) => {
  const {authUser, setAuthUser} = React.useContext(AuthContext);
  const {playerstyle} = authUser ? authUser : '';
  const startRecording = () => {
    RecordScreen.startRecording({mic: false}).catch(error =>
      console.error(error),
    );
  };
  const stopRecording = async () => {
    const res = await RecordScreen.stopRecording().catch(error =>
      console.warn(error),
    );
    if (res) {
      const url = res.result.outputURL;
      console.log('Recording detials:', JSON.stringify(res));
      console.log('REOCORDING STOPPED: ', url);
    }
  };
  return (
    <SafeAreaView style={styles.main_view}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <HeaderWithText text="Serve Practice" navigation={navigation} />

        {playerstyle === 'LeftHanded' ? (
          <View style={{marginTop: 100}}>
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => {
                navigation.navigate('App4', {
                  title: 'RECORD LEFT-HANDED SERVE',
                });
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  backgroundColor: '#EB5757',
                  borderColor: '#EB5757',
                  display: 'flex',
                  flex: 1,
                  height: 150,
                  paddingBottom: 8,
                }}>
                <View style={{marginLeft: 10}}>
                  <Image
                    source={recordIcon}
                    style={{
                      marginLeft: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 40,
                    }}
                  />
                  <Text style={styles.record_and_upload_text}>
                    Record LEFT-Handed Serve
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginTop: 150}}>
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => {
                navigation.navigate('App4', {
                  title: 'RECORD RIGHT-HANDED SERVE',
                });
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  backgroundColor: '#EB5757',
                  borderColor: '#EB5757',
                  display: 'flex',
                  flex: 1,
                  height: 150,
                  paddingBottom: 8,
                }}>
                <View style={{marginLeft: 10}}>
                  <Image
                    source={recordIcon}
                    style={{
                      marginLeft: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 40,
                    }}
                  />
                  <Text style={styles.record_and_upload_text}>
                    Record RIGHT-Handed Serve
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={{marginTop: 50}}>
          <TouchableOpacity
            activeOpacity={0.8}
            delayPressIn={0}
            onPress={() => {
              navigation.navigate('AnalysisGridScreen', {
                title: 'Analysis Report',
              });
            }}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 30,
                backgroundColor: '#F2994A',
                borderColor: '#F2994A',
                display: 'flex',
                flex: 1,
                height: 150,
                paddingBottom: 16,
              }}>
              <View style={{marginLeft: 10}}>
                <Image
                  source={analysisIcon}
                  style={{
                    marginLeft: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40,
                  }}
                />
                <Text style={styles.record_and_upload_text}>
                  Analysis Report
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default ServePracticeContainer;
