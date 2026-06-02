import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const journeyStops = [
  {
    city: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    message: "Checked in on a friend.",
    time: "Started just now",
    photo: "☕️",
    preview: false,
  },
  {
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    message: "Listened to someone after a long day.",
    time: "Future stop preview",
    photo: "🌸",
    preview: true,
  },
  {
    city: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    message: "Helped someone carry groceries.",
    time: "Future stop preview",
    photo: "🌮",
    preview: true,
  },
];

export default function PassportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const text =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "A small moment was shared.";

  const place =
    typeof params.place === "string" && params.place.trim().length > 0
      ? params.place
      : "Seoul, South Korea";

  const photo =
    typeof params.photo === "string" && params.photo.trim().length > 0
      ? params.photo
      : "";

  const isContinued = params.continued === "true";

  const continuedStop = {
    city: place.split(",")[0]?.trim() || "New stop",
    country: place.split(",")[1]?.trim() || "Somewhere",
    flag: "🌍",
    message: text,
    time: "Added just now",
    photo: "📷",
    photoUri: photo,
    preview: false,
  };

  const stops = isContinued
    ? [journeyStops[0], continuedStop, ...journeyStops.slice(1)]
    : [
        {
          ...journeyStops[0],
          message: text,
          photoUri: photo,
        },
        ...journeyStops.slice(1),
      ];

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
          <Text style={styles.title}>Ripple Passport</Text>
          <Text style={styles.subtitle}>
            A small moment, traveling through people.
          </Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.cardTop}>
            <Text style={styles.passportLabel}>Ripple #001</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>
                {isContinued ? "Ripple" : "Seed"}
              </Text>
            </View>
          </View>

          <Text style={styles.momentText}>{text}</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>0 days</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Countries</Text>
              <Text style={styles.statValue}>{isContinued ? "2" : "1"}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>
                {isContinued ? "Traveling" : "0 km"}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Latest stop</Text>
              <Text style={styles.statValue}>
                {isContinued ? `${continuedStop.city} ${continuedStop.flag}` : "Seoul 🇰🇷"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.journeyHeader}>
          <Text style={styles.sectionTitle}>Journey</Text>
          <Text style={styles.sectionSubtitle}>Photo · one line · place</Text>
        </View>

        <View style={styles.timeline}>
          {stops.map((stop, index) => {
            const isLast = index === stops.length - 1;
            const stopPhotoUri = (stop as any).photoUri;

            return (
              <View key={`${stop.city}-${index}`} style={styles.timelineItem}>
                <View style={styles.timelineRail}>
                  <View
                    style={[
                      styles.timelineDot,
                      stop.preview && styles.previewDot,
                    ]}
                  />
                  {!isLast ? <View style={styles.timelineLine} /> : null}
                </View>

                <View
                  style={[
                    styles.stopCard,
                    stop.preview && styles.previewStopCard,
                  ]}
                >
                  <View style={styles.photoBox}>
                    {stopPhotoUri ? (
                      <Image
                        source={{ uri: stopPhotoUri }}
                        style={styles.stopImage}
                      />
                    ) : (
                      <Text style={styles.photoEmoji}>{stop.photo}</Text>
                    )}
                  </View>

                  <View style={styles.stopContent}>
                    <Text style={styles.stopPlace}>
                      {stop.flag} {stop.city}
                    </Text>
                    <Text style={styles.stopCountry}>{stop.country}</Text>
                    <Text
                      style={[
                        styles.stopMessage,
                        stop.preview && styles.previewText,
                      ]}
                    >
                      {stop.message}
                    </Text>
                    <Text style={styles.stopTime}>{stop.time}</Text>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.waitingCard}>
            <Text style={styles.waitingTitle}>Waiting for next stop...</Text>
            <Text style={styles.waitingText}>
              When someone continues this ripple, a new place will be added to
              the journey.
            </Text>
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
            <Text style={styles.primaryButtonText}>Pass it on</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/create")}
          >
            <Text style={styles.secondaryButtonText}>Start another ripple</Text>
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
    paddingBottom: 28,
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
    marginBottom: 18,
  },
  brand: {
    fontSize: 15,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    lineHeight: 54,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -1.1,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#6F6472",
    fontWeight: "500",
  },
  heroCard: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    shadowColor: "#1F1D2B",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    marginBottom: 20,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  passportLabel: {
    fontSize: 14,
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
  momentText: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -0.7,
    marginBottom: 22,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statBox: {
    width: "48%",
    backgroundColor: "rgba(255,248,240,0.72)",
    borderRadius: 18,
    padding: 14,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#9A8F9B",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  journeyHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1F1D2B",
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#9A8F9B",
  },
  timeline: {
    gap: 0,
    marginBottom: 18,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  timelineRail: {
    width: 26,
    alignItems: "center",
  },
  timelineDot: {
    width: 13,
    height: 13,
    borderRadius: 999,
    backgroundColor: "#1F1D2B",
    marginTop: 36,
  },
  previewDot: {
    backgroundColor: "rgba(31,29,43,0.18)",
    borderWidth: 2,
    borderColor: "rgba(31,29,43,0.24)",
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "rgba(31,29,43,0.12)",
    marginTop: 4,
  },
  stopCard: {
    flex: 1,
    flexDirection: "row",
    gap: 14,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 12,
  },
  previewStopCard: {
    opacity: 0.62,
  },
  photoBox: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "rgba(247,199,217,0.35)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  stopImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  photoEmoji: {
    fontSize: 40,
  },
  stopContent: {
    flex: 1,
  },
  stopPlace: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 2,
  },
  stopCountry: {
    fontSize: 12,
    fontWeight: "800",
    color: "#9A8F9B",
    marginBottom: 8,
  },
  stopMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6F6472",
    fontWeight: "700",
    marginBottom: 8,
  },
  previewText: {
    color: "#9A8F9B",
  },
  stopTime: {
    fontSize: 12,
    color: "#9A8F9B",
    fontWeight: "800",
  },
  waitingCard: {
    backgroundColor: "rgba(255,255,255,0.58)",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.85)",
    borderStyle: "dashed",
    marginLeft: 26,
  },
  waitingTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 6,
  },
  waitingText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6F6472",
    fontWeight: "600",
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
});