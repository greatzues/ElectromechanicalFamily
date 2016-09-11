/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View , ScrollView, PanResponder
} from 'react-native';

import Toolbar from './component/Toolbar';
import NewsItems from './NewsItem';
export default class SchoolNews extends Component {
    constructor(props){
        super(props);
        this.state = {
            hideToolbar:false,
        };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture:(evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                console.log('开始手势操作');

            },

            onPanResponderMove: (evt, gestureState) => {
                console.log('正在滑动');
                console.log('垂直滑动了：'+ gestureState.moveX + '个距离');
                console.log('滑动的速度vx：'+ gestureState.vx);
                console.log('滑动的速度vy：'+ gestureState.vy);
                console.log('滑动的距离dx：'+ gestureState.dx);
                console.log('滑动的距离dy：'+ gestureState.dy);
                console.log('滑动的初始位置x0：'+ gestureState.x0);
                console.log('滑动的初始位置y0：'+ gestureState.y0);

            },
            onPanResponderRelease: (evt, gesture) => {
                console.log('释放手势');
            }
        });
    }

    render() {
        return (
                <ScrollView style={styles.container} {...this.panResponder.panHandlers}>
                    <Toolbar/>
                    <NewsItems />
                    <NewsItems />
                    <NewsItems />
                    <NewsItems />
                    <NewsItems />
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcd3d3',
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