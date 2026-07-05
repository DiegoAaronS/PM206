import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import BookScreen from './screens/BookScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <BookScreen />
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});