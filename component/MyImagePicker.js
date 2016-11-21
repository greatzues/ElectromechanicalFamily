import React, {Component} from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';


import ImagePicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'skyblue',
        marginBottom: 10,
        padding:5,
        borderRadius:5,
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default class MyImagePicker extends Component {

    constructor(props) {
        super(props);
        this.state={
            image: null,
            images: null,
        }
    }

    pickSingle(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                image:image.path,
            })
        }).catch(e => {
            console.log('Error:'+e);
        });
    }

    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            this.setState({
                image: null,
                images: images.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            });
        }).catch(e => alert(e));
    }

    pickCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                src:image.path,
            })
        });
    }

    pickClean(){
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pickSingle.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.text}>选择单张照片</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}