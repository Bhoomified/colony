import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';

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
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingBottom: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textOnPrimary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 13,
    color: COLORS.accentLight,
    marginTop: 2,
  },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: COLORS.textSecondary, fontSize: 15 },
});