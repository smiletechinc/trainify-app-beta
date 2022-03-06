import React, {useEffect, useState, FunctionComponent} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Alert,
  Text,
  Button,
} from 'react-native';
import {DemoTitle, DemoButton, DemoResponse} from '../components';
import {addVideoService} from '../../../../services/servePracticeServices';
import {
  uploadPhotoService,
  uploadVideoService,
  getThumbnailURL,
} from '../../../../services/mediaServices';
import * as ImagePicker from 'react-native-image-picker';
import {add} from '@tensorflow/tfjs-core/dist/engine';
import HeaderWithText from '../../../../global-components/header/HeaderWithText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles_external from '../../styles';
import AnimatedLoader from 'react-native-animated-loader';
import {PrimaryButton} from '../../../../components/buttons';

/* toggle includeExtra */
const includeExtra = true;

type Props = {
  navigation: any;
};
const UploadServePracticeScreen: FunctionComponent<Props> = props => {
  const {navigation} = props;
  const [response, setResponse] = React.useState<any>(null);
  const [video, setVideo] = React.useState<any>(null);
  const [thumbnail, setThumbnail] = React.useState<any>(null);
  const [thumbnailURL, setThumbnailURL] = React.useState<string>(null);
  const [videoURL, setVideoURL] = React.useState<string>(null);
  const [status, setStatus] = useState('Processing media');
  const [loading, setLoading] = useState(false);

  let response_let = '';
  let thumbURL = '';
  let vidURL = '';

  // useEffect(() => {
  //   if(response){
  //     uploadVideoService(response, uploadVideoSuccess, uploadVideoFailure);
  //     // addVideoService(response.assets[0], addVideoSuccess, addVideoFailure);

  //     // addVideoToFirebase();
  //   }
  // }, [response]);

  const handleSelectVideo = (res?: any) => {
    if (res && res.assets) {
      setResponse(res);
      response_let = res;
      setVideo(res.assets[0]);
      proceedToUploadThumbnail(res);
      // proceedToUploadVideo();
    } else {
      Alert.alert('Could not fetch file.');
    }
  };

  const uploadThumbnailSuccess = (updatedResponse?: any) => {
    setLoading(false);
    console.log('upload thumbnail success: ', JSON.stringify(updatedResponse));
    // let thumbnailResponseData = updatedResponse.ref._location;
    setThumbnailURL(updatedResponse);
    thumbURL = updatedResponse;
    proceedToUploadVideo();

    // console.log('tempVideoData: ', videoData)
    // const tempVideUrl = updatedResponse.assets[0].uri;
    // const tempVideoData = {...videoData, fileUrl: tempVideUrl}
    // addVideoService(tempVideoData, addVideoSuccess, addVideoFailure);

    // if (response){
    //   navigation.navigate('VideoPlayerContainer', {video:response.assets[0]});
    // }
    // if (video) {
    //   Alert.alert("Trainify", `Video added successfully.`);
    // }
  };

  const uploadThubnailFailure = (error?: any) => {
    setLoading(false);
    setStatus('');
    console.log('Error: ', JSON.stringify(error));
    if (error) {
      Alert.alert('Trainify', `Error in adding video.`);
    }
  };

  const proceedToUploadThumbnail = newResponse => {
    setLoading(true);
    setStatus('Uploading thumbnail');
    const thumbnailURI =
      'file:///var/mobile/Containers/Data/Application/24B888DB-B776-4E4D-A328-459705E6087A/tmp/A5F48E77-EB56-4323-A801-AFD6E0F7C1E8.jpg';
    let tempResponse = newResponse.assets[0];

    let photoData = {...tempResponse, thumbnailURL: thumbnailURI};
    uploadPhotoService(
      photoData,
      uploadThumbnailSuccess,
      uploadThubnailFailure,
    );
  };

  const proceedToUploadVideo = () => {
    setLoading(true);
    if (response_let) {
      setStatus('Uploading video');
      const videoURI =
        'file:///var/mobile/Containers/Data/Application/24B888DB-B776-4E4D-A328-459705E6087A/tmp/A5F48E77-EB56-4323-A801-AFD6E0F7C1E8.jpg';
      let tempResponse = response_let.assets[0];
      let videoData = {...tempResponse, videoURL: videoURI};
      uploadVideoService(videoData, uploadVideoSuccess, uploadVideoFailure);
    } else {
      Alert.alert('Could not upload video');
      setLoading(false);
    }
  };

  const addVideoSuccess = (video?: any) => {
    setLoading(false);
    setStatus('Video added!');
    console.log('Added: ', JSON.stringify(video));

    let res = response_let.assets[0];
    const videoMetadata = {
      ...res,
      thumbnailURL: thumbURL,
      videoURL: videoURL,
    };
    console.log('videoMetadata, ', videoMetadata);
    navigation.navigate('VideoPlayerContainer', {video: videoMetadata});
    Alert.alert('Trainify', `Video added successfully.`);
  };
  const uploadVideoSuccess = (updatedResponse?: any) => {
    setLoading(false);
    Alert.alert('Video uploaded successfully');
    setVideoURL(updatedResponse);
    vidURL = updatedResponse;
    console.log('upload video success: ', JSON.stringify(updatedResponse));
    addVideoToFirebase();
    // let videoData = updatedResponse.ref._location;
    // console.log('tempVideoData: ', videoData)
    // const tempVideUrl = updatedResponse.assets[0].uri;
    // const tempVideoData = {...videoData, fileUrl: tempVideUrl}
    // addVideoService(tempVideoData, addVideoSuccess, addVideoFailure);

    // if (response){
    //   navigation.navigate('VideoPlayerContainer', {video:response.assets[0]});
    // }
    // if (video) {
    //   Alert.alert("Trainify", `Video added successfully.`);
    // }
  };

  const addVideoFailure = (error?: any) => {
    setLoading(false);
    console.log('Error: ', JSON.stringify(error));
    if (error) {
      Alert.alert('Trainify', `Error in adding video.`);
    }
  };
  const uploadVideoFailure = (error?: any) => {
    console.log('Error: ', JSON.stringify(error));
    if (error) {
      Alert.alert('Trainify', `Error in adding video.`);
    }
  };

  const addVideoToFirebase = () => {
    // uploadVideoService(response, addVideoSuccess, addVideoFailure);
    let res = response_let.assets[0];
    const videoMetadata = {
      ...res,
      thumbnailURL: thumbURL,
      videoURL: vidURL,
    };
    console.log('videoMetadata, ', videoMetadata);
    addVideoService(videoMetadata, addVideoSuccess, addVideoFailure);
  };

  // const loadVideo = (e) => {

  // }

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, handleSelectVideo);
    } else {
      ImagePicker.launchImageLibrary(options, handleSelectVideo);
    }
  }, []);

  return (
    <SafeAreaView style={styles_external.main_view}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 40,
        }}
        showsVerticalScrollIndicator={false}>
        <HeaderWithText
          text="Upload Serve Practice ~"
          navigation={navigation}
        />
        <AnimatedLoader
          visible={loading}
          overlayColor={'rgba(255, 255, 255, 0.75)'}
          source={require('./loader.json')}
          animationStyle={styles.lottie}
          speed={1}>
          <Text>{status}</Text>
          <Button title={'Cancel upload'} onPress={() => setLoading(false)} />
        </AnimatedLoader>

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
          <DemoResponse>
            {response && response?.assets && response.assets[0]}
          </DemoResponse>

          <DemoResponse>
            {thumbnailURL && `Thumbnail URL: ${thumbnailURL}`}
          </DemoResponse>

          <DemoResponse>{videoURL && `Video URL: ${videoURL}`}</DemoResponse>

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
  lottie: {
    width: 100,
    height: 100,
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
