/**
 * Created by zues on 2016/10/16.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Navigator, findNodeHandle ,AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Net from './Net';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class XiaoYouIntroduce extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

      render(){
          return (
              <View style={styles.container}>
                  <ScrollableTabView
                      style={{height:50}}
                      renderTabBar={()=><DefaultTabBar backgroundColor='#eee' />}
                      tabBarPosition='overlayTop'
                  >
                      <ScrollView tabLabel='基本信息' style={{paddingTop:40}}>
                          <BaseInfo name = '基本信息' ref="baseInfo"/>
                      </ScrollView>
                      <ScrollView tabLabel='工作信息' style={{paddingTop:40}}>
                          <BaseInfo name = '工作信息' ref="baseInfo"/>
                      </ScrollView>
                  </ScrollableTabView>
              </View>
          );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});