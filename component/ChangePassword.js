/**
 * Created by zues on 2017/3/9.
 */
import React, { Component } from 'react';
import {Modal, StyleSheet, Switch, Text, TouchableOpacity, View, ScrollView, Picker} from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import Toast from 'react-native-root-toast';
import Login from './Login';
import { Button, FormLabel, FormInput} from 'react-native-elements'

const CHANGE_PASSWORD = '/students/changepassword';
export  default class ChangePassword extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            password:''
        };
    }

    render(){
        return (
            <View style={styles.container}>
                <NormalToolbar title='密码修改' leftItemFunc={this.back.bind(this)} leftImageSource={require('../img/back.png')}/>
                <FormLabel>修改密码</FormLabel>
                <FormInput
                    inputStyle={{padding:5}}
                    placeholder='请输入您的新密码'
                    onChangeText={this.onChangeText.bind(this)}
                />

                <Button title="确定" backgroundColor="#337ab7" borderRadius={5} onPress={this.postData.bind(this)} />
            </View>
        );
    }

    back(){
        new Net().back(this.props);
    }

    onChangeText(text){
        this.setState({
            password:text
        })
    }

    postData(){
        new Net().saveKey('loginState',{password: this.state.password});

        let params = new Object();
        params['password'] = this.state.password;
        let url = CHANGE_PASSWORD;
        new Net().postMethod(url,params).then((r) => {
            Toast.show("修改密码成功");
        }).catch(e => {Toast.show("网络出现错误");});

        const { navigator } = this.props;
        navigator.resetTo({name:'Login',component:Login});

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#eff0f3'
    },
});