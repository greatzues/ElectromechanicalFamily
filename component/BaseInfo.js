/**
 * Created by zues on 2016/9/8.
 */
import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage,StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator,Navigator, Dimensions } from 'react-native';
import Net from '../Tool';
var deviceWidth = Dimensions.get('window').width;
const baseInfo = ['姓名','班导','专业','入校时间','毕业时间','联系电话','qq号码','微信账号','性别','民族','籍贯','出生年月','政治面貌'
    ,'家庭住址'];
const workInfo = ['从事行业','工作单位','职务','职称','单位电话','单位地址','其他']
//这里也要优化代码
export default class BasinInfo extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        //需要登录才可以拿到用户信息
        new Net().loadKey('loginState').then(r => {
            if(r.username){
                this.fetchData();
            }
        }).catch(e => {
            console.log(e);
        })
    }

    fetchData(){
        var URl = '/students/getinfo';
        var response;
        new Net().getMethod(URl).then((responseData) => {
            response = responseData.response;
            this.setState({response:response});
        })
            .catch(error => {
                alert('网络出现错误');
                console.error(error);
            });
    }

    render(){
        let response = this.props.baseResponse;
        return(
            <View style={styles.container}>
                {this.props.name === '基本信息'?
                    <Info myResponse ={ response }/>
                    :
                    <WorkInfo myResponse ={ response }/>}
            </View>
        );
    }
}

class Info extends Component{
    render(){
        var response = this.props.myResponse;
        return (
            <View style={styles.container}>
                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>姓名:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.realname}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>学号:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.studentId}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>班导师:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.teacher}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>所学专业:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.major}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>入校时间:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':new Net().timeToDate(response.admissionDate)}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>毕业时间:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':new Net().timeToDate(response.graduationDate)}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>联系电话:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.phone}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>QQ号码:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.qqNumber}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>微信号:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.wecharNumber}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>性别:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.sex}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>民族:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.nationality}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>籍贯:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.nativePlace}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>出生年月:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':new Net().timeToDate(response.birthdate)}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>政治面貌:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.politicalStatus}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>家庭地址:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.address}</Text>
                </View>
            </View>
        );
    }
}


class WorkInfo extends Component{
    render(){
        var response = this.props.myResponse;
        return(
            <View style={styles.container}>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>从事行业:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.presentIndustry}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>工作单位:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.workPlace}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>职务:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.dudy}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>职称:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.professionalTitle}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>单位电话:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response===null?'':response.workPhone}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>单位地址:</Text>
                    <Text style={{marginLeft:10}}>{response===null?'':response.workAddress}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        backgroundColor:'white',
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
        margin:10,
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },
});

