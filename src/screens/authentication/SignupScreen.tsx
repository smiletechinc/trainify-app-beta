import React, { FunctionComponent, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View, Image, Platform } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Custom UI components.
import { COLORS, SCREEN_WIDTH } from '../../constants';
import {TextInput} from '../../global-components/input';
import SignupFooterComponent from './components/SignupFooterComponent';
import PlayingStyle from './components/YourPlayingStyle';

// Custom Styles
import globalStyles from '../../global-styles';
import styles from './styles';

const signupMainImage = require('../../assets/images/small-logo.png');

const SigninContainer: FunctionComponent = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [handStyle, setHandStyle] = useState<number>(0);
  const [height, setHeight] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  
  return(
    <View style={styles.login_main_container}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 55,
        }}
        
      >
        <View style={{paddingHorizontal: SCREEN_WIDTH * 0.05}}>
          <TouchableOpacity
            style={styles.login_back_icon}
            onPress={() => {
              navigation.goBack();
            }}
          >

          </TouchableOpacity>
        </View>
        <View style={{marginTop: 47, paddingHorizontal: SCREEN_WIDTH * 0.05,}}>
          <View style={{alignItems: 'center'}}>
            <AutoHeightImage 
              source={signupMainImage}
              width={163}
            />
          </View>
          <Text style={[globalStyles.title, globalStyles.bold, {color: COLORS.medium_dark_blue, marginTop: 16,}]}>SIGN UP</Text>
          <TextInput
            value={email}
            placeholder="Email"
            placeholderTextColor={COLORS.dark_black}
            onChangeText={(value: string) => {
              setEmail(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 42,
            }}
          />
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setPassword(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          <TextInput
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setConfirmPassword(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          <PlayingStyle 
            handStyle={handStyle}
            setHandStyle={setHandStyle}
          />
          <TextInput
            value={height}
            placeholder="height"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setHeight(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          <TextInput
            value={birthday}
            placeholder="Birthday"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setBirthday(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          <TextInput
            value={location}
            placeholder="Location"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setLocation(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          <TextInput
            value={rating}
            placeholder="Rating"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setRating(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          <TextInput
            value={nationality}
            placeholder="Nationality"
            placeholderTextColor={COLORS.dark_black}
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setNationality(value);
            }}
            inputStyles={{
              fontWeight: 'bold',
            }}
            inputParentStyles={{
              marginTop: 29,
            }}
          />
          
          <SignupFooterComponent 
            onPress={()=>{
              console.log('pressed.');
            }}
          />
        </View>

      </KeyboardAwareScrollView>
    </View>
  )
};
export default SigninContainer;
