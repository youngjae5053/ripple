import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { OlmangLogo } from "@/components/olmang-logo";
import {
  RippleBackButton,
  RippleButton,
  RippleScreen,
  rippleColors,
  rippleCopy,
} from "@/components/ripple-ui";

const stats = ["17 participants", "4 cities", "2 countries"];
const route = ["Seoul", "Busan", "Fukuoka", "Tokyo"];

export default function ShareCardScreen() {
  const router = useRouter();

  return (
    <RippleScreen contentStyle={styles.screenContent}>
      <RippleBackButton onPress={() => router.back()} />

      <View style={styles.shareCard}>
        <View style={styles.cardGlow} />
        <View style={[styles.orbitRing, styles.orbitOuter]} />
        <View style={[styles.orbitRing, styles.orbitInner]} />
        <View style={styles.starOne} />
        <View style={styles.starTwo} />
        <View style={styles.starThree} />

        <View style={styles.logoWrap}>
          <OlmangLogo size={76} />
        </View>

        <Text style={styles.brand}>{rippleCopy.name}</Text>
        <Text style={styles.mainText}>나의 순간이 도쿄까지 닿았어요</Text>

        <View style={styles.routeWrap}>
          {route.map((city, index) => (
            <View key={city} style={styles.routeItem}>
              <View
                style={[
                  styles.routePlanet,
                  index === route.length - 1 && styles.routePlanetCurrent,
                ]}
              />
              <Text style={styles.routeCity}>{city}</Text>
              {index < route.length - 1 ? (
                <Text style={styles.routeArrow}>→</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.stats}>
          {stats.map((item) => (
            <View key={item} style={styles.statPill}>
              <Text style={styles.statText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.tagline}>{rippleCopy.tagline}</Text>
      </View>

      <View style={styles.actions}>
        <RippleButton onPress={() => router.push("/journey-map")}>
          Journey Map 보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    justifyContent: "center",
  },
  shareCard: {
    minHeight: 610,
    borderRadius: 38,
    backgroundColor: rippleColors.paper,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 42,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#8A4A22",
    shadowOpacity: 0.1,
    shadowRadius: 34,
    shadowOffset: { width: 0, height: 18 },
  },
  cardGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 999,
    backgroundColor: "rgba(255,138,61,0.08)",
    top: -96,
    right: -88,
  },
  orbitRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1.5,
  },
  orbitOuter: {
    width: 440,
    height: 210,
    borderColor: "rgba(255,138,61,0.18)",
    top: 122,
    transform: [{ rotate: "-17deg" }],
  },
  orbitInner: {
    width: 292,
    height: 292,
    borderColor: "rgba(34,34,34,0.07)",
    top: 88,
    transform: [{ rotate: "27deg" }],
  },
  starOne: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    left: 42,
    top: 94,
    opacity: 0.42,
  },
  starTwo: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    right: 54,
    top: 150,
    opacity: 0.18,
  },
  starThree: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    right: 74,
    bottom: 112,
    opacity: 0.28,
  },
  logoWrap: {
    width: 122,
    height: 122,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(248,231,216,0.42)",
    marginBottom: 18,
  },
  brand: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  mainText: {
    marginTop: 24,
    fontSize: 36,
    lineHeight: 46,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  routeWrap: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  routePlanet: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    marginRight: 7,
  },
  routePlanetCurrent: {
    width: 15,
    height: 15,
    backgroundColor: rippleColors.blush,
  },
  routeCity: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  routeArrow: {
    marginHorizontal: 8,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.soft,
  },
  stats: {
    marginTop: 34,
    gap: 10,
    alignItems: "center",
  },
  statPill: {
    minWidth: 168,
    minHeight: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rippleColors.cardSoft,
    paddingHorizontal: 18,
  },
  statText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  tagline: {
    marginTop: 36,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    color: rippleColors.muted,
    textAlign: "center",
  },
  actions: {
    marginTop: 18,
  },
});
