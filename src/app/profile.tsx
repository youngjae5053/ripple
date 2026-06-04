import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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

const ripples = [
  {
    id: "#001",
    title: "친구에게 안부를 물었어요",
    countries: 3,
    stops: 4,
    status: "Growing",
    place: "Tokyo",
  },
  {
    id: "#002",
    title: "Shared a small coffee",
    countries: 1,
    stops: 1,
    status: "Seed",
    place: "Seoul",
  },
  {
    id: "#003",
    title: "길을 헤매는 사람에게 방향을 알려줬어요",
    countries: 2,
    stops: 3,
    status: "Traveling",
    place: "Singapore",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="My Ripples"
        subtitle="내가 시작한 리플 모아보기. 작은 순간들이 어디까지 닿았는지 확인해보세요."
      />

      <RippleCard>
        <RippleLabel>Collection · 내 리플 모음</RippleLabel>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>리플</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>6</Text>
            <Text style={styles.summaryLabel}>닿은 나라</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>8</Text>
            <Text style={styles.summaryLabel}>이어진 곳</Text>
          </View>
        </View>
      </RippleCard>

      {ripples.map((ripple) => (
        <RippleCard
          key={ripple.id}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: ripple.title },
            })
          }
        >
          <View style={styles.cardTop}>
            <Text style={styles.rippleId}>{ripple.id}</Text>
            <RipplePill>{ripple.status}</RipplePill>
          </View>
          <Text style={styles.rippleTitle}>{ripple.title}</Text>
          <Text style={styles.place}>Latest stop · 최근 장소: {ripple.place}</Text>
          <Text style={styles.stat}>
            {ripple.countries} countries · {ripple.stops} stops
          </Text>
        </RippleCard>
      ))}

      <View style={styles.actions}>
        <RippleButton onPress={() => router.push("/create")}>
          Start a Ripple · 새 리플 시작
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/world")}>
          World Ripples · 전 세계 리플
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
  },
  summaryItem: {
    flex: 1,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  summaryLabel: {
    marginTop: 4,
    color: rippleColors.muted,
    fontWeight: "800",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  rippleId: {
    fontWeight: "900",
    color: rippleColors.ink,
  },
  rippleTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 10,
  },
  place: {
    color: rippleColors.muted,
    fontWeight: "700",
    marginBottom: 12,
  },
  stat: {
    fontWeight: "800",
    color: rippleColors.ink,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 8,
  },
});
