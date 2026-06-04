import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
  RippleButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

const receivedText = "친구에게 안부를 물었어요";
const explanationRows = [
  [
    "This ripple started with one small moment.",
    "이 리플은 누군가의 작은 순간에서 시작됐어요.",
  ],
  [
    "You can continue it in your own way.",
    "당신의 방식으로 부담 없이 이어갈 수 있어요.",
  ],
  [
    "Add one photo, one line, one place.",
    "사진 1장, 문장 1줄, 장소 1곳이면 충분해요.",
  ],
];

export default function ReceivedScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleHeader
        title="A ripple found you."
        subtitle="누군가의 작은 순간이 당신에게 도착했어요."
      />

      <RippleCard>
        <View style={styles.cardTop}>
          <RippleLabel>Ripple #001 · 도착한 리플</RippleLabel>
          <RipplePill>From Seoul</RipplePill>
        </View>
        <Text style={styles.momentText}>{receivedText}</Text>
        <View style={styles.routeBox}>
          <Text style={styles.routeText}>Seoul 🇰🇷</Text>
          <Text style={styles.routeArrow}>↓</Text>
          <Text style={styles.routeText}>You</Text>
          <Text style={styles.routeArrow}>↓</Text>
          <Text style={styles.routeText}>?</Text>
        </View>
      </RippleCard>

      <RippleCard>
        <Text style={styles.infoTitle}>What happens next?</Text>
        {explanationRows.map(([english, korean]) => (
          <View key={english} style={styles.infoRow}>
            <Text style={styles.infoEnglish}>{english}</Text>
            <Text style={styles.infoKorean}>{korean}</Text>
          </View>
        ))}
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton
          onPress={() =>
            router.push({
              pathname: "/continue",
              params: { text: receivedText },
            })
          }
        >
          Continue this ripple · 리플 이어가기
        </RippleButton>
        <RippleButton
          tone="secondary"
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text: receivedText },
            })
          }
        >
          View passport · 여정 보기
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
    marginBottom: 24,
  },
  routeBox: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  routeText: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  routeArrow: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.soft,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 14,
  },
  infoRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: rippleColors.line,
    marginTop: 2,
  },
  infoEnglish: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  infoKorean: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 10,
  },
});
