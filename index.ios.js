/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';
import StartPage from './component/StartPage';
import BottomTap from './component/BottomTap';
import Storage from 'react-native-storage';
import Net from './Tool';
import Login from './component/Login';
import StartLoopPage from './component/StartLoopPage';

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  // 如果不指定过期时间，则会使用defaultExpires参数
  defaultExpires: 1000 * 3600 * 24 * 365, //1000 * 3600 * 24表示一天的时间，这里默认保存1年
  enableCache: true,
});
global.storage = storage;

class ElectromechanicalFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toStartPage : true,
      first:true,
      noLogin:true,
    };
  }

  componentWillMount() {
    //根据老师需求要更改为只有登陆之后才可以查看到app里面的内容，先将原来的代码push上去，为更改备份
    new Net().loadKey('firstOpen').then(r => {
      if(r.first){
        this.setState({
          first:false,
        });
      }
    }).catch(e => {});

    new Net().loadKey('loginState').then(r => {
      if(r.username){
        this.setState({noLogin:false});
      }
    }).catch(e => {});
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        toStartPage: false,
      });
    },3000);
  }
  //解除定时器
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let defaultName = this.state.noLogin?this.state.first?'StartLoopPage':'Login':'BottomTap';
    let defaultComponent = this.state.noLogin?this.state.first?StartLoopPage:Login:BottomTap;
    if(this.state.toStartPage){
      return(
          <StartPage />
      );
    }else {
      var initialRoute = {name: defaultName, component: defaultComponent};

      return (
          <Navigator
              sceneStyle={styles.container}
              initialRoute={initialRoute}
              configureScene={this.configureScene}
              renderScene={(route, navigator) => {
                Nav = navigator;
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} route={route}/>
              }}
          />
      );

    }
  }

  configureScene(route, routeStack) {
    if (route.name == 'Login') {
      return Navigator.SceneConfigs.PushFromLeft;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#81c04d',
    paddingTop: 12,
    paddingBottom: 8,
  },
  // 导航栏文字
  headText: {
    color: '#ffffff',
    fontSize: 22
  },
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 13
  },
  // 右面导航按钮
  rightNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 13
  },
  // 标题
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flex: 1                //Step 3
  }
});

AppRegistry.registerComponent('ElectromechanicalFamily', () => ElectromechanicalFamily);
