/**
 * Created by zues on 2017/2/21.
 */
/**
 * Created by zues on 2017/2/19.
 */
import React, { Component } from 'react';
import {Modal, StyleSheet, Switch, Text, TouchableOpacity, View, ScrollView, Picker} from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import EditDeatils from './EditDeatils';
import { List, ListItem, Button } from 'react-native-elements'

const BASE_INFO = ['从事行业','工作单位','职务','职称','单位电话','单位地址'];
const POST_KEY = ['presentIndustry', 'workPlace', 'dudy', 'professionalTitle', 'workPhone', 'workAddress'];
export default class EditWorkInfo extends Component{
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
                <NormalToolbar title='工作信息' leftItemFunc={this.back.bind(this)} leftImageSource={require('../img/back.png')}/>
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
            </ScrollView>
        );
    }

    otherPress(position, title, info){
        var params = {title:title,info:info,id:this.props.id,k:POST_KEY[position],callBack:(msg) => {this.refresh(position, msg)}};
        return new Net().toOther(this.props,'EditDeatils',EditDeatils,params);
    }

    back(){
        this.props.callBack(this.state.rightTitle);
        new Net().back(this.props);
    }

    refresh(p, data){
        this.state.rightTitle[p] = data;
        this.forceUpdate();
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