import React, {useEffect, useState, FunctionComponent} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import {DemoTitle, DemoButton, DemoResponse} from '../components';
import {addVideoService} from '../../../../services/servePracticeServices';
import {uploadVideoService} from '../../../../services/mediaServices';
import * as ImagePicker from 'react-native-image-picker';
import {add} from '@tensorflow/tfjs-core/dist/engine';
import HeaderWithText from '../../../../global-components/header/HeaderWithText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles_external from '../../styles';
import {setStatusBarNetworkActivityIndicatorVisible} from 'expo-status-bar';
import CameraRoll from '@react-native-community/cameraroll';

const RNFS = require('react-native-fs');
/* toggle includeExtra */
const includeExtra = true;

type Props = {
  navigation: any;
};
const UploadServePracticeScreen: FunctionComponent<Props> = props => {
  const {navigation} = props;
  const [response, setResponse] = React.useState<any>(null);

  useEffect(() => {
    if (response) {
      console.log('response: ', response);
      console.log('Video Assests:', response.assets[0]);
      // addVideoToFirebase();
      navigation.navigate('VideoPlayerContainer', {video: response.assets[0]});
    }
  }, [response]);

  const addVideoSuccess = (video?: any) => {
    console.log('Added: ', JSON.stringify(video));
    if (response) {
      navigation.navigate('VideoPlayerContainer', {video: response.assets[0]});
    }
    if (video) {
      Alert.alert('Trainify', `Video added successfully.`);
    }
  };

  const addVideoFailure = (error?: any) => {
    console.log('Error: ', JSON.stringify(error));
    if (error) {
      Alert.alert('Trainify', `Error in adding video.`);
    }
  };

  const addVideoToFirebase = () => {
    // uploadVideoService(response, addVideoSuccess, addVideoFailure);
    addVideoService(response.assets[0], addVideoSuccess, addVideoFailure);
  };

  // const loadVideo = (e) => {

  // }

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  return (
    <SafeAreaView style={styles_external.main_view}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <HeaderWithText text="Upload Serve Practice" navigation={navigation} />

        <ScrollView>
          <View style={styles.buttonContainer}>
            {actions.map(({title, type, options}) => {
              return (
                <DemoButton
                  key={title}
                  onPress={() => onButtonPress(type, options)}>
                  {title}
                </DemoButton>
              );
            })}
          </View>
          <DemoResponse>{response}</DemoResponse>

          {response?.assets &&
            response?.assets.map(({uri}) => (
              <View key={uri} style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{width: 200, height: 200}}
                  source={{uri: uri}}
                />
              </View>
            ))}
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default UploadServePracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
  },

  cameraTypeSwitcher: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
