import { View, StyleSheet } from 'react-native';
import ContainedButton from '../../components/UI/ContainedButton';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { api } from '../../api/users';
import { Avatar, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/UI/LoadingView';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('');
  const [numFav, setFav] = useState(0);
  const [numDownloads, setDownloads] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const userId = authCtx.userId;

  //console.log(userId);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (!userId) return;
        try {
          setIsLoading(true);
          const data = await api.getUser(userId);
          const fav = await api.getUserFavourites(userId);

          const downloads = await api.getUserDownloads(userId);

          setUserName(data?.fields?.userName?.stringValue);
          setFav(fav?.documents?.length || 0);
          setDownloads(downloads?.documents?.length || 0);
        } catch (_) {
        } finally {
          setIsLoading(false);
        }
      })();
    }, [userId])
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* {isLoading && <Loading style={{ flex: 1 }} />} */}
      <Avatar.Image
        size={100}
        source={require('../../../assets/giirlAvatar.png')}
      />
      <Text variant="displayMedium" style={{ paddingTop: 20 }}>
        {userName}
      </Text>
      <Text variant="titleMedium">
        {' '}
        {numFav} Favorites | {numDownloads} Downloads{' '}
      </Text>

      <View style={styles.buttonContainer}>
        <ContainedButton
          title="Sign Out"
          mode="contained"
          onPress={authCtx.logout}
          disabled={false}
          loading={false}
          style={styles.containedButton}
        />

        <ContainedButton
          title="Reset Account"
          mode="contained"
          disabled={false}
          loading={false}
          style={styles.containedButton}
        />

        <ContainedButton
          title="Delete Account"
          mode="contained"
          disabled={false}
          loading={false}
          style={styles.containedButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },

  imageContainer: {
    marginBottom: 100,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },

  containedButton: {
    width: '100%',
  },
});
