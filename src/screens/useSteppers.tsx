import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import TimeLine from './Steppers';
export default function UseSteppers() {
  const data = [
    {
      title: 'Order Confirmed',
      SubTitle:
        'seller confirmed orderfbvdhjbhjbdhcjfsvbhjbhbhjidlsfvb xbdscfvn,jbxjkfnjkjdeklcbvjfkbdcvjklfsdfjklcv jkfldscsvnklbdacjknb vfsdabnkcv cbfnskdbnk vfsdbn.kcfvvcbknfszbknvfsdbnkvbknbnkdcfbhvdjkfscfjknfsdjkcnsfvjkn',
      date: 'Sun ,7th Aug 22',
      status: true,
      key: 1,
    },
    {
      title: 'Shipped ',
      SubTitle: 'seller confirmed order ',
      date: 'Your item has been Shipped',
      status: true,
      key: 2,
    },
    {
      title: 'Delivered',
      SubTitle:
        'seller c222onfirmed order hrvfbdjc vdsfbjnkfcvdbfshkaslfvbhdfslfhjbjjgjidbvjlkehrfvbhfjdkfvjbhfdsklfvbhfdsljvbhcfdslvbcfdselnvbvldfsjbcvgdfnsl;dvjxbnfgdsjvfdslvxcjbfdsl;fjdgsl;kfjndsl;vbkjfdgls;vkbjfcdsre;fdhfgkjvkld;jhfbdksl;efkjghfskljhbvfdjskhgfdefkhvfdfhdvbsgufgvdjbsgvgcfgytudghfyucghvxdsugdsufgfdsuiafhjgdjsugdusfvgdyhuifsgvyfshuifyhsiysfyhguifhfskjvdsv kjbcgfdlshjbhjrsfsvdcuiljhuferishvdujhfdujshucbhzfvhuerabsdhkcuxzbvjlhidfbcvjihbdfhjbvhjibfvhjiefdaujcvfhjdfhidfhdfijbhfvdjilbdfvijlfdvfhijoseller c222onfirmed order hrvfbdjc vdsfbjnkfcvdbfshkaslfvbhdfslfhjbjjgjidbvjlkehrfvbhfjdkfvjbhfdsklfvbhfdsljvbhcfdslvbcfdselnvbvldfsjbcvgdfnsl;dvjxbnfgdsjvfdslvxcjbfdsl;fjdgsl;kfjndsl;vbkjfdgls;vkbjfcdsre;fdhfgkjvkld;jhfbdksl;efkjghfskljhbvfdjskhgfdefkhvfdfhdvbsgufgvdjbsgvgcfgytudghfyucghvxdsugdsufgfdsuiafhjgdjsugdusfvgdyhuifsgvyfshuifyhsiysfyhguifhfskjvdsv kjbcgfdlshjbhjrsfsvdcuiljhuferishvdujhfdujshucbhzfvhuerabsdhkcuxzbvjlhidfbcvjihbdfhjbvhjibfvhjiefdaujcvfhjdfhidfhdfijbhfvdjilbdfvijlfdvfhijoseller c222onfirmed order hrvfbdjc vdsfbjnkfcvdbfshkaslfvbhdfslfhjbjjgjidbvjlkehrfvbhfjdkfvjbhfdsklfvbhfdsljvbhcfdslvbcfdselnvbvldfsjbcvgdfnsl;dvjxbnfgdsjvfdslvxcjbfdsl;fjdgsl;kfjndsl;vbkjfdgls;vkbjfcdsre;fdhfgkjvkld;jhfbdksl;efkjghfskljhbvfdjskhgfdefkhvfdfhdvbsgufgvdjbsgvgcfgytudghfyucghvxdsugdsufgfdsuiafhjgdjsugdusfvgdyhuifsgvyfshuifyhsiysfyhguifhfskjvdsv kjbcgfdlshjbhjrsfsvdcuiljhuferishvdujhfdujshucbhzfvhuerabsdhkcuxzbvjlhidfbcvjihbdfhjbvhjibfvhjiefdaujcvfhjdfhidfhdfijbhfvdjilbdfvijlfdvfhijo',
      date: 'Tue ,9th Aug 22',
      status: true,
      key: 3,
    },
    {
      title: 'Return Cancelled',
      SubTitle: 'seller confirmed order ',
      date: 'Wed ,10 Aug 22',
      status: false,
      key: 4,
    },
    {
      title: 'Shipped ',
      SubTitle: 'seller confirmed order',
      date: 'Your item has been Shipped',
      status: false,
      key: 5,
    },
  ];
  var count = 1;
  data.map(item => {
    if (item.status === false) {
      count++;
    }
  });
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      {data.map((item, index) => (
        <TimeLine
          item={item}
          key={index}
          index={index}
          count={count}
          SizeOfCircle={20}
          length={data.length}
          status={item?.status}
          renderItem={(item: any) => {
            return (
              <View>
                <Text
                  style={{
                    fontWeight: item.status ? 'bold' : '500',
                  }}>
                  {item.title}
                </Text>
                <Text>{item.SubTitle}</Text>
                <Text>{item.date}</Text>
              </View>
            );
          }}
        />
      ))}
    </SafeAreaView>
  );
}
