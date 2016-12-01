/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Navigator } from 'react-native';
import ViewPager from 'react-native-viewpager';


//以后有api之后就可以把数据录进去了，这里只是模拟数据
const BANNER_PIC = [
    ['http://www.wyu.edu.cn/news/file/indexpic/20160427100422762276.jpg','http://www.wyu.edu.cn/'],
    ['http://www.wyu.edu.cn/news/file/indexpic/2015100600112345.jpg','http://dept.wyu.edu.cn/kyc/kjc/'],
    ['http://www.wyu.edu.cn/news/file/indexpic/20151120083072957295.jpg','http://dept.wyu.edu.cn/jidianxi/'],
    ['http://www.wyu.edu.cn/news/file/indexpic/20160604212098269826.jpg','http://jwc.wyu.edu.cn/www/'],
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
});