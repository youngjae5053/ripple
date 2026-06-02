import { Link, useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoopScreen() {
  const params = useLocalSearchParams();
  const text = typeof params.text === 'string' ? params.text : 'A small moment was shared.';
  return (
    <View style={styles.root}>
      {/* Background gradient effect - behind content */}
      <View style={styles.bgBlob1} pointerEvents="none" />
      <View style={styles.bgBlob2} pointerEvents="none" />
      <View style={styles.bgBlob3} pointerEvents="none" />

      {/* Content wrapper - in front */}
      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
        <Link href="/" asChild>
          <Pressable style={styles.backRow}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </Link>

        <View style={styles.header}>
          <Text style={styles.title}>Your loop</Text>
          <Text style={styles.subtitle}>See how far your moment goes.</Text>
        </View>

        <View style={styles.momentPreview}>
          <Text style={styles.previewLabel}>Moment</Text>
          <Text style={styles.previewText}>{text}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.cardLabel}>Ripple</Text>
<Text style={styles.cardValue}>1</Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.cardLabel}>Continued</Text>
              <Text style={styles.cardValue}>0 times</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Farthest Place</Text>
          <Text style={styles.cardTitle}>Not yet</Text>
          <Text style={styles.cardDescription}>
            Your moment is waiting for its first step.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Reach Map</Text>
          <View style={styles.cityList}>
            <View style={styles.cityItem}>
              <Text style={styles.cityDot}>●</Text>
              <Text style={styles.cityName}>Seoul</Text>
            </View>
            <View style={styles.cityItem}>
              <Text style={styles.cityDot}>○</Text>
              <Text style={styles.cityName}>Tokyo</Text>
            </View>
            <View style={styles.cityItem}>
              <Text style={styles.cityDot}>○</Text>
              <Text style={styles.cityName}>Singapore</Text>
            </View>
            <View style={styles.cityItem}>
              <Text style={styles.cityDot}>○</Text>
              <Text style={styles.cityName}>Sydney</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.status}>
            <Text style={styles.statusTitle}>Seed started</Text>
            <Text style={styles.statusText}>
              When someone continues your moment, this loop will grow.
            </Text>
          </View>

          <Link href="/create" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Start another moment</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    width: '100%',
  },
  bgBlob1: {
    position: 'absolute',
    top: -80,
    right: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#F7C7D9',
    opacity: 0.32,
    zIndex: 0,
  },
  bgBlob2: {
    position: 'absolute',
    top: 300,
    left: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#D8C7F7',
    opacity: 0.22,
    zIndex: 0,
  },
  bgBlob3: {
    position: 'absolute',
    bottom: -60,
    right: 40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F8D8C8',
    opacity: 0.28,
    zIndex: 0,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 2,
    width: '100%',
    ...(Platform.OS === 'web' && {
      maxWidth: 430,
      alignSelf: 'center',
    }),
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backRow: {
    marginBottom: 16,
  },
  backText: {
    color: '#2D2A26',
    fontSize: 15,
    fontWeight: '700',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F1D1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#5D5248',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(248, 216, 200, 0.4)',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  col: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: '#9B7A4F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cardValue: {
    fontSize: 18,
    color: '#1F1D1A',
    fontWeight: '800',
    marginTop: 6,
  },
  cardTitle: {
    fontSize: 20,
    color: '#1F1D1A',
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#5D5248',
    lineHeight: 20,
  },
  cityList: {
    marginTop: 12,
    gap: 10,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cityDot: {
    fontSize: 18,
    color: '#9B7A4F',
    marginRight: 10,
    width: 20,
  },
  cityName: {
    fontSize: 14,
    color: '#5D5248',
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(248, 216, 200, 0.4)',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(248, 216, 200, 0.2)',
    marginVertical: 12,
  },
  status: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F1D1A',
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#5D5248',
    lineHeight: 20,
  },
  momentPreview: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(248,216,200,0.4)',
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9B7A4F',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  previewText: {
    fontSize: 15,
    color: '#1F1D1A',
  },
  primaryButton: {
    marginTop: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2D2A26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
