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
    BackAndroid,
    ToastAndroid,
    AsyncStorage,
    TouchableOpacity,
    Image
} from 'react-native';
import StartPage from './component/StartPage';
import BottomTap from './component/BottomTap';
import Storage from 'react-native-storage';

var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
});
global.storage = storage;

class ElectromechanicalFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toStartPage : true,
    };
  }

    onBackAndroid = () => {
        if(Nav.getCurrentRoutes().length > 1){
            Nav.pop();
            return true;
        }else {if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;
        }

    };

  componentDidMount() {
    this.timer = setTimeout(() => {
        this.setState({
            toStartPage: false,
        });
    },3000);

    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

  }
    //解除定时器
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

  render() {
      let defaultName = '机电E家人';
      let defaultComponent = BottomTap;
      if(this.state.toStartPage){
          return(
              <StartPage />
          );
      }else {
          var initialRoute = {name: defaultName, component: defaultComponent};

          return(
              <Navigator
                  sceneStyle={styles.container}
                  initialRoute={initialRoute}
                  configureScene={(route) => Navigator.SceneConfigs.PushFromRight}
                  renderScene={(route, navigator) => {
                      Nav = navigator;
                      let Component  = route.component;
                      return <Component {...route.params} navigator={navigator} route={route}/>
                  }}
              />
          );
      }
  }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {if (index > 0) {navigator.pop()}}}>
                        <Text style={styles.leftNavButtonText}>
                            返回
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => route.hhh}>
                        <Image source={require('./img/login.png')} />
                    </TouchableOpacity>
                </View>
            )
        }
    },
    RightButton(route, navigator, index, navState) {
        if (route.onPress)
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        onPress={() => route.onPress()}>
                        <Text style={styles.rightNavButtonText}>
                            {route.rightText || '右键'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
    },
    Title(route, navigator, index, navState) {
        return (
            <View style={styles.navContainer}>
                <Text style={styles.title}>
                    {route.name}
                </Text>
            </View>
        );
    }
};

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
