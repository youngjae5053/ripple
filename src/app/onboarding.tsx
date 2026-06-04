import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  RippleButton,
  RippleCard,
  RippleScreen,
  rippleColors,
  rippleCopy,
} from "@/components/ripple-ui";

const pages = [
  {
    title: "Start a moment.",
    body: "오늘의 작은 호의나 순간을 리플로 시작해보세요.",
    path: ["You", "Friend", "?"],
  },
  {
    title: "Pass it on.",
    body: "리플을 다음 사람에게 부담 없이 이어주세요.",
    path: ["Seoul", "Tokyo", "?"],
  },
  {
    title: "One photo. One line. One place.",
    body: "사진 1장, 문장 1줄, 장소 1곳이면 충분해요.",
    path: ["Photo", "Line", "Place"],
  },
  {
    title: "See how far it goes.",
    body: "이 리플이 어디까지 닿는지 확인해보세요.",
    path: ["Seoul", "Tokyo", "Mexico City"],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const current = pages[page];
  const isLast = page === pages.length - 1;

  return (
    <RippleScreen scroll={false} contentStyle={styles.phone}>
      <View style={styles.top}>
        <Text style={styles.brand}>{rippleCopy.name}</Text>
        <Text style={styles.step}>{page + 1}/{pages.length}</Text>
      </View>

      <View style={styles.center}>
        <RippleCard style={styles.storyCard}>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.body}>{current.body}</Text>
          <View style={styles.path}>
            {current.path.map((item, index) => (
              <View key={`${item}-${index}`} style={styles.pathStep}>
                <Text style={styles.pathText}>{item}</Text>
                {index < current.path.length - 1 ? (
                  <Text style={styles.pathArrow}>↓</Text>
                ) : null}
              </View>
            ))}
          </View>
        </RippleCard>
      </View>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {pages.map((item, index) => (
            <View
              key={item.title}
              style={[styles.dot, index === page && styles.activeDot]}
            />
          ))}
        </View>

        <RippleButton
          onPress={() => {
            if (isLast) {
              router.push("/");
              return;
            }

            setPage(page + 1);
          }}
        >
          {isLast ? "Start Ripple · 시작하기" : "Continue · 계속 보기"}
        </RippleButton>

        {!isLast ? (
          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.skipText}>Skip · 건너뛰기</Text>
          </Pressable>
        ) : (
          <RippleButton tone="ghost" onPress={() => router.push("/")}>
            Back home · 홈으로
          </RippleButton>
        )}
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  phone: {
    justifyContent: "space-between",
    paddingTop: 44,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  step: {
    fontSize: 14,
    fontWeight: "800",
    color: rippleColors.soft,
  },
  center: {
    justifyContent: "center",
  },
  storyCard: {
    padding: 24,
  },
  title: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 14,
  },
  body: {
    fontSize: 17,
    lineHeight: 25,
    color: rippleColors.muted,
    fontWeight: "600",
    marginBottom: 26,
  },
  path: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  pathStep: {
    alignItems: "center",
  },
  pathText: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  pathArrow: {
    marginVertical: 3,
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.soft,
  },
  bottom: {
    gap: 14,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "rgba(31,29,43,0.18)",
  },
  activeDot: {
    width: 24,
    backgroundColor: rippleColors.ink,
  },
  skipText: {
    textAlign: "center",
    color: rippleColors.soft,
    fontSize: 15,
    fontWeight: "800",
  },
});
