/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Navigator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Net from './Net';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import BaseInfo from './component/BaseInfo';

const deviceWidth = Dimensions.get('window').width;
export default class Users extends Component {
    constructor(props){
        super(props);
        this.state ={
            userName: '请登录',
            avatarSource: null,
            videoSource: null,
            imgUrl: null,
            filename: null,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (

            <View style={styles.container}>
                <Image
                    source={require('./img/UserBackground.jpg')}
                    style={styles.userBackground}>
                    <View>
                        { this.state.avatarSource === null ?
                            <Image source={require('./img/UserDafault.png')} style={styles.avatar}></Image> :
                            <Image style={styles.avatar} source={this.state.avatarSource} />
                        }
                    </View>
                    <Text style={{color:'white'}}>你好，{this.state.userName.name}</Text>
                    <View style={{flexDirection: 'row',}}>
                        <TouchableOpacity
                            style={{borderRadius:10,borderWidth:1,borderColor:'white',padding:5,marginRight:3}}
                            onPress={this.avatarUpload.bind(this)}>
                            <Text style={{color:'white',marginRight:10,marginLeft:10}}>头像上传</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{borderRadius:10,borderWidth:1,borderColor:'white',padding:5,marginLeft:3}}
                            onPress={this.props.toEdit}>
                            <Text style={{color:'white',marginRight:10,marginLeft:10}}>编辑信息</Text>
                        </TouchableOpacity>
                    </View>
                </Image>

                <View style={styles.container}>
                    <ScrollableTabView
                        style={{height:50}}
                        renderTabBar={()=><DefaultTabBar backgroundColor='#eee' />}
                        tabBarPosition='overlayTop'
                    >
                        <ScrollView tabLabel='基本信息' style={{paddingTop:40}}>
                            <BaseInfo name = '基本信息'/>
                        </ScrollView>
                        <ScrollView tabLabel='工作信息' style={{paddingTop:40}}>
                            <BaseInfo name = '工作信息'/>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
    //backgroundColor='rgba(255, 255, 255, 0.7)'这个是原来的tabBar,透明色，透明度为0.7。

    fetchData(){
        var URl = '/student/getinfo';
        var response;
        new Net().getMethod(URl).then((responseData) => {
            response = responseData.response;

            this.setState({userName:response});
        });
    }

    avatarUpload(){
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title:'选择图片',
            chooseFromLibraryButtonTitle: '相册',
            takePhotoButtonTitle:'拍照',
            cancelButtonTitle:'取消',
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            this.setState({
                imgUrl:response.uri,
                fileName:response.fileName,
            });

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                // Or:
                // if (Platform.OS === 'android') {
                //   source = {uri: response.uri, isStatic: true};
                // } else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                this.setState({
                    avatarSource: source
                });

                new Net().postFile('/student/upload2',this.state.imgUrl,this.state.filename)
                    .then((data) => {

                    });
            }
        });

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    avatar:{
        borderRadius:75,
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        marginTop:30,
        marginBottom: 10,
    },
    userBackground:{
        height:180,
        width:deviceWidth,
        alignItems: 'center',
    }
});