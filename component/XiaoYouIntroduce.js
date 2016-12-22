/**
 * Created by zues on 2016/10/16.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, Navigator, TouchableOpacity } from 'react-native';
import XiaoYouItem from './XiaoYouItem';
import NormalToolbar from './NormalToolbar';
import ViewPager from 'react-native-viewpager';

//以后有api之后就可以把数据录进去了，这里只是模拟数据
const BANNER_PIC = [
    'http://www.wyu.edu.cn/news/file/indexpic/20160427100422762276.jpg',
    'http://www.wyu.edu.cn/news/file/indexpic/2015100600112345.jpg',
    'http://www.wyu.edu.cn/news/file/indexpic/20151120083072957295.jpg',
    'http://www.wyu.edu.cn/news/file/indexpic/20160604212098269826.jpg',
];
const window = Dimensions.get('window');
export default class XiaoYouIntroduce extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          var dataSource = new ViewPager.DataSource({
              pageHasChange: (p1, p2) => p1 !== p2,
          });

          this.state = {
              dataSource : dataSource.cloneWithPages(BANNER_PIC),
              initialPage: 0,
          };
      }

      render(){
          return (
              <View style={styles.container}>
                  <NormalToolbar title='校友风采'
                                 leftImageSource={require('../img/back.png')}
                                 leftItemFunc={this.back.bind(this)}/>

                  <ViewPager
                      style={{height:80}}
                      dataSource={ this.state.dataSource }
                      renderPage ={this.renderPage.bind(this)}
                      isLoop = {true}
                      autoPlay = {true}
                      initialPage={this.state.initialPage}
                      onChangePage={this.onChangePage.bind(this)}
                  />
                  <View style={styles.arrowToLeft} >
                      <TouchableOpacity onPress={this.arrowToLeft.bind(this)}>
                          <Image source={require("../img/toLeft.png")} />
                      </TouchableOpacity>
                  </View>

                  <View style={styles.arrowToRight} >
                      <TouchableOpacity onPress={this.arrowToRight.bind(this)}>
                          <Image source={require("../img/toRight.png")} />
                      </TouchableOpacity>
                  </View>

              </View>
          );
      }

    back(){
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    }

    renderPage(data, pageID){
        return(
                <Image
                    source={{uri:data}}
                    style={styles.page}>
                    <TouchableOpacity onPress={this.onClick.bind(this)}>
                        <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',width:window.width,height:50}}>
                            <Text style={{color:'white', fontSize:20}}>我是一个很帅气的标题</Text>
                        </View>
                    </TouchableOpacity>
                </Image>

        );
    }

    onClick(){

    }

    arrowToRight(){
        this.setState({initialPage:0})
    }

    arrowToLeft(){
        this.setState({initialPage:3})
    }

    onChangePage(page){
        this.setState({current:page});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        resizeMode: 'stretch',
        height:window.height-120,
        width:window.width,
        justifyContent:'flex-end',
        flexDirection:'column'
    },
    arrowToLeft: {
        position: 'absolute',
        left:5,
        top:window.height*0.4,
    },
    arrowToRight:{
        position: 'absolute',
        right:5,
        top:window.height*0.4,
    },
    arrowView:{
        position: 'absolute',
    },
});