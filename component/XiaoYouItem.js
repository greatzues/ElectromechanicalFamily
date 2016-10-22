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
                  <Image source={{uri:'http://pic2.zhimg.com/2bc27c88529c52364f604b8f48ea352d.jpg'}} style={styles.avatar}/>
                  <Text style={styles.name}>温家林</Text>
                  <Text style={styles.description}>温家林，男，1978年3月生，广东省怀集人，中共党员，现为中共开平市委办公室副主任（排首位，正科级）。

                      大学期间，曾参加校党委宣传部校报记者团，担任副团长兼校报学生编辑部部长，创办机电工程系系报。曾在市级、校级报刊发表文章数十篇，多篇新闻稿件获全国、省、校级好新闻奖。
                      2002年参加江门市选调生考试，被录用在江门市江海区委区政府办公室工作。2002年7月至2004年，主要从事信息新闻工作，期间江海区委办连续3年获全市信息工作先进单位，其本人连续两年被江门市委办评为信息工作先进个人；在《人民日报》等各级新闻媒体发表新闻稿件（图片）100多篇（次），其中省级以上媒体近20篇（次），多篇新闻稿件被评为通讯员好新闻奖，其本人也连续三年6次被评为优秀通讯员。2004年，被江门团市委评为“江门侨乡建设突击手”。
                      2005年至2009年3月，主要从事政策研究以及领导讲话稿的起草工作，着力于江海区战略思路及政策的研究，期间撰写了大量领导会议讲话、调研报告和综合材料，参与了江海区委六届、七届全会报告的起草。期间，其本人被评为优秀共产党员。
                      2009年3月，从江门市江海区调任中共开平市委办公室副主任；2010年4月任中共开平市委办公室副主任（排首位，正科级），分管单位人事、党群以及市委政研室工作。
                      主要简历：
                      1998.9-2002.7，五邑大学机械电子工程专业学习，大学本科毕业；2002.7-2004.12，江门市江海区委区政府办公室信息督查股科员；2004.12-2006.8，江门市江海区委区政府办公室信息督查股副股长；2006.8-2007.8，江门市江海区委区政府办公室政策研究室副主任（正股级）；2007.8-2009.3，江门市江海区委政策研究室主任（副科级）；（期间，2008.5-2008.6江门市委党校中青年干部培训二班学习）2009.3-2009.4，中共开平市委办公室副主任；2009.4，中共开平市委办公室副主任（排首位，正科级）
                      工作感言：一个人的成长，源于不断地学习。
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
