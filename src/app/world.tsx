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

const topRipples = [
  {
    place: "Paris, France",
    message: "Shared an umbrella",
    route: "Seoul → Paris",
    reach: "8 people",
  },
  {
    place: "Mexico City, Mexico",
    message: "Helped carry groceries",
    route: "Busan → Tokyo → Mexico City",
    reach: "12 people",
  },
  {
    place: "Cape Town, South Africa",
    message: "Shared a meal",
    route: "Seoul → Sydney → Cape Town",
    reach: "21 people",
  },
  {
    place: "Tokyo, Japan",
    message: "Listened to someone today",
    route: "Seoul → Tokyo",
    reach: "3 people",
  },
];

const globalFeed = [
  {
    place: "Lisbon, Portugal",
    message: "Left a note for a neighbor",
    route: "Seoul → Lisbon",
    reach: "5 stops",
  },
  {
    place: "Vancouver, Canada",
    message: "Made room for a hard conversation",
    route: "Tokyo → Vancouver",
    reach: "4 stops",
  },
];

export default function WorldScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Global Feed"
        subtitle="Discover moments traveling through people and places around the world."
      />

      <RippleCard>
        <RippleLabel>Top Ripples</RippleLabel>
        <Text style={styles.worldTitle}>Start a moment. See how far it goes.</Text>
        <View style={styles.worldStats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Stops</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>9</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>People</Text>
          </View>
        </View>
      </RippleCard>

      <Text style={styles.sectionTitle}>Top Ripples</Text>
      {topRipples.map((item, index) => (
        <RippleCard
          key={item.place}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: item.message },
            })
          }
        >
          <View style={styles.cardTop}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <RipplePill>{item.reach}</RipplePill>
          </View>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.place}>{item.place}</Text>
          <Text style={styles.route}>{item.route}</Text>
        </RippleCard>
      ))}

      <Text style={styles.sectionTitle}>Global Feed</Text>
      {globalFeed.map((item) => (
        <RippleCard
          key={item.place}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: item.message },
            })
          }
          style={styles.feedCard}
        >
          <View style={styles.cardTop}>
            <RippleLabel>Live stop</RippleLabel>
            <RipplePill>{item.reach}</RipplePill>
          </View>
          <Text style={styles.feedMessage}>{item.message}</Text>
          <Text style={styles.place}>{item.place}</Text>
          <Text style={styles.route}>{item.route}</Text>
        </RippleCard>
      ))}

      <View style={styles.actions}>
        <RippleButton onPress={() => router.push("/create")}>
          Start a moment
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/profile")}>
          My Ripples
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  worldTitle: {
    fontSize: 26,
    lineHeight: 33,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 18,
  },
  worldStats: {
    flexDirection: "row",
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,248,240,0.76)",
    borderRadius: 18,
    padding: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
    marginTop: 6,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  rank: {
    fontSize: 14,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  message: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 8,
  },
  feedCard: {
    backgroundColor: rippleColors.cardSoft,
  },
  feedMessage: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 8,
  },
  place: {
    fontSize: 14,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 6,
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
