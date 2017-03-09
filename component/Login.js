/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, DeviceEventEmitter, ScrollView, Platform,
    TouchableOpacity, ActivityIndicator,Navigator, Dimensions, BackAndroid, AsyncStorage, findNodeHandle } from 'react-native';
import Net from '../Tool';
import {Button} from 'react-native-elements'
import BottomTap from './BottomTap';
import Toast from 'react-native-root-toast'


export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            editable: true,
            login: false,
            disabled:false,
            errorMes:'',
        };
    }

    componentWillMount(){
        if(Platform.OS === 'android'){
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    render(){
        return(
                <Image
                    source={require('../img/loginbg.jpg')}
                    resizeMode='cover'
                    style={{height:device.height,width:device.width,flex:1}}>

                    <ScrollView style={{flex:1,backgroundColor:'rgba(0,0,0,.5)',paddingLeft:15,paddingRight:15}}>
                            <Text style={styles.logo}>机电E家人</Text>
                            <View style = {styles.container} >
                                {this.state.login ?
                                    <View>
                                        <ActivityIndicator />
                                        <Text style={{backgroundColor: 'transparent'}}>正在登录...</Text>
                                    </View> :
                                    null}

                                <View style = {styles.input}>
                                    <Text style={{marginLeft:10,color:'white',backgroundColor: 'transparent'}}>账号:</Text>
                                    <TextInput
                                        style = {styles.textInput}
                                        placeholder="请输入学号"
                                        placeholderTextColor='white'
                                        underlineColorAndroid='white'
                                        clearButtonMode={'while-editing'}
                                        editable = {this.state.editable}
                                        returnKeyType={'next'}
                                        onChangeText={(userName) => this.setState({username:userName})}/>
                                </View>

                                <View style = {styles.input}>
                                    <Text style={{marginLeft:10,color:'white',backgroundColor: 'transparent'}}>密码:</Text>
                                    <TextInput
                                        style = {styles.textInput}
                                        placeholder="请输入密码"
                                        placeholderTextColor='white'
                                        underlineColorAndroid='white'
                                        secureTextEntry = {true}
                                        clearButtonMode={'while-editing'}
                                        editable = {this.state.editable}
                                        returnKeyType={'done'}
                                        onChangeText={(passWord) => this.setState({password:passWord})}/>
                                </View>

                                <Button backgroundColor="#337ab7" borderRadius={5}  buttonStyle={styles.loginButton} disabled = {this.state.disabled}
                                    icon={{name: 'account-circle', size: 30}} title='登录' onPress={this.loginButton.bind(this)}/>

                            </View>
                    </ScrollView>
                </Image>
        );
    }


    //登录
    loginButton(){
        if(this.state.username === '' ){
            Toast.show("账号至少6位以上");
            return ;
        }
        if(this.state.password === '' ){
            Toast.show("密码至少6位以上");
            return ;
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
                let timer =  setTimeout(()=>{
                    clearTimeout(timer)
                    const { navigator } = this.props;
                    navigator.resetTo({name: 'BottomTap', component: BottomTap});
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
                let timer =  setTimeout(()=>{
                    clearTimeout(timer)
                    this.setState({
                        editable: true,
                        login:false,
                        disabled:false,
                    });
                },1000);
                Toast.show("账号或密码错误");
            }
        }).catch(error => {
            Toast.show("网络出现错误");
        });
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackAndroid.exitApp();
        }
        this.lastBackPressed = Date.now();
        Toast.show('再按一次退出应用');
        return true;
    };

    //解除定时器
    componentWillUnmount() {
        if(Platform.OS === 'android'){
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
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
        width: device.width - 60,
        height: 40,
        marginLeft:5,
        marginRight:5,
        marginTop:20,
    },
    input:{
        flexDirection: 'row',
        width:device.width-40,
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
        backgroundColor: 'transparent',
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