/**
 * Created by zues on 2016/10/23.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView, TextInput, TouchableOpacity,
    Navigator, Dimensions, Alert, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import Toolbar from './Toolbar';
import ImagePicker from 'react-native-image-crop-picker';
import Net from '../Net';
import PicDetail from './PicDetail';

var toolbarActions = [{title: 'camera', icon: require('./../img/camera.png'), show: 'always'},];
var window = Dimensions.get('window'); //这个参数可以全局使用


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
                <Toolbar
                    title="班级圈"
                    navIcon = {require('../img/back.png')}
                    click={this.click.bind(this)}
                    actions={toolbarActions}
                    onActionSelected={this.onActionSelected.bind(this)}
                />

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
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.state.images.push({uri:image.path,type:image.mime,name:image.path.replace(/^.*[\\\/]/, '')});
            this.setState({images:this.state.images});
        }).catch(e => alert(e));
    }
    //文件上传
    fileUpload(){
        if(this.state.message === ""){
            ToastAndroid.show("亲，分享点文字吧！",ToastAndroid.SHORT);
            return null;
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
        this.back();
    }
    //获取上传的formData对象
    getFile(fileObject,myDate,myMassageText){
        let formData = new FormData();
        formData.append('date',myDate);
        formData.append('massageText',myMassageText);
        formData.append('classNumber','0');
        //后期尝试用map来遍历
        formData.append('messagePic1',fileObject[0]);
        formData.append('messagePic2',fileObject[1]);
        formData.append('messagePic3',fileObject[2]);
        formData.append('messagePic4',fileObject[3]);
        formData.append('messagePic5',fileObject[4]);
        formData.append('messagePic6',fileObject[5]);
        formData.append('messagePic7',fileObject[6]);
        formData.append('messagePic8',fileObject[7]);
        formData.append('messagePic9',fileObject[8]);
        return formData;
    }
    //选择多图片上传，这里暂时还没解决先拍照然后再上传文件，图片增加的问题
    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 9 //ios only
        }).then(images => {
            // var root = images.map(i=>{
            //     this.state.images.push({uri: i.path, type: i.mime,name:i.path.replace(/^.*[\\\/]/, '')});
            //     return this.state.images;
            // });
            // console.log(root);
            this.setState({
                images: images.map(i => {
                    //console.log("filename",i.path.replace(/^.*[\\\/]/, '')); //正则匹配拿到filename
                    return {uri: i.path, type: i.mime,name:i.path.replace(/^.*[\\\/]/, '')};
                })
            });
        }).catch(e => alert(e));
    }

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        switch (position){
            case 0:
                //此处编写消息发布,如果消息为空弹出toast
                this.pickCamera();
                break;
        }
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
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }

    toPicDetail(uri){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'PicDetail',
                component:PicDetail,
                params:{uri:uri}
            })
        }
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