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

const receivedText = "Checked in on a friend";

export default function ReceivedScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <RippleHeader
        title="A Ripple found you."
        subtitle="Someone started a moment. You can pass it on in your own way."
      />

      <RippleCard>
        <View style={styles.cardTop}>
          <RippleLabel>Ripple #001</RippleLabel>
          <RipplePill>From Seoul</RipplePill>
        </View>
        <Text style={styles.momentText}>{receivedText}</Text>
        <View style={styles.routeBox}>
          <Text style={styles.routeText}>Seoul</Text>
          <Text style={styles.routeArrow}>↓</Text>
          <Text style={styles.routeText}>You</Text>
          <Text style={styles.routeArrow}>↓</Text>
          <Text style={styles.routeText}>?</Text>
        </View>
      </RippleCard>

      <RippleCard>
        <Text style={styles.infoTitle}>Continue with one stop.</Text>
        <Text style={styles.infoText}>
          Add one photo, one line, and one place. Your stop becomes part of
          the Journey.
        </Text>
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
          Add your stop
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
          View Journey
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
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
    paddingTop: 10,
  },
});
