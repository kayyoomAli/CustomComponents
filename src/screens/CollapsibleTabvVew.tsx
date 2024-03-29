import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const TabBarHeight = 48;
const HeaderHeight = 150;
const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

interface TabSceneProps {
  numCols: number;
  data: number[];
  renderItem: any;
  onGetRef: (ref: FlatList<number> | null) => void;
  scrollY: Animated.Value;
  onScrollEndDrag: () => void;
  onMomentumScrollEnd: () => void;
  onMomentumScrollBegin: () => void;
}

const TabScene: React.FC<TabSceneProps> = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Animated.FlatList
      scrollToOverflowEnabled={true}
      numColumns={numCols}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      ListHeaderComponent={() => <View style={{height: 10}} />}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        paddingHorizontal: 10,
        minHeight: windowHeight - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const CollapsibleTabView: React.FC = () => {
  const [tabIndex, setIndex] = useState<number>(0);
  const [routes] = useState<{key: string; title: string}[]>([
    {key: 'tab1', title: 'Tab1'},
    {key: 'tab2', title: 'Tab2'},
  ]);
  const [tab1Data] = useState<number[]>(Array(40).fill(0));
  const [tab2Data] = useState<number[]>(Array(30).fill(0));
  const scrollY = useRef<any>(new Animated.Value(0)).current;
  let listRefArr = useRef<FlatList<number>[]>([]);
  let listOffset = useRef<{[key: string]: number | null}>({});
  let isListGliding = useRef<boolean>(false);

  useEffect(() => {
    scrollY.addListener(({value}: any) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, scrollY, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item: any) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key]! < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View style={[styles.header, {transform: [{translateY: y}]}]}>
        <Text>{'Header'}</Text>
      </Animated.View>
    );
  };

  const renderTab1Item = ({item, index}: {item: number; index: number}) => {
    return (
      <View
        style={{
          borderRadius: 16,
          marginLeft: index % 2 === 0 ? 0 : 10,
          width: tab1ItemSize,
          height: tab1ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{index}</Text>
      </View>
    );
  };

  const renderTab2Item = ({item, index}: {item: number; index: number}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 10,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{index}</Text>
      </View>
    );
  };

  const renderLabel = ({route, focused}: {route: any; focused: boolean}) => {
    return (
      <Text style={[styles.label, {opacity: focused ? 1 : 0.5}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}: {route: any}) => {
    // const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        numCols = 2;
        data = tab1Data;
        renderItem = renderTab1Item;
        break;
      case 'tab2':
        numCols = 3;
        data = tab2Data;
        renderItem = renderTab2Item;
        break;
      default:
        return null;
    }
    return (
      <TabScene
        numCols={numCols}
        data={data}
        renderItem={renderItem}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={(ref: any) => {
          if (ref) {
            const found = listRefArr.current.find(
              (e: any) => e.key === route.key,
            );
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
      />
    );
  };

  const renderTabBar = props => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={index => setIndex(index)}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderHeader()}
      {renderTabView()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    backgroundColor: '#40C4FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  label: {fontSize: 16, color: '#222'},
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: '#FFCC80'},
  indicator: {backgroundColor: '#222'},
});

export default CollapsibleTabView;
