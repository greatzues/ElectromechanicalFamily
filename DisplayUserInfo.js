/**
 * Created by zues on 2016/9/6.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Navigator, ListView } from 'react-native';

export default class DisplayUserInfo extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row1', 'row2']),
        };
    }

    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow = {}
            >

            </ListView>
        );
    }
}