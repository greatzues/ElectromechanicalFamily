import React, { Component } from 'react';
import {Modal, StyleSheet, Switch, Text, TouchableOpacity, View, ScrollView, BackAndroid, Platform} from 'react-native';
import { List, ListItem, Button, FormLabel, FormInput } from 'react-native-elements';
import Picker from 'react-native-picker';
import NormalToolbar from './NormalToolbar';
import Toast from 'react-native-root-toast';
import EditBaseInfo from './EditBaseInfo';
import EditWorkInfo from './EditWorkInfo';
import Net from '../Tool';
import myImagePicker from 'react-native-image-crop-picker';

const AVATAR = '/avatar/';
const UPDATE = '/students/';
const UPLOAD = '/student/upload';
const USER_INFO = [{title:'更换头像',icon:null},{title:'真实姓名',icon:'person'},{title:'学号',icon:'card-membership'},{title:'专业',icon:'school'},{title:'班导师',icon:'star'}];
const OTHER_INFO = [{title:'性别',icon:'wc'},{title:'基本信息',icon:'account-balance'},{title:'工作信息',icon:'work'},{title:'座右铭',icon:'lightbulb-outline'},{title:'家庭住址',icon:'location-on'}];
export default class EditInfo extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        let user = this.props.user;
        this.state = {
            modalVisible: false,
            motto:null,
            userInfo:[BASEURL+AVATAR+user.avatar,user.realname,user.studentId,user.major,user.teacher],
            workRightTitle:[user.presentIndustry, user.workPlace, user.dudy, user.professionalTitle, user.workPhone, user.workAddress],
            baseRightTitle:[user.admissionDate, user.graduationDate, user.birthdate, user.phone, user.phoneFamily,
                user.qqNumber, user.wecharNumber, user.nationality, user.nativePlace, user.politicalStatus],
        };
      }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        if(Platform.OS === 'android'){
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    //解除定时器
    componentWillUnmount() {
        if(Platform.OS === 'android'){
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <NormalToolbar title='个人编辑' leftItemFunc={this.back.bind(this)} leftImageSource={require('../img/back.png')}/>
                <List containerStyle={{marginTop:15}}>
                    {
                        USER_INFO.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.title}
                                leftIcon={{name:l.icon}}
                                avatar={i===0?this.state.userInfo[i]===null?require('../img/UserBackground.jpg'):{uri:this.state.userInfo[i]}:null}
                                avatarStyle={{height:50,width:50,marginRight:5}}
                                rightTitle={i===0?null:this.state.userInfo[i]}
                                hideChevron={true}
                                onPress={i===0? this.pickSingle.bind(this):() => Toast.show('如需修改请联系管理员！')}
                            />
                        ))
                    }
                </List>

                <List containerStyle={{marginTop:20}}>
                    {
                        OTHER_INFO.map((l, i) => (
                            <ListItem
                                roundAvatar
                                key={i}
                                title={l.title}
                                leftIcon={{name:l.icon}}
                                onPress={this.otherPress.bind(this,i)}
                            />
                        ))
                    }
                </List>

                {this.myModal()}
            </ScrollView>
        );
    }

    otherPress(position){
        switch (position){
            case 0:
                this.pickSex();
                break;
            case 1:
                var params = {user:this.state.baseRightTitle,callBack:(msg)=>{this.refreshBase(msg)},id:this.props.user.id};
                new Net().toOther(this.props,'EditBaseInfo',EditBaseInfo,params);
                break;
            case 2:
                var params = {user:this.state.workRightTitle,callBack:(msg)=>{this.refreshWork(msg)},id:this.props.user.id};
                new Net().toOther(this.props,'EditWorkInfo',EditWorkInfo,params);
                break;
            case 3:
                this._setModalVisible(true);
                break;
            case 4:
                this.showAreaPicker();
                break;
            default:
                return ;
        }
    }

    refreshWork(data){
        this.state.workRightTitle= data;
        this.forceUpdate();
    }

    refreshBase(data){
        this.state.baseRightTitle= data;
        this.forceUpdate();
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    back(){
        this.props.update(true);
        new Net().back(this.props);
    }
    //修改安卓物理返回键的功能
    onBackAndroid = () => {
        this.props.update(true);
        new Net().back(this.props);
        return true;
    };

    myModal(){
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this._setModalVisible(false)}}>

                <View style={[styles.modalContainer, {backgroundColor:'rgba(0, 0, 0, 0.5)'}]}>
                    <View style={[styles.innerContainer, {backgroundColor: '#fff', padding: 20}]}>
                        <FormLabel>座右铭</FormLabel>
                        <FormInput
                            placeholder={this.props.user.others === null?'我就是我，不一样的烟火':this.props.user.others}
                            onChangeText={(text) => this.setState({motto:text})}
                        />
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
                                onPress={this.postMotto.bind(this,this.state.motto)}
                                buttonStyle={styles.modalButton}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    postMotto(motto){
        let postData = {others:motto};
        this.postData(postData);
        this._setModalVisible(false);
    }

    postData(postData){
        new Net().putMethod(UPDATE+this.props.user.id,postData).then((responseJson) => {
            console.log(responseJson.status);
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
    }

    createAreaData(callback){
        fetch('https://raw.githubusercontent.com/beefe/react-native-picker/master/example/PickerTest/area.json').then(res => {
            res.json().then(area => {
                let data = [];
                let len = area.length;
                for(let i=0;i<len;i++){
                    let city = [];
                    for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                        let _city = {};
                        _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                        city.push(_city);
                    }

                    let _data = {};
                    _data[area[i]['name']] = city;
                    data.push(_data);
                }
                callback(data);
            });
        }, err => {
            Toast.show('网络不给力，请重试！')
        });
    }

    showAreaPicker() {
        this.createAreaData(data => {
            Picker.init({
                pickerData: data,
                selectedValue: ['广东', '江门', '蓬江区'],
                onPickerConfirm: pickedValue => {
                    var area = pickedValue[0]+'省'+pickedValue[1]+'市'+pickedValue[2];
                    this.postData({address:area});
                },
                onPickerCancel: pickedValue => {
                    console.log('area', pickedValue);
                },
                onPickerSelect: pickedValue => {
                    console.log('area', pickedValue);
                }
            });
            Picker.show();
        });
    }

    pickSex(){
        Picker.init({
            pickerData: ['男','女'],
            selectedValue: [0],
            onPickerConfirm: data => {
                this.postData({sex:data[0]});
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

    pickSingle(){
        myImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.state.userInfo[0] = image.path;
            this.forceUpdate();
            this.updateAvatar(image.path);
        }).catch(e => {
            console.log('Error:'+e);
        });
    }

    updateAvatar(path){
        new Net().postFile(UPLOAD,path)
            .then((data) => {

            }).catch(error => {
            Toast.show('网络出现小问题，请重试')
        });
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