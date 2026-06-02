import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CardScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const text =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "A small moment was shared.";

  const photo =
    typeof params.photo === "string" && params.photo.trim().length > 0
      ? params.photo
      : "";

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
          <Text style={styles.title}>Your ripple is ready.</Text>
          <Text style={styles.subtitle}>
            This moment can now travel further.
          </Text>
        </View>

        <View style={styles.rippleCard}>
          <View style={styles.cardTop}>
            <Text style={styles.cardBrand}>Ripple</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>Seed started</Text>
            </View>
          </View>

          {photo ? (
            <Image source={{ uri: photo }} style={styles.cardImage} />
          ) : (
            <View style={styles.emptyImage}>
              <Text style={styles.emptyImageText}>🌊</Text>
            </View>
          )}

          <View style={styles.quoteBlock}>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.momentText}>{text}</Text>
          </View>

          <View style={styles.metaBlock}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Started in</Text>
              <Text style={styles.metaValue}>Seoul, South Korea</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Reached</Text>
              <Text style={styles.metaValue}>1 person</Text>
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.farthestBlock}>
            <Text style={styles.metaLabel}>Farthest place</Text>
            <Text style={styles.farthestValue}>Not yet</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              router.push({
                pathname: "/share",
                params: { text, photo },
              })
            }
          >
            <Text style={styles.primaryButtonText}>Share this ripple</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() =>
              router.push({
                pathname: "/passport",
                params: { text, photo },
              })
            }
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
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 22,
  },
  backText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F1D2B",
  },
  header: {
    marginBottom: 20,
  },
  brand: {
    fontSize: 15,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -1.1,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 25,
    color: "#6F6472",
    fontWeight: "500",
  },
  rippleCard: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 32,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    shadowColor: "#1F1D2B",
    shadowOpacity: 0.1,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 18 },
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(247,199,217,0.45)",
    borderWidth: 1,
    borderColor: "rgba(233,143,176,0.3)",
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#B75E82",
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    marginBottom: 24,
  },
  emptyImage: {
    width: "100%",
    height: 180,
    borderRadius: 24,
    backgroundColor: "rgba(247,199,217,0.32)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyImageText: {
    fontSize: 44,
  },
  quoteBlock: {
    marginBottom: 28,
  },
  quoteMark: {
    fontSize: 48,
    lineHeight: 48,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: -8,
  },
  momentText: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -0.8,
  },
  metaBlock: {
    gap: 14,
  },
  metaItem: {
    gap: 4,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#9A8F9B",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  metaValue: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  line: {
    height: 1,
    backgroundColor: "rgba(31,29,43,0.08)",
    marginVertical: 18,
  },
  farthestBlock: {
    gap: 4,
  },
  farthestValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  actions: {
    marginTop: "auto",
    gap: 12,
    paddingTop: 22,
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