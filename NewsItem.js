import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, PixelRatio, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewPager from 'react-native-viewpager';
import Net from './Net';
import DetailPage from './component/DetailPage';

const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 70;
const BANNER_PIC = [
    require('./img/1.jpg'),
    require('./img/2.jpg'),
    require('./img/3.jpg'),
    require('./img/4.jpg')
];
export default class NewsItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({
            pageHasChange: (p1, p2) => p1 !== p2,
        });
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            dataSource:ds,
            userData: [],
            id:'',
            bannerDataSource : dataSource.cloneWithPages(BANNER_PIC)
        };
    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <ListView
                ref="ListView"
                style={styles.container}
                enableEmptySections={true}
                dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                renderRow={this.myRenderRow.bind(this)}
                renderScrollComponent={props => (
                    <ParallaxScrollView
                        onScroll={onScroll}

                        headerBackgroundColor="#e9eaed"
                        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                        backgroundSpeed={10}

                        renderBackground={() => (
                        <View key="background">
                            <ViewPager
                                style={{height:PARALLAX_HEADER_HEIGHT}}
                                dataSource={ this.state.bannerDataSource }
                                renderPage ={this.renderPage}
                                isLoop = {true}
                                autoPlay = {true}
                            />
                            <View style={{position: 'absolute',
                                top: 0,
                                width: window.width,
                                backgroundColor: 'rgba(0,0,0,.4)',
                                height: PARALLAX_HEADER_HEIGHT}}/>
                        </View>

                        )}

                        renderForeground={() => (
                            <View key="parallax-header" style={ styles.parallaxHeader }>
                                <Text style={ styles.sectionSpeakerText }>
                                    机电简讯
                                </Text>
                                <Text style={ styles.sectionTitleText }>
                                    生活不止眼前的苟且 还有诗和远方的田野
                                </Text>
                            </View>
                        )}

                        renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection} onPress={this.back.bind(this)}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('./img/back.png')}/>
                                    <Text style={styles.stickySectionText} >机电简讯</Text>
                                </View>
                            </View>
                        )}

                        renderFixedHeader={() => (
                            <View key="fixed-header" style={styles.fixedSection}>
                                <Text style={styles.fixedSectionText}
                                      onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                                    Scroll to top
                                </Text>
                            </View>
                        )}/>
                )}
            />
        );
    }

    back(){
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    };

    myRenderRow(rowData,sectionID,rowID){
        return (
            <TouchableOpacity  onPress={() => this.Press(rowData.id)}>
                <View style={styles.itemBody}>
                    <Image source={{uri:rowData.images[0]}} style={styles.renderRowImg}/>
                    <View style={styles.renderRowItem}>
                        <Text style={styles.itemTitle} ellipsizeMode="tail" numberOfLines={1}  >{rowData.title}</Text>
                        <Text style={styles.itemTime}>1小时前</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderPage(data, pageID){
        return(
            <Image
                source={data}
                style={styles.page} />
        );
    }

    fetchData(){
        var url = 'http://news-at.zhihu.com/api/4/news/latest';
        return new Net().getZhiHuMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }

    Press(id){
        console.log(id);
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'DetailPage',
                component:DetailPage,
                params:{
                    id:id,
                }
            });
        }
    }

    componentDidMount() {
        this.fetchData().then((responseData) => {
            let story = responseData;
            this.setState({
                userData : story.stories,
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    renderRowImg:{
        borderRadius:15,
        height:30,
        width:30,
        alignItems: 'center',
    },
    renderRowItem:{
        flexDirection:'column',
        marginLeft:10,
    },
    itemTitle:{
        fontSize:20,
        fontWeight:'200',
        width:window.width-30
    },
    itemTime:{
        color:'#a6acb1',
        fontSize:10
    },
    itemBody:{
        flex: 1,
        flexDirection:'row',
        height:60,
        marginTop:3,
        alignItems:'center',
    },
    page: {
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT,
        resizeMode: 'stretch',
    },
});