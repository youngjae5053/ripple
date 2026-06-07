import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { BottomNavigation } from "@/components/bottom-navigation";
import {
  RippleBackButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

const trendingJourneys = [
  {
    icon: "☕",
    title: "Coffee",
    route: "Seoul → Busan → Tokyo",
    participants: "17 participants",
    moment: "작은 커피 한 잔을 건넸어요",
  },
  {
    icon: "📚",
    title: "Book Sharing",
    route: "Daegu → Seoul → Osaka",
    participants: "11 participants",
    moment: "좋았던 책을 다음 사람에게 건넸어요",
  },
  {
    icon: "💬",
    title: "Checking In",
    route: "Incheon → Fukuoka",
    participants: "8 participants",
    moment: "친구에게 안부를 물었어요",
  },
];

const longestJourneys = [
  {
    title: "Across the quiet coast",
    route: "Seoul → Busan → Fukuoka → Tokyo",
    cities: "18 cities",
    countries: "4 countries",
    distance: "4281 km",
  },
  {
    title: "Small note, long orbit",
    route: "Paris → Singapore → New York",
    cities: "14 cities",
    countries: "5 countries",
    distance: "6120 km",
  },
];

const newJourneys = [
  {
    title: "Started today",
    route: "Suwon → ?",
    moment: "고마운 마음을 짧게 전했어요",
  },
  {
    title: "New orbit",
    route: "Tokyo → ?",
    moment: "길을 헤매는 사람에게 방향을 알려줬어요",
  },
];

function OrbitPreview({ active = false }: { active?: boolean }) {
  return (
    <View style={styles.orbitPreview}>
      <View style={[styles.orbitRing, styles.orbitRingWide]} />
      <View style={[styles.orbitRing, styles.orbitRingTall]} />
      <View style={styles.connectionLine} />
      <View style={[styles.planet, styles.planetOne]} />
      <View style={[styles.planet, styles.planetTwo, active && styles.activePlanet]} />
      <View style={[styles.planet, styles.planetThree]} />
      <View style={styles.star} />
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();

  const openJourneyMap = (text: string) =>
    router.push({
      pathname: "/journey-map",
      params: {
        text,
        place: "Tokyo, Japan",
        continued: "true",
      },
    });

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Explore"
        subtitle="전 세계에서 이어지는 순간들"
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Journeys</Text>
        <Text style={styles.sectionSubtitle}>지금 가장 많이 이어지는 궤도</Text>
      </View>

      {trendingJourneys.map((journey, index) => (
        <RippleCard
          key={journey.title}
          onPress={() => openJourneyMap(journey.moment)}
          style={styles.trendingCard}
        >
          <OrbitPreview active={index === 0} />
          <View style={styles.cardContent}>
            <View style={styles.cardTop}>
              <Text style={styles.cardIcon}>{journey.icon}</Text>
              <RipplePill>{journey.participants}</RipplePill>
            </View>
            <Text style={styles.cardTitle}>{journey.title}</Text>
            <Text style={styles.routeText}>{journey.route}</Text>
          </View>
        </RippleCard>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Longest Journeys</Text>
        <Text style={styles.sectionSubtitle}>가장 멀리 닿은 순간들</Text>
      </View>

      {longestJourneys.map((journey) => (
        <RippleCard
          key={journey.title}
          onPress={() => openJourneyMap(journey.title)}
          style={styles.longCard}
        >
          <View style={styles.longTop}>
            <View>
              <RippleLabel>Long orbit</RippleLabel>
              <Text style={styles.longTitle}>{journey.title}</Text>
              <Text style={styles.routeText}>{journey.route}</Text>
            </View>
            <View style={styles.smallOrbit}>
              <View style={styles.smallOrbitRing} />
              <View style={styles.smallOrbitPlanet} />
            </View>
          </View>
          <View style={styles.metricGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricValue}>{journey.cities}</Text>
              <Text style={styles.metricLabel}>Cities reached</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricValue}>{journey.countries}</Text>
              <Text style={styles.metricLabel}>Countries reached</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricValue}>{journey.distance}</Text>
              <Text style={styles.metricLabel}>Distance</Text>
            </View>
          </View>
        </RippleCard>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Journeys</Text>
        <Text style={styles.sectionSubtitle}>오늘 시작된 새로운 궤도</Text>
      </View>

      {newJourneys.map((journey) => (
        <RippleCard
          key={journey.moment}
          onPress={() => openJourneyMap(journey.moment)}
          style={styles.newCard}
        >
          <View style={styles.newDot} />
          <View style={styles.newContent}>
            <Text style={styles.newTitle}>{journey.title}</Text>
            <Text style={styles.routeText}>{journey.route}</Text>
            <Text style={styles.newMoment}>“{journey.moment}”</Text>
          </View>
          <RipplePill>Today</RipplePill>
        </RippleCard>
      ))}
      <BottomNavigation />
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: rippleColors.soft,
  },
  trendingCard: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  orbitPreview: {
    width: 108,
    height: 118,
    borderRadius: 28,
    backgroundColor: rippleColors.cardSoft,
    position: "relative",
    overflow: "hidden",
  },
  orbitRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1.3,
    borderColor: "rgba(255,138,61,0.28)",
  },
  orbitRingWide: {
    width: 124,
    height: 58,
    left: -8,
    top: 34,
    transform: [{ rotate: "-18deg" }],
  },
  orbitRingTall: {
    width: 84,
    height: 84,
    left: 13,
    top: 17,
    borderColor: "rgba(34,34,34,0.1)",
    transform: [{ rotate: "26deg" }],
  },
  connectionLine: {
    position: "absolute",
    width: 62,
    height: 2,
    borderRadius: 999,
    left: 25,
    top: 59,
    backgroundColor: "rgba(255,138,61,0.42)",
    transform: [{ rotate: "-9deg" }],
  },
  planet: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 3,
    borderColor: rippleColors.paper,
  },
  planetOne: {
    width: 20,
    height: 20,
    left: 20,
    top: 48,
    backgroundColor: rippleColors.ink,
  },
  planetTwo: {
    width: 26,
    height: 26,
    right: 24,
    top: 42,
    backgroundColor: rippleColors.blush,
  },
  planetThree: {
    width: 13,
    height: 13,
    right: 25,
    bottom: 25,
    backgroundColor: rippleColors.peach,
  },
  activePlanet: {
    width: 34,
    height: 34,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  star: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 999,
    left: 22,
    top: 24,
    backgroundColor: rippleColors.blush,
    opacity: 0.4,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  routeText: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  longCard: {
    padding: 20,
  },
  longTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 16,
  },
  longTitle: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  smallOrbit: {
    width: 54,
    height: 54,
    position: "relative",
  },
  smallOrbitRing: {
    position: "absolute",
    width: 54,
    height: 34,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(255,138,61,0.35)",
    top: 10,
    transform: [{ rotate: "-22deg" }],
  },
  smallOrbitPlanet: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    right: 3,
    top: 10,
  },
  metricGrid: {
    flexDirection: "row",
    gap: 8,
  },
  metricBox: {
    flex: 1,
    minHeight: 76,
    borderRadius: 18,
    backgroundColor: rippleColors.cardSoft,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },
  metricValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  metricLabel: {
    marginTop: 5,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
    color: rippleColors.soft,
    textTransform: "uppercase",
    textAlign: "center",
  },
  newCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
  },
  newDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    borderWidth: 4,
    borderColor: rippleColors.paper,
  },
  newContent: {
    flex: 1,
  },
  newTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  newMoment: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
});
