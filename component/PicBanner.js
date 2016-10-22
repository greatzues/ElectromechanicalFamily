/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Navigator } from 'react-native';
import ViewPager from 'react-native-viewpager';


//以后有api之后就可以把数据录进去了，这里只是模拟数据
const BANNER_PIC = [
    ['https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024','http://http://www.wyu.edu.cn/'],
    ['https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024','http://www.baidu.com'],
    ['https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024','http://www.baidu.com'],
    ['https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024','http://www.baidu.com'],
    ['https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024','http://www.baidu.com'],
];
const deviceWidth = Dimensions.get('window').width;
export default class PicBanner extends Component {
    constructor(props){
        super(props);
        var dataSource = new ViewPager.DataSource({
           pageHasChange: (p1, p2) => p1 !== p2,
        });

        this.state = {
            dataSource : dataSource.cloneWithPages(BANNER_PIC),
        };
    }

    renderPage(data, pageID){
        return(
            <TouchableOpacity onPress={() => this.props.bannerClick(data[1])}>
            <Image
                source={{uri:data[0]}}
                style={styles.page} />
            </TouchableOpacity>
        );
    }

    render(){
        return(
            <ViewPager
                style={{height:80}}
                dataSource={ this.state.dataSource }
                renderPage ={this.renderPage.bind(this)}
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