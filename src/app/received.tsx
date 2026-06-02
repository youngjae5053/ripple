import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ReceivedScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />

      <View style={styles.phone}>
        <View style={styles.header}>
          <Text style={styles.brand}>Ripple</Text>
          <Text style={styles.title}>A ripple found you.</Text>
          <Text style={styles.subtitle}>
            Someone shared a small moment. You can let it continue, only if it
            feels right.
          </Text>
        </View>

        <View style={styles.rippleCard}>
          <View style={styles.cardTop}>
            <Text style={styles.cardLabel}>Ripple #001</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>From Seoul 🇰🇷</Text>
            </View>
          </View>

          <Text style={styles.momentText}>Checked in on a friend</Text>

          <View style={styles.routeBox}>
            <Text style={styles.routeText}>Seoul 🇰🇷</Text>
            <Text style={styles.routeArrow}>↓</Text>
            <Text style={styles.routeText}>You</Text>
            <Text style={styles.routeArrow}>↓</Text>
            <Text style={styles.routeText}>?</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Continue in your own way.</Text>
          <Text style={styles.infoText}>
            Add one photo, one line, and one place. Your stop becomes part of
            this ripple's journey.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/continue")}
          >
            <Text style={styles.primaryButtonText}>Continue this ripple</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/passport")}
          >
            <Text style={styles.secondaryButtonText}>View passport</Text>
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
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 72,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 26,
  },
  brand: {
    fontSize: 15,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: 14,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#6F6472",
    fontWeight: "500",
  },
  rippleCard: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(247,199,217,0.45)",
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#B75E82",
  },
  momentText: {
    fontSize: 29,
    lineHeight: 37,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -0.8,
    marginBottom: 28,
  },
  routeBox: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  routeText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  routeArrow: {
    fontSize: 18,
    fontWeight: "900",
    color: "#9A8F9B",
  },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    color: "#6F6472",
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
});