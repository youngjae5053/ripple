import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { OlmangLogo } from "@/components/olmang-logo";
import {
  RippleButton,
  RippleCard,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
  rippleCopy,
} from "@/components/ripple-ui";

const orbitJourneys = [
  {
    label: "My Journey",
    title: "나의 궤도",
    path: "Seoul · Tokyo · ?",
    text: "내가 시작한 순간들이 이어진 길",
    route: "/profile" as const,
  },
  {
    label: "Journey",
    title: "지금 움직이는 순간",
    path: "Seoul → Next orbit",
    text: "친구에게 안부를 물었어요",
    route: "/passport" as const,
  },
  {
    label: "Discover",
    title: "공유된 우주",
    path: "Paris · Singapore · New York",
    text: "서로의 궤도를 지나가는 리플들",
    route: "/world" as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <View style={styles.hero}>
        <View style={styles.brandRow}>
          <OlmangLogo size={38} />
          <View>
            <Text style={styles.brand}>{rippleCopy.name}</Text>
            <Text style={styles.tagline}>{rippleCopy.tagline}</Text>
          </View>
        </View>

        <View style={styles.orbitStage}>
          <View style={[styles.orbitRing, styles.orbitWide]} />
          <View style={[styles.orbitRing, styles.orbitTall]} />
          <View style={[styles.orbitRing, styles.orbitInner]} />

          <View style={[styles.planet, styles.planetCenter]}>
            <Text style={styles.planetText}>You</Text>
          </View>
          <View style={[styles.smallPlanet, styles.planetOne]} />
          <View style={[styles.smallPlanet, styles.planetTwo]} />
          <View style={[styles.smallPlanet, styles.planetThree]} />
          <View style={styles.momentDot} />
        </View>

        <Text style={styles.headline}>우리는 이어진다</Text>
        <Text style={styles.supporting}>당신의 순간은 어디로 향할까요?</Text>
      </View>

      <RippleButton onPress={() => router.push("/create")}>Start</RippleButton>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Orbit journeys</Text>
        <Text style={styles.sectionSubtitle}>작은 순간들이 지나가는 궤도</Text>
      </View>

      <View style={styles.journeyList}>
        {orbitJourneys.map((journey, index) => (
          <RippleCard
            key={journey.label}
            onPress={() => {
              if (journey.route === "/passport") {
                router.push({
                  pathname: "/passport",
                  params: { text: "친구에게 안부를 물었어요" },
                });
                return;
              }

              router.push(journey.route);
            }}
            style={styles.journeyCard}
          >
            <View style={styles.cardTop}>
              <RippleLabel>{journey.label}</RippleLabel>
              {index === 1 ? <RipplePill>Moving</RipplePill> : null}
            </View>

            <View style={styles.pathRow}>
              <View style={styles.pathPlanet} />
              <View style={styles.pathLine} />
              <View style={[styles.pathPlanet, styles.pathPlanetWarm]} />
              <View style={styles.pathLineMuted} />
              <View style={[styles.pathPlanet, styles.pathPlanetSoft]} />
            </View>

            <Text style={styles.cardTitle}>{journey.title}</Text>
            <Text style={styles.cardPath}>{journey.path}</Text>
            <Text style={styles.cardText}>{journey.text}</Text>
          </RippleCard>
        ))}
      </View>

      <View style={styles.actions}>
        <RippleButton tone="ghost" onPress={() => router.push("/onboarding")}>
          View onboarding · 온보딩 보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
  },
  brandRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  brand: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  tagline: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  orbitStage: {
    width: "100%",
    maxWidth: 430,
    height: 310,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 8,
  },
  orbitRing: {
    position: "absolute",
    borderColor: "rgba(255,138,61,0.28)",
    borderWidth: 1.5,
    borderRadius: 999,
  },
  orbitWide: {
    width: 360,
    height: 150,
    transform: [{ rotate: "-14deg" }],
  },
  orbitTall: {
    width: 260,
    height: 260,
    borderColor: "rgba(111,102,93,0.12)",
    transform: [{ rotate: "28deg" }],
  },
  orbitInner: {
    width: 190,
    height: 92,
    borderColor: "rgba(255,138,61,0.18)",
    transform: [{ rotate: "18deg" }],
  },
  planet: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  planetCenter: {
    width: 92,
    height: 92,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.24,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
  },
  planetText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  smallPlanet: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
  },
  planetOne: {
    top: 78,
    right: 76,
    opacity: 0.84,
  },
  planetTwo: {
    left: 74,
    bottom: 92,
    width: 18,
    height: 18,
    backgroundColor: rippleColors.peach,
    borderWidth: 3,
    borderColor: rippleColors.blush,
  },
  planetThree: {
    right: 112,
    bottom: 66,
    width: 14,
    height: 14,
    backgroundColor: rippleColors.sand,
    borderWidth: 2,
    borderColor: "rgba(34,34,34,0.25)",
  },
  momentDot: {
    position: "absolute",
    top: 106,
    left: 104,
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    shadowColor: rippleColors.blush,
    shadowOpacity: 0.34,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  headline: {
    marginTop: 4,
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  supporting: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "700",
    color: rippleColors.muted,
    textAlign: "center",
  },
  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
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
  journeyList: {
    gap: 2,
  },
  journeyCard: {
    padding: 22,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  pathRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  pathPlanet: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
  },
  pathPlanetWarm: {
    width: 18,
    height: 18,
    backgroundColor: rippleColors.blush,
  },
  pathPlanetSoft: {
    backgroundColor: rippleColors.peach,
    borderWidth: 2,
    borderColor: rippleColors.blush,
  },
  pathLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "rgba(255,138,61,0.44)",
  },
  pathLineMuted: {
    flex: 1,
    height: 1.5,
    backgroundColor: "rgba(34,34,34,0.12)",
  },
  cardTitle: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  cardPath: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  actions: {
    marginTop: "auto",
    paddingTop: 8,
  },
});
