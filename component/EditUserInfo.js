/**
 * Created by zues on 2016/9/6.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Navigator, ListView, TextInput, Dimensions, ScrollView } from 'react-native';
import Toolbar from './Toolbar';
import Net from '../Net'
import BottomTap from './BottomTap';

const deviceWidth = Dimensions.get('window').width;
var toolbarActions = [
    {title: '完成', icon: require('./../img/write.png'), show: 'always'},
];
export default class DisplayUserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            response:{},

                name:'',
                realname: '',
                studentId: '',
                teacher: '',
                major: '',
                admissionDate: '',
                graduationDate: '',
                phone: '',
                qqNumber: '',
                wecharNumber: '',
                sex: '',
                nationality: '',
                nativePlace: '',
                birthdate: '',
                politicalStatus: '',
                address: '',
                presentIndustry:'',
                workPlace:'',
                dudy:'',
                professionalTitle:'',
                workPhone:'',
                workAddress:'',
                others:'',

        };
    }

    render(){
        var response = this.state.response;
        return(
            <View style={styles.container}>
                <Toolbar
                    click={this.back.bind(this)}
                    title= "编辑资料"
                    navIcon = {require('./../img/back.png')}
                    onActionSelected={this.onActionSelected.bind(this)}
                    actions={toolbarActions}/>
                <ScrollView>
                <View style={styles.container}>
                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>姓名:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({realname:text})}
                            defaultValue={response.realname}/>

                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>学号:</Text>
                        <TextInput style={{flex:1}} onChangeText={(text) => this.setState({studentId:text})}
                                   >{response.studentId}</TextInput>
                    </View>


                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>班导师:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({teacher:text})}
                                   defaultValue={response.teacher}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>所学专业:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({major:text})}
                                   defaultValue={response.major}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>入校时间:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({admissionDate:text})}
                                   >{response.admissionDate}</TextInput>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>毕业时间:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({graduationDate:text})}
                                    >{response.graduationDate}</TextInput>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>联系电话:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({phone:text})}
                                   defaultValue={response.phone}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>QQ号码:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({qqNumber:text})}
                                    >{response.qqNumber}</TextInput>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>微信号:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({wecharNumber:text})}
                                   defaultValue={response.wecharNumber}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>性别:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({sex:text})}
                                   defaultValue={response.sex}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>民族:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({nationality:text})}
                                   defaultValue={response.nationality}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>籍贯:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({nativePlace:text})}
                                   defaultValue={response.nativePlace}/>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>出生年月:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({birthdate:text})}
                                    >{response.birthdate}</TextInput>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>政治面貌:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({politicalStatus:text})}
                                   defaultValue={response.politicalStatus}/>
                        <Text style={{marginLeft:10}}>{response.politicalStatus}</Text>
                    </View>

                    <View style = {styles.input}>
                        <Text style={{marginLeft:10}}>家庭地址:</Text>
                        <TextInput style={{flex:1}} onChangeText={text => this.setState({address:text})}
                                   defaultValue={response.address}/>
                    </View>
                </View>
                    </ScrollView>

                <TouchableOpacity
                    onPress = {this.editDoneButton.bind(this)}
                    disabled = {this.state.disabled}>
                    <View style={styles.loginButton}>
                        <Text style={{margin: 30,color:'white', fontSize:20}}>完成</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    componentWillMount() {
        this.fetchData();
    }


    //编辑完成
    editDoneButton(){
        var postData = {
            realname: this.state.realname,
            studentId: this.state.studentId,
            teacher: this.state.teacher,
            major: this.state.major,
            admissionDate: this.state.admissionDate,
            graduationDate: this.state.graduationDate,
            phone: this.state.phone,
            qqNumber: this.state.qqNumber,
            wecharNumber: this.state.wecharNumber,
            sex: this.state.sex,
            nationality: this.state.nationality,
            nativePlace: this.state.nativePlace,
            birthdate: this.state.birthdate,
            politicalStatus: this.state.politicalStatus,
            address: this.state.address,
            presentIndustry:this.state.presentIndustry,
            workPlace:this.state.workPlace,
            dudy:this.state.dudy,
            professionalTitle:this.state.professionalTitle,
            workPhone:this.state.workPhone,
            workAddress:this.state.workAddress,
            others:this.state.others,
        };
        console.log(postData);
        this.updateInfo(postData);
        const { navigator } = this.props;
        if( navigator ) {
            navigator.push({
                name: 'BottomTap',
                component: BottomTap,
            })
        }
    }

    //取消编辑，返回到user页面
    back(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }

    //完成编辑上传到服务器
    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        alert('我是个暂时没用处的toolbar ');
    }

    updateInfo(postData){
        var URL = '/student/updateinfo';
        console.log(postData);
        return new Net().postMethod(URL,postData).then((responseJson) => {
            console.log(responseJson.status);
        });
    }

    fetchData(){
        var URL = '/student/getinfo';
        return new Net().getMethod(URL).then((responseData) => {
            let response = responseData.response;
            let data = {
                    name:response.name,
                    realname : response.realname,
                    studentId : response.studentId,
                    classes : response.classes,
                    teacher : response.teacher,
                    major : response.major,
                    admissionDate : response.admissionDate,
                    graduationDate : response.graduationDate,
                    phone : response.phone,
                    qqNumber : response.qqNumber,
                    wecharNumber : response.wecharNumber,
                    sex : response.sex,
                    nationality : response.nationality,
                    nativePlace  :response.nativePlace,
                    birthdate : response.birthdate,
                    politicalStatus : response.politicalStatus,
                    address : response.address,
                    presentIndustry:response.presentIndustry,
                    workPlace:response.workPlace,
                    dudy:response.dudy,
                    professionalTitle:response.professionalTitle,
                    workPhone:response.workPhone,
                    workAddress:response.workAddress,
                    others:response.others,
                };
                this.setState({response:data});
        })
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
        flex:1,
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
        alignItems:'center'
    },
    rowTitle:{
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ccc',
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
});