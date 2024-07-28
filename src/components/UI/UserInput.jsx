import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

export default function UserInput({
  // label,
  // mode,
  // value,
  // onChangeText,
  // error,
  helperTextType,
  visible,
  ...rest
}) {
  return (
    <View>
      <TextInput
        // label={label}
        // mode={mode}
        // value={value}
        // onChangeText={onChangeText}
        // error={error}
        {...rest}
      />

      <HelperText type={helperTextType} visible={visible} />
    </View>
  );
}

//TextInput
// label="Email"
// mode="outlined"
// value={inputEmail}
// error={hasErrors}
// onChangeText={(text) => setEmail(text)}
// />
// <HelperText type="error" visible={hasErrors()}>
// Email address is invalid!
// </HelperText>
