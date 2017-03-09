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

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});
global.storage = storage;

class ElectromechanicalFamily extends Component {
  constructor(props){
    super(props);
    this.state = {
      toStartPage : true,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        toStartPage: false,
      });
    },3000);
  }

  //解除定时器
  componentWillUnount() {
    this.timer && clearTimeout(this.timer);
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
              configureScene={(route) => Navigator.SceneConfigs.PushFromRight}
              renderScene={(route, navigator) => {
                let Component  = route.component;
                return <Component {...route.params} navigator={navigator} route={route}/>
              }}
          />
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ElectromechanicalFamily', () => ElectromechanicalFamily);
