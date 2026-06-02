import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const passports = [
  {
    id: "#001",
    title: "Checked in on a friend",
    status: "Seed",
    started: "Seoul 🇰🇷",
    latest: "Seoul 🇰🇷",
    countries: "1",
    distance: "0 km",
  },
  {
    id: "#002",
    title: "Listened to someone",
    status: "Ripple",
    started: "Seoul 🇰🇷",
    latest: "Busan 🇰🇷",
    countries: "1",
    distance: "325 km",
  },
  {
    id: "#003",
    title: "Shared advice",
    status: "Ripple",
    started: "Seoul 🇰🇷",
    latest: "Tokyo 🇯🇵",
    countries: "2",
    distance: "1,158 km",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

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
          <Text style={styles.title}>My Passports</Text>
          <Text style={styles.subtitle}>
            Moments you started, and the places they reached.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>Total ripples</Text>
            <Text style={styles.summaryValue}>3</Text>
          </View>

          <View>
            <Text style={styles.summaryLabel}>Farthest place</Text>
            <Text style={styles.summaryValueSmall}>Tokyo 🇯🇵</Text>
          </View>
        </View>

        <View style={styles.list}>
          {passports.map((item) => (
            <Pressable
              key={item.id}
              style={styles.passportCard}
              onPress={() =>
                router.push({
                  pathname: "/passport",
                  params: { text: item.title },
                })
              }
            >
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.passportId}>Ripple {item.id}</Text>
                  <Text style={styles.passportTitle}>{item.title}</Text>
                </View>

                <View style={styles.pill}>
                  <Text style={styles.pillText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.routeRow}>
                <Text style={styles.routeText}>{item.started}</Text>
                <Text style={styles.arrow}>→</Text>
                <Text style={styles.routeText}>{item.latest}</Text>
              </View>

              <View style={styles.metaRow}>
                <View>
                  <Text style={styles.metaLabel}>Countries</Text>
                  <Text style={styles.metaValue}>{item.countries}</Text>
                </View>

                <View>
                  <Text style={styles.metaLabel}>Distance</Text>
                  <Text style={styles.metaValue}>{item.distance}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/create")}
        >
          <Text style={styles.primaryButtonText}>Start a new ripple</Text>
        </Pressable>
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
    width: 300,
    height: 300,
    backgroundColor: "#F7C7D9",
    top: -100,
    right: -100,
    opacity: 0.42,
  },
  blobTwo: {
    width: 260,
    height: 260,
    backgroundColor: "#D8C7F7",
    top: 330,
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
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 28,
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
    marginTop: 14,
    fontSize: 17,
    lineHeight: 25,
    color: "#6F6472",
    fontWeight: "500",
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 18,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#9A8F9B",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 38,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  summaryValueSmall: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  list: {
    gap: 12,
  },
  passportCard: {
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  passportId: {
    fontSize: 12,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: 6,
  },
  passportTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(247,199,217,0.45)",
    alignSelf: "flex-start",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#B75E82",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  routeText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  arrow: {
    fontSize: 18,
    fontWeight: "900",
    color: "#9A8F9B",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#9A8F9B",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  primaryButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: "#1F1D2B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});