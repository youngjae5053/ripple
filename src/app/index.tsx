import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { BottomNavigation } from "@/components/bottom-navigation";
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

const liveMoments = [
  {
    route: "Seoul → Suwon → Daejeon",
    moment: "친구에게 안부를 물었어요",
    meta: "3 cities · moving",
  },
  {
    route: "Busan → Tokyo",
    moment: "작은 커피 한 잔을 건넸어요",
    meta: "2 cities · 1 country crossed",
  },
];

const personalStats = [
  ["내가 시작한 순간", "4"],
  ["이어진 사람", "12"],
  ["닿은 도시", "7"],
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <View style={styles.hero}>
        <View style={styles.logoWrap}>
          <OlmangLogo size={58} />
        </View>
        <Text style={styles.brand}>{rippleCopy.name}</Text>
        <Text style={styles.headline}>
          우리는 생각보다 많이 연결되어 있습니다.
        </Text>
        <Text style={styles.supporting}>
          당신의 순간은 어디로 향할까요?
        </Text>
        <RippleButton onPress={() => router.push("/create")}>
          순간 남기기
        </RippleButton>
      </View>

      <RippleCard
        onPress={() => router.push("/notifications")}
        style={styles.notificationPreview}
      >
        <View style={styles.notificationOrbit}>
          <View style={styles.notificationRing} />
          <Text style={styles.notificationIcon}>🌏</Text>
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationTop}>
            <RippleLabel>Notification</RippleLabel>
            <RipplePill>New</RipplePill>
          </View>
          <Text style={styles.notificationTitle}>
            Your moment reached Tokyo
          </Text>
          <Text style={styles.notificationText}>
            당신의 순간이 새로운 도시까지 이어졌어요.
          </Text>
        </View>
      </RippleCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Live Moments</Text>
        <Text style={styles.sectionSubtitle}>
          지금 도시 사이를 지나가는 순간들
        </Text>
      </View>

      {liveMoments.map((item, index) => (
        <RippleCard
          key={item.route}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: item.moment },
            })
          }
          style={styles.feedCard}
        >
          <View style={styles.feedPhoto}>
            <View style={styles.photoOrbit} />
            <View style={[styles.photoPlanet, styles.photoPlanetMain]} />
            <View style={[styles.photoPlanet, styles.photoPlanetTiny]} />
          </View>
          <View style={styles.feedContent}>
            <View style={styles.feedTop}>
              <Text style={styles.feedRoute}>{item.route}</Text>
              {index === 0 ? <RipplePill>Live</RipplePill> : null}
            </View>
            <Text style={styles.feedMoment}>“{item.moment}”</Text>
            <Text style={styles.feedMeta}>{item.meta}</Text>
          </View>
        </RippleCard>
      ))}

      <RippleCard style={styles.mapCard}>
        <View style={styles.mapTop}>
          <View>
            <RippleLabel>Journey Map</RippleLabel>
            <Text style={styles.mapTitle}>Journey Map</Text>
            <Text style={styles.mapText}>순간이 이어진 궤도</Text>
          </View>
          <OlmangLogo size={42} />
        </View>

        <View style={styles.cosmicMap}>
          <View style={[styles.mapOrbit, styles.mapOrbitOne]} />
          <View style={[styles.mapOrbit, styles.mapOrbitTwo]} />
          <View style={[styles.mapLine, styles.mapLineOne]} />
          <View style={[styles.mapLine, styles.mapLineTwo]} />
          <View style={[styles.mapPlanet, styles.mapSeoul]}>
            <Text style={styles.mapPlanetText}>Seoul</Text>
          </View>
          <View style={[styles.mapPlanet, styles.mapSuwon]}>
            <Text style={styles.mapPlanetText}>Suwon</Text>
          </View>
          <View style={[styles.mapPlanet, styles.mapDaejeon]}>
            <Text style={styles.mapPlanetText}>Daejeon</Text>
          </View>
          <View style={styles.starOne} />
          <View style={styles.starTwo} />
          <View style={styles.starThree} />
        </View>

        <View style={styles.previewRoute}>
          {["Seoul", "Suwon", "Busan", "Fukuoka", "Tokyo"].map(
            (city, index) => (
              <View key={city} style={styles.previewRouteItem}>
                <View
                  style={[
                    styles.previewRouteDot,
                    index === 4 && styles.previewRouteDotCurrent,
                  ]}
                />
                <Text style={styles.previewRouteCity}>{city}</Text>
                {index < 4 ? <Text style={styles.previewRouteArrow}>→</Text> : null}
              </View>
            ),
          )}
        </View>

        <View style={styles.mapStats}>
          <View style={styles.mapStat}>
            <Text style={styles.mapStatValue}>18</Text>
            <Text style={styles.mapStatLabel}>Moments</Text>
          </View>
          <View style={styles.mapStat}>
            <Text style={styles.mapStatValue}>9</Text>
            <Text style={styles.mapStatLabel}>Cities</Text>
          </View>
          <View style={styles.mapStat}>
            <Text style={styles.mapStatValue}>3</Text>
            <Text style={styles.mapStatLabel}>Countries</Text>
          </View>
        </View>

        <View style={styles.mapButton}>
          <RippleButton
            tone="secondary"
            onPress={() =>
              router.push({
                pathname: "/journey-map",
                params: {
                  text: "친구에게 안부를 물었어요",
                  place: "Daejeon, South Korea",
                  continued: "true",
                },
              })
            }
          >
            지도 보기
          </RippleButton>
        </View>
      </RippleCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>세 단계로 이어지는 여정</Text>
      </View>

      <View style={styles.steps}>
        {["남긴다", "이어진다", "퍼진다"].map((step, index) => (
          <RippleCard key={step} style={styles.stepCard}>
            <View style={styles.stepIcon}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </RippleCard>
        ))}
      </View>

      <RippleCard onPress={() => router.push("/profile")} style={styles.personalCard}>
        <View style={styles.personalTop}>
          <View>
            <RippleLabel>Personal Journey</RippleLabel>
            <Text style={styles.personalTitle}>나의 작은 우주</Text>
          </View>
          <RipplePill>View</RipplePill>
        </View>
        <View style={styles.personalStats}>
          {personalStats.map(([label, value]) => (
            <View key={label} style={styles.personalStat}>
              <Text style={styles.personalValue}>{value}</Text>
              <Text style={styles.personalLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </RippleCard>
      <BottomNavigation />
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 36,
    gap: 12,
  },
  logoWrap: {
    width: 108,
    height: 108,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,249,244,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,138,61,0.14)",
  },
  brand: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
    color: rippleColors.ink,
    letterSpacing: 0,
  },
  headline: {
    marginTop: 10,
    fontSize: 37,
    lineHeight: 46,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  supporting: {
    marginBottom: 14,
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "700",
    color: rippleColors.muted,
    textAlign: "center",
  },
  sectionHeader: {
    marginTop: 12,
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
  notificationPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
  },
  notificationOrbit: {
    width: 62,
    height: 62,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rippleColors.cardSoft,
    position: "relative",
  },
  notificationRing: {
    position: "absolute",
    width: 72,
    height: 28,
    borderRadius: 999,
    borderWidth: 1.2,
    borderColor: "rgba(255,138,61,0.32)",
    transform: [{ rotate: "-18deg" }],
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  notificationTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  notificationText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  feedCard: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
  },
  feedPhoto: {
    width: 96,
    height: 116,
    borderRadius: 24,
    backgroundColor: rippleColors.peach,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  photoOrbit: {
    position: "absolute",
    width: 112,
    height: 48,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(255,138,61,0.42)",
    transform: [{ rotate: "-22deg" }],
  },
  photoPlanet: {
    position: "absolute",
    borderRadius: 999,
  },
  photoPlanetMain: {
    width: 34,
    height: 34,
    backgroundColor: rippleColors.blush,
  },
  photoPlanetTiny: {
    width: 12,
    height: 12,
    right: 19,
    top: 31,
    backgroundColor: rippleColors.ink,
  },
  feedContent: {
    flex: 1,
    justifyContent: "center",
  },
  feedTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  feedRoute: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  feedMoment: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  feedMeta: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
    color: rippleColors.soft,
  },
  mapCard: {
    padding: 22,
    marginTop: 12,
  },
  mapTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  mapText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  cosmicMap: {
    height: 236,
    borderRadius: 30,
    backgroundColor: "rgba(255,246,238,0.92)",
    position: "relative",
    overflow: "hidden",
    marginBottom: 16,
  },
  mapOrbit: {
    position: "absolute",
    borderWidth: 1.4,
    borderColor: "rgba(255,138,61,0.2)",
    borderRadius: 999,
  },
  mapOrbitOne: {
    width: 310,
    height: 118,
    left: 28,
    top: 52,
    transform: [{ rotate: "-10deg" }],
  },
  mapOrbitTwo: {
    width: 222,
    height: 222,
    left: 76,
    top: 8,
    borderColor: "rgba(34,34,34,0.08)",
    transform: [{ rotate: "28deg" }],
  },
  mapLine: {
    position: "absolute",
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(255,138,61,0.5)",
  },
  mapLineOne: {
    width: 98,
    left: 96,
    top: 112,
    transform: [{ rotate: "-14deg" }],
  },
  mapLineTwo: {
    width: 92,
    left: 188,
    top: 116,
    backgroundColor: "rgba(34,34,34,0.14)",
    transform: [{ rotate: "20deg" }],
  },
  mapPlanet: {
    position: "absolute",
    minWidth: 66,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rippleColors.paper,
    borderWidth: 1,
    borderColor: "rgba(255,138,61,0.22)",
  },
  mapSeoul: {
    left: 46,
    top: 92,
  },
  mapSuwon: {
    left: 154,
    top: 72,
    backgroundColor: rippleColors.blush,
  },
  mapDaejeon: {
    right: 38,
    top: 122,
  },
  mapPlanetText: {
    fontSize: 12,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  starOne: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    left: 40,
    top: 40,
    opacity: 0.5,
  },
  starTwo: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    right: 64,
    top: 42,
    opacity: 0.22,
  },
  starThree: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    right: 92,
    bottom: 34,
    opacity: 0.34,
  },
  mapStats: {
    flexDirection: "row",
    gap: 10,
  },
  mapStat: {
    flex: 1,
    minHeight: 68,
    borderRadius: 18,
    backgroundColor: rippleColors.cardSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStatValue: {
    fontSize: 21,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  mapStatLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "900",
    color: rippleColors.muted,
    textTransform: "uppercase",
  },
  previewRoute: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: 8,
    marginBottom: 16,
  },
  previewRouteItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewRouteDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: rippleColors.ink,
    marginRight: 7,
  },
  previewRouteDotCurrent: {
    width: 12,
    height: 12,
    backgroundColor: rippleColors.blush,
  },
  previewRouteCity: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  previewRouteArrow: {
    marginHorizontal: 8,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: rippleColors.soft,
  },
  mapButton: {
    marginTop: 14,
  },
  steps: {
    flexDirection: "row",
    gap: 10,
  },
  stepCard: {
    flex: 1,
    minHeight: 118,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  stepIcon: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rippleColors.blushSoft,
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  stepText: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  personalCard: {
    marginTop: 12,
    padding: 22,
  },
  personalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 16,
  },
  personalTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  personalStats: {
    flexDirection: "row",
    gap: 10,
  },
  personalStat: {
    flex: 1,
    minHeight: 74,
    borderRadius: 18,
    backgroundColor: "rgba(248,231,216,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  personalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  personalLabel: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    color: rippleColors.muted,
    textAlign: "center",
  },
});
