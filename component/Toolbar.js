/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Navigator,SwitchAndroid } from 'react-native';

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
                navIcon = {this.props.navIcon}
                logo={this.props.logo}
                onIconClicked={this.props.click}
                onActionSelected={this.props.onActionSelected}>

                <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
                    <Text>{this.props.title}</Text>
                </View>
            </ToolbarAndroid>
        );
    }

}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 50,
        alignItems: 'center',
        flexDirection:'row',
    },
    JDLogo:{
       height:30,
        width:50,
    }
});