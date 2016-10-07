/**
 * Created by zues on 2016/9/29.
 */
import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, ListView, Image, TouchableOpacity, Navigator } from 'react-native';
import Net from '../Net';
import GetStudentInfo from './GetStudentInfo';
import Toolbar from './Toolbar';

const BASEURL = 'http://119.29.184.235:8080/jd/avatar/';
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
            id:'',
        };
      }


    render(){
        return (
            <View style={styles.container}>
                <Toolbar title="我的班级" navIcon={require('./../img/back.png')} click={this.backToHome.bind(this)}/>
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

//<Image source={{uri:BASEURL+rowData.avatar}} style={styles.avatar} />
    myRenderRow(rowData,sectionID,rowID){
        console.log(rowData.avatar);
        return (
            <TouchableOpacity onPress={() => this.Press(rowData.id)} style={styles.studentItem}>
                { rowData.avatar !== null ?
                    <Image style={styles.avatar} source={{uri:BASEURL+rowData.avatar}} />:
                    <Image source={require('../img/UserDafault.png')} style={styles.avatar}></Image>
                }
                <View>
                    <Text style={styles.name}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        var URl = '/student/getclasssinfo?classid=44';
        return new Net().getMethod(URl).then((responseData) => {
            console.log(responseData.status);
            let students = responseData.response.students;
            this.setState({
                userData:students,
                id:students.id,
            });
        });
    }

    backToHome(){
        const { navigator } = this.props;
        if (navigator){
            navigator.popToTop();
        }
    }

    Press(id){
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'GetStudentInfo',
                component:GetStudentInfo,
                params:{
                    id:id,
                }
            });
        }
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
    }
});