/**
 * Created by zues on 2016/9/4.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, PixelRatio, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Net from './Net';

export default class MyImagePicker extends Component {
    constructor(props){
        super(props);
        this.state ={
            avatarSource: null,
            videoSource: null,
            imgUrl: null,
            filename: null,
        }
    }

     selectPhotoTapped() {
         const options = {
             quality: 1.0,
             maxWidth: 500,
             maxHeight: 500,
             storageOptions: {
                 skipBackup: true
             },
             title:'选择图片',
             chooseFromLibraryButtonTitle: '相册',
             takePhotoButtonTitle:'拍照',
             cancelButtonTitle:'取消',
         };

         ImagePicker.showImagePicker(options, (response) => {
             console.log('Response = ', response);

             this.setState({
                 imgUrl:response.uri,
                 fileName:response.fileName,
             });
             if (response.didCancel) {
                 console.log('User cancelled photo picker');
             }
             else if (response.error) {
                 console.log('ImagePicker Error: ', response.error);
             }
             else if (response.customButton) {
                 console.log('User tapped custom button: ', response.customButton);
             }
             else {
                 var source;

                 // You can display the image using either:
                 source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                 // Or:
                 // if (Platform.OS === 'android') {
                 //   source = {uri: response.uri, isStatic: true};
                 // } else {
                 //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                 // }

                 this.setState({
                     avatarSource: source
                 });
             }
         });
     }

     selectVideoTapped() {
         const options = {
             title: 'Video Picker',
             takePhotoButtonTitle: 'Take Video...',
             mediaType: 'video',
             videoQuality: 'medium'
         };

         ImagePicker.showImagePicker(options, (response) => {
             console.log('Response = ', response);

             if (response.didCancel) {
                 console.log('User cancelled video picker');
             }
             else if (response.error) {
                 console.log('ImagePicker Error: ', response.error);
             }
             else if (response.customButton) {
                 console.log('User tapped custom button: ', response.customButton);
             }
             else {
                 this.setState({
                     videoSource: response.uri
                 });
             }
         });
     }

    uploadAvatar(){
        new Net().postFile('/student/upload',this.state.imgUrl,this.state.filename)
            .then((data) => {
                console.log(data.status);
            });
    }

     render() {
         return (
             <View style={styles.container}>
                 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                     <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                         { this.state.avatarSource === null ? <Text>头像上传</Text> :
                             <Image style={styles.avatar} source={this.state.avatarSource} />
                         }
                     </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                     <View style={[styles.avatar, styles.avatarContainer]}>
                         <Text>Select a Video</Text>
                     </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={this.uploadAvatar.bind(this)}><Text>头像上传</Text></TouchableOpacity>

                 { this.state.videoSource &&
                 <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
                 }
             </View>
         );
     }

 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});