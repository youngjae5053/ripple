import { StyleSheet, View } from "react-native";

type OlmangLogoProps = {
  size?: number;
  variant?: "open" | "cluster";
};

const ORANGE = "#FF8A3D";
const CREAM = "#FFF9F4";

export function OlmangLogo({ size = 48, variant = "open" }: OlmangLogoProps) {
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
  cluster: {
    position: "relative",
  },
  clusterDot: {
    position: "absolute",
    backgroundColor: ORANGE,
  },
});
