/**
 * Created by zues on 2016/9/29.
 */
import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, ListView, Image, TouchableOpacity, Navigator, ToastAndroid, AsyncStorage } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar';
import SignPage from './SignPage'

const AVATAR = 'http://119.29.184.235:8080/jd/avatar/';
const CLASS = '/students';
export default class GetClassInfo extends Component {
    // 构造
      constructor(props) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        // 初始状态
        this.state = {
            dataSource:ds,
            userData: [],
            absence:'请签到',
            id:'',
        };
      }


    render(){
        return (
            <View style={styles.container}>
                <NormalToolbar title="我的班级" rightItemFunc={this.toSign.bind(this,this.props.classNumber)} rightItemTitle={this.state.absence}/>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    renderRow={this.myRenderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    myRenderRow(rowData,sectionID,rowID){
        return (
            <TouchableOpacity onPress={() => this.props.getStudentInfo(rowData.id)} style={styles.studentItem}>
                { rowData.avatar ?
                    <Image style={styles.avatar} source={{uri:AVATAR+rowData.avatar}} />:
                    <Image source={require('../img/UserDafault.png')} style={styles.avatar}></Image>
                }
                <View style={{ justifyContent: 'space-between',flexDirection:'row',flex:1}}>
                    <Text style={styles.name}>{rowData.realname}</Text>
                    <Text style={styles.class}>{rowData.classNumber}班</Text>
                </View>
            </TouchableOpacity>
        )
    }

    toSign(classNumber){
        var params = {classNumber:classNumber}
        new Net().toOther(this.props.parent,'SignPage',SignPage, params);
    }

    componentDidMount() {
        this.fetchData();
    }
    //拿到学生的id传过去
    fetchData(){
        if(this.props.classNumber !== null){
            new Net().getMethod(CLASS+'?page=1&&classNumber'+this.props.classNumber).then((responseData) => {
                console.log(responseData.status);
                let students = responseData.students;
                this.setState({
                    userData:students,
                });
            });
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    studentItem:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        marginRight:10,
        marginLeft:10,
        position: 'relative'
    },

    avatar:{
        borderRadius:25,
        width:50,
        height:50,
        borderWidth:2,
        borderColor:'white',
    },

    name:{
        fontSize:20
    },

    class:{
        alignSelf:'center'
    }
});