/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Navigator } from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
export default class Toolbar extends Component {
    constructor(props){
        super(props);
        this.state ={};
    }

    render(){
        return(
            <ToolbarAndroid
                actions={this.props.actions}
                style={styles.toolbar}
                title= {this.props.title}
                navIcon = {this.props.navIcon}
                onIconClicked={this.props.click}
                onActionSelected={this.props.onActionSelected}>

            </ToolbarAndroid>
        );
    }

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        // alert('this is the '+ (position+1));
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