/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Navigator } from 'react-native';
import ViewPager from 'react-native-viewpager';


//以后有api之后就可以把数据录进去了，这里只是模拟数据
const BANNER_PIC = [
    ['http://www.wyu.edu.cn/news/file/indexpic/20160427100422762276.jpg','http://www.wyu.edu.cn/','五邑大学北门'],
    ['http://www.wyu.edu.cn/news/file/indexpic/2015100600112345.jpg','http://dept.wyu.edu.cn/kyc/kjc/','五邑大学科技处'],
    ['http://www.wyu.edu.cn/news/file/indexpic/20151120083072957295.jpg','http://dept.wyu.edu.cn/jidianxi/','五邑大学机电学院'],
    ['http://www.wyu.edu.cn/news/file/indexpic/20160604212098269826.jpg','http://jwc.wyu.edu.cn/www/','五邑大学图书馆'],
];
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
            <TouchableWithoutFeedback onLongPress={() => this.props.bannerClick(data[1])}>
            <Image source={{uri:data[0]}} style={styles.page} >
                <View style={styles.pageContainer}>
                    <Text style={styles.pageText}>{data[2]}</Text>
                </View>
            </Image>
            </TouchableWithoutFeedback>
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
        width: device.width,
        height: 170,
        resizeMode: 'stretch',
        justifyContent:'flex-end'
    },
    pageContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        backgroundColor:'rgba(0,0,0,.3)',
        height:35,
        width:device.width
    },
    pageText:{
        color:'white',
        fontSize:18,
        padding:5
    }
});