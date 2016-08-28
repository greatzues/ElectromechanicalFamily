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
    BackAndroid
} from 'react-native';

import StartPage from './StartPage';
import BottomTap from './BottomTap';
import Toolbar from './Toolbar';
import Home from './Home';

var navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
    if(navigator && navigator.getCurrentRoutes().length > 1){
        navigator.pop();
        return true;
    }
    return false;
});

class ElectromechanicalFamily extends Component {
  constructor(props) {
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

    componentWillUnMount() {
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
                  configureScene={(route) => Navigator.SceneConfigs.FadeAndroid}
                  renderScene={(route, navigator) => {
                      let Component  = route.component;
                      return <Component {...route.params} navigator={navigator}/>
                  }}/>
          );
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ElectromechanicalFamily', () => ElectromechanicalFamily);
