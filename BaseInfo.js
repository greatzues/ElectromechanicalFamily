/**
 * Created by zues on 2016/9/8.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator,Navigator, Dimensions } from 'react-native';
import Net from './Net';
var deviceWidth = Dimensions.get('window').width;

export default class BasinInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            response: '',
        };
    }

    componentDidMount() {
        //需要登录才可以拿到用户信息
        this.fetchData();
    }

    fetchData(){
        var URl = '/student/getinfo';
        var response;
        new Net().getMethod(URl).then((responseData) => {
            response = responseData.response;

            this.setState({response:response});
        });
    }

    render(){
        const {name} =this.props;
        let response = this.state.response;
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
//测试使用
// class Test extends Component {
//     render(){
//         const {myResponse} = this.props;
//         var response = this.props.myResponse;
//         return (
//             <Text>{response.name}</Text>
//         );
//     }
// }

class Info extends Component{
    render(){
        const {myResponse} = this.props;
        var response = this.props.myResponse;
        return (
            <View style={styles.container}>
                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>姓名:</Text>
                    <Text style={{marginLeft:10}}>{response.name}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>学号:</Text>
                    <Text style={{marginLeft:10}}>{response.studentId}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>班级:</Text>
                    <Text style={{marginLeft:10}}>{response.classes}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>班导师:</Text>
                    <Text style={{marginLeft:10}}>{response.name}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>所学专业:</Text>
                    <Text style={{marginLeft:10}}>{response.major}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>入校时间:</Text>
                    <Text style={{marginLeft:10}}>{response.admissionDate}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>毕业时间:</Text>
                    <Text style={{marginLeft:10}}>{response.graduationDate}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>联系电话:</Text>
                    <Text style={{marginLeft:10}}>{response.phone}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>QQ号码:</Text>
                    <Text style={{marginLeft:10}}>{response.qqNumber}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>微信号:</Text>
                    <Text style={{marginLeft:10}}>{response.wecharNumber}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>性别:</Text>
                    <Text style={{marginLeft:10}}>{response.sex}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>民族:</Text>
                    <Text style={{marginLeft:10}}>{response.nationality}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>籍贯:</Text>
                    <Text style={{marginLeft:10}}>{response.nativePlace}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>出生年月:</Text>
                    <Text style={{marginLeft:10}}>{response.birthdate}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>政治面貌:</Text>
                    <Text style={{marginLeft:10}}>{response.politicalStatus}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>家庭地址:</Text>
                    <Text style={{marginLeft:10}}>{response.address}</Text>
                </View>
            </View>
        );
    }
}


class WorkInfo extends Component{
    render(){
        const {myResponse} = this.props;
        var response = this.props.myResponse;
        return(
            <View style={styles.container}>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>从事行业:</Text>
                    <Text style={{marginLeft:10}}>{response.presentIndustry}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>工作单位:</Text>
                    <Text style={{marginLeft:10}}>{response.workPlace}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>职务:</Text>
                    <Text style={{marginLeft:10}}>{response.dudy}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>职称:</Text>
                    <Text style={{marginLeft:10}}>{response.professionalTitle}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>单位电话:</Text>
                    <Text style={{marginLeft:10}}>{response.workPhone}</Text>
                </View>

                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>单位地址:</Text>
                    <Text style={{marginLeft:10}}>{response.workAddress}</Text>
                </View>
            </View>
        );
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

