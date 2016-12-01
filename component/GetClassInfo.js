/**
 * Created by zues on 2016/9/29.
 */
import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, ListView, Image, TouchableOpacity, Navigator, ToastAndroid, AsyncStorage } from 'react-native';
import Net from '../Tool';
import GetStudentInfo from './GetStudentInfo';
import Toolbar from './Toolbar';

const AVATAR = 'http://119.29.184.235:8080/jd/avatar/';
const CLASS = '/students';
const SIGN = '/students/sign';
export default class GetClassInfo extends Component {
    // 构造
      constructor(props) {
          var ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          });
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
                <Toolbar title="我的班级"
                         actions={[{title:this.state.absence,show: 'always'}]}
                         onActionSelected={this.onActionSelected.bind(this)}/>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    renderRow={this.myRenderRow.bind(this)}
                    enableEmptySections={true}
                >

                </ListView>
            </View>
        );
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

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        switch (position){
            case 0:
                //此处编写签到
                this.absence();
                break;
        }
    }

    absence(){
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        if(day<10){
            day = "0"+date.getDate();
        }
        if(month<10){
            month = "0"+ date.getMonth();
        }
        var post = date.getFullYear()+''+month+''+day;
        var postData = {date:post};
        console.log(postData);
        new Net().postMethod(SIGN,postData).then((responseData) => {
            console.log(responseData.status);
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
        ToastAndroid.show("已签到",ToastAndroid.LONG);
        return this.setState({absence : '已签到'});
    }

    componentDidMount() {
        this.fetchData();
    }
    //拿到学生的id传过去
    fetchData(){
        if(this.props.getClass !== null){
            new Net().getMethod(CLASS+'?page=1&&classNumber'+this.props.getClass).then((responseData) => {
                console.log(responseData.status);
                let students = responseData.students;
                this.setState({
                    userData:students,
                });
            });
        }
    }

    Press(id){
        var params = {id:id};
        new Net().toOther(this.props, 'GetStudentInfo',GetStudentInfo,params);
    }
    //toLowerCase()方法可以把字符串中的大写字母转换为小写，toUpperCase()方法可以把字符串中的小写字母转换为大写。
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
        borderRadius:75,
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