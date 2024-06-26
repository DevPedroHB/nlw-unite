import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/axios";
import { useAttendeeBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";

export interface IGetAttendeeBadgeResponse {
  badge: AttendeeBadge;
}

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, save } = useAttendeeBadgeStore();

  async function handleAccessCredentials() {
    try {
      if (!code.trim()) {
        return Alert.alert("Ingresso", "Informe o código do ingresso!");
      }

      setIsLoading(true);

      const response = await api.get<IGetAttendeeBadgeResponse>(
        `/attendees/${code}/badge`
      );

      if (response.data.badge) {
        save(response.data.badge);
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Ingresso", "Ingresso não encontrado.");
    } finally {
      setIsLoading(false);
    }
  }

  if (data?.checkInURL) {
    return <Redirect href="/ticket" />;
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>
        <Button
          title="Acessar credencial"
          onPress={handleAccessCredentials}
          isLoading={isLoading}
        />
        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
