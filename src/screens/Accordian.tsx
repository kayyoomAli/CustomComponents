import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  data: string;
  isFirst: boolean; // Add a prop to indicate if it's the first item
  isLast: boolean; // Add a prop to indicate if it's the last item
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  data,
  isFirst,
  isLast,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const onContentLayout = (event: any) => {
    if (!contentHeight) {
      setContentHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{width: '20%', backgroundColor: 'green', alignItems: 'center'}}>
        {isLast ? (
          <View
            style={{
              height: 50,
              width: 2,
              backgroundColor: 'white',
              position: 'absolute',
            }}
          />
        ) : (
          <View
            style={{
              height: (contentHeight || 0) + 160,
              width: 2,
              backgroundColor: 'white',
              position: 'absolute',
              // top: isFirst ? 50 : 0,
            }}
          />
        )}
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: 'red',
            marginTop: 20,
            zIndex: 99,
            overflow: 'hidden',
          }}
        />
      </View>

      <View
        style={{
          width: '80%',
        }}>
        <Pressable style={styles.row} onPress={toggleExpand}>
          <Text style={[styles.title]}>{title}</Text>

          <Text style={styles.title}>{expanded ? 'v' : '>'}</Text>
        </Pressable>
        <View style={styles.parentHr} />
        {expanded && (
          <View onLayout={onContentLayout} style={styles.child}>
            <Text style={{color: 'white'}}>{data}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    backgroundColor: 'gray',
    padding: 16,
  },
});

export default Accordion;
