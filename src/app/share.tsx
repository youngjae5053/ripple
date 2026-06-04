import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

import {
  RippleBackButton,
  RippleButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

export default function ShareScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

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
        title="Pass it on."
        subtitle="Send this Ripple to two people and let the journey continue."
      />

      <RippleCard>
        <RippleLabel>Your Ripple</RippleLabel>
        <Text style={styles.momentText}>{text}</Text>
      </RippleCard>

      <RippleCard>
        <RippleLabel>Ripple link</RippleLabel>
        <Text style={styles.linkText}>ripple.app/r/001</Text>
        <Text style={styles.helperText}>
          Anyone with the link can add one photo, one line, and one place.
        </Text>
      </RippleCard>

      <RippleCard>
        <RippleLabel>Path</RippleLabel>
        <View style={styles.pathRow}>
          {["You", "Friend", "Someone else", "?"].map((item, index) => (
            <View key={item} style={styles.pathStep}>
              <Text style={styles.pathText}>{item}</Text>
              {index < 3 ? <Text style={styles.pathArrow}>↓</Text> : null}
            </View>
          ))}
        </View>
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton
          onPress={() => Alert.alert("Ripple", "Ripple link copied soon.")}
        >
          Copy Ripple Link
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/received")}>
          Preview received screen
        </RippleButton>
        <RippleButton
          tone="ghost"
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: { text, photo },
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
  momentText: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  linkText: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 10,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 20,
    color: rippleColors.muted,
    fontWeight: "700",
  },
  pathRow: {
    alignItems: "center",
    gap: 4,
  },
  pathStep: {
    alignItems: "center",
  },
  pathText: {
    fontSize: 17,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  pathArrow: {
    fontSize: 16,
    fontWeight: "900",
    color: rippleColors.soft,
    marginVertical: 2,
  },
  actions: {
    gap: 10,
    marginTop: "auto",
    paddingTop: 8,
  },
});
