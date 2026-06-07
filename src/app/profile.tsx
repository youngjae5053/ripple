import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { BottomNavigation } from "@/components/bottom-navigation";
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

      <RippleCard
        onPress={() => router.push("/notifications")}
        style={styles.notificationCard}
      >
        <View style={styles.notificationIconWrap}>
          <View style={styles.notificationRing} />
          <Text style={styles.notificationIcon}>✨</Text>
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationTop}>
            <RippleLabel>Notifications</RippleLabel>
            <RipplePill>4 new</RipplePill>
          </View>
          <Text style={styles.notificationTitle}>Notification Center</Text>
          <Text style={styles.notificationText}>
            내 여정이 어디까지 이어졌는지 확인해보세요.
          </Text>
        </View>
      </RippleCard>

      <RippleCard
        onPress={() =>
          router.push({
            pathname: "/journey-map",
            params: {
              text: "친구에게 안부를 물었어요",
              place: "Tokyo, Japan",
              continued: "true",
            },
          })
        }
        style={styles.mapCard}
      >
        <View style={styles.mapCardTop}>
          <View>
            <RippleLabel>Journey Map</RippleLabel>
            <Text style={styles.mapTitle}>가장 멀리 간 여정 보기</Text>
          </View>
          <RipplePill>Tokyo</RipplePill>
        </View>
        <View style={styles.orbitPreview}>
          <View style={styles.orbitLine} />
          {["Seoul", "Suwon", "Busan", "Tokyo"].map((city, index) => (
            <View key={city} style={styles.orbitStop}>
              <View
                style={[
                  styles.orbitDot,
                  index === 3 && styles.orbitDotCurrent,
                ]}
              />
              <Text style={styles.orbitCity}>{city}</Text>
            </View>
          ))}
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
      <BottomNavigation />
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
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  notificationIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rippleColors.cardSoft,
    position: "relative",
  },
  notificationRing: {
    position: "absolute",
    width: 72,
    height: 28,
    borderRadius: 999,
    borderWidth: 1.2,
    borderColor: "rgba(255,138,61,0.32)",
    transform: [{ rotate: "-18deg" }],
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  notificationText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  mapCard: {
    backgroundColor: "rgba(255,249,244,0.9)",
  },
  mapCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  orbitPreview: {
    minHeight: 76,
    borderRadius: 22,
    backgroundColor: rippleColors.cardSoft,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    position: "relative",
    overflow: "hidden",
  },
  orbitLine: {
    position: "absolute",
    left: 28,
    right: 28,
    top: 35,
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(255,138,61,0.3)",
  },
  orbitStop: {
    alignItems: "center",
    zIndex: 1,
  },
  orbitDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    borderWidth: 3,
    borderColor: rippleColors.paper,
  },
  orbitDotCurrent: {
    width: 22,
    height: 22,
    backgroundColor: rippleColors.blush,
  },
  orbitCity: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900",
    color: rippleColors.muted,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 8,
  },
});
