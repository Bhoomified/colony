import { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';

export default function PhoneScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Format phone as user types — adds spaces for readability
  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, ''); // digits only
    if (cleaned.length <= 5) return cleaned;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhone(text);
    setPhone(formatted);
  };

  const getCleanPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return `+91${digits}`; // India prefix
  };

  const isValidPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const handleSendOTP = async () => {
    if (!isValidPhone()) {
      Alert.alert('Invalid number', 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: getCleanPhone(),
      });

      if (error) throw error;

      // Navigate to OTP screen, passing phone number
      router.push({
        pathname: '/(auth)/otp',
        params: { phone: getCleanPhone(), displayPhone: phone },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Could not send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Enter your{'\n'}mobile number</Text>
          <Text style={styles.subtitle}>
            We'll send a verification code to confirm it's you.{'\n'}
            This number will be your Colony identity.
          </Text>
        </View>

        {/* Phone input */}
        <View style={styles.inputCard}>
          <View style={styles.inputRow}>
            <View style={styles.countryCode}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.code}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="98765 43210"
              placeholderTextColor={COLORS.textTertiary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={11} // 10 digits + 1 space
              autoFocus
            />
          </View>
          <Text style={styles.inputHint}>Only Indian numbers (+91) supported</Text>
        </View>

        {/* Send OTP button */}
        <TouchableOpacity
          style={[styles.sendBtn, !isValidPhone() && styles.sendBtnDisabled]}
          onPress={handleSendOTP}
          disabled={!isValidPhone() || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.textOnPrimary} />
          ) : (
            <Text style={styles.sendBtnText}>Send OTP →</Text>
          )}
        </TouchableOpacity>

        {/* Note */}
        <Text style={styles.note}>
          By continuing, you agree that this app is only for verified Savji community members.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  keyboardView: { flex: 1, paddingHorizontal: SPACING.lg },
  backBtn: { marginTop: SPACING.sm, marginBottom: SPACING.lg },
  backText: { color: COLORS.primary, fontSize: 15, fontWeight: '500' },
  header: { marginBottom: SPACING.xl },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 36,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  inputCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: SPACING.sm,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  flag: { fontSize: 20 },
  code: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  phoneInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    paddingVertical: 4,
    letterSpacing: 1,
  },
  inputHint: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 8,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.borderStrong,
  },
  sendBtnText: {
    color: COLORS.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
  },
});