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
  flag: string;
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
    flag: "🇰🇷",
    message: "친구에게 안부를 물었어요.",
    time: "Started just now",
    photoLabel: "Coffee cup",
  },
  {
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    message: "Listened to someone.",
    time: "Future stop preview",
    photoLabel: "Station bench",
    preview: true,
  },
  {
    city: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    message: "Helped someone find their way.",
    time: "Future stop preview",
    photoLabel: "Street corner",
    preview: true,
  },
];

const rippleProgress = {
  progress: 50,
  stops: 4,
  countries: 3,
  days: 12,
};

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
      : "친구에게 안부를 물었어요";
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
          flag: "🌍",
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
  const activeStops = stops.filter((stop) => !stop.preview);
  const latestStop = isContinued ? continuedPlace.city : "Seoul";

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Ripple Passport"
        subtitle="이 리플이 지나온 여정. 사진 1장, 문장 1줄, 장소 1곳이 함께 남아요."
      />

      <RippleCard>
        <View style={styles.cardTop}>
          <RippleLabel>Ripple #001 · 리플 여권</RippleLabel>
          <RipplePill>{isContinued ? "Ripple" : "Seed"}</RipplePill>
        </View>
        <Text style={styles.momentText}>{text}</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0 days</Text>
            <Text style={styles.statLabel}>Age · 지난 시간</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{activeStops.length}</Text>
            <Text style={styles.statLabel}>Stops · 이어진 곳</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{isContinued ? "2" : "1"}</Text>
            <Text style={styles.statLabel}>Countries · 닿은 나라</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{latestStop}</Text>
            <Text style={styles.statLabel}>Latest · 최근 장소</Text>
          </View>
        </View>
      </RippleCard>

      <RippleCard style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View>
            <RippleLabel>Ripple Reach</RippleLabel>
            <Text style={styles.progressTitle}>작은 순간이 퍼지는 중</Text>
          </View>
          <Text style={styles.progressPercent}>{rippleProgress.progress}%</Text>
        </View>

        <View style={styles.progressLine} />
        <Text style={styles.progressDots}>●●●●●○○○○○</Text>
        <Text style={styles.progressHelper}>
          작은 순간이 {rippleProgress.countries}개 국가를 지나고 있어요.
        </Text>

        <View style={styles.progressStats}>
          <View style={styles.progressStatBox}>
            <Text style={styles.progressStatValue}>{rippleProgress.stops}</Text>
            <Text style={styles.progressStatLabel}>Stops</Text>
          </View>
          <View style={styles.progressStatBox}>
            <Text style={styles.progressStatValue}>
              {rippleProgress.countries}
            </Text>
            <Text style={styles.progressStatLabel}>Countries</Text>
          </View>
          <View style={styles.progressStatBox}>
            <Text style={styles.progressStatValue}>{rippleProgress.days}</Text>
            <Text style={styles.progressStatLabel}>Days</Text>
          </View>
        </View>
      </RippleCard>

      <RippleCard style={styles.mapCard}>
        <View style={styles.mapTop}>
          <View>
            <Text style={styles.mapTitle}>Journey Map</Text>
            <Text style={styles.mapSubtitle}>이 리플이 지나온 길</Text>
          </View>
          <RipplePill>{isContinued ? "Ripple" : "Seed"}</RipplePill>
        </View>

        <View style={styles.mapRoute}>
          {stops.map((stop, index) => {
            const isLast = index === stops.length - 1;

            return (
              <View key={`map-${stop.city}-${index}`} style={styles.mapStop}>
                <Text
                  style={[
                    styles.mapPlace,
                    stop.preview && styles.mapPreviewPlace,
                  ]}
                >
                  {stop.flag} {stop.city}
                </Text>
                {!isLast ? <Text style={styles.mapArrow}>↓</Text> : null}
              </View>
            );
          })}
        </View>

        <View style={styles.mapStats}>
          <View style={styles.mapStatBox}>
            <Text style={styles.mapStatValue}>📍 {activeStops.length}</Text>
            <Text style={styles.mapStatLabel}>Stops · 이어진 곳</Text>
          </View>
          <View style={styles.mapStatBox}>
            <Text style={styles.mapStatValue}>{isContinued ? "🌎 2" : "🌎 1"}</Text>
            <Text style={styles.mapStatLabel}>Countries · 나라</Text>
          </View>
          <View style={styles.mapStatBox}>
            <Text style={styles.mapStatValue}>{latestStop}</Text>
            <Text style={styles.mapStatLabel}>Latest · 최근 장소</Text>
          </View>
        </View>
      </RippleCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>여정</Text>
        <Text style={styles.sectionSubtitle}>사진 1장 · 문장 1줄 · 장소 1곳</Text>
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
          다음 사람이 이어주면 새로운 장소가 여기에 추가돼요.
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
          Pass it on · 이어주기
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/create")}>
          Start another · 새 리플 시작
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
  progressCard: {
    backgroundColor: "rgba(255,255,255,0.88)",
    padding: 22,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  progressPercent: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  progressLine: {
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(31,29,43,0.1)",
    marginBottom: 12,
  },
  progressDots: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 10,
  },
  progressHelper: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: rippleColors.muted,
    marginBottom: 18,
  },
  progressStats: {
    flexDirection: "row",
    gap: 10,
  },
  progressStatBox: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(255,248,240,0.76)",
    padding: 12,
    alignItems: "center",
  },
  progressStatValue: {
    fontSize: 22,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  progressStatLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "900",
    color: rippleColors.muted,
    textTransform: "uppercase",
  },
  mapCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 24,
    shadowColor: rippleColors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
  },
  mapTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },
  mapTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  mapSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  mapRoute: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 18,
  },
  mapStop: {
    alignItems: "center",
  },
  mapPlace: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  mapPreviewPlace: {
    color: rippleColors.soft,
  },
  mapArrow: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "900",
    color: rippleColors.blush,
    marginVertical: 2,
  },
  mapStats: {
    flexDirection: "row",
    gap: 10,
  },
  mapStatBox: {
    flex: 1,
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: "rgba(255,248,240,0.78)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  mapStatValue: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  mapStatLabel: {
    marginTop: 6,
    fontSize: 11,
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
