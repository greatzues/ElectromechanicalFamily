/**
 * Created by zues on 2016/9/1.
 */
import React,{ Component } from 'react';
import { AsyncStorage, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast'

const baseurl = 'http://sinvarh.com';
const WINDOW = Dimensions.get('window');
global.BASEURL = baseurl;
global.device = WINDOW;
/**
 * 封装常用方法
 */
export default class Net  {
    constructor(){}

    //传统get方法
    getMethod(url){
        var myHeader = new Headers();
        myHeader.append('Accept', 'application/json');
        myHeader.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) =>{
            fetch(BASEURL+url,{
                method: 'get',
                headers:myHeader,
            }).then(response =>{
                if(response.ok){
                    resolve(response.json());
                }
            }).catch(error => {
                Toast.show('网络开小差 请重试');
                reject(error);
            });
        } )
    }

    //注册
    postMethod(url,postData) {
        return new Promise((resolve, reject) => {
            fetch(BASEURL+url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(postData),
            })
                .then((response) => {
                    if(response.ok){
                        resolve(response.json());
                    }
                })
                .catch(error => {
                    Toast.show('网络开小差 请重试');
                    reject(error);
                })
        });
    }
    //put method 上传学生信息
    putMethod(url,postData) {
        return new Promise((resolve, reject) => {
            fetch(BASEURL+url, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(postData),
            })
                .then((response) => {
                    console.log(response);
                })
                .catch(error => {
                    Toast.show('网络开小差 请重试');
                    reject(error);
                })
        });
    }

    //登录
    postLoginMethod(url,myUsername,myPassword) {
        return new Promise((resolve, reject) => {
            fetch(BASEURL+url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    username: myUsername,
                    password: myPassword,
                }),
            })
                .then((response) => {
                    console.log(response);
                    console.log(response.headers.get('pragma'));
                    if(response.ok){
                        resolve(response.json());
                    };
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
    //上传单个文件
    postFile(url, uri){
        let formData = new FormData();
        formData.append('avatar',{uri: uri, type: 'application/octet-stream'});

        let options = {};
        options.body = formData;
        options.method = 'POST';
        return new Promise((resolve, reject) => {
            fetch(BASEURL+ url, options).then((response) => {
                console.log(response);
                resolve(response);
            })
                .catch(error => {
                    Toast.show("上传失败");
                    reject(error);
                })
        })
    }
    //上传多个文件，需要传递一个formData对象
    postMultiFile(formData){
        return new Promise((resolve, reject) => {
            fetch(BASEURL+'/postmessages',{
                body:formData,
                method:'post',
                header:{
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            }).then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log('error:'+err);
            })
        })
    }

    toOther(page, name, component, params){
        const {navigator} = page;
        if (navigator){
            navigator.push({
                name:name,
                component:component,
                params:params
            })
        }
    }

    back(page){
        const { navigator } = page;
        if (navigator){
            navigator.pop();
        }
    }

    pickMultiple(callback) {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 9 //ios only
        }).then(callback).catch(e => Toast.show('肯定是相册在偷懒！'));
    }

    pickCamera(callback){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(callback).catch(e => Toast.show('肯定是相机在偷懒！'));
    }

    pickSingle(callback){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(callback).catch(e => {});
    }

    saveKey(key, rowData){
        //使用例子：new Net().saveKey('loginState',{username: '1234567'});
        storage.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            rawData: rowData,
        });
    }

    loadKey(key){
        //使用例子：new Net().loadKey('loginState').then(r => alert(r.username));
        return storage.load({
            key: key,
            autoSync: false,
        }).catch(e =>{
            console.log(e.message);
            switch (e.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }
    //清除某个key下的所有数据
    clearKeyAllData(key){
        storage.clearMapForKey(key);
    }
    // 获取某个key下的所有数据
    getKeyAllData(key){
        //使用例子：new Net().getKeyAllData('keyName').then(r => console.log(r));
        return storage.getAllDataForKey(key)
            .catch(e => {
                console.warn(e.message);
            });
    }
    //时间戳转化为日期，传入13位的数字
    timeToDate(time){
        var date = new Date(time);
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        return Y+M+D;
    }
    //将日期格式1970-01-01转化为时间戳
    dateToTime(myDate){
        var date = new Date(myDate.replace(/-/g, '/'));
        return date.getTime();
    }

    getStudentInfoById(id){
        var myHeader = new Headers();
        myHeader.append('Accept', 'application/json');
        myHeader.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) =>{
            fetch(BASEURL+'/students/'+id,{
                method: 'get',
                headers:myHeader,
            }).then(response =>{
                if(response.ok){
                    resolve(response.json());
                }
            }).catch(error => {
                reject(error);
            });
        } )
    }
}