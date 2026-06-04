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

export default function CardScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const text =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "A small moment was shared.";
  const photo =
    typeof params.photo === "string" && params.photo.trim().length > 0
      ? params.photo
      : "";

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Your Ripple is ready."
        subtitle="리플이 만들어졌어요. 다음 사람에게 이어주고 어디까지 닿는지 확인해보세요."
      />

      <RippleCard style={styles.rippleCard}>
        <View style={styles.cardTop}>
          <Text style={styles.cardBrand}>Ripple #001</Text>
          <RipplePill>Seed started</RipplePill>
        </View>

        {photo ? (
          <Image source={{ uri: photo }} style={styles.cardImage} />
        ) : (
          <View style={styles.emptyImage}>
            <Text style={styles.emptyImageText}>Ripple</Text>
          </View>
        )}

        <Text style={styles.momentText}>{text}</Text>

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <RippleLabel>Started in · 시작된 곳</RippleLabel>
            <Text style={styles.metaValue}>Seoul, South Korea</Text>
          </View>
          <View style={styles.metaItem}>
            <RippleLabel>Reached · 닿은 사람</RippleLabel>
            <Text style={styles.metaValue}>1 person · 1명</Text>
          </View>
        </View>
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
        <RippleButton
          tone="secondary"
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text, photo },
            })
          }
        >
          View Journey · 여정 보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  rippleCard: {
    padding: 22,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    marginBottom: 22,
  },
  emptyImage: {
    width: "100%",
    height: 180,
    borderRadius: 22,
    backgroundColor: "rgba(247,199,217,0.32)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  emptyImageText: {
    fontSize: 30,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  momentText: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 22,
  },
  metaGrid: {
    gap: 14,
  },
  metaItem: {
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: rippleColors.line,
  },
  metaValue: {
    fontSize: 17,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 8,
  },
});
