import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

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
        subtitle="이 순간을 다음 사람에게 건네주세요."
      />

      <RippleCard style={styles.summaryCard}>
        <RippleLabel>Ripple Summary · 리플 요약</RippleLabel>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photoPreview} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>📷</Text>
          </View>
        )}
        <Text style={styles.momentText}>“{text}”</Text>
        <Text style={styles.placeText}>📍 Seoul</Text>
      </RippleCard>

      <RippleCard>
        <RippleLabel>Next · 다음 단계</RippleLabel>
        <Text style={styles.linkText}>ripple.app/r/001</Text>
        <Text style={styles.helperText}>
          작은 순간은 생각보다 멀리 이어질 수 있습니다.
        </Text>
        <View style={styles.pathRow}>
          {["You", "Next person", "?"].map((item, index) => (
            <View key={item} style={styles.pathStep}>
              <Text style={styles.pathText}>{item}</Text>
              {index < 2 ? <Text style={styles.pathArrow}>⌁</Text> : null}
            </View>
          ))}
        </View>
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton
          onPress={() => Alert.alert("OLMANG", "Ripple link copied soon.")}
        >
          Pass it on · 링크 공유하기
        </RippleButton>
        <RippleButton tone="secondary" onPress={() => router.push("/received")}>
          Received Preview · 받은 화면 보기
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
          Preview Passport · 여정 미리보기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: 22,
  },
  photoPreview: {
    width: "100%",
    height: 190,
    borderRadius: 22,
    marginBottom: 18,
  },
  photoPlaceholder: {
    height: 190,
    borderRadius: 22,
    backgroundColor: "rgba(247,199,217,0.38)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  photoIcon: {
    fontSize: 42,
  },
  momentText: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 12,
  },
  placeText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    color: rippleColors.muted,
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
    gap: 6,
    paddingVertical: 8,
  },
  pathStep: {
    alignItems: "center",
  },
  pathText: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  pathArrow: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.blush,
    marginVertical: 1,
  },
  actions: {
    gap: 10,
    marginTop: "auto",
    paddingTop: 8,
  },
});
