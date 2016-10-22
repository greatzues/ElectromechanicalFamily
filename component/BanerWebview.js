/**
 * Created by zues on 2016/10/19.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Navigator, TouchableOpacity, WebView } from 'react-native';
var deviceHeight = Dimensions.get('window').height;
export default class BanerWebview extends Component{
    render(){
        return(
            <WebView
                style={{
                    flex:1,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    height: deviceHeight,
                }}
                source={{uri: this.props.uri}}
                scalesPageToFit={true}
            />
        );
    }
}