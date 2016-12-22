/**
 * Created by zues on 2016/9/6.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Navigator, ListView, TextInput , ScrollView } from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import Picker from 'react-native-picker';
import { Kaede } from 'react-native-textinput-effects';
import dismissKeyboard from 'react-native-dismiss-keyboard'

const UPDATE = '/students/';
const INFO = '/students/getinfo';
const toolbarActions = [{title: '完成', icon: require('./../img/write.png'), show: 'always'},];

//打开时间选择器的时候会出现进程意外死亡的问题，以及编辑完之后的页面更新问题
export default class DisplayUserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            realname: '',
            teacher: '',
            major: '',
            admissionDate: '',
            graduationDate: '',
            phone: '',
            qqNumber: '',
            wecharNumber: '',
            sex: '',
            nationality: '',
            nativePlace: '',
            birthdate: '',
            politicalStatus: '',
            address: '',
            presentIndustry: '',
            workPlace: '',
            dudy: '',
            professionalTitle: '',
            workPhone: '',
            workAddress: '',
            others: '',
        };
    }

    render(){
        var response = this.state;
        return(
            <View style={styles.container}>
                <NormalToolbar title='班级圈' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>
                <ScrollView>
                    <View style={styles.container}>
                        {this.myModel('姓名',   response.realname,(text)=>this.setState({realname:text}))}
                        {this.myModel('班导',   response.teacher,(text)=>this.setState({teacher:text}))}
                        {this.myModel('专业',   response.major,(text)=>this.setState({major:text}))}
                        {this.myModel('入校时间','请选择时间',(text)=>this.setState({admissionDate:text}),this.showDatePicker.bind(this))}
                        {this.myModel('毕业时间','请选择时间',(text)=>this.setState({graduationDate:text}),this.showDatePicker.bind(this))}
                        {this.myModel('电话',   response.phone,(text)=>this.setState({phone:text}))}
                        {this.myModel('QQ',    response.qqNumber,(text)=>this.setState({qqNumber:text}))}
                        {this.myModel('微信',   response.wecharNumber,(text)=>this.setState({wecharNumber:text}))}
                        {this.myModel('性别',   response.sex,(text)=>this.setState({sex:text}),this.pickSex.bind(this))}
                        {this.myModel('民族',   response.nationality,(text)=>this.setState({nationality:text}))}
                        {this.myModel('籍贯',   response.nativePlace,(text)=>this.setState({nativePlace:text}))}
                        {this.myModel('出生年月','请选择时间',(text)=>this.setState({birthdate:text}),this.showDatePicker.bind(this))}
                        {this.myModel('政治面貌',response.politicalStatus,(text)=>this.setState({politicalStatus:text}))}
                        {this.myModel('家庭地址',response.address,(text)=>this.setState({address:text}),this.showAreaPicker.bind(this))}
                        {this.myModel('从事行业',response.presentIndustry,(text)=>this.setState({presentIndustry:text}))}
                        {this.myModel('工作单位',response.workPlace,(text)=>this.setState({workPlace:text}))}
                        {this.myModel('职务',    response.dudy,(text)=>this.setState({dudy:text}))}
                        {this.myModel('职称',    response.professionalTitle,(text)=>this.setState({professionalTitle:text}))}
                        {this.myModel('单位电话',response.workPhone,(text)=>this.setState({workPhone:text}))}
                        {this.myModel('单位地址',response.workAddress,(text)=>this.setState({workAddress:text}))}
                        {this.myModel('其他信息',response.others,(text)=>this.setState({others:text}))}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    onPress = {this.editDoneButton.bind(this)}
                    disabled = {this.state.disabled}>
                    <View style={styles.loginButton}>
                        <Text style={{margin: 30,color:'white', fontSize:20}}>完成</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    myModel(Label,placeholder,onChangeText,focus){
        return (
            <Kaede
                label={Label}
                placeholder={placeholder}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                style={styles.textInput}
                onChangeText={onChangeText}
                onFocus={focus}
            />
        );
    }

    pickSex(){
        Picker.init({
            pickerData: ['男','女'],
            selectedValue: [0],
            onPickerConfirm: data => {
                dismissKeyboard();
                this.setState({sex:data[0]});
            },
            onPickerCancel: data => {
                dismissKeyboard();
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
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
            console.log(err);
        });
    }

    showAreaPicker() {
        this.createAreaData(data => {
            Picker.init({
                pickerData: data,
                selectedValue: ['河北', '唐山', '古冶区'],
                onPickerConfirm: pickedValue => {
                    var area = pickedValue[0]+'省'+pickedValue[1]+'市'+pickedValue[2];
                    this.setState({address:area});
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

    componentDidMount() {
        this.fetchData();
    }

    createDateData(){
        let date = [];
        for(let i=1990;i<2000;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'日'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'日'] = month;
            date.push(_date);
        }
        return date;
    }

    showDatePicker() {
        var data = this.createDateData();
        Picker.init({
            pickerData: data,
            selectedValue: ['2015', '12', '12'],
            onPickerConfirm: pickedValue => {
                dismissKeyboard();
                var date = pickedValue[0]+'-'+pickedValue[1]+'-'+pickedValue[2];
                this.setState({birthdate:date})
            },
            onPickerCancel: pickedValue => {
                dismissKeyboard();
                console.log('date', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('date', pickedValue);
            }
        });
        Picker.show();
    }

    //编辑完成
    editDoneButton(){
        var postData = {
            realname: this.state.realname,
            teacher: this.state.teacher,
            major: this.state.major,
            admissionDate: this.state.admissionDate,
            graduationDate: this.state.graduationDate,
            phone: this.state.phone,
            qqNumber: this.state.qqNumber,
            wecharNumber: this.state.wecharNumber,
            sex: this.state.sex,
            nationality: this.state.nationality,
            nativePlace: this.state.nativePlace,
            birthdate: this.state.birthdate,
            politicalStatus: this.state.politicalStatus,
            address: this.state.address,
            presentIndustry:this.state.presentIndustry,
            workPlace:this.state.workPlace,
            dudy:this.state.dudy,
            professionalTitle:this.state.professionalTitle,
            workPhone:this.state.workPhone,
            workAddress:this.state.workAddress,
            others:this.state.others,
        };
        console.log(postData);
        this.updateInfo(postData);
        this.back();
    }

    //取消编辑，返回到user页面
    back(){
        const { navigator } = this.props;
        if(this.props.update){
            this.props.update(true);
        }
        if (navigator){
            navigator.pop();
        }
    }

    //完成编辑上传到服务器
    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        alert('我是个暂时没用处的toolbar ');
    }

    updateInfo(postData){
        return new Net().putMethod(UPDATE+this.props.id,postData).then((responseJson) => {
            console.log(responseJson.status);
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
    }

    //拿到原来的信息填写到editText上
    fetchData(){
        return new Net().getMethod(INFO).then((responseData) => {
            let response = responseData.response;
            this.setState({
                realname : response.realname,
                classes : response.classes,
                teacher : response.teacher,
                major : response.major,
                admissionDate : response.admissionDate,
                graduationDate : response.graduationDate,
                phone : response.phone,
                qqNumber : response.qqNumber,
                wecharNumber : response.wecharNumber,
                sex : response.sex,
                nationality : response.nationality,
                nativePlace  :response.nativePlace,
                birthdate : response.birthdate,
                politicalStatus : response.politicalStatus,
                address : response.address,
                presentIndustry:response.presentIndustry,
                workPlace:response.workPlace,
                dudy:response.dudy,
                professionalTitle:response.professionalTitle,
                workPhone:response.workPhone,
                workAddress:response.workAddress,
                others:response.others,
            }) ;
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    textInput: {
        flex:1,
        color:'black',
    },
    loginButton:{
        justifyContent:'center',
        alignItems: 'center',
        width: window.width - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        margin:10,
        alignSelf:'center'
    },
    input:{
        flexDirection: 'row',
        width:window.width,
        alignItems:'center',
        padding:8,
        borderBottomWidth: 0.7,
        borderBottomColor: '#bcd3eb',
        borderStyle: 'solid'
    },
    rowTitle:{
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ccc',
    },
    loginButton:{
        justifyContent:'center',
        alignItems: 'center',
        width: window.width - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        margin:10,
    },
    textInput:{
        marginTop: 10,
    },

    labelStyle:{
        color: 'grey',
        backgroundColor: 'white'
    },
    inputStyle:{
        color: 'grey',
        backgroundColor: '#e9eaed'
    },

});