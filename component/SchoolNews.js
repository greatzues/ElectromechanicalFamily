/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View , ScrollView, PanResponder, Animated
} from 'react-native';
import Toolbar from './Toolbar';
import NewsItems from '../NewsItem';
import MyListView from './MyListView';

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
                var distenceY = gestureState.moveY-gestureState.y0;
                if(distenceY>0){
                    // this.setState({
                    //     hideToolbar:false,
                    // });
                    this.startAnimation();
                    console.log('向下划的距离：'+ distenceY);
                }else {
                    // this.setState({
                    //     hideToolbar:true,
                    // });
                    this.endAnimation();
                    console.log('向上划的距离：'+ distenceY);
                }
            },
            onPanResponderRelease: (evt, gesture) => {
                console.log('释放手势');
            }
        });
    }

    // startAnimation(){
    //     this.state.bounceValue.setValue(0);
    //     Animated.timing(this.state.rotation, {
    //         toValue: 1,
    //         duration: 500,
    //         easing: Easing.linear
    //     }).start();
    // }
    //
    // endAnimation(){
    //     this.state.bounceValue.setValue(1);
    //     Animated.timing(this.state.rotation, {
    //         toValue: 0,
    //         duration: 500,
    //         easing: Easing.linear
    //     }).start();
    // }


    render() {
        return (
            <View style={{flex:1}}>
                {this.state.hideToolbar?
                    <View/>
                    :
                        <Toolbar style={{position: 'absolute',top: 0, left: 0}}
                                 click = {this.props.homeClick}
                                 title= {this.props.title}
                                 navIcon = {this.props.navIcon}
                                 onIconClicked={this.props.click}
                                 onActionSelected={this.props.onActionSelected}
                                 actions={this.props.actions}
                        />}
                <ScrollView style={styles.container} {...this.panResponder.panHandlers}>

                        <MyListView />
                        <MyListView />
                        <MyListView />
                        <MyListView />
                        <MyListView />
                </ScrollView>
            </View>
        );
    }
}
//{this.state.hideToolbar?<View/>:<Toolbar/>}
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