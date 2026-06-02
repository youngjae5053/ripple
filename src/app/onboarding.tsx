import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const pages = [
  {
    title: "One moment.",
    subtitle: "A message.\nA favor.\nA memory.",
    visual: "●",
  },
  {
    title: "Pass it on.",
    subtitle: "Only if it feels right.",
    visual: "●  →  ●",
  },
  {
    title: "A ripple begins.",
    subtitle: "One moment becomes many.",
    visual: "●  →  ●  →  ●",
  },
  {
    title: "Where will it go?",
    subtitle: "Seoul\n↓\nTokyo\n↓\nSydney\n↓\n?",
    visual: "",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const current = pages[page];
  const isLast = page === pages.length - 1;

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />

      <View style={styles.phone}>
        <View style={styles.top}>
          <Text style={styles.brand}>Ripple</Text>
          <Text style={styles.step}>{page + 1}/4</Text>
        </View>

        <View style={styles.center}>
          {current.visual ? <Text style={styles.visual}>{current.visual}</Text> : null}

          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.subtitle}>{current.subtitle}</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.dots}>
            {pages.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === page && styles.activeDot]}
              />
            ))}
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              if (isLast) {
                router.push("/");
              } else {
                setPage(page + 1);
              }
            }}
          >
            <Text style={styles.primaryButtonText}>
              {isLast ? "Start a moment" : "Continue"}
            </Text>
          </Pressable>

          {!isLast ? (
            <Pressable onPress={() => router.push("/")}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#FFF8F0",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.42,
  },
  blobOne: {
    width: 290,
    height: 290,
    backgroundColor: "#F7C7D9",
    top: -90,
    right: -90,
  },
  blobTwo: {
    width: 260,
    height: 260,
    backgroundColor: "#D8C7F7",
    top: 260,
    left: -120,
    opacity: 0.25,
  },
  blobThree: {
    width: 230,
    height: 230,
    backgroundColor: "#F8D8C8",
    bottom: -70,
    right: -70,
    opacity: 0.36,
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 60,
    paddingBottom: 36,
    justifyContent: "space-between",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F1D2B",
  },
  step: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8B7D88",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  visual: {
    fontSize: 38,
    color: "#1F1D2B",
    marginBottom: 40,
    letterSpacing: 2,
  },
  title: {
    fontSize: 46,
    lineHeight: 52,
    fontWeight: "900",
    color: "#1F1D2B",
    textAlign: "center",
    letterSpacing: -1.4,
  },
  subtitle: {
    marginTop: 22,
    fontSize: 20,
    lineHeight: 30,
    color: "#6F6472",
    fontWeight: "500",
    textAlign: "center",
  },
  bottom: {
    gap: 18,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "rgba(31,29,43,0.18)",
  },
  activeDot: {
    width: 24,
    backgroundColor: "#1F1D2B",
  },
  primaryButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: "#1F1D2B",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  skipText: {
    textAlign: "center",
    color: "#8B7D88",
    fontSize: 15,
    fontWeight: "700",
  },
});