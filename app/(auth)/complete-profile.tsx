import { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useAuthStore } from '../../hooks/useAuthStore';


const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const CITIES = [
  'Hubli', 'Dharwad', 'Bengaluru', 'Mumbai', 'Surat', 'Ahmedabad',
  'Pune', 'Hyderabad', 'Chennai', 'Delhi', 'Other'
];

export default function CompleteProfileScreen() {
  const { member, setMember } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    display_name: '',
    city: '',
    gotra: '',
    blood_group: '',
    is_blood_donor: false,
    referral_code: '',
  });

  const update = (field: string, value: any) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.full_name.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return;
    }
    if (!form.city) {
      Alert.alert('Required', 'Please select your city.');
      return;
    }

    setLoading(true);
    try {
      const updates: any = {
        full_name: form.full_name.trim(),
        display_name: form.display_name.trim() || form.full_name.trim(),
        city: form.city,
        gotra: form.gotra.trim() || null,
        blood_group: form.blood_group || null,
        is_blood_donor: form.is_blood_donor,
        updated_at: new Date().toISOString(),
      };

      // If they used a referral code, find who referred them
      if (form.referral_code.trim()) {
        const { data: referrer } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', form.referral_code.trim().toUpperCase())
          .single();
        if (referrer) updates.referred_by = referrer.id;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', member?.id);

      if (error) throw error;

      // Update local state
      setMember({ ...member!, ...updates });

      // Go to pending screen (admin needs to verify)
      router.replace('/(auth)/pending');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete your{'\n'}profile</Text>
          <Text style={styles.subtitle}>This helps other community members find and trust you.</Text>
        </View>

        {/* Full name */}
        <InputField
          label="Full Name *"
          placeholder="e.g. Ramesh Patel"
          value={form.full_name}
          onChangeText={v => update('full_name', v)}
        />

        {/* Display name */}
        <InputField
          label="Display Name (optional)"
          placeholder="How you appear in the app"
          value={form.display_name}
          onChangeText={v => update('display_name', v)}
        />

        {/* City */}
        <View style={styles.field}>
          <Text style={styles.label}>City *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chipRow}>
              {CITIES.map(city => (
                <TouchableOpacity
                  key={city}
                  style={[styles.chip, form.city === city && styles.chipActive]}
                  onPress={() => update('city', city)}
                >
                  <Text style={[styles.chipText, form.city === city && styles.chipTextActive]}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Gotra */}
        <InputField
          label="Gotra (optional)"
          placeholder="e.g. Kashyap, Bharadwaj"
          value={form.gotra}
          onChangeText={v => update('gotra', v)}
        />

        {/* Blood group */}
        <View style={styles.field}>
          <Text style={styles.label}>Blood Group (optional)</Text>
          <View style={styles.bloodGrid}>
            {BLOOD_GROUPS.map(bg => (
              <TouchableOpacity
                key={bg}
                style={[styles.bloodChip, form.blood_group === bg && styles.bloodChipActive]}
                onPress={() => update('blood_group', bg)}
              >
                <Text style={[styles.bloodText, form.blood_group === bg && styles.bloodTextActive]}>
                  {bg}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Blood donor opt-in */}
        {form.blood_group ? (
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => update('is_blood_donor', !form.is_blood_donor)}
          >
            <View style={[styles.toggle, form.is_blood_donor && styles.toggleActive]}>
              <View style={[styles.toggleThumb, form.is_blood_donor && styles.toggleThumbActive]} />
            </View>
            <Text style={styles.toggleLabel}>
              I'm willing to donate blood in emergencies 🩸
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Referral code */}
        <InputField
          label="Referral Code (optional)"
          placeholder="Code from an existing member"
          value={form.referral_code}
          onChangeText={v => update('referral_code', v)}
          autoCapitalize="characters"
        />

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.textOnPrimary} />
          ) : (
            <Text style={styles.submitBtnText}>Submit for Verification →</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable input component to avoid repetition
function InputField({
  label, placeholder, value, onChangeText, autoCapitalize
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize || 'words'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.lg, paddingBottom: 0 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, lineHeight: 36, marginBottom: SPACING.sm },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, marginBottom: SPACING.lg },
  field: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  chipRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  chipTextActive: { color: COLORS.textOnPrimary },
  bloodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  bloodChip: {
    width: 64, height: 44,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  bloodChipActive: { backgroundColor: COLORS.bloodUrgent, borderColor: COLORS.bloodUrgent },
  bloodText: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  bloodTextActive: { color: COLORS.textOnPrimary },
  toggleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg, gap: 12 },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: COLORS.border, justifyContent: 'center', padding: 2 },
  toggleActive: { backgroundColor: COLORS.bloodUrgent },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.surface, alignSelf: 'flex-start' },
  toggleThumbActive: { alignSelf: 'flex-end' },
  toggleLabel: { flex: 1, fontSize: 14, color: COLORS.text },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    ...SHADOWS.md,
  },
  submitBtnText: { color: COLORS.textOnPrimary, fontSize: 16, fontWeight: '700' },
});