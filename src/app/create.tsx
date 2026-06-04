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
  "친구에게 안부를 물었어요",
  "Listened to someone",
  "힘들어 보이는 사람의 이야기를 들어줬어요",
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
        subtitle="오늘 나눈 작은 호의나 순간을 리플로 시작해보세요."
      />

      <RippleCard>
        <RippleLabel>One-line moment</RippleLabel>
        <Text style={styles.inputHelper}>
          길게 쓰지 않아도 괜찮아요. 한 문장이면 충분해요.
        </Text>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder={"I checked in on a friend...\n친구에게 안부를 물었어요..."}
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
              <RippleLabel>Photo · 사진</RippleLabel>
              <Text style={styles.photoTitle}>Add a photo</Text>
              <Text style={styles.photoText}>
                행동 장면이 아니어도 괜찮아요. 그 순간이 떠오르는 사진이면 충분해요.
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
          Create Ripple · 리플 만들기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  inputHelper: {
    marginTop: -4,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
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
