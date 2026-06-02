import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function ShareScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const text =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "A small moment was shared.";

  const rippleLink = "ripple.app/r/001";

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />

      <View style={styles.phone}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.brand}>Ripple</Text>
          <Text style={styles.title}>Pass it on.</Text>
          <Text style={styles.subtitle}>
            Generate a link and send this ripple to two people.
          </Text>
        </View>

        <View style={styles.momentCard}>
          <Text style={styles.cardLabel}>Your ripple</Text>
          <Text style={styles.momentText}>{text}</Text>
        </View>

        <View style={styles.linkCard}>
          <Text style={styles.cardLabel}>Ripple link</Text>
          <Text style={styles.linkText}>{rippleLink}</Text>

          <Text style={styles.linkDescription}>
            Anyone with this link can continue the journey with one photo, one
            line, and one place.
          </Text>
        </View>

        <View style={styles.pathCard}>
          <Text style={styles.cardLabel}>Potential path</Text>

          <View style={styles.pathRow}>
            <Text style={styles.pathText}>You</Text>
            <Text style={styles.pathArrow}>↓</Text>
            <Text style={styles.pathText}>Friend</Text>
            <Text style={styles.pathArrow}>↓</Text>
            <Text style={styles.pathText}>Someone else</Text>
            <Text style={styles.pathArrow}>↓</Text>
            <Text style={styles.pathText}>?</Text>
          </View>
        </View>

        <View style={styles.inviteCard}>
          <Text style={styles.cardLabel}>Send to</Text>

          <View style={styles.inviteSlots}>
            <View style={styles.slot}>
              <Text style={styles.slotText}>Person 1</Text>
            </View>

            <View style={styles.slot}>
              <Text style={styles.slotText}>Person 2</Text>
            </View>
          </View>

          <Text style={styles.helperText}>
            No pressure. If it feels right, they can pass it on.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => Alert.alert("Ripple link will be copied soon.")}
          >
            <Text style={styles.primaryButtonText}>Copy Ripple Link</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/received")}
          >
            <Text style={styles.secondaryButtonText}>
              Preview received screen
            </Text>
          </Pressable>

          <Pressable
            style={styles.ghostButton}
            onPress={() =>
              router.push({
                pathname: "/passport",
                params: { text },
              })
            }
          >
            <Text style={styles.ghostButtonText}>View passport</Text>
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
    paddingTop: 58,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 26,
  },
  backText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F1D2B",
  },
  header: {
    marginBottom: 22,
  },
  brand: {
    fontSize: 15,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: 12,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 24,
    color: "#6F6472",
    fontWeight: "500",
  },
  momentCard: {
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#E98FB0",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  momentText: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -0.5,
  },
  linkCard: {
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 12,
  },
  linkText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 12,
  },
  linkDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6F6472",
    fontWeight: "600",
  },
  pathCard: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 12,
  },
  pathRow: {
    alignItems: "center",
    gap: 4,
  },
  pathText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  pathArrow: {
    fontSize: 18,
    fontWeight: "900",
    color: "#9A8F9B",
  },
  inviteCard: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 16,
  },
  inviteSlots: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  slot: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  helperText: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
    color: "#6F6472",
  },
  actions: {
    marginTop: "auto",
    gap: 10,
  },
  primaryButton: {
    height: 56,
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
    height: 54,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#1F1D2B",
    fontSize: 16,
    fontWeight: "900",
  },
  ghostButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostButtonText: {
    color: "#6F6472",
    fontSize: 15,
    fontWeight: "900",
  },
});