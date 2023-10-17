import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6; // Change to the desired OTP length

const OTPInputFieldIOS = () => {
  const [otp, setOtp] = useState('');

  return (
    <View>
      <Text>
        Please enter the OTP that has been sent to yout registered mobile number
      </Text>
      <CodeField
        value={otp}
        onChangeText={setOtp}
        cellCount={CELL_COUNT}
        rootStyle={{borderColor: 'gray', borderBottomWidth: 1}}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[
              {borderColor: 'gray', borderBottomWidth: 1},
              isFocused && {borderColor: 'blue'},
            ]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {otp.length === CELL_COUNT && <Text>Entered OTP: {otp}</Text>}
    </View>
  );
};

export default OTPInputFieldIOS;
