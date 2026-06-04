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
    title: "Checked in on a friend",
    countries: 3,
    stops: 4,
    status: "Growing",
    place: "Cape Town",
  },
  {
    id: "#002",
    title: "Listened to someone today",
    countries: 1,
    stops: 1,
    status: "Seed",
    place: "Seoul",
  },
  {
    id: "#003",
    title: "Helped carry groceries",
    countries: 2,
    stops: 3,
    status: "Traveling",
    place: "Mexico City",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="My Ripples"
        subtitle="Your collection of moments, journeys, and the places they reached."
      />

      <RippleCard>
        <RippleLabel>Collection</RippleLabel>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>Ripples</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>6</Text>
            <Text style={styles.summaryLabel}>Countries</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>8</Text>
            <Text style={styles.summaryLabel}>Stops</Text>
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
          <Text style={styles.place}>Latest stop: {ripple.place}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>{ripple.countries} countries</Text>
            <Text style={styles.stat}>{ripple.stops} stops</Text>
          </View>
        </RippleCard>
      ))}

      <View style={styles.actions}>
        <RippleButton onPress={() => router.push("/create")}>
          Start New Ripple
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/world")}>
          View Global Feed
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
  statsRow: {
    flexDirection: "row",
    gap: 12,
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
