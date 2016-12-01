/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, DeviceEventEmitter,
    TouchableOpacity, ActivityIndicator,Navigator, Dimensions, BackAndroid, AsyncStorage, findNodeHandle } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './normalToolbar';
var BlurView = require('react-native-blur').BlurView;

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            editable: true,
            login: false,
            disabled:false,
            viewRef:0,
        };
    }

    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    }

    render(){
        return(

                <Image
                    source={require('../img/loginbg.jpg')}
                    resizeMode='cover'
                    style={{height:window.height,width:window.width,flex:1}}
                    ref={'backgroundImage'}
                    onLoadEnd={this.imageLoaded.bind(this)}>
                    <BlurView
                        blurType="dark"
                        blurRadius={2}
                        downsampleFactor={5}
                        overlayColor={'rgba(0, 0, 0, 0.3)'}
                        style={styles.blurView}
                        viewRef={this.state.viewRef}
                    />
                    <NormalToolbar click={this.backToHome.bind(this)} color='white'/>
                    <Text style={styles.logo}>机电E家人</Text>
                    <View style = {styles.container} >
                        {this.state.login ?
                            <View >
                                <ActivityIndicator />
                                <Text>正在登录...</Text>
                            </View> :
                            null}

                        <View style = {styles.input}>
                            <Text style={{marginLeft:10,color:'white'}}>账号:</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder="请输入学号"
                                placeholderTextColor='white'
                                underlineColorAndroid='white'
                                clearButtonMode={'while-editing'}
                                editable = {this.state.editable}
                                onChangeText={(userName) => this.setState({username:userName})}/>
                        </View>

                        <View style = {styles.input}>
                            <Text style={{marginLeft:10,color:'white'}}>密码:</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder="请输入密码"
                                placeholderTextColor='white'
                                underlineColorAndroid='white'
                                secureTextEntry = {true}
                                clearButtonMode={'while-editing'}
                                editable = {this.state.editable}
                                onChangeText={(passWord) => this.setState({password:passWord})}/>
                        </View>
                        <TouchableOpacity
                            onPress = {this.loginButton.bind(this)}
                            disabled = {this.state.disabled}
                            >
                                <View style={styles.loginButton}>
                                    <Text style={{margin: 30,color:'white', fontSize:20}}>登录</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </Image>

        );
    }

    //这个方法也可以全局
    backToHome(){
        new Net().back(this.props);
    }

    //登录
    loginButton(){
        if(this.state.username === '' ){
            return alert("账号至少6位以上");
        }
        if(this.state.password === '' ){
            return alert("密码至少6位以上");
        }
        //保存账号密码，用于自动登录
        new Net().saveKey('loginState',{username: this.state.username, password: this.state.password});
        //登录
        this.logining(this.state.username,this.state.password);
    }

    //此处编写登录逻辑,然后加到loginButton（）里面去
    logining(myUsername,myPassword){
        var URL = '/students/login';
        return new Net().postLoginMethod(URL,myUsername,myPassword).then((data) => {
            var myCode = data.code;
            if (myCode === 200){
                this.setState({
                    editable: false,
                    login:true,
                    disabled:true,
                });
                this.timer = setTimeout(() => {
                    const { navigator } = this.props;
                    if(this.props.update){
                        this.props.update(true);
                    }
                    if (navigator){
                        navigator.pop();
                    }
                    this.setState({
                        editable: true,
                        login:false,
                        disabled:false,
                    });
                },3000);
            }else {
                this.setState({
                    editable: false,
                    login:true,
                    disabled:true,
                });
                this.timer = setTimeout(() => {
                    this.setState({
                        editable: true,
                        login:false,
                        disabled:false,
                    });
                },1000);
                alert("账号或密码错误");
            }
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
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
        marginTop:80

    },
    textInput: {
        flex:1,
        color:'white',
    },
    loginButton:{
        justifyContent:'center',
        alignItems: 'center',
        width: device.width - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        marginLeft:5,
        marginRight:5,
        marginTop:20,
    },
    input:{
        flexDirection: 'row',
        width:device.width,
        alignItems:'center',
        margin:10,
    },
    logo:{
        position: 'relative',
        top:60,
        left:0,
        fontSize:40,
        fontFamily:'Verdana',
        color:'white',
        alignSelf:'center'
    },
    blurView: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },
});