/**
 * Created by zues on 2017/2/19.
 */
import React, { Component } from 'react';
import {Modal, StyleSheet, Switch, Text, TouchableOpacity, View, ScrollView, Picker} from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import EditDeatils from './EditDeatils';
import { List, ListItem, Button } from 'react-native-elements'

const BASE_INFO = ['入校时间','毕业时间','出生年月','是否毕业','手机号码','家庭电话','qq号码','微信账号','民族','籍贯','政治面貌'];
const YEAR = [1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,
                1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,
                1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,
                2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
                2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,
                2020,2021,2022,2023,2024,2025,2026,2027,2028,2029, 2030];
const MONTH = [1,2,3,4,5,6,7,8,9,10,11,12];
const POST_KEY = ['admissionDate', 'graduationDate', 'birthdate', 'isGraduated', 'phone', 'phoneFamily','qqNumber',
                  'wecharNumber','nationality','nativePlace','politicalStatus' ];
export default class EditBaseInfo extends Component{
        // 构造
      constructor(props) {
        super(props);
        this.state = {
            rightTitle:this.props.user,
            modalVisible: false,
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
                                  title={l}
                                  rightTitle={this.state.rightTitle[i]?this.state.rightTitle[i]:'未填写'}
                                  onPress={this.otherPress.bind(this,i,l,this.state.rightTitle[i])}
                              />
                          ))
                      }
                  </List>

                  {this.selectData()}
              </ScrollView>
          );
      }

    otherPress(position, title, info){
        switch (position){
            case 0:
                this.selectData();
                this._setModalVisible(true);
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
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

    selectData(){
        return(
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this._setModalVisible(false)}}>

                <View style={[styles.modalContainer, {backgroundColor:'rgba(0, 0, 0, 0.5)'}]}>
                    <View style={[styles.innerContainer, {backgroundColor: '#fff', padding: 20}]}>
                        <Picker
                            prompt="选择年份"
                            selectedValue={1990}
                            onValueChange={this.year.bind(this)}>
                            {YEAR.map((l, i) => (
                                <Picker.Item key={i} label={l+'年'} value={l} />
                            ))}
                        </Picker>
                        <Picker
                            prompt="选择月份"
                            selectedValue={1}
                            onValueChange={this.month.bind(this)}>
                            {MONTH.map((l, i) => (
                                <Picker.Item key={i} label={l+'年'} value={l} />
                            ))}
                        </Picker>
                        <Picker
                            prompt="选择日期"
                            selectedValue={1}
                            onValueChange={this.month.bind(this)}>
                            {MONTH.map((l, i) => (
                                <Picker.Item key={i} label={l+'年'} value={l} />
                            ))}
                        </Picker>
                        <View style={styles.twoButton}>
                            <Button
                                title='取消'
                                color="black"
                                backgroundColor="transparent"
                                onPress={this._setModalVisible.bind(this, false)}
                                buttonStyle={styles.modalButton}/>

                            <Button
                                title='确定'
                                color="black"
                                backgroundColor="transparent"
                                buttonStyle={styles.modalButton}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    year(day){
        this.setState({year:day});
    }

    month(day){
        this.setState({month:day});
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