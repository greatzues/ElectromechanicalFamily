/**
 * Created by zues on 2016/10/23.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView, TextInput, TouchableOpacity,
    Navigator, Dimensions, Alert, ToastAndroid, TouchableWithoutFeedback, Platform } from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import PicDetail from './PicDetail';

var window = Dimensions.get('window'); //这个参数可以全局使用
const picKey = [
    'messagePic1',
    'messagePic2',
    'messagePic3',
    'messagePic4',
    'messagePic5',
    'messagePic6',
    'messagePic7',
    'messagePic8',
    'messagePic9'
];

export default class EditMessage extends Component{
    // 构造
      constructor(props) {
        super(props);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 初始状态
        this.state = {
            images: [],
            disabled:false,
            dataSource: ds,
            ifDelete:false,
            message:"",
        };
      }

    render(){
        return(
            <View style={styles.container}>
                <NormalToolbar
                    title='班级圈'
                    leftImageSource={require('../img/back.png')}
                    rightItemTitle='拍照'
                    rightTextColor='#3393F2'
                    leftItemFunc={this.click.bind(this)}
                    rightItemFunc={this.pickCamera.bind(this)}/>

                    <TextInput
                        multiline={true}
                        underlineColorAndroid="transparent"
                        placeholder="记录今天的快乐..."
                        maxLength={255}
                        numberOfLines={8}
                        style={styles.body}
                        onChangeText={(text) => this.setState({message:text})}
                    />

                <ListView
                    ref="listView"
                    dataSource={this.state.dataSource.cloneWithRows(this.state.images)}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={this.renderHeader.bind(this)}
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                />

                <TouchableWithoutFeedback
                    onPress = {this.fileUpload.bind(this)}
                    disabled = {this.state.disabled}>
                    <View style={styles.shareButton}>
                        <Text style={{margin: 30,color:'white', fontSize:20}}>分享</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
    //长按显示delete按钮
    renderRow(rowData, sectionID, rowID){
        return (
            <View>
                <TouchableOpacity
                    onLongPress={this.ifDelete.bind(this) }
                    onPress={this.toPicDetail.bind(this,rowData.uri)}>
                    <View style={styles.itemContainer}>
                        <Image
                            style={styles.imageItem}
                            source={{uri:rowData.uri}}
                            resizeMode='contain'
                        />
                    </View>

                </TouchableOpacity>
                {this.state.ifDelete?<TouchableWithoutFeedback  onPress={this.deletePic.bind(this,rowID)}>
                    <Image source={require('../img/deletePic.png')} style={styles.deletePic}/>
                </TouchableWithoutFeedback>:null}
            </View>
        );
    }

    renderHeader(){
        return (
            <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
                <View style={styles.itemContainer}>
                    <Image
                        style={styles.imageItem}
                        source={require('../img/addPic.png')}
                        resizeMode='contain'
                    />
                </View>
            </TouchableOpacity>
        );
    }
    //从相册选择图片
    pickCamera(){
        new Net().pickCamera(image => {
            this.state.images.push({uri:image.path,type:image.mime,name:image.path.replace(/^.*[\\\/]/, '')});
            this.setState({images:this.state.images});
        });
    }
    //文件上传
    fileUpload(){
        if(Platform.OS === 'android'){
            if(this.state.message === ""){
                ToastAndroid.show("亲，分享点文字吧！",ToastAndroid.SHORT);
                return null;
            }

            if(this.state.images.length >9){
                ToastAndroid.show("限制9张长按图片进行删除！",ToastAndroid.SHORT);
                return null;
            }
        }
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
        new Net().postMultiFile(this.getFile(this.state.images,post,this.state.message));
        //返回之后刷新页面
        const { navigator } = this.props;
        if(this.props.update){
            this.props.update(true);
        }
        navigator.pop();
    }

    /**
     * 获取上传的formData对象
     * @param fileObject
     * @param myDate
     * @param myMassageText
     * @returns {FormData}
     */
    getFile(fileObject,myDate,myMassageText){
        let formData = new FormData();
        formData.append('date',myDate);
        formData.append('messageText',myMassageText);
        formData.append('classNumber','0');
        //后期尝试用map来遍历
        for(i=0;i<fileObject.length;i++){
            formData.append(picKey[i],fileObject[i]);
        }
        return formData;
    }
    //选择多图片上传，这里暂时还没解决先拍照然后再上传文件，图片增加的问题
    pickMultiple() {
        new Net().pickMultiple(images => {
            this.setState({
                images: images.map(i => {
                    //console.log("filename",i.path.replace(/^.*[\\\/]/, '')); //正则匹配拿到filename
                    return {uri: i.path, type: i.mime,name:i.path.replace(/^.*[\\\/]/, '')};
                })
            });
        })
    }

    //确认退出编辑
    click(){
        Alert.alert(
            '退出编辑',
            '确认退出编辑，退出后编辑的文字就不在保存',
            [
                {text:'取消', onPress: () => console.log("Cancel quit")},
                {text:'确定', onPress: () => this.back()}
            ]
        )
    }
    //这个方法封装到工具类
    back(){
        new Net().back(this.props);
    }

    toPicDetail(uri){
        var params = {uri:uri};
        new Net().toOther(this.props,'PicDetail', PicDetail, params)
    }

    deletePic(rowID){
        var array = new Array();
        array = this.state.images;
        array.splice(rowID,1);
        console.log(array);
        this.setState({ifDelete:false,images:array});
    }

    ifDelete(){
        this.state.ifDelete?this.setState({ifDelete:false}):this.setState({ifDelete:true});
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    body:{
        textAlignVertical: 'top', //这段代码可以让TextInput在多行的情况下，text位于最高，而不是居中。
    },
    shareButton:{
        justifyContent:'center',
        alignItems: 'center',
        width: window.width - 20,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        margin:10,
    },
    imageItem:{
        width:window.width*0.3,
        height:80,
    },
    itemContainer:{
        padding:3,
    },
    textInput:{
        flex:1,
        height:window.height*0.2,
        width:window.width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'red',
    },
    deletePic:{
        right:0,
        top:0,
        height:20,
        width:20,
        position :'absolute',
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});