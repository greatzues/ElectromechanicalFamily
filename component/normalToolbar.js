/**
 * Created by zues on 2016/9/3.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class NormalToolbar extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            color:this.props.color
        };
    }

    render(){
        return(
            <TouchableOpacity style = {styles.back} onPress={this.props.click}>
                <Image source={require('./../img/back.png')} style={{height: 30,width: 30,alignSelf:'center'}}></Image>
                <Text style={{fontSize:16,alignSelf:'center',color:this.state.color}}>返回</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        alignSelf :'stretch',
        flexDirection: 'row',
    }
});