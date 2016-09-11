/**
 * Created by zues on 2016/9/1.
 */
import React,{ Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const BASEURL = 'http://10.10.68.90:8888';
//初始化Storage
const  storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync同步方法，无缝返回最新数据。
    sync: {
        // 同步方法的具体说明会在后文提到
    }
});

//全局调用Storage
global.storage = storage;

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
                console.log(response.status);
                resolve(response.json());
            }).catch(error => {
                console.log('网络不够给力啊，兄弟！');
                reject(error);
            });
        } )
    }

    //注册
    postMethod(url,myUsername,myPassword) {
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
                    if(response.ok){
                        resolve(response.json());
                    }
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
    //因为登录需要保存cookie，所以和注册分开来写
    postLoginMethod(url,myUsername,myPassword) {
        var myHeaders = [];
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
                    console.log(...myHeaders); //遍历headers拿到数组对象
                    var keyName = 'myCookie';
                    var keyValue = response.headers.get('set-cookie');
                    AsyncStorage.setItem(keyName,keyValue);
                    AsyncStorage.getItem(keyName, (errs, result) => {
                            if (!errs){
                                console.log('result='+ result);
                                return result;
                            }
                        });
                    resolve(response.json());
                })
                .catch(error => {
                    alert("网络出现异常");
                    reject(error);
                })
        });
    }

    postFile(url, imgUri,filename){
        //用来包装响应头的数组
        //构造request的body里面的东西
        let formData = new FormData();
        formData.append('avatar', {uri: imgUri, type: 'image/jpeg', name:filename});

        let options = {};
        options.body = formData;
        options.method = 'post';
        return new Promise((resolve, reject) => {
            fetch(BASEURL+ url, options).then((response) => {
                console.log(response.status);
                resolve(response)
            })
                .catch(error => {
                    alert("上传失败");
                    reject(error);
                })
        })
    }

}