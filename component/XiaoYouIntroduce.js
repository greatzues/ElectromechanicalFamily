/**
 * Created by zues on 2016/10/16.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, Navigator } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import XiaoYouItem from './XiaoYouItem';
import Toolbar from './Toolbar';

export default class XiaoYouIntroduce extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state={
            page:1,
        }
      }

      render(){
          return (
              <View style={styles.container}>
                  <Toolbar style={{position: 'absolute',top: 0, left: 0}}
                           click = {this.back.bind(this)}
                           title= "校友风采"
                           navIcon = {require('../img/back.png')}
                  />
                  <ScrollableTabView
                      style={styles.ScrollableTabView}
                      renderTabBar={()=><DefaultTabBar backgroundColor='#FFF' />}
                      tabBarPosition='top'
                  >
                      <ScrollView tabLabel='温家林'>
                        <XiaoYouItem />
                      </ScrollView>
                      <ScrollView tabLabel='校友2'>
                        <XiaoYouItem />
                      </ScrollView>
                      <ScrollView tabLabel='校友3'>
                          <XiaoYouItem />
                      </ScrollView>
                      <ScrollView tabLabel='校友4'>
                          <XiaoYouItem />
                      </ScrollView>
                      <ScrollView tabLabel='校友5'>
                          <XiaoYouItem />
                      </ScrollView>
                  </ScrollableTabView>
              </View>
          );
      }

    back(){
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ScrollableTabView:{
        height:100,
    },
});