/**
 * Created by zues on 2016/10/18.
 */
import React, { Component } from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity, ActivityIndicator,Navigator, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default class XiaoYouItem extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data : this.props.Data,
        };
      }

      render(){
          var data = this.state.data;
          return(
              <View style={styles.container}>
                  <Image source={{uri:'https://avatars1.githubusercontent.com/u/2763894?v=3&s=466'}} style={styles.avatar}/>
                  <Text style={styles.name}>唐杰英</Text>
                  <Text style={styles.description}>唐杰英，男，1993年，广东省，袂卓工作室安卓组组长。

                      大学期间，曾参加计算机学院软件设计大赛，担任经济管理学院袂卓工作室技术组组长，
                      	省级大学生创新创业训练计划
                      	负责后台数据库设计，主要功能需求分析，搭建后台API接口。
                      	目前正在规划当中，初步设想在安卓平台使用，已获得省级专项科研资金5000元。
                      	该网站属于校内国际贸易法学习网站，属于精品课程网站。
                      	网站主要功能是在线查看课程信息、课程资料以及课程相关视频。
                      	主要在该项目负责后台数据库设计，与相关老师交流和做需求分析。
                      主要简历：
                      【奖学金】 2012-2013年度国家励志奖学金、2013-2014年度五邑大学大学奖学金
                      【竞赛获奖】2014 五邑大学软件设计大赛一等奖
                      2015年 五邑大学“挑战杯”校内优胜奖

                  </Text>
              </View>
          );
      }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginTop:5,
        marginLeft:5,
        marginRight:5
    },
    avatar:{
        flex:1,
        height:200,
    },
    name:{
        fontSize:50,
        marginTop:10,
    },
    description:{
        fontSize:20,
        marginTop:10,
    }
});
