import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

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

type JourneyStop = {
  city: string;
  country: string;
  message: string;
  time: string;
  photoLabel: string;
  photoUri?: string;
  preview?: boolean;
};

const baseStops: JourneyStop[] = [
  {
    city: "Seoul",
    country: "South Korea",
    message: "Checked in on a friend.",
    time: "Started just now",
    photoLabel: "Cafe table",
  },
  {
    city: "Tokyo",
    country: "Japan",
    message: "Listened to someone after a long day.",
    time: "Future stop preview",
    photoLabel: "Street light",
    preview: true,
  },
  {
    city: "Mexico City",
    country: "Mexico",
    message: "Helped someone carry groceries.",
    time: "Future stop preview",
    photoLabel: "Market corner",
    preview: true,
  },
];

function splitPlace(place: string) {
  const [city, country] = place.split(",").map((part) => part.trim());

  return {
    city: city || "New stop",
    country: country || "Somewhere",
  };
}

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
  const continuedPlace = splitPlace(place);

  const stops: JourneyStop[] = isContinued
    ? [
        baseStops[0],
        {
          city: continuedPlace.city,
          country: continuedPlace.country,
          message: text,
          time: "Added just now",
          photoLabel: "Your photo",
          photoUri: photo,
        },
        ...baseStops.slice(1),
      ]
    : [
        {
          ...baseStops[0],
          message: text,
          photoUri: photo,
        },
        ...baseStops.slice(1),
      ];

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Passport"
        subtitle="Start a moment. See how far it goes. Every stop keeps one photo, one line, and one place together."
      />

      <RippleCard>
        <View style={styles.cardTop}>
          <RippleLabel>Ripple #001</RippleLabel>
          <RipplePill>{isContinued ? "Ripple" : "Seed"}</RipplePill>
        </View>
        <Text style={styles.momentText}>{text}</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0 days</Text>
            <Text style={styles.statLabel}>Age</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stops.filter((s) => !s.preview).length}</Text>
            <Text style={styles.statLabel}>Stops</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{isContinued ? "2" : "1"}</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {isContinued ? continuedPlace.city : "Seoul"}
            </Text>
            <Text style={styles.statLabel}>Latest stop</Text>
          </View>
        </View>
      </RippleCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Passport Journey</Text>
        <Text style={styles.sectionSubtitle}>Photo · line · place</Text>
      </View>

      <View style={styles.timeline}>
        {stops.map((stop, index) => {
          const isLast = index === stops.length - 1;

          return (
            <View key={`${stop.city}-${index}`} style={styles.timelineItem}>
              <View style={styles.timelineRail}>
                <View
                  style={[styles.timelineDot, stop.preview && styles.previewDot]}
                />
                {!isLast ? <View style={styles.timelineLine} /> : null}
              </View>

              <RippleCard
                style={[styles.stopCard, stop.preview && styles.previewStopCard]}
              >
                <View style={styles.photoBox}>
                  {stop.photoUri ? (
                    <Image source={{ uri: stop.photoUri }} style={styles.stopImage} />
                  ) : (
                    <Text style={styles.photoLabel}>{stop.photoLabel}</Text>
                  )}
                </View>
                <View style={styles.stopContent}>
                  <Text style={styles.stopPlace}>{stop.city}</Text>
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
              </RippleCard>
            </View>
          );
        })}
      </View>

      <RippleCard style={styles.waitingCard}>
        <Text style={styles.waitingTitle}>Waiting for next stop...</Text>
        <Text style={styles.waitingText}>
          When someone continues this Ripple, their photo, line, and place
          will appear here.
        </Text>
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton
          onPress={() =>
            router.push({
              pathname: "/share",
              params: { text, photo },
            })
          }
        >
          Pass it on
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/create")}>
          Start another Ripple
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  momentText: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 22,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statBox: {
    width: "48%",
    backgroundColor: "rgba(255,248,240,0.76)",
    borderRadius: 18,
    padding: 14,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: rippleColors.soft,
  },
  timeline: {
    marginBottom: 4,
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
    backgroundColor: rippleColors.ink,
    marginTop: 38,
  },
  previewDot: {
    backgroundColor: "rgba(31,29,43,0.18)",
    borderWidth: 2,
    borderColor: "rgba(31,29,43,0.24)",
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: rippleColors.line,
    marginTop: 4,
  },
  stopCard: {
    flex: 1,
    flexDirection: "row",
    gap: 14,
    padding: 18,
  },
  previewStopCard: {
    opacity: 0.62,
  },
  photoBox: {
    width: 92,
    height: 92,
    borderRadius: 20,
    backgroundColor: "rgba(247,199,217,0.35)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: 10,
  },
  stopImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  photoLabel: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  stopContent: {
    flex: 1,
  },
  stopPlace: {
    fontSize: 17,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 2,
  },
  stopCountry: {
    fontSize: 12,
    fontWeight: "800",
    color: rippleColors.soft,
    marginBottom: 8,
  },
  stopMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: rippleColors.muted,
    fontWeight: "700",
    marginBottom: 8,
  },
  previewText: {
    color: rippleColors.soft,
  },
  stopTime: {
    fontSize: 12,
    color: rippleColors.soft,
    fontWeight: "800",
  },
  waitingCard: {
    backgroundColor: rippleColors.cardSoft,
    borderStyle: "dashed",
  },
  waitingTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 6,
  },
  waitingText: {
    fontSize: 13,
    lineHeight: 19,
    color: rippleColors.muted,
    fontWeight: "600",
  },
  actions: {
    gap: 10,
    marginTop: "auto",
    paddingTop: 8,
  },
});
