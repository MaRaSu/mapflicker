import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import AppMapView from './components/MapView';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppMapView style={styles.map} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 0,
  },
});

export default App;
