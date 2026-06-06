import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
  RippleButton,
  RippleCard,
  RippleLabel,
  RipplePill,
  RippleScreen,
  rippleColors,
  rippleCopy,
} from "@/components/ripple-ui";
import { OlmangLogo } from "@/components/olmang-logo";

const flowSteps = ["Photo", "One line", "Pass it on", "Keep moving"];

const homeCards = [
  {
    label: "My Journey",
    title: "내가 시작한 순간들",
    text: "이어지고 있는 리플을 조용히 모아볼 수 있어요.",
    route: "/profile" as const,
  },
  {
    label: "Journey",
    title: "최근 리플의 여정",
    text: "서울에서 시작된 작은 순간이 다음 사람에게 닿고 있어요.",
    route: "/passport" as const,
  },
  {
    label: "Discover",
    title: "전 세계의 흐름",
    text: "지금 이어지고 있는 작은 순간들을 둘러보세요.",
    route: "/world" as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <RippleScreen>
      <View style={styles.hero}>
        <OlmangLogo size={74} />
        <Text style={styles.brand}>{rippleCopy.name}</Text>
        <Text style={styles.tagline}>{rippleCopy.tagline}</Text>
        <Text style={styles.question}>Where will it go?</Text>
        <Text style={styles.questionKo}>어디까지 닿을까요?</Text>
      </View>

      <View style={styles.heroAction}>
        <RippleButton onPress={() => router.push("/create")}>Start</RippleButton>
      </View>

      <RippleCard style={styles.flowCard}>
        <View style={styles.flow}>
          {flowSteps.map((step, index) => (
            <View key={step} style={styles.flowStep}>
              <Text style={styles.flowText}>{step}</Text>
              {index < flowSteps.length - 1 ? (
                <Text style={styles.flowArrow}>↓</Text>
              ) : null}
            </View>
          ))}
        </View>
      </RippleCard>

      <View style={styles.cardList}>
        {homeCards.map((card) => (
          <RippleCard
            key={card.label}
            onPress={() => {
              if (card.route === "/passport") {
                router.push({
                  pathname: "/passport",
                  params: { text: "친구에게 안부를 물었어요" },
                });
                return;
              }

              router.push(card.route);
            }}
            style={styles.cleanCard}
          >
            <View style={styles.cardTop}>
              <RippleLabel>{card.label}</RippleLabel>
              {card.label === "Journey" ? <RipplePill>Moving</RipplePill> : null}
            </View>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardText}>{card.text}</Text>
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
    paddingTop: 28,
    paddingBottom: 28,
  },
  brand: {
    marginTop: 18,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  tagline: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  question: {
    marginTop: 34,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    color: rippleColors.ink,
    textAlign: "center",
  },
  questionKo: {
    marginTop: 8,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "800",
    color: rippleColors.blush,
    textAlign: "center",
  },
  heroAction: {
    marginBottom: 22,
  },
  flowCard: {
    backgroundColor: rippleColors.cardSoft,
    paddingVertical: 24,
  },
  flow: {
    alignItems: "center",
  },
  flowStep: {
    alignItems: "center",
  },
  flowText: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  flowArrow: {
    marginVertical: 5,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  cardList: {
    paddingTop: 10,
  },
  cleanCard: {
    padding: 22,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: rippleColors.muted,
    fontWeight: "700",
  },
  actions: {
    marginTop: "auto",
    paddingTop: 6,
  },
});
