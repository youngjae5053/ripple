import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  "힘들어 보이는 사람의 이야기를 들어줬어요",
  "길을 헤매는 사람에게 방향을 알려줬어요",
  "작은 커피 한 잔을 건넸어요",
  "친구에게 안부를 물었어요",
];

export default function ContinueScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const seedText =
    typeof params.text === "string" && params.text.trim().length > 0
      ? params.text
      : "Checked in on a friend";

  const [message, setMessage] = useState("");
  const [place, setPlace] = useState("Seoul, South Korea");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const canContinue = message.trim().length > 0 && place.trim().length > 0;

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
        title="Add your stop."
        subtitle="내 방식으로 리플을 이어가세요. 사진 1장, 문장 1줄, 장소 1곳이면 충분해요."
      />

      <RippleCard>
        <RippleLabel>Original Ripple · 처음 리플</RippleLabel>
        <Text style={styles.seedText}>{seedText}</Text>
      </RippleCard>

      <RippleCard onPress={pickImage} style={styles.photoCard}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
        ) : (
          <View style={styles.photoRow}>
            <View style={styles.photoCopy}>
              <RippleLabel>Photo · 사진</RippleLabel>
              <Text style={styles.photoTitle}>Add a moment photo · 사진 추가</Text>
              <Text style={styles.photoText}>
                행동 자체가 아니어도 괜찮아요. 이 순간이 떠오르는 사진이면 충분해요.
              </Text>
            </View>
            <View style={styles.photoButton}>
              <Text style={styles.photoButtonText}>+</Text>
            </View>
          </View>
        )}
      </RippleCard>

      <RippleCard>
        <RippleLabel>One line · 문장 1줄</RippleLabel>
        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline
          placeholder="힘들어 보이는 사람의 이야기를 들어줬어요..."
          placeholderTextColor={rippleColors.soft}
          style={styles.input}
        />
      </RippleCard>

      <View style={styles.examples}>
        {examples.map((item) => (
          <Pressable
            key={item}
            style={styles.chip}
            onPress={() => setMessage(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <RippleCard>
        <RippleLabel>Place · 장소 1곳</RippleLabel>
        <TextInput
          value={place}
          onChangeText={setPlace}
          placeholder="도시, 나라"
          placeholderTextColor={rippleColors.soft}
          style={styles.placeInput}
        />
      </RippleCard>

      <RippleCard>
        <RippleLabel>Preview · 미리보기</RippleLabel>
        <Text style={styles.previewRoute}>Seoul → {place || "?"}</Text>
        <Text style={styles.previewText}>
          {message || "내 문장 1줄이 여기에 보여요."}
        </Text>
      </RippleCard>

      <View style={styles.actions}>
        <RippleButton
          disabled={!canContinue}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: {
                text: message.trim(),
                place: place.trim(),
                continued: "true",
                photo: photoUri ?? "",
              },
            })
          }
        >
          Add stop · 여정에 추가하기
        </RippleButton>
      </View>
    </RippleScreen>
  );
}

const styles = StyleSheet.create({
  seedText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "900",
    color: rippleColors.ink,
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
  input: {
    minHeight: 82,
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
    color: rippleColors.ink,
    outlineStyle: "none" as never,
  },
  placeInput: {
    fontSize: 18,
    fontWeight: "900",
    color: rippleColors.ink,
    outlineStyle: "none" as never,
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: rippleColors.whiteLine,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "800",
    color: rippleColors.muted,
  },
  previewRoute: {
    fontSize: 17,
    fontWeight: "900",
    color: rippleColors.ink,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: rippleColors.muted,
  },
  actions: {
    marginTop: "auto",
  },
});
