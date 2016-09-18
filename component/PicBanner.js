/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import ViewPager from 'react-native-viewpager';

const BANNER_PIC = [
    require('./../img/1.jpg'),
    require('./../img/2.jpg'),
    require('./../img/3.jpg'),
    require('./../img/4.jpg')
];

const deviceWidth = Dimensions.get('window').width;

export default class PicBanner extends Component {
    constructor(props){
        super(props);
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
            <ViewPager
                style={{height:80}}
                dataSource={ this.state.dataSource }
                renderPage ={this.renderPage}
                isLoop = {true}
                autoPlay = {true}
            />
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height: 170,
        resizeMode: 'stretch',
    },
})