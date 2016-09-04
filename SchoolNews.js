/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Toolbar from './Toolbar';
import NewsItems from './NewsItem';
export default class SchoolNews extends Component {
    render() {
        return (
            <View>
                <Toolbar/>
                <NewsItems style={{marginTop:20}}/>
                <NewsItems style={{margin:10}}/>
                <NewsItems style={{margin:10}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});