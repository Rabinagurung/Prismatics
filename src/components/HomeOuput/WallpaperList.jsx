import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import MasonryList from 'react-native-masonry-list';

export default function WallpaperList() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const newData = [
    { uri: 'https://th.wallhaven.cc/small/zy/zyj28v.jpg' },
    { uri: 'https://th.wallhaven.cc/small/3l/3l828y.jpg' },
    { uri: 'https://th.wallhaven.cc/small/x6/x6yzoz.jpg' },
    { uri: 'https://th.wallhaven.cc/small/zy/zyj28v.jpg' },
    { uri: 'https://th.wallhaven.cc/small/3l/3l828y.jpg' },
    { uri: 'https://th.wallhaven.cc/small/x6/x6yzoz.jpg' },
    { uri: 'https://th.wallhaven.cc/small/zy/zyj28v.jpg' },
    { uri: 'https://th.wallhaven.cc/small/3l/3l828y.jpg' },
    { uri: 'https://th.wallhaven.cc/small/x6/x6yzoz.jpg' },
    { uri: 'https://th.wallhaven.cc/small/zy/zyj28v.jpg' },
    { uri: 'https://th.wallhaven.cc/small/3l/3l828y.jpg' },
    { uri: 'https://th.wallhaven.cc/small/x6/x6yzoz.jpg' },
    // 更多图片链接
  ];

  // useEffect(() => {

  //   console.log(newData);
  //   const fetchUser = async () => {
  //     try {

  //       const response = await fetch(`https://wallhaven.cc/api/v1/search?page=1`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();

  //       setData(data);
  //     } catch (err) {
  //       setError(err);

  //     }
  //   };
  //   fetchUser();
  // }, []);

  return <View style={styles.container}>
          <MasonryList
            images={newData}
            columns={2} // 设置列数
            style={styles.listContainer}
          />
      </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
  },
  center: {
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
  },
});
