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
    ToastAndroid
} from 'react-native';
import StartPage from './StartPage';
import BottomTap from './BottomTap';

//测试import

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
      let defaultName = 'BottomTap';
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
                  configureScene={(route) => Navigator.SceneConfigs.FadeAndroid}
                  renderScene={(route, navigator) => {
                      Nav = navigator;
                      let Component  = route.component;
                      return <Component {...route.params} navigator={navigator}/>
                  }}/>
          );
      }
  }
}
// //这个类用来快速测试新组件的ui
// class Test extends Component{
//     render(){
//         return(
//             <View style={styles.container}>
//
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ElectromechanicalFamily', () => ElectromechanicalFamily);
