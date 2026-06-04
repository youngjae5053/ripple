import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import {
  RippleBackButton,
  RippleButton,
  RippleCard,
  RippleHeader,
  RippleLabel,
  RippleScreen,
  rippleColors,
} from "@/components/ripple-ui";

const examples = [
  "Checked in on a friend",
  "Listened to someone",
  "Picked up trash",
  "Shared advice",
];

export default function CreateScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const canCreate = text.trim().length > 0;

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  return (
    <RippleScreen>
      <RippleBackButton onPress={() => router.back()} />
      <RippleHeader
        title="Start a moment."
        subtitle="One photo, one line, one place. See how far it goes."
      />

      <RippleCard>
        <RippleLabel>Your moment</RippleLabel>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="I checked in on a friend..."
          placeholderTextColor={rippleColors.soft}
          style={styles.input}
        />
      </RippleCard>

      <RippleCard onPress={pickImage} style={styles.photoCard}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
        ) : (
          <View style={styles.photoRow}>
            <View style={styles.photoCopy}>
              <RippleLabel>Photo</RippleLabel>
              <Text style={styles.photoTitle}>Add a photo</Text>
              <Text style={styles.photoText}>
                A place, object, or scene that remembers the moment.
              </Text>
            </View>
            <View style={styles.photoButton}>
              <Text style={styles.photoButtonText}>+</Text>
            </View>
          </View>
        )}
      </RippleCard>

      <View style={styles.examples}>
        {examples.map((item) => (
          <Pressable key={item} style={styles.chip} onPress={() => setText(item)}>
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.actions}>
        <RippleButton
          disabled={!canCreate}
          onPress={() =>
            router.push({
              pathname: "/card",
              params: {
                text: text.trim(),
                photo: photoUri ?? "",
              },
            })
          }
        >
          Create Ripple
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 112,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "800",
    color: rippleColors.ink,
    outlineStyle: "none" as never,
  },
  photoCard: {
    overflow: "hidden",
  },
  photoRow: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  photoPreview: {
    width: "100%",
    height: 210,
    borderRadius: 20,
  },
  photoCopy: {
    flex: 1,
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 6,
  },
  photoText: {
    fontSize: 14,
    lineHeight: 20,
    color: rippleColors.muted,
    fontWeight: "600",
  },
  photoButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: rippleColors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  photoButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: -2,
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: rippleColors.whiteLine,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  actions: {
    marginTop: "auto",
  },
});
