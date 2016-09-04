/**
 * Created by zues on 2016/9/4.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class myImagePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name:'fb', title:'Choose Photo from Fackbook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
    }

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
        console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // You can display the image using either data...
            const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

            // or a reference to the platform specific asset location
            if (Platform.OS === 'ios') {
                const source = {uri: response.uri.replace('file://', ''), isStatic: true};
            } else {
                const source = {uri: response.uri, isStatic: true};
            }

            this.setState({
                avatarSource: source
            });
        }
    });

    render(){
        return(
            <View>
                <Image source={this.state.avatarSource} style={{height:deviceHeight,width:deviceWidth}} />
            </View>
        );
    }

    // Launch Camera:
    ImagePicker.launchCamera(options, (response)  => {
        // Same code as in above section!
    });

    // Open Image Library:
    ImagePicker.launchImageLibrary(options, (response)  => {
        // Same code as in above section!
    });
}