/**
 * Created by zues on 2016/9/25.
 */
import React,{ Component } from 'react';
import {View, Text, StyleSheet, Navigator, Dimensions, Image, ScrollView } from 'react-native';
import ViewPager from 'react-native-viewpager';

const BANNER_PIC = [
    require('./../img/1.jpg'),
    require('./../img/2.jpg'),
    require('./../img/3.jpg'),
    require('./../img/4.jpg')
];
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default class BriefNews extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          //这里的pageHasChange是用来判断两个page是否相同，如果是相同的话那下面的clone就不用clone多次
          var dataSource = new ViewPager.DataSource({
              pageHasChange: (p1, p2) => p1 !== p2,
          });

          this.state = {
              dataSource : dataSource.cloneWithPages(BANNER_PIC)
          };
      }

    renderPage(data, pageID){
        return(
            <Image
                source={data}
                style={styles.page} />
        );
    }


      render(){
          return(
              <View>
                  <ViewPager
                      style={[styles.container,{height:deviceHeight}]}
                      dataSource={ this.state.dataSource }
                      renderPage ={this.renderPage}
                      isLoop = {true}
                      autoPlay = {true}
                  />

                  <ScrollView>

                  </ScrollView>
              </View>

          );
      }

}

const styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height: deviceHeight,
        resizeMode: 'stretch',
    },

    container:{
        justifyContent:'center',
        alignItems:'center',
    }
});