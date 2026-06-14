import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Replaced alias import to avoid module resolution errors.
// Define minimal Colors used in this file locally.
const Colors = {
  light: {
    background: '#FFFFFF',
    backgroundElement: '#F6F6F7',
    text: '#0B1223',
    textSecondary: '#6B7280',
  },
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Colony</Text>
        <Text style={styles.tagline}>Savji Samaj Community</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.placeholder}>Home feed coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    backgroundColor: Colors.light.backgroundElement,
    padding: 20,
    paddingBottom: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: Colors.light.textSecondary, fontSize: 15 },
});