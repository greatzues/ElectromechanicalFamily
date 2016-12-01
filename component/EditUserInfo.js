/**
 * Created by zues on 2016/9/6.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Navigator, ListView, TextInput, dismissKeyboard , ScrollView } from 'react-native';
import Toolbar from './Toolbar';
import Net from '../Tool';
import Picker from 'react-native-picker';
import { Kaede } from 'react-native-textinput-effects';

const UPDATE = '/students/';
const INFO = '/students/getinfo';
const toolbarActions = [{title: '完成', icon: require('./../img/write.png'), show: 'always'},];
const title = ['姓名','班导','专业','入校时间','毕业时间','联系电话','qq号码','微信账号','性别','民族','籍贯','出生年月','政治面貌'
    ,'家庭住址','从事行业','工作单位','职务','职称','单位电话','单位地址','其他'];
export default class DisplayUserInfo extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
                dataSource:ds,
                userData:[],
                realname: '',
                studentId: '',
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
                presentIndustry:'',
                workPlace:'',
                dudy:'',
                professionalTitle:'',
                workPhone:'',
                workAddress:'',
                others:'',

        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Toolbar
                    click={this.back.bind(this)}
                    title= "编辑资料"
                    navIcon = {require('./../img/back.png')}
                    onActionSelected={this.onActionSelected.bind(this)}
                    actions={toolbarActions}/>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                />

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

    renderRow(rowData, sectionID, rowID){

            if(title[rowID]==='性别'){
                return (
                        <Kaede
                            label={title[rowID]}
                            onFocus={this.pickSex.bind(this)}
                            placeholder={rowData}
                            editable={false}
                            value={this.state.sex}
                            ref="textInput"
                        />
                );
            }else if(title[rowID]==='出生年月'){
                return (
                    <Kaede
                        label={title[rowID]}
                        onFocus={this.showDatePicker.bind(this)}
                        placeholder={rowData}
                        value={this.state.birthdate}
                        editable={false}
                    />
                );
            }else if(title[rowID]==='家庭住址'){
                return (
                    <Kaede
                        label={title[rowID]}
                        onFocus={this.showAreaPicker.bind(this)}
                        placeholder={rowData}
                        value={this.state.address}
                        editable={false}
                    />
                );
            }else{
                return(
                    <Kaede
                        label={title[rowID]}
                        placeholder={rowData}
                        labelStyle={{color: 'grey', backgroundColor: 'white'}}
                        inputStyle={{color: 'grey', backgroundColor: '#e9eaed'}}
                        keyboardType="numeric"
                        style={styles.textInput}
                        value={this.state.rowData}
                        onChangeText={text => this.setState({rowData:text})}
                    />
                )
            }
    }


    pickSex(){
        Picker.init({
            pickerData: ['男','女'],
            selectedValue: [0],
            onPickerConfirm: data => {
                this.setState({sex:data[0]});
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
                var date = pickedValue[0]+'-'+pickedValue[1]+'-'+pickedValue[2];
                this.setState({birthdate:date})
            },
            onPickerCancel: pickedValue => {
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
                userData:[
                    response.realname,
                    response.teacher,
                    response.major,
                    new Net().timeToDate(response.admissionDate),
                    new Net().timeToDate(response.graduationDate),
                    response.phone,
                    response.qqNumber,
                    response.wecharNumber,
                    response.sex,
                    response.nationality,
                    response.nativePlace,
                    new Net().timeToDate(response.birthdate),
                    response.politicalStatus,
                    response.address,
                    response.presentIndustry,
                    response.workPlace,
                    response.dudy,
                    response.professionalTitle,
                    response.workPhone,
                    response.workAddress,
                    response.others
                ]
            });
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
        width: device.width - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        margin:10,
        alignSelf:'center'
    },
    input:{
        flexDirection: 'row',
        width:device.width,
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
        width: device.width - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        margin:10,
    },
    textInput:{
        marginTop: 10,
    }
});