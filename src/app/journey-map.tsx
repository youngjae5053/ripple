import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { BottomNavigation } from "@/components/bottom-navigation";
import { OlmangLogo } from "@/components/olmang-logo";
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

const journeyStops = [
  { city: "Seoul", country: "Korea", x: 16, y: 26 },
  { city: "Suwon", country: "Korea", x: 46, y: 36 },
  { city: "Busan", country: "Korea", x: 27, y: 66 },
  { city: "Fukuoka", country: "Japan", x: 62, y: 69 },
  { city: "Tokyo", country: "Japan", x: 78, y: 34 },
];

const mapStats = [
  ["Moments", "1248"],
  ["Cities", "43"],
  ["Countries", "12"],
  ["Distance", "4281 km"],
];

export default function JourneyMapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const moment =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "친구에게 안부를 물었어요";
  const currentStop = journeyStops[journeyStops.length - 1];

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Journey Map"
        subtitle="순간은 생각보다 멀리 이어집니다."
      />

      <RippleCard style={styles.mapCard}>
        <View style={styles.mapIntro}>
          <View>
            <RippleLabel>Living Universe</RippleLabel>
            <Text style={styles.mapTitle}>Connected moments</Text>
          </View>
          <OlmangLogo size={46} />
        </View>

        <View style={styles.cosmicMap}>
          <View style={[styles.orbitRing, styles.orbitOuter]} />
          <View style={[styles.orbitRing, styles.orbitMiddle]} />
          <View style={[styles.orbitRing, styles.orbitInner]} />

          <View style={styles.starOne} />
          <View style={styles.starTwo} />
          <View style={styles.starThree} />
          <View style={styles.starFour} />

          <View style={[styles.path, styles.pathOne]} />
          <View style={[styles.path, styles.pathTwo]} />
          <View style={[styles.path, styles.pathThree]} />
          <View style={[styles.path, styles.pathFour]} />

          <View style={[styles.travelGlow, styles.travelGlowOne]} />
          <View style={[styles.travelGlow, styles.travelGlowTwo]} />
          <View style={[styles.travelGlow, styles.travelGlowThree]} />

          {journeyStops.map((stop, index) => {
            const isCurrent = stop.city === currentStop.city;

            return (
              <View
                key={stop.city}
                style={[
                  styles.planetWrap,
                  { left: `${stop.x}%`, top: `${stop.y}%` },
                ]}
              >
                {isCurrent ? <View style={styles.currentHalo} /> : null}
                <View
                  style={[
                    styles.planet,
                    index === 0 && styles.seedPlanet,
                    isCurrent && styles.currentPlanet,
                  ]}
                >
                  <Text style={styles.planetOrder}>{index + 1}</Text>
                </View>
                <Text
                  style={[
                    styles.planetLabel,
                    isCurrent && styles.currentPlanetLabel,
                  ]}
                >
                  {stop.city}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.currentCard}>
          <RipplePill>Current location</RipplePill>
          <Text style={styles.currentCity}>{currentStop.city}</Text>
          <Text style={styles.currentText}>
            이 순간이 지금 머무는 작은 행성입니다.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {mapStats.map(([label, value]) => (
            <View key={label} style={styles.statBox}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </RippleCard>

      <RippleCard style={styles.journeyCard}>
        <View style={styles.journeyTop}>
          <View>
            <RippleLabel>Your Journey</RippleLabel>
            <Text style={styles.journeyTitle}>{moment}</Text>
          </View>
          <RipplePill>17 people</RipplePill>
        </View>

        <View style={styles.routeList}>
          {journeyStops.map((stop, index) => (
            <View key={`route-${stop.city}`} style={styles.routeItem}>
              <View style={styles.routeDot} />
              <Text style={styles.routeCity}>{stop.city}</Text>
              {index < journeyStops.length - 1 ? (
                <Text style={styles.routeArrow}>→</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.journeyMeta}>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Started</Text>
            <Text style={styles.metaValue}>12 days ago</Text>
          </View>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Participants</Text>
            <Text style={styles.metaValue}>17</Text>
          </View>
        </View>
      </RippleCard>

      <RippleButton onPress={() => router.push("/world")}>
        Explore More Journeys
      </RippleButton>
      <View style={styles.shareAction}>
        <RippleButton
          tone="secondary"
          onPress={() => router.push("/share-card")}
        >
          공유 카드 보기
        </RippleButton>
      </View>
      <BottomNavigation />
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  mapCard: {
    padding: 22,
  },
  mapIntro: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 18,
  },
  mapTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  cosmicMap: {
    height: 430,
    borderRadius: 34,
    backgroundColor: "rgba(255,246,238,0.94)",
    overflow: "hidden",
    position: "relative",
    marginBottom: 16,
  },
  orbitRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1.4,
  },
  orbitOuter: {
    width: 420,
    height: 260,
    left: -18,
    top: 70,
    borderColor: "rgba(255,138,61,0.2)",
    transform: [{ rotate: "-18deg" }],
  },
  orbitMiddle: {
    width: 330,
    height: 330,
    left: 42,
    top: 36,
    borderColor: "rgba(34,34,34,0.08)",
    transform: [{ rotate: "26deg" }],
  },
  orbitInner: {
    width: 230,
    height: 118,
    left: 94,
    top: 152,
    borderColor: "rgba(255,138,61,0.17)",
    transform: [{ rotate: "12deg" }],
  },
  path: {
    position: "absolute",
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(255,138,61,0.52)",
  },
  pathOne: {
    width: 118,
    left: 80,
    top: 132,
    transform: [{ rotate: "15deg" }],
  },
  pathTwo: {
    width: 128,
    left: 120,
    top: 213,
    transform: [{ rotate: "123deg" }],
  },
  pathThree: {
    width: 128,
    left: 146,
    top: 290,
    transform: [{ rotate: "4deg" }],
  },
  pathFour: {
    width: 160,
    left: 224,
    top: 220,
    backgroundColor: "rgba(34,34,34,0.14)",
    transform: [{ rotate: "-63deg" }],
  },
  travelGlow: {
    position: "absolute",
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.36,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  travelGlowOne: {
    left: 180,
    top: 150,
    opacity: 0.75,
  },
  travelGlowTwo: {
    left: 174,
    top: 264,
    opacity: 0.44,
  },
  travelGlowThree: {
    right: 82,
    top: 156,
    opacity: 0.62,
  },
  planetWrap: {
    position: "absolute",
    alignItems: "center",
    transform: [{ translateX: -36 }, { translateY: -22 }],
    minWidth: 72,
  },
  currentHalo: {
    position: "absolute",
    width: 78,
    height: 78,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,138,61,0.26)",
    top: -18,
  },
  planet: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: rippleColors.paper,
  },
  seedPlanet: {
    backgroundColor: rippleColors.peach,
  },
  currentPlanet: {
    width: 52,
    height: 52,
    backgroundColor: rippleColors.blush,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  planetOrder: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  planetLabel: {
    marginTop: 7,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,249,244,0.86)",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  currentPlanetLabel: {
    color: rippleColors.blush,
  },
  starOne: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    left: 54,
    top: 54,
    opacity: 0.4,
  },
  starTwo: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    right: 58,
    top: 76,
    opacity: 0.18,
  },
  starThree: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    left: 70,
    bottom: 62,
    opacity: 0.26,
  },
  starFour: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    right: 108,
    bottom: 48,
    opacity: 0.16,
  },
  currentCard: {
    borderRadius: 24,
    backgroundColor: rippleColors.cardSoft,
    padding: 18,
    marginBottom: 14,
  },
  currentCity: {
    marginTop: 8,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  currentText: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statBox: {
    width: "48%",
    minHeight: 86,
    borderRadius: 22,
    backgroundColor: "rgba(255,249,244,0.82)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  statLabel: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    color: rippleColors.blush,
    textTransform: "uppercase",
    textAlign: "center",
  },
  journeyCard: {
    padding: 22,
  },
  journeyTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 18,
  },
  journeyTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  routeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: 10,
    marginBottom: 18,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    marginRight: 7,
  },
  routeCity: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  routeArrow: {
    marginHorizontal: 9,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900",
    color: rippleColors.soft,
  },
  journeyMeta: {
    flexDirection: "row",
    gap: 10,
  },
  metaBox: {
    flex: 1,
    minHeight: 74,
    borderRadius: 20,
    backgroundColor: rippleColors.cardSoft,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  metaLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    color: rippleColors.soft,
    textTransform: "uppercase",
  },
  metaValue: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  shareAction: {
    marginTop: 12,
  },
});
