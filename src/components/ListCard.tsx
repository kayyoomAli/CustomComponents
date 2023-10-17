import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {productProps} from '../../modals';
import ImageWithShimmer from '../imageWithShimmer';
import colors from '../../utils/colors';
import {normalize} from '../../utils/dimensions';
import {navigationRef, priceFormatter} from '../../utils/common';
import localimages from '../../utils/localimages';
import strings from '../../utils/strings';
import screenNames from '../../utils/screenNames';

const ListCard = ({data}: {data: productProps}) => {
  const price = priceFormatter(data?.price);

  const pressHandler = () => {
    navigationRef.current.navigate(screenNames.PRODUCT, {id: data.id});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.listContainer}
      onPress={pressHandler}>
      <ImageWithShimmer source={{uri: data?.image}} style={styles.imageStyle} />
      <Text numberOfLines={2} style={styles.titleStyle}>
        {data?.title}
      </Text>
      <Text style={styles.priceStyle}>{price}</Text>
      <View style={styles.offerView}>
        <Image source={localimages.TAG} style={styles.tagImage} />
        <Text style={styles.offerText}>{strings.EXCHANGE_OFFERS}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  listContainer: {
    width: '49.87%',
    backgroundColor: colors.PARENTBACKGROUND,
    padding: normalize(15),
    borderWidth: normalize(0.2),
    borderColor: colors.SHIMMERBACKGROUND,
  },
  imageStyle: {
    width: '64.3%',
    aspectRatio: 1 / 1.01,
    alignSelf: 'center',
    marginBottom: normalize(10),
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: normalize(15),
    fontWeight: '500',
  },
  priceStyle: {
    fontWeight: '800',
    marginTop: normalize(8),
  },
  offerView: {
    marginTop: normalize(9),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagImage: {
    width: normalize(8),
    aspectRatio: 1 / 1,
  },
  offerText: {
    marginLeft: normalize(4),
    fontSize: normalize(11),
    color: colors.TEXT,
  },
});
