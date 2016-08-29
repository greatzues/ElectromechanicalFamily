/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableNativeFeedback, ActivityIndicator,Navigator, Dimensions, BackAndroid } from 'react-native';
import Signup from './Signup';

var deviceWidth = Dimensions.get('window').width;

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            editable: true,
            login: false,
            disabled:false,
        };
    }

    render(){
        return(
            <View style = {styles.container}>
                {this.state.login ?
                    <View >
                        <ActivityIndicator />
                        <Text>正在登录...</Text>
                    </View> :
                    null}

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>账号:</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder="请输入账号"
                        clearButtonMode="always"
                        editable = {this.state.editable}
                        onChangeText={(userName) => this.setState({username:userName})}/>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>密码:</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder="请输入密码"
                        secureTextEntry = {true}
                        clearButtonMode="always"
                        editable = {this.state.editable}
                        onChangeText={(passWord) => this.setState({password:passWord})}/>
                </View>
                <TouchableNativeFeedback
                    onPress = {this.loginButton.bind(this)}
                    disabled = {this.state.disabled}
                    background={TouchableNativeFeedback.Ripple('#23527c',false)}>
                        <View style={styles.loginButton}>
                            <Text style={{margin: 30,color:'white', fontSize:20}}>登录</Text>
                        </View>
                </TouchableNativeFeedback>
                <Text style={{alignSelf:'flex-end',marginRight:30, fontSize:15}} onPress={this.toSignup.bind(this)}>注册</Text>
            </View>
        );
    }

    // backToHome(){
    //     const { navigator } = this.props;
    //     if (navigator){
    //         navigator.pop();
    //     }
    // }

    toSignup(){
        const { navigator } = this.props;
        if( navigator ) {
            navigator.push({
                name: 'Signup',
                component: Signup,
            })
        }
    }

    //模仿登录
    loginButton(){
        if(this.state.username === '' ){

            return alert("账号至少6位以上");
        }
        if(this.state.password === '' ){
            return alert("密码至少6位以上");

        }
            this.setState({
                editable: false,
                login:true,
                disabled:true,
            });
            this.timer = setTimeout(() => {
                const { navigator } = this.props;
                if (navigator){
                    navigator.pop();
                }
                this.setState({
                    editable: true,
                    login:false,
                    disabled:false,
                });
            },3000);
        return ;

    }

    logining(){
        //此处编写登录逻辑,然后加到loginButton（）里面去
    }

    //解除定时器
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
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