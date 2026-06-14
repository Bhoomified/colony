import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../hooks/useAuthStore';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

export default function PendingScreen() {
  const { member, signOut } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🕐</Text>
        <Text style={styles.title}>Verification{'\n'}Pending</Text>
        <Text style={styles.subtitle}>
          Welcome, {member?.full_name || 'friend'}!{'\n\n'}
          Your profile has been submitted. A community admin will verify your membership shortly.{'\n\n'}
          You'll receive a notification once you're approved and can access Colony.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What happens next?</Text>
          <Text style={styles.infoText}>1. Admin reviews your profile</Text>
          <Text style={styles.infoText}>2. You get notified via SMS</Text>
          <Text style={styles.infoText}>3. Full access to Colony unlocked 🎉</Text>
        </View>

        <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  icon: { fontSize: 64, marginBottom: SPACING.lg },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, textAlign: 'center', lineHeight: 36, marginBottom: SPACING.md },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: SPACING.xl },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  infoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  infoText: { fontSize: 14, color: COLORS.textSecondary, paddingVertical: 4, lineHeight: 22 },
  signOutBtn: { paddingVertical: 12 },
  signOutText: { color: COLORS.textSecondary, fontSize: 14 },
});