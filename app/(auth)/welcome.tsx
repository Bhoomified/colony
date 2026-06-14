import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top decorative band */}
      <View style={styles.topBand} />

      {/* Logo area */}
      <View style={styles.logoArea}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>C</Text>
        </View>
        <Text style={styles.appName}>Colony</Text>
        <Text style={styles.appSubtitle}>Savji Samaj Community</Text>
      </View>

      {/* Feature highlights */}
      <View style={styles.featuresArea}>
        <FeatureRow emoji="🏢" text="Discover community businesses" />
        <FeatureRow emoji="📣" text="Post & respond to shoutouts" />
        <FeatureRow emoji="🩸" text="Emergency blood donation network" />
        <FeatureRow emoji="🙏" text="Donate to community seva" />
        <FeatureRow emoji="🔒" text="Verified members only" />
      </View>

      {/* CTA buttons */}
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/(auth)/phone')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Join Colony</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/(auth)/phone')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>I already have an account</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Only for verified Savji (SSK) community members
      </Text>
    </SafeAreaView>
  );
}

// Small reusable component for the feature list
function FeatureRow({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  topBand: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 220,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.md,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.textOnPrimary || COLORS.text,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textOnPrimary || COLORS.text,
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  featuresArea: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border || COLORS.surfaceSecondary,
  },
  featureEmoji: {
    fontSize: 20,
    width: 36,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '400',
  },
  buttonArea: {
    gap: SPACING.sm,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  primaryBtnText: {
    color: COLORS.textOnPrimary || COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  secondaryBtnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textTertiary || COLORS.textSecondary,
    marginTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
});