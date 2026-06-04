import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
  RippleButton,
  RippleCard,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
  rippleCopy,
} from "@/components/ripple-ui";
import { OlmangLogo } from "@/components/olmang-logo";

const stats = [
  ["3", "내 리플"],
  ["6", "닿은 나라"],
  ["8", "이어진 곳"],
];

const globalPreview = [
  ["Seoul", "친구에게 안부를 물었어요"],
  ["Tokyo", "Listened to someone"],
  ["Paris", "Shared a small coffee"],
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <View style={styles.hero}>
        <OlmangLogo size={70} />
        <Text style={styles.brand}>{rippleCopy.name}</Text>
        <Text style={styles.tagline}>{rippleCopy.tagline}</Text>
      </View>

      <View style={styles.heroAction}>
        <RippleButton onPress={() => router.push("/create")}>
          Start a Ripple
        </RippleButton>
        <Text style={styles.helperText}>사진 1장 · 문장 1줄 · 장소 1곳</Text>
      </View>

      <Text style={styles.sectionTitle}>최근 이어진 순간들</Text>

      <RippleCard onPress={() => router.push("/profile")}>
        <RippleLabel>My Ripples</RippleLabel>
        <View style={styles.summaryGrid}>
          {stats.map(([value, label]) => (
            <View key={label} style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{value}</Text>
              <Text style={styles.summaryLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </RippleCard>

      <RippleCard
        onPress={() =>
          router.push({
            pathname: "/passport",
            params: { text: "Checked in on a friend" },
          })
        }
      >
        <View style={styles.cardTop}>
          <RippleLabel>Latest Ripple</RippleLabel>
          <RipplePill>Growing</RipplePill>
        </View>
        <Text style={styles.cardTitle}>Checked in on a friend</Text>
        <Text style={styles.cardText}>
          서울에서 시작된 작은 순간이 다음 사람에게 이어지고 있어요.
        </Text>
      </RippleCard>

      <RippleCard onPress={() => router.push("/world")}>
        <View style={styles.cardTop}>
          <RippleLabel>World Ripples</RippleLabel>
          <Text style={styles.linkText}>Live</Text>
        </View>
        {globalPreview.map(([place, message]) => (
          <View key={place} style={styles.feedRow}>
            <Text style={styles.feedPlace}>{place}</Text>
            <Text style={styles.feedMessage}>{message}</Text>
          </View>
        ))}
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton tone="secondary" onPress={() => router.push("/profile")}>
          My Ripples · 내 리플 보기
        </RippleButton>
        <RippleButton tone="ghost" onPress={() => router.push("/onboarding")}>
          View onboarding · 온보딩 보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 26,
  },
  brand: {
    marginTop: 18,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  tagline: {
    marginTop: 6,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
  },
  heroAction: {
    gap: 10,
    marginBottom: 30,
  },
  helperText: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
    marginTop: 2,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: rippleColors.muted,
    fontWeight: "700",
  },
  linkText: {
    fontSize: 13,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  feedRow: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: rippleColors.line,
  },
  feedPlace: {
    fontSize: 15,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  feedMessage: {
    marginTop: 3,
    fontSize: 14,
    color: rippleColors.muted,
    fontWeight: "700",
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 10,
  },
});
