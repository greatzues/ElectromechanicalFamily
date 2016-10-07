/**
 * Created by zues on 2016/9/30.
 */
import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, ListView, Image, Dimensions, ScrollView, findNodeHandle } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Net from '../Net';
import NormalToolbar from './normalToolbar';
var BlurView = require('react-native-blur').BlurView;

//http://10.10.68.101:8888/student/getsomeoneInfo/?studentID=58
const BASEURL = 'http://119.29.184.235:8080/jd/avatar/';
const deviceWidth = Dimensions.get('window').width;
export default class GetStudentInfo extends Component{
    constructor(props){
        super(props);
        this.state ={
            response:{},
            avatarSource:'',
            appellation:'', //称谓
            viewRef:0,
        }
    }

    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    }

    render(){
        return(
            <View style={styles.container}>
                <Image
                    source={{uri:BASEURL+this.state.avatarSource}}
                    style={styles.userBackground}
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
                        <NormalToolbar click={this.back.bind(this)} color="white"/>
                        <View>
                            <Image style={styles.avatar} source={{uri:BASEURL+this.state.avatarSource}} />
                        </View>
                        <Text style={{color:'white',fontSize:20}}>{
                            this.state.appellation === '男'?
                            this.state.response.realname+'先生'
                            :this.state.response.realname+'小姐'}
                        </Text>

                </Image>

                <View style={styles.container}>
                    <ScrollableTabView
                        style={{height:40}}
                        renderTabBar={()=><DefaultTabBar backgroundColor='#eee' />}
                        tabBarPosition='overlayTop'
                    >
                        <ScrollView tabLabel='基本信息' style={{paddingTop:50}}>
                            <Info myResponse={this.state.response}/>
                        </ScrollView>
                        <ScrollView tabLabel='工作信息' style={{paddingTop:50}}>
                            <WorkInfo myResponse={this.state.response}/>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        var URL='/student/getsomeoneInfo/?studentID='+this.props.id;
        new Net().getMethod(URL).then((responseData) => {
            let response=responseData.response;
            this.setState({
                response:response,
                avatarSource:response.avatar,
                appellation:response.sex,
            });
        })
    }

    back(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    avatar:{
        borderRadius:75,
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        marginTop:10,
        marginBottom: 10,
    },
    userBackground:{
        height:180,
        width:deviceWidth,
        alignItems: 'center',
    },

    input:{
        flexDirection: 'row',
        width:deviceWidth,
        alignItems:'center',
        margin:10,
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },

    blurView: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },
});

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

class Info extends Component{
    render(){
        const {myResponse} = this.props;
        var response = this.props.myResponse;
        return (
            <View style={styles.container}>
                <View style = {styles.input}>
                    <Text style={{marginLeft:10}}>姓名:</Text>
                    <Text style={{marginLeft:10}}>{response.realname}</Text>
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
                    <Text style={{marginLeft:10}}>{response.teacher}</Text>
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
