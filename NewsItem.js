import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class NewsItem extends Component {
    render() {
        return (
                <View>
                    <WebView
                        source={{uri: 'https://github.com/facebook/react-native'}}
                        style={{marginTop: 20}}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b5998',
    },
});