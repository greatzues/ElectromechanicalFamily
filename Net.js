/**
 * Created by zues on 2016/9/1.
 */
import React,{ Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BASEURL = 'http://10.10.68.90:8888';
export default class Net  {
    constructor(){

    }
    //传统get方法
    getMethod(url){
        var myHeader = new Headers();
        myHeader.append("Content-Type", "text/plain");
        myHeader.append("Content-Length", content.length.toString());
        myHeader.append("X-Custom-Header", "ProcessThisImmediately");

        const { GET } = this.props;
        fetch(BASEURL+url,{
           method: 'GET',
            headers:myHeader,
            mode:'cors',
            cache: 'default'
        }).than(response =>{
            console.log(response.toString());
        });
    }
    //保存永久数据
    safeStorage(key){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (error, result) => {
                var Data = JSON.parse(result);
                if(error){
                    console.error(error);
                    resolve(null);
                } else {
                    resolve(Data);
                }
            })
        })
    }
    //登录和注册
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
                    console.log(response.url);
                    console.log(response.status);
                    resolve(response.json());
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

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
                    console.log(response.url);
                    console.log(response.status);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}