import { StyleSheet, View } from "react-native";

type OlmangLogoProps = {
  size?: number;
  variant?: "open" | "cluster" | "orbit";
};

const ORANGE = "#FF8A3D";
const CREAM = "#FFF9F4";
const PEACH = "#F8E7D8";
const INK = "#222222";

export function OlmangLogo({ size = 48, variant = "orbit" }: OlmangLogoProps) {
  if (variant === "cluster") {
    const dot = size * 0.28;

    return (
      <View style={[styles.cluster, { width: size, height: size }]}>
        <View
          style={[
            styles.clusterDot,
            { width: dot, height: dot, borderRadius: dot / 2, left: size * 0.18 },
          ]}
        />
        <View
          style={[
            styles.clusterDot,
            {
              width: dot * 1.14,
              height: dot * 1.14,
              borderRadius: (dot * 1.14) / 2,
              right: size * 0.18,
              top: size * 0.14,
            },
          ]}
        />
        <View
          style={[
            styles.clusterDot,
            {
              width: dot * 0.96,
              height: dot * 0.96,
              borderRadius: (dot * 0.96) / 2,
              left: size * 0.34,
              bottom: size * 0.14,
            },
          ]}
        />
      </View>
    );
  }

  if (variant === "orbit") {
    const planet = Math.max(6, size * 0.18);
    const moon = Math.max(4, size * 0.1);

    return (
      <View style={[styles.logo, { width: size, height: size }]}>
        <View
          style={[
            styles.orbitRing,
            {
              width: size * 0.94,
              height: size * 0.62,
              borderRadius: size,
              borderWidth: Math.max(1.5, size * 0.045),
              left: size * 0.03,
              top: size * 0.19,
            },
          ]}
        />
        <View
          style={[
            styles.orbitRing,
            styles.orbitRingTilt,
            {
              width: size * 0.78,
              height: size * 0.78,
              borderRadius: size,
              borderWidth: Math.max(1.5, size * 0.035),
              left: size * 0.11,
              top: size * 0.1,
            },
          ]}
        />
        <View
          style={[
            styles.planet,
            {
              width: planet,
              height: planet,
              borderRadius: planet / 2,
              left: size * 0.39,
              top: size * 0.38,
            },
          ]}
        />
        <View
          style={[
            styles.moon,
            {
              width: moon,
              height: moon,
              borderRadius: moon / 2,
              right: size * 0.08,
              top: size * 0.21,
            },
          ]}
        />
      </View>
    );
  }

  const ring = Math.max(4, size * 0.11);
  const gap = size * 0.32;

  return (
    <View style={[styles.logo, { width: size, height: size }]}>
      <View
        style={[
          styles.openCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: ring,
          },
        ]}
      />
      <View
        style={[
          styles.gap,
          {
            width: gap,
            height: gap,
            borderRadius: gap / 2,
            right: -ring,
            top: -ring,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "relative",
  },
  openCircle: {
    borderColor: ORANGE,
  },
  gap: {
    position: "absolute",
    backgroundColor: CREAM,
  },
  orbitRing: {
    position: "absolute",
    borderColor: ORANGE,
    opacity: 0.9,
    transform: [{ rotate: "-18deg" }],
  },
  orbitRingTilt: {
    borderColor: PEACH,
    opacity: 0.95,
    transform: [{ rotate: "32deg" }],
  },
  planet: {
    position: "absolute",
    backgroundColor: ORANGE,
    shadowColor: ORANGE,
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  moon: {
    position: "absolute",
    backgroundColor: INK,
    opacity: 0.82,
  },
  cluster: {
    position: "relative",
  },
  clusterDot: {
    position: "absolute",
    backgroundColor: ORANGE,
  },
});
