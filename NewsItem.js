import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, ListView, Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class NewsItem extends Component {
    render() {
        return (
            <View>
                <ListView
                    renderRow={this.myRenderRow.bind(this)}
                >

                </ListView>
            </View>
        );
    }

    myRenderRow(){
        return (
            <View style={styles.container}>
                <Text>今日简讯</Text>

                <Image />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});