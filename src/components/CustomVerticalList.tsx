import {FlatList, Pressable, Text, View} from 'react-native';
import React from 'react';
const emailData = [
  {
    id: 'id1',
    color: 'lightblue',
    sender: 'john@example.com',
    subject: 'Meeting Reminder',
    message: 'Don’t forget our meeting at 2 PM today.',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 'id2',
    color: 'black',
    sender: 'alice@example.com',
    subject: 'Weekly Newsletter',
    message: 'Check out this week’s newsletter for exciting updates.',
    timestamp: '6 hours ago',
    isRead: true,
  },
  {
    id: 'id3',
    color: 'green',
    sender: 'support@example.com',
    subject: 'Account Verification',
    message:
      'Dear user, Please verify your account to continue using our service.',
    timestamp: '1 day ago',
    isRead: false,
  },
  {
    id: 'id4',
    color: 'purple',
    sender: 'marketing@example.com',
    subject: 'Special Offer',
    message: 'Exclusive offer for our loyal customers. Grab it now!',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: 'id5',
    color: 'skyblue',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  {
    id: 'id6',
    color: 'lightgreen',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  {
    id: 'id7',
    color: 'orange',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  {
    id: 'id8',
    color: 'red',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  {
    id: 'id9',
    color: 'pink',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  {
    id: 'id10',
    color: 'pink',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  {
    id: 'id11',
    color: 'pink',
    sender: 'info@example.com',
    subject: 'Important Update',
    message: 'We have important updates regarding your account security.',
    timestamp: '3 days ago',
    isRead: false,
  },
  // Add more email objects as needed
];

const CustomVerticalList = ({onScroll}: any) => {
  const renderItem = ({item}: any) => (
    <Pressable
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          backgroundColor: item?.color,
          width: 40,
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 7,
          height: 40,
          borderRadius: 50,
          fontWeight: '400',
          fontSize: 18,
          color: 'white',
          marginRight: 15,
        }}>
        {item.sender.toUpperCase().slice(0, 1)}
      </Text>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold'}}>{item.sender}</Text>
          <Text style={{color: 'black'}}>{item.timestamp}</Text>
        </View>

        <Text style={{fontSize: 16}}>{item.subject}</Text>
        <Text
          style={{
            color: item.isRead ? 'black' : 'gray',
            width: 300,
          }}>
          {item?.message.length > 55
            ? item.message.slice(0, 40)
            : item?.message}
          {'...'}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <FlatList
        data={emailData}
        onScroll={onScroll}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};

export default CustomVerticalList;
