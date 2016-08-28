/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableNativeFeedback, ProgressBarAndroid,Navigator, Dimensions} from 'react-native';

import Toolbar from './Toolbar';

var deviceWidth = Dimensions.get('window').width;
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
        };
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>账号:</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder="请输入账号"
                        onChangeText={(userName) => this.setState({username:userName})}/>
                </View>
                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>密码:</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder="请输入密码"
                        onChangeText={(passWord) => this.setState({password:passWord})}/>
                </View>
                <TouchableNativeFeedback
                    onPress = {this.loginButton.bind(this)}
                    background={TouchableNativeFeedback.Ripple('#23527c',false)}>
                        <View style={styles.loginButton}>
                            <Text style={{margin: 30,color:'white', fontSize:20}}>登录</Text>
                        </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    loginButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'column',
    },
    textInput: {
        flex:1,
        color:'black',
    },
    loginButton:{
        justifyContent:'center',
        alignItems: 'center',
        width: deviceWidth - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        margin:10,
    },
    input:{
        flexDirection: 'row',
        width:deviceWidth,
        alignItems:'center',
        margin:10,
    },
});