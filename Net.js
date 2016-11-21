/**
 * Created by zues on 2016/9/1.
 */
import React,{ Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const BASEURL = 'http://119.29.184.235:8080/jd';
// const BASEURL = 'http://10.10.68.117:8888';
global.BASEURL = BASEURL;

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
                console.log(response);
                if(response.ok){
                    resolve(response.json());
                }
            }).catch(error => {
                alert('请检查网络连接');
                console.error(error);
                reject(error);
            });
        } )
    }

    //使用知乎来测试
    getZhiHuMethod(url,postData){
        var myHeader = new Headers();
        myHeader.append('Accept', 'application/json');
        myHeader.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) =>{
            fetch(url,{
                method: 'get',
                headers:myHeader,
            }).then(response =>{
                if(response.ok){
                    resolve(response.json());
                }
            }).catch(error => {
                alert('请检查网络连接');
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
                    console.log(response);
                    if(response.ok){
                        resolve(response.json());
                    }
                })
                .catch(error => {
                    alert('请检查网络连接');
                    reject(error);
                })
        });
    }
    //因为登录需要保存cookie，所以和注册分开来写
    postLoginMethod(url,myUsername,myPassword) {
        var myHeaders = [];
        console.log('username:'+myUsername + ', password:'+myPassword)
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
                    myHeaders = response.headers;
                    console.log(...myHeaders); //遍历headers
                    var keyName = 'myCookie';
                    var keyValue = response.headers.get('set-cookie');
                    AsyncStorage.setItem(keyName,keyValue);
                    AsyncStorage.getItem(keyName, (errs, result) => {
                            if (!errs){
                                console.log('result='+ result);
                                return result;
                            }
                        });

                    if(response.ok){
                        resolve(response.json());
                    };
                })
                .catch(error => {
                    alert('请检查网络连接');
                    reject(error);
                })
        });
    }
    //上传单个文件
    postFile(url, imgUri){
        // 用来包装响应头的数组
        // 构造request的body里面的东西
        let formData = new FormData();
        formData.append('avatar',{uri: imgUri, type: 'image/jpeg'});

        let options = {};
        options.body = formData;
        options.method = 'post';
        options.headers= {
            'Content-Type': 'multipart/form-data',
        };
        return new Promise((resolve, reject) => {
            fetch(BASEURL+ url, options).then((response) => {
                console.log(response.status);
                resolve(response);
            })
                .catch(error => {
                    alert("上传失败");
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


}