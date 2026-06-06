import { useLocalSearchParams, useRouter } from "expo-router";
import { DimensionValue, StyleSheet, Text, View, ViewStyle } from "react-native";

import {
  RippleBackButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

type MapStop = {
  city: string;
  country: string;
  flag: string;
  message: string;
  time: string;
  x: number;
  y: number;
  preview?: boolean;
};

const coordinateLookup: Record<string, { x: number; y: number }> = {
  seoul: { x: 77, y: 39 },
  tokyo: { x: 84, y: 41 },
  "mexico city": { x: 22, y: 55 },
  paris: { x: 48, y: 34 },
  singapore: { x: 72, y: 65 },
  "new york": { x: 28, y: 38 },
};

const previewStops: MapStop[] = [
  {
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    message: "Listened to someone.",
    time: "Future stop",
    x: coordinateLookup.tokyo.x,
    y: coordinateLookup.tokyo.y,
    preview: true,
  },
  {
    city: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    message: "Helped someone find their way.",
    time: "Future stop",
    x: coordinateLookup["mexico city"].x,
    y: coordinateLookup["mexico city"].y,
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

function coordinatesFor(city: string, fallbackIndex: number) {
  const saved = coordinateLookup[city.toLowerCase()];

  if (saved) {
    return saved;
  }

  return {
    x: Math.min(82, 34 + fallbackIndex * 13),
    y: Math.min(68, 38 + fallbackIndex * 7),
  };
}

function buildStops({
  text,
  place,
  isContinued,
}: {
  text: string;
  place: string;
  isContinued: boolean;
}) {
  const seoul = coordinateLookup.seoul;
  const firstStop: MapStop = {
    city: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    message: isContinued ? "친구에게 안부를 물었어요." : text,
    time: "Step 1",
    x: seoul.x,
    y: seoul.y,
  };

  if (!isContinued) {
    return [firstStop, ...previewStops];
  }

  const continuedPlace = splitPlace(place);
  const continuedCoordinates = coordinatesFor(continuedPlace.city, 1);

  return [
    firstStop,
    {
      city: continuedPlace.city,
      country: continuedPlace.country,
      flag: "🌍",
      message: text,
      time: "Step 2 · Latest",
      x: continuedCoordinates.x,
      y: continuedCoordinates.y,
    },
    ...previewStops,
  ];
}

function lineStyle(from: MapStop, to: MapStop): ViewStyle {
  const width = 340;
  const height = 210;
  const dx = ((to.x - from.x) / 100) * width;
  const dy = ((to.y - from.y) / 100) * height;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = `${Math.atan2(dy, dx)}rad`;

  return {
    left: `${from.x}%` as DimensionValue,
    top: `${from.y}%` as DimensionValue,
    width: length,
    transform: [{ rotate: angle }],
  };
}

export default function JourneyMapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const text =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "친구에게 안부를 물었어요";
  const place =
    typeof params.place === "string" && params.place.trim().length > 0
      ? params.place
      : "Seoul, South Korea";
  const isContinued = params.continued === "true";
  const stops = buildStops({ text, place, isContinued });
  const activeStops = stops.filter((stop) => !stop.preview);
  const latestStop = activeStops[activeStops.length - 1] ?? stops[0];

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Journey Map"
        subtitle="장소를 따라 이어지는 리플의 이동 경로"
      />

      <RippleCard style={styles.mapCard}>
        <View style={styles.mapTop}>
          <View>
            <RippleLabel>OLMANG Journey</RippleLabel>
            <Text style={styles.mapTitle}>Where it has traveled</Text>
            <Text style={styles.mapSubtitle}>
              작은 순간이 사람과 장소를 지나가고 있어요.
            </Text>
          </View>
          <RipplePill>{isContinued ? "Ripple" : "Seed"}</RipplePill>
        </View>

        <View style={styles.worldMap}>
          <View style={[styles.land, styles.landAmerica]} />
          <View style={[styles.land, styles.landEurope]} />
          <View style={[styles.land, styles.landAsia]} />
          <View style={[styles.land, styles.landAustralia]} />

          {stops.slice(0, -1).map((stop, index) => {
            const nextStop = stops[index + 1];

            return (
              <View
                key={`${stop.city}-${nextStop.city}`}
                pointerEvents="none"
                style={[
                  styles.routeLine,
                  stop.preview && styles.previewLine,
                  lineStyle(stop, nextStop),
                ]}
              />
            );
          })}

          {stops.map((stop, index) => {
            const isLatest = stop.city === latestStop.city && !stop.preview;

            return (
              <View
                key={`${stop.city}-${index}`}
                style={[
                  styles.pinWrap,
                  { left: `${stop.x}%`, top: `${stop.y}%` },
                ]}
              >
                <View
                  style={[
                    styles.pin,
                    stop.preview && styles.previewPin,
                    isLatest && styles.latestPin,
                  ]}
                >
                  <Text style={styles.pinNumber}>{index + 1}</Text>
                </View>
                <Text
                  style={[
                    styles.pinLabel,
                    stop.preview && styles.previewPinLabel,
                    isLatest && styles.latestPinLabel,
                  ]}
                >
                  {stop.flag} {stop.city}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{activeStops.length}</Text>
            <Text style={styles.statLabel}>Stops</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {new Set(activeStops.map((stop) => stop.country)).size}
            </Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{latestStop.city}</Text>
            <Text style={styles.statLabel}>Latest</Text>
          </View>
        </View>
      </RippleCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Journey order</Text>
        <Text style={styles.sectionSubtitle}>이어진 순서</Text>
      </View>

      {stops.map((stop, index) => (
        <RippleCard
          key={`order-${stop.city}-${index}`}
          style={[styles.stopCard, stop.preview && styles.previewStopCard]}
        >
          <View style={styles.orderBadge}>
            <Text style={styles.orderNumber}>{index + 1}</Text>
          </View>
          <View style={styles.stopContent}>
            <Text style={styles.stopPlace}>
              {stop.flag} {stop.city}
            </Text>
            <Text style={styles.stopMeta}>
              {stop.country} · {stop.time}
            </Text>
            <Text style={styles.stopMessage}>{stop.message}</Text>
          </View>
          {!stop.preview && stop.city === latestStop.city ? (
            <RipplePill>Latest</RipplePill>
          ) : null}
        </RippleCard>
      ))}
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  mapCard: {
    padding: 22,
  },
  mapTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 18,
  },
  mapTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  mapSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  worldMap: {
    height: 260,
    borderRadius: 26,
    backgroundColor: "#FFF1E5",
    overflow: "hidden",
    position: "relative",
    marginBottom: 18,
  },
  land: {
    position: "absolute",
    backgroundColor: "rgba(248,231,216,0.95)",
    borderRadius: 999,
  },
  landAmerica: {
    width: 112,
    height: 150,
    left: 30,
    top: 50,
    transform: [{ rotate: "-16deg" }],
  },
  landEurope: {
    width: 72,
    height: 60,
    left: 170,
    top: 68,
    transform: [{ rotate: "12deg" }],
  },
  landAsia: {
    width: 146,
    height: 112,
    right: 28,
    top: 62,
    transform: [{ rotate: "-8deg" }],
  },
  landAustralia: {
    width: 74,
    height: 44,
    right: 52,
    bottom: 40,
    transform: [{ rotate: "10deg" }],
  },
  routeLine: {
    position: "absolute",
    height: 3,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    opacity: 0.7,
    transformOrigin: "left center",
  },
  previewLine: {
    opacity: 0.2,
  },
  pinWrap: {
    position: "absolute",
    alignItems: "center",
    transform: [{ translateX: -28 }, { translateY: -18 }],
    minWidth: 56,
  },
  pin: {
    width: 29,
    height: 29,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: rippleColors.paper,
  },
  latestPin: {
    width: 38,
    height: 38,
    backgroundColor: rippleColors.blush,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  previewPin: {
    backgroundColor: "rgba(34,34,34,0.24)",
  },
  pinNumber: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  pinLabel: {
    marginTop: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "rgba(255,249,244,0.84)",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  latestPinLabel: {
    color: rippleColors.blush,
  },
  previewPinLabel: {
    color: rippleColors.soft,
  },
  stats: {
    flexDirection: "row",
    gap: 10,
  },
  statBox: {
    flex: 1,
    minHeight: 76,
    borderRadius: 18,
    backgroundColor: rippleColors.cardSoft,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  statLabel: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900",
    color: rippleColors.muted,
    textTransform: "uppercase",
    textAlign: "center",
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
    fontWeight: "800",
    color: rippleColors.soft,
  },
  stopCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  previewStopCard: {
    opacity: 0.58,
  },
  orderBadge: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: rippleColors.blushSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  orderNumber: {
    fontSize: 13,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  stopContent: {
    flex: 1,
  },
  stopPlace: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  stopMeta: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    color: rippleColors.soft,
  },
  stopMessage: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
});
