import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { rippleColors } from "@/components/ripple-ui";

const tabs = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Map", path: "/journey-map" },
  { label: "Mine", path: "/profile" },
  { label: "Alerts", path: "/notifications" },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      {tabs.map((tab) => {
        const isActive =
          tab.path === "/" ? pathname === "/" : pathname.startsWith(tab.path);

        return (
          <Pressable
            key={tab.path}
            onPress={() => router.push(tab.path)}
            style={[styles.item, isActive && styles.activeItem]}
          >
            <View style={[styles.orbit, isActive && styles.activeOrbit]}>
              <View style={[styles.planet, isActive && styles.activePlanet]} />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    minHeight: 72,
    borderRadius: 999,
    backgroundColor: "rgba(255,249,244,0.92)",
    padding: 8,
    marginTop: 18,
    shadowColor: "#8A4A22",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
  },
  item: {
    flex: 1,
    minHeight: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeItem: {
    backgroundColor: rippleColors.blushSoft,
  },
  orbit: {
    width: 24,
    height: 14,
    borderRadius: 999,
    borderWidth: 1.3,
    borderColor: "rgba(34,34,34,0.12)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-18deg" }],
  },
  activeOrbit: {
    borderColor: "rgba(255,138,61,0.52)",
  },
  planet: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: rippleColors.soft,
  },
  activePlanet: {
    width: 8,
    height: 8,
    backgroundColor: rippleColors.blush,
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
    color: rippleColors.soft,
    textAlign: "center",
  },
  activeLabel: {
    color: rippleColors.ink,
  },
});
