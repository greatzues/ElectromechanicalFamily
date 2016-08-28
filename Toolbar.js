/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, DrawerLayoutAndroid, Navigator } from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
import Login from './Login';
var toolbarActions = [
    {title: 'Create', icon: require('./img/fav.png'), show: 'always'},
    {title: 'Filter', icon: require('./img/write.png'), show: 'never'},
    {title: 'Settings', icon: require('./img/fav.png'), show: 'never'},
];
export default class Toolbar extends Component {
    constructor(props){
        super(props);
        this.state ={};
    }

    render(){
        return(
            <ToolbarAndroid
                actions={toolbarActions}
                style={styles.toolbar}
                title= "机电E家人"
                navIcon = {require('./img/pic.png')}
                onIconClicked={this.props.click}
                onActionSelected={this.onActionSelected}>

            </ToolbarAndroid>
        );
    }
    // onIconClicked={this.onIconClicked.bind(this)} onIconClicked={this.props.click}
    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        // alert('this is the '+ (position+1));
    }

    onIconClicked(){
        //编写back键或者是登录的方法

    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
});