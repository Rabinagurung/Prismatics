import { Alert, StyleSheet, View } from 'react-native';
import UserInput from '../../components/UI/UserInput';
import { useContext, useState } from 'react';
import ContainedButton from '../../components/UI/ContainedButton';
import TextButton from '../../components/UI/TextButtton';
import { loginUser } from '../../utils/auth';
import { AuthContext } from '../../store/auth-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const schema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long.' }),
});

export default function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const submit = async ({ email, password }) => {
    try {
      const { token, userId, refreshToken } = await loginUser(email, password);

      authCtx.authenticate(token, userId, refreshToken);
    } catch (_) {
      // console.log(error);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.imageContainer}>
        <LottieView
          source={require('../../../assets/splash_2.json')}
          style={styles.logo}
          autoPlay={false}
          loop
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UserInput
              label="Email"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              error={errors.email}
              onChangeText={onChange}
              visible={!!errors.email}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            maxLength: 5,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UserInput
              label="Password"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              secureTextEntry
              error={errors.password}
              onChangeText={onChange}
              visible={!!errors.password}
            />
          )}
          name="password"
        />

        <ContainedButton
          mode="contained"
          title="Login"
          onPress={handleSubmit(submit)}
          loading={isSubmitting}
          disabled={!isDirty || isSubmitting}
        />
      </View>

      <View style={styles.textButton}>
        <TextButton
          text="Don't have an account ? "
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    margin: 16,
  },

  formContainer: {
    flex: 2,
    justifyContent: 'flex-start',
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },

  logo: {
    height: 100,
    width: 100,
    objectFit: 'contain',
  },

  textButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
