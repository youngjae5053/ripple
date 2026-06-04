import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  RippleButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
  rippleCopy,
} from "@/components/ripple-ui";

const stats = [
  ["3", "내 리플"],
  ["6", "닿은 나라"],
  ["8", "이어진 곳"],
];

const globalPreview = [
  ["Paris", "Shared an umbrella"],
  ["Mexico City", "Helped carry groceries"],
  ["Seoul", "Checked in on a friend"],
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <View style={styles.topRow}>
        <Text style={styles.brand}>{rippleCopy.name}</Text>
        <Pressable
          style={styles.profilePill}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.profilePillText}>My Ripples</Text>
        </Pressable>
      </View>

      <RippleHeader
        title={rippleCopy.tagline}
        subtitle="작은 순간을 기록하고, 어디까지 이어지는지 확인해보세요."
      />

      <RippleCard onPress={() => router.push("/profile")}>
        <RippleLabel>My Journey · 내 리플 요약</RippleLabel>
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
          <RippleLabel>Latest Activity · 최근 리플 소식</RippleLabel>
          <RipplePill>Growing</RipplePill>
        </View>
        <Text style={styles.cardTitle}>Checked in on a friend</Text>
        <Text style={styles.cardText}>
          서울에서 시작된 작은 순간이 다음 사람에게 이어지고 있어요.
        </Text>
      </RippleCard>

      <RippleCard>
        <RippleLabel>Ripple Reach · 리플이 닿은 곳</RippleLabel>
        <Text style={styles.reachRoute}>
          Seoul{"\n"}↓{"\n"}Tokyo{"\n"}↓{"\n"}Mexico City
        </Text>
        <Text style={styles.cardText}>
          작은 순간 하나가 사람과 장소를 지나며 여정이 되고 있어요.
        </Text>
      </RippleCard>

      <RippleCard onPress={() => router.push("/world")}>
        <View style={styles.cardTop}>
          <RippleLabel>Global Feed · 전 세계 리플</RippleLabel>
          <Text style={styles.linkText}>Top Ripples</Text>
        </View>
        {globalPreview.map(([place, message]) => (
          <View key={place} style={styles.feedRow}>
            <Text style={styles.feedPlace}>{place}</Text>
            <Text style={styles.feedMessage}>{message}</Text>
          </View>
        ))}
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton onPress={() => router.push("/create")}>
          Start Ripple · 리플 시작하기
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/profile")}>
          My Ripples · 내 리플 보기
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/world")}>
          World Ripples · 전 세계 리플 보기
        </RippleButton>
        <RippleButton tone="ghost" onPress={() => router.push("/received")}>
          받은 리플 미리보기
        </RippleButton>
        <RippleButton tone="ghost" onPress={() => router.push("/onboarding")}>
          View onboarding · 온보딩 보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 34,
  },
  brand: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  profilePill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: rippleColors.whiteLine,
  },
  profilePillText: {
    fontSize: 13,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
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
  reachRoute: {
    fontSize: 22,
    lineHeight: 34,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
    marginBottom: 14,
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
