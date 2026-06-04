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
  ["3", "My Ripples"],
  ["6", "Countries"],
  ["8", "Stops"],
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
        subtitle="Create one small moment, pass it on, and watch its journey grow through people and places."
      />

      <RippleCard>
        <RippleLabel>Today</RippleLabel>
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
          <RippleLabel>Latest ripple</RippleLabel>
          <RipplePill>Growing</RipplePill>
        </View>
        <Text style={styles.cardTitle}>Checked in on a friend</Text>
        <Text style={styles.cardText}>
          Seoul to Tokyo to Mexico City, waiting for the next stop.
        </Text>
      </RippleCard>

      <RippleCard onPress={() => router.push("/world")}>
        <View style={styles.cardTop}>
          <RippleLabel>Global Feed</RippleLabel>
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
          Start a moment
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/profile")}>
          View My Ripples
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/world")}>
          Explore World
        </RippleButton>
        <RippleButton tone="ghost" onPress={() => router.push("/received")}>
          Preview received ripple
        </RippleButton>
        <RippleButton tone="ghost" onPress={() => router.push("/onboarding")}>
          View onboarding
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
