/**
 * Created by zues on 2016/8/28.
 */
/**
 * Created by zues on 2016/8/27.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator,Navigator, Dimensions } from 'react-native';

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

            <ScrollView>
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

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>班级:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>班导师:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>所学专业:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>入校时间:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>毕业时间:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>联系电话:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>QQ号码:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>微信号:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>性别:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>民族:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>籍贯:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>出生年月:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>政治面貌:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>家庭地址:</Text>
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
                <View style={styles.container}>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>从事行业:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>工作单位:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>职务:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>职称:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>单位电话:</Text>
                        <TextInput
                            style = {styles.textInput}
                            placeholder="请输入密码"
                            secureTextEntry = {true}
                            clearButtonMode="always"
                            returnKeyType = "go"
                            editable = {this.state.editable}
                            onChangeText={(passWord) => this.setState({password:passWord})}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>单位地址:</Text>
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
                        <Text style={{color:'white', fontSize:20}}>完成</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>

        );
    }

    backToHome(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
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
        borderRadius:5,
        backgroundColor:'#bdb8b8',
        margin:5,
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
});
