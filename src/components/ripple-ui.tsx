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

export const rippleCopy = {
  name: "Ripple",
  tagline: "Start a moment. See how far it goes.",
};

export const rippleColors = {
  ink: "#1F1D2B",
  muted: "#6F6472",
  soft: "#9A8F9B",
  blush: "#E98FB0",
  blushSoft: "rgba(247,199,217,0.45)",
  paper: "#FFF8F0",
  card: "rgba(255,255,255,0.84)",
  cardSoft: "rgba(255,255,255,0.68)",
  line: "rgba(31,29,43,0.1)",
  whiteLine: "rgba(255,255,255,0.95)",
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
      <Text style={styles.brand}>{rippleCopy.name}</Text>
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
    backgroundColor: rippleColors.paper,
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blobOne: {
    width: 310,
    height: 310,
    backgroundColor: "#F7C7D9",
    top: -110,
    right: -100,
    opacity: 0.42,
  },
  blobTwo: {
    width: 260,
    height: 260,
    backgroundColor: "#D8C7F7",
    top: 300,
    left: -130,
    opacity: 0.22,
  },
  blobThree: {
    width: 240,
    height: 240,
    backgroundColor: "#F8D8C8",
    bottom: -80,
    right: -80,
    opacity: 0.36,
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
    marginBottom: 20,
  },
  brand: {
    fontSize: 15,
    fontWeight: "900",
    color: rippleColors.blush,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
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
    backgroundColor: rippleColors.card,
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: rippleColors.whiteLine,
    marginBottom: 14,
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
    borderWidth: 1,
    borderColor: "rgba(233,143,176,0.3)",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#B75E82",
  },
  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: rippleColors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: rippleColors.whiteLine,
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
