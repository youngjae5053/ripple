import { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { OlmangLogo } from "@/components/olmang-logo";

export const rippleCopy = {
  name: "OLMANG",
  tagline: "작은 순간들이 이어지는 곳",
};

export const rippleColors = {
  ink: "#222222",
  muted: "#6F665D",
  soft: "#9A8F84",
  blush: "#FF8A3D",
  blushSoft: "rgba(255,138,61,0.16)",
  paper: "#FFF9F4",
  card: "rgba(255,255,255,0.88)",
  cardSoft: "rgba(248,231,216,0.58)",
  line: "rgba(34,34,34,0.08)",
  whiteLine: "rgba(255,255,255,0)",
  peach: "#F8E7D8",
  sand: "#F2EEE8",
};

type RippleScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function RippleScreen({
  children,
  scroll = true,
  contentStyle,
}: RippleScreenProps) {
  const content = (
    <View style={[styles.phone, contentStyle]}>{children}</View>
  );

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
}

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function RippleHeader({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <OlmangLogo size={28} />
        <Text style={styles.brand}>{rippleCopy.name}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onPress: () => void;
  tone?: "primary" | "secondary" | "ghost";
};

export function RippleButton({
  children,
  disabled,
  onPress,
  tone = "primary",
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        tone === "secondary" && styles.secondaryButton,
        tone === "ghost" && styles.ghostButton,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          tone !== "primary" && styles.secondaryButtonText,
          tone === "ghost" && styles.ghostButtonText,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function RippleCard({ children, onPress, style }: CardProps) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={[styles.card, style]}>
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

export function RippleBackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <Text style={styles.backText}>Back</Text>
    </Pressable>
  );
}

export function RippleLabel({ children }: { children: ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function RipplePill({ children }: { children: ReactNode }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#FFF6EE",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blobOne: {
    width: 420,
    height: 420,
    borderWidth: 1,
    borderColor: "rgba(255,138,61,0.2)",
    top: -170,
    right: -170,
    opacity: 1,
  },
  blobTwo: {
    width: 320,
    height: 320,
    borderWidth: 1,
    borderColor: "rgba(111,102,93,0.11)",
    top: 310,
    left: -170,
    opacity: 1,
  },
  blobThree: {
    width: 240,
    height: 240,
    backgroundColor: "rgba(255,138,61,0.08)",
    bottom: -90,
    right: -90,
    opacity: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  phone: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 22,
    paddingVertical: 4,
  },
  backText: {
    fontSize: 15,
    fontWeight: "800",
    color: rippleColors.ink,
  },
  header: {
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  brand: {
    fontSize: 16,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  title: {
    fontSize: 40,
    lineHeight: 47,
    fontWeight: "900",
    color: rippleColors.ink,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: rippleColors.muted,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "rgba(255,249,244,0.86)",
    borderRadius: 26,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#8A4A22",
    shadowOpacity: 0.06,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
  },
  label: {
    fontSize: 12,
    fontWeight: "900",
    color: rippleColors.blush,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: rippleColors.blushSoft,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "900",
    color: rippleColors.blush,
  },
  button: {
    height: 58,
    borderRadius: 999,
    backgroundColor: rippleColors.blush,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: rippleColors.peach,
  },
  ghostButton: {
    height: 44,
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.34,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  secondaryButtonText: {
    color: rippleColors.ink,
  },
  ghostButtonText: {
    color: rippleColors.muted,
    fontSize: 15,
  },
});
