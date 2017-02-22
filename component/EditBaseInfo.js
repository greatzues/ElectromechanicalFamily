/**
 * Created by zues on 2017/2/19.
 */
import React, { Component } from 'react';
import {Modal, StyleSheet, Switch, Text, TouchableOpacity, View, ScrollView, Picker} from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import EditDeatils from './EditDeatils';
import { List, ListItem, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'


const BASE_INFO = ['入校时间','毕业时间','出生年月','手机号码','家庭电话','qq号码','微信账号','民族','籍贯','政治面貌'];
const POST_KEY = ['admissionDate', 'graduationDate', 'birthdate', 'phone', 'phoneFamily','qqNumber',
                  'wecharNumber','nationality','nativePlace','politicalStatus' ];
const STUDENT_INFO = '/students/';
export default class EditBaseInfo extends Component{
        // 构造
      constructor(props) {
        super(props);
        this.state = {
            rightTitle:this.props.user,
            modalVisible: false,
            placeholder:'',
        };
      }

      render(){
          return(
              <ScrollView style={styles.container}>
                  <NormalToolbar title='基本信息' leftItemFunc={this.back.bind(this)} leftImageSource={require('../img/back.png')}/>
                  <List containerStyle={{marginTop:15}}>
                      {
                          BASE_INFO.map((l, i) => (
                              <ListItem
                                  key={i}
                                  title={i<3?this.dataPicker(l,i):l}
                                  rightTitle={this.state.rightTitle[i]?i<3?new Net().timeToDate(this.state.rightTitle[i]):this.state.rightTitle[i]:'未填写'}
                                  onPress={this.otherPress.bind(this,i,l,this.state.rightTitle[i])}
                              />
                          ))
                      }
                  </List>
              </ScrollView>
          );
      }

    otherPress(position, title, info){
        switch (position){
            case 0:
                this.refs.picker.onPressDate();
                break;
            case 1:
                this.refs.picker.onPressDate();
                break;
            case 2:
                this.refs.picker.onPressDate();
                break;
            default:
                var params = {title:title,info:info,id:this.props.id,k:POST_KEY[position],callBack:(msg) => {this.refresh(position, msg)}};
                return new Net().toOther(this.props,'EditDeatils',EditDeatils,params);
        }
    }

    back(){
        new Net().back(this.props);
    }

    refresh(p, data){
        this.state.rightTitle[p] = data;
        this.forceUpdate();
    }

    dataPicker(title, position){
        return (
            <DatePicker
                ref="picker"
                style={{width: 200}}
                mode="date"
                showIcon={false}
                placeholder={title}
                format="YYYY-MM-DD"
                minDate="1970-01-01"
                maxDate="2030-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: {
                        marginLeft: 10,
                        borderWidth:0,
                        borderColor:'white',
                        padding:0
                    },
                    placeholderText:{
                        alignSelf:'flex-start',
                        color:'black',
                    },
                    dateTouchBody:{
                        padding:0,
                        margin:0
                    }
                }}
                onDateChange={this.onDateChange.bind(this,position)}
            />
        )
    }

    onDateChange(position,date){
        switch (position){
            case 0:
                this.state.rightTitle[position] = date;
                this.forceUpdate();
                let time = new Net().dateToTime(date);
                let params = new Object();
                params[POST_KEY[position]] = time;
                let url = STUDENT_INFO+this.props.id;
                new Net().putMethod(url,params).then((r) => {}).catch(e => {Toast.show("网络出现错误");});
                break;
            case 1:
                this.postData(position, date);
                break;
            case 2:
                this.postData(position, date);
                break;
        }
    }

    postData(position, date){
        this.state.rightTitle[position] = date;
        this.forceUpdate();
        let time = new Net().dateToTime(date);
        let params = new Object();
        params[POST_KEY[position]] = time;
        let url = STUDENT_INFO+this.props.id;
        new Net().putMethod(url,params).then((r) => {}).catch(e => {Toast.show("网络出现错误");});
    }

}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#eff0f3'
    },
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
    },
    modalButton: {
        marginTop: 10,
    },
    twoButton:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
});