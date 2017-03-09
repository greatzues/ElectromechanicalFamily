/**
 * Created by zues on 2017/1/17.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar'
import SignDetail from './SignDetail'
import {ListItem , Icon} from 'react-native-elements'

const TIME = '/signTable/student';
export default class SignPage extends Component{
    // 构造
      constructor(props) {
        super(props);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
            page:1,
            signTable:[],
            dataSource:ds,
            currentTime:null,
              test:true,
        };
      }

    componentWillMount() {
        this.fetchData();
    }

      render(){
          return (
              <ScrollView style={styles.container}>
                  <NormalToolbar title='签到页面' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>
                  <ListView
                      dataSource={this.state.dataSource.cloneWithRows(this.state.signTable)}
                      renderRow={this.renderRow.bind(this)}
                      enableEmptySections={true}
                  />
              </ScrollView>
          )
      }

    renderRow(rowData){
        let startTime = new Net().timeToDate(rowData.startTime);
        let endTime = new Net().timeToDate(rowData.endTime);
        let  signAble = this.ifSignAble(rowData.startTime,rowData.endTime,rowData.isOverdue);
        return(
            <ListItem
                roundAvatar
                title={'签到时间：'+startTime+'~'+endTime}
                titleStyle={signAble?{color:'#4a6ca6'}:{color:'#828282'}}
                subtitle={signAble?'可签到时间':'不可签到'}
                subtitleStyle={signAble?{color:'#4a6ca6'}:{color:'#828282'}}
                leftIcon={signAble?{name:'flight-takeoff',color:'#4a6ca6'}:{name:'av-timer',color:'#828282'}}
                rightIcon={signAble?{name:'chevron-right',color:'#4a6ca6'}:{name:'chevron-right',color:'#828282'}}
                onPress={signAble === true?this.toSignDetail.bind(this, rowData.id):this.cantSign.bind(this)}
            />
        );
    }

    toSignDetail(id){
        var params = {id:id, classNumber:this.props.classNumber,update:(ifRefresh) => this.reRender(ifRefresh)}
        new Net().toOther(this.props,'SignDetail', SignDetail, params)
    }

      fetchData(){
          var url = TIME+'?page='+ this.state.page;
          new Net().getMethod(url).then(r => {
              console.log(r);
              this.setState({
                  signTable:r.signTables
              })
          }).catch(e => {})
      }
    //只有符合在开始时间和结束时间之间以及isOverdue等于0，也就是这个时间段还未签到过才能才能进行签到操作,生病了
      ifSignAble(startTime, endTime, isOverdue){
          var timeStamp = new Date().getTime();
          if(timeStamp>startTime&&timeStamp<endTime&&isOverdue!==1){
              return true;
          }else {
              return false; //记得改回来false
          }
      }

    back(){
        new Net().back(this.props)
    }

    cantSign(){
        Toast.show('无效签到时间')
    }

    reRender(ifRefresh){
        Toast.show('您已成功签到，签到功能已锁');
        if(ifRefresh){
            this.fetchData();
        }
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        flex:1
    },
    canSign:{
        width:device.width,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        borderBottomWidth:1,
        borderBottomColor:'#1296db',
    },
    cantSign:{
        width:device.width,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        borderBottomWidth:1,
        borderBottomColor:'#828282',
    },
    canSignText:{
        color:'#1296db',
        margin:2,
        fontSize:15
    },
    cantSignText:{
        color:'#828282',
        margin:2,
        fontSize:15
    },
    BottomLine:{
        height:1,
        marginTop:5,
        alignSelf:'flex-end'
    },
    text:{
        color:'#1296db',
    },
    rightArrow:{
        position:'absolute',
        right:25,
        top:10
    }
})