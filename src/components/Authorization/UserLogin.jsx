import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';

export default function UserLogin() {
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '', //
    password: '', //
  });

  const handleLogin = () => {
    setErrors({ email: '', password: '' });

    if (!inputEmail.includes('@')) {
      setErrors({
        ...errors,
        email: 'email must...',
      });

      return;
    }

    if (inputPassword.length < 8) {
      setErrors({
        ...errors, // { email: "", passowrd: "Password must be at least 8 character"}
        password: 'Password must be at least 8 characters',
      });

      return;
    }

    // Proceed with Login
  };
  //   const hasErrors = inputEmail?.length > 3 && !inputEmail.includes('@');
  // const hasErrors = inputEmail?.length < 3 || !inputEmail.includes('@');

  // console.log(errors);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AppLogo
          source={require(`../../../assets/logo.png`)}
          style={styles.logo}
        />
      </View>

      <View>
        <TextInput
          label="Email"
          mode="outlined"
          placeholder="example@example.com"
          value={inputEmail}
          error={errors.email}
          onChangeText={(text) => setEmail(text)}
        />
        {errors.email && (
          <HelperText type="error" visible={errors.email}>
            {errors.email}
          </HelperText>
        )}
      </View>

      <TextInput
        label="Password"
        mode="outlined"
        placeholder="*************"
        value={inputPassword}
        secureTextEntry
        // right={<TextInput.Icon icon="eye" />}
        onChangeText={(inputPassword) => setPassword()}
      />
      {errors.password && (
        <HelperText type="error" visible={errors.password}>
          {errors.password}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={() => {
          if (inputEmail?.length > 3 && !inputEmail.includes('@')) {
            setErrors(true);
          }
        }}
        style={{ borderRadius: 8, height: 50, justifyContent: 'center' }}
        labelStyle={{ fontSize: 18 }}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 24,
  },

  imageContainer: {
    alignItems: 'center',
  },

  logo: {
    height: 100,
    width: 100,
    objectFit: 'contain',
  },
});
