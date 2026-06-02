import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />

      <View style={styles.phone}>
        <View style={styles.topRow}>
          <Text style={styles.brand}>Ripple</Text>

          <Pressable
            style={styles.profilePill}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.profilePillText}>My Passports</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>
            Start a moment.{"\n"}See how far it goes.
          </Text>

          <Text style={styles.subtitle}>
            Small moments can travel farther than you think.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>My journey</Text>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>3</Text>
              <Text style={styles.summaryLabel}>Ripples</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>4</Text>
              <Text style={styles.summaryLabel}>Countries</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>1.8k</Text>
              <Text style={styles.summaryLabel}>km</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.activityCard}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: "Checked in on a friend" },
            })
          }
        >
          <View style={styles.activityTop}>
            <Text style={styles.cardLabel}>Latest activity</Text>
            <Text style={styles.activityStatus}>Seed</Text>
          </View>

          <Text style={styles.activityTitle}>Ripple #001</Text>
          <Text style={styles.activityText}>Waiting for next stop...</Text>
        </Pressable>

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/create")}
          >
            <Text style={styles.primaryButtonText}>Start Ripple</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.secondaryButtonText}>My Passports</Text>
          </Pressable>

          <Pressable
            style={styles.ghostButton}
            onPress={() => router.push("/onboarding")}
          >
            <Text style={styles.ghostButtonText}>View onboarding</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#FFF8F0",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blobOne: {
    width: 310,
    height: 310,
    backgroundColor: "#F7C7D9",
    top: -110,
    right: -100,
    opacity: 0.42,
  },
  blobTwo: {
    width: 260,
    height: 260,
    backgroundColor: "#D8C7F7",
    top: 300,
    left: -130,
    opacity: 0.22,
  },
  blobThree: {
    width: 240,
    height: 240,
    backgroundColor: "#F8D8C8",
    bottom: -80,
    right: -80,
    opacity: 0.36,
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 42,
    paddingBottom: 32,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 42,
  },
  brand: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  profilePill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
  },
  profilePillText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  hero: {
    marginBottom: 26,
  },
  title: {
    fontSize: 43,
    lineHeight: 49,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 18,
    fontSize: 17,
    lineHeight: 25,
    color: "#6F6472",
    fontWeight: "500",
  },
  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    shadowColor: "#1F1D2B",
    shadowOpacity: 0.06,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#E98FB0",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 14,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -0.8,
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "800",
    color: "#6F6472",
  },
  activityCard: {
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
  },
  activityTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: "900",
    color: "#B75E82",
    backgroundColor: "rgba(247,199,217,0.45)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  activityTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 8,
  },
  activityText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6F6472",
    fontWeight: "700",
  },
  actions: {
    marginTop: "auto",
    gap: 12,
  },
  primaryButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: "#1F1D2B",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  secondaryButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#1F1D2B",
    fontSize: 17,
    fontWeight: "900",
  },
  ghostButton: {
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#8B7D88",
  },
});