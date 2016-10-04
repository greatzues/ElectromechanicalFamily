/**
 * Created by zues on 2016/9/29.
 */
import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, ListView, Image, TouchableOpacity } from 'react-native';
import Net from '../Net';
import GetStudentInfo from './GetStudentInfo';

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
            test:['row1','row2','row3','row4','row5','row6','row7']
        };
      }


    render(){
        return (
            <View style={styles.container}>
                <ListView
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
        return (
            <TouchableOpacity onPress={() => this.press(rowData.id)}>
                <View style={styles.studentItem}>
                    <Text style={styles.name}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        var URl = '/student/getclasssinfo';
        console.log('----->> hello');
        return new Net().getMethod(URl).then((responseData) => {
            console.log(responseData.status);
            this.setState({
                userData:responseData.response.students,
            });
        });
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
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    studentItem:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },

    avatar:{
        borderRadius:15,
        width:10,
        height:10,
        borderWidth:2,
        borderColor:'white',
    },

    name:{
        fontSize:20
    }
});