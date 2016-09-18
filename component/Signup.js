/**
 * Created by zues on 2016/8/28.
 */
/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator,Navigator, Dimensions } from 'react-native';
import Net from '../Net';
import NormalToolbar from './normalToolbar';

var deviceWidth = Dimensions.get('window').width;
export default class Signup extends Component{
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

            <View>
                <NormalToolbar click={this.backToHome.bind(this)}/>

                <View style={styles.container}>
                    {this.state.login ?
                        <View >
                            <ActivityIndicator />
                            <Text>正在注册...</Text>
                        </View> :
                        null}

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>姓名:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入账号"
                            autoFocus={true}
                            clearButtonMode="always"
                            returnKeyType = "next"
                            editable = {this.state.editable}
                            onChangeText={(userName) => this.setState({username:userName})}/>
                    </View>


                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>学号:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>
                </View>
                <TouchableOpacity
                    onPress = {this.loginButton.bind(this)}
                    disabled = {this.state.disabled}
                    >
                    <View style={styles.loginButton}>
                        <Text style={{color:'white', fontSize:20}}>注册</Text>
                    </View>
                </TouchableOpacity>

            </View>

        );
    }

    backToHome(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }

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
        console.log("正在注册");
        var postData = {username:this.state.username,password:this.state.password};
        this.logining(postData);
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
    }

    logining(postData){
        //此处编写注册逻辑,然后加到loginButton（）里面去
        var URL = '/student/register';
        return new Net().postMethod(URL,postData).then((responseJson) => {
            console.log(responseJson.status);
        });
    }

    //解除定时器
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,

        margin:5,
        marginTop: 100,
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
        alignSelf:'center'
    },
    input:{
        flexDirection: 'row',
        width:deviceWidth,
        alignItems:'center',
    },

    back: {
        alignSelf :'stretch',
        flexDirection: 'row',
    }
});