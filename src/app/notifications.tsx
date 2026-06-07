import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { BottomNavigation } from "@/components/bottom-navigation";
import {
  RippleBackButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

const todayNotifications = [
  {
    icon: "🌏",
    title: "Your moment reached Tokyo",
    text: "친구에게 안부를 물은 순간이 새로운 도시까지 이어졌어요.",
    time: "12 min ago",
  },
  {
    icon: "✨",
    title: "Someone continued your journey",
    text: "누군가 자신의 방식으로 이 순간을 이어갔어요.",
    time: "1 hour ago",
  },
];

const earlierNotifications = [
  {
    icon: "🪐",
    title: "Your journey reached 1000km",
    text: "작은 순간이 생각보다 먼 궤도를 지나고 있어요.",
    time: "Yesterday",
  },
  {
    icon: "🌍",
    title: "Your journey reached a new country",
    text: "처음 시작한 순간이 다른 나라에 닿았어요.",
    time: "2 days ago",
  },
];

function NotificationCard({
  icon,
  title,
  text,
  time,
}: {
  icon: string;
  title: string;
  text: string;
  time: string;
}) {
  return (
    <RippleCard style={styles.notificationCard}>
      <View style={styles.orbitIcon}>
        <View style={styles.orbitRing} />
        <Text style={styles.notificationIcon}>{icon}</Text>
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationTop}>
          <Text style={styles.notificationTitle}>{title}</Text>
          <RipplePill>{time}</RipplePill>
        </View>
        <Text style={styles.notificationText}>{text}</Text>
      </View>
    </RippleCard>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Notifications"
        subtitle="당신의 순간이 이어지는 소식"
      />

      <View style={styles.heroCard}>
        <View style={styles.heroOrbit}>
          <View style={[styles.heroRing, styles.heroRingWide]} />
          <View style={[styles.heroRing, styles.heroRingTall]} />
          <View style={styles.heroPlanet} />
          <View style={styles.heroMoon} />
        </View>
        <View style={styles.heroText}>
          <RippleLabel>Come back to your orbit</RippleLabel>
          <Text style={styles.heroTitle}>새로운 연결이 도착했어요.</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today</Text>
        <Text style={styles.sectionSubtitle}>오늘 이어진 알림</Text>
      </View>

      {todayNotifications.map((notification) => (
        <NotificationCard key={notification.title} {...notification} />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Earlier</Text>
        <Text style={styles.sectionSubtitle}>지난 궤도의 변화</Text>
      </View>

      {earlierNotifications.map((notification) => (
        <NotificationCard key={notification.title} {...notification} />
      ))}
      <BottomNavigation />
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    minHeight: 150,
    borderRadius: 30,
    backgroundColor: "rgba(255,249,244,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#8A4A22",
    shadowOpacity: 0.06,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
  },
  heroOrbit: {
    width: 98,
    height: 98,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  heroRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1.5,
  },
  heroRingWide: {
    width: 106,
    height: 46,
    borderColor: "rgba(255,138,61,0.34)",
    transform: [{ rotate: "-20deg" }],
  },
  heroRingTall: {
    width: 76,
    height: 76,
    borderColor: "rgba(34,34,34,0.1)",
    transform: [{ rotate: "30deg" }],
  },
  heroPlanet: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  heroMoon: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    right: 16,
    top: 27,
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  sectionHeader: {
    marginTop: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: rippleColors.soft,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
  },
  orbitIcon: {
    width: 58,
    height: 58,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rippleColors.cardSoft,
    position: "relative",
  },
  orbitRing: {
    position: "absolute",
    width: 66,
    height: 26,
    borderRadius: 999,
    borderWidth: 1.2,
    borderColor: "rgba(255,138,61,0.32)",
    transform: [{ rotate: "-18deg" }],
  },
  notificationIcon: {
    fontSize: 23,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 7,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
});
