import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import {
  RippleBackButton,
  RippleButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

const globalStats = [
  ["🌎", "342", "Total Ripples · 전체 리플"],
  ["📍", "58", "Cities Reached · 닿은 도시"],
  ["🤝", "1.2k", "Moments Shared · 나눈 순간"],
];

const movingRipples = [
  {
    route: "🇰🇷 Seoul → 🇯🇵 Tokyo",
    moment: "친구에게 안부를 물었어요",
    timeAgo: "2 hours ago",
  },
  {
    route: "🇫🇷 Paris → 🇲🇽 Mexico City",
    moment: "작은 커피 한 잔을 건넸어요",
    timeAgo: "5 hours ago",
  },
  {
    route: "🇸🇬 Singapore → 🇺🇸 New York",
    moment: "길을 헤매는 사람에게 방향을 알려줬어요",
    timeAgo: "1 day ago",
  },
];

const rippleFeed = [
  {
    city: "Seoul",
    country: "South Korea",
    timeAgo: "2 hours ago",
    moment: "친구에게 안부를 물었어요.",
    status: "Ripple reached 4 places",
    route: "Seoul → Tokyo → ?",
    photoTone: "#F8E7D8",
  },
  {
    city: "Tokyo",
    country: "Japan",
    timeAgo: "4 hours ago",
    moment: "Listened to someone.",
    status: "Ripple reached 7 places",
    route: "Tokyo → Singapore → Paris",
    photoTone: "#F2EEE8",
  },
  {
    city: "Mexico City",
    country: "Mexico",
    timeAgo: "6 hours ago",
    moment: "길을 헤매는 사람에게 방향을 알려줬어요.",
    status: "Ripple reached 12 places",
    route: "Seoul → Mexico City",
    photoTone: "#FFE2CC",
  },
  {
    city: "New York",
    country: "United States",
    timeAgo: "2 days ago",
    moment: "고마운 마음을 짧게 전했어요.",
    status: "Ripple reached 15 places",
    route: "Seoul → Paris → New York",
    photoTone: "#F6EBDD",
  },
];

export default function WorldScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="OLMANG World"
        subtitle="전 세계에서 이어지는 작은 순간들"
      />

      <RippleCard>
        <RippleLabel>Global Stats · 전 세계 현황</RippleLabel>
        <View style={styles.globalStats}>
          {globalStats.map(([icon, value, label]) => (
            <View key={label} style={styles.globalStatBox}>
              <Text style={styles.globalStatIcon}>{icon}</Text>
              <Text style={styles.globalStatValue}>{value}</Text>
              <Text style={styles.globalStatLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </RippleCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Moving now</Text>
        <Text style={styles.sectionSubtitle}>지금 이어지고 있는 리플</Text>
      </View>

      {movingRipples.map((item) => (
        <RippleCard
          key={item.route}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: item.moment },
            })
          }
          style={styles.movingCard}
        >
          <View style={styles.movingTop}>
            <Text style={styles.movingRoute}>{item.route}</Text>
            <RipplePill>Moving</RipplePill>
          </View>
          <Text style={styles.movingMoment}>“{item.moment}”</Text>
          <Text style={styles.movingTime}>Moving · {item.timeAgo}</Text>
        </RippleCard>
      ))}

      <Text style={styles.sectionTitle}>Live Ripples · 지금 이어지는 리플</Text>

      {rippleFeed.map((item) => (
        <RippleCard
          key={item.city}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: item.moment },
            })
          }
          style={styles.rippleCard}
        >
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.place}>📍 {item.city}</Text>
              <Text style={styles.country}>{item.country}</Text>
            </View>
            <Text style={styles.timeAgo}>🕒 {item.timeAgo}</Text>
          </View>

          <View
            style={[
              styles.photoPlaceholder,
              { backgroundColor: item.photoTone },
            ]}
          >
            <Text style={styles.photoIcon}>📷</Text>
          </View>

          <Text style={styles.momentText}>“{item.moment}”</Text>
        </RippleCard>
      ))}

      <View style={styles.actions}>
        <RippleButton onPress={() => router.push("/create")}>
          Start a Ripple · 리플 시작하기
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/profile")}>
          My Ripples · 내 리플 보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  globalStats: {
    flexDirection: "row",
    gap: 10,
  },
  globalStatBox: {
    flex: 1,
    minHeight: 112,
    borderRadius: 18,
    backgroundColor: "rgba(255,248,240,0.76)",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  globalStatIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  globalStatValue: {
    fontSize: 24,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  globalStatLabel: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "800",
    color: rippleColors.muted,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
    marginTop: 6,
    marginBottom: 10,
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 10,
  },
  sectionSubtitle: {
    marginTop: -4,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  movingCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 18,
  },
  movingTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  movingRoute: {
    flex: 1,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  movingMoment: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 10,
  },
  movingTime: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: rippleColors.blush,
  },
  rippleCard: {
    padding: 18,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  place: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  country: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "800",
    color: rippleColors.soft,
  },
  timeAgo: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "900",
    color: rippleColors.muted,
  },
  photoPlaceholder: {
    height: 150,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    opacity: 0.86,
  },
  photoIcon: {
    fontSize: 38,
  },
  momentText: {
    fontSize: 21,
    lineHeight: 29,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 14,
  },
  statusRow: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  route: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 8,
  },
});
