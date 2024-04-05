import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/axios";
import { useAttendeeBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";
import { IGetAttendeeBadgeResponse } from ".";

interface IGetEventAttendeesResponse {
  attendeeId: number;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, save } = useAttendeeBadgeStore();

  async function handleRegister() {
    const eventId = "77399dab-b10b-4cbf-be96-8f78eb21e73b";

    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Inscrição", "Preencha todos os campos!");
      }

      setIsLoading(true);

      const response = await api.post<IGetEventAttendeesResponse>(
        `/events/${eventId}/attendees`,
        {
          name,
          email,
        }
      );

      if (response.data.attendeeId) {
        const attendeeBadgeResponse = await api.get<IGetAttendeeBadgeResponse>(
          `/attendees/${response.data.attendeeId}/badge`
        );

        save(attendeeBadgeResponse.data.badge);

        Alert.alert("Inscrição", "Inscrição realizada com sucesso.", [
          {
            text: "OK",
            onPress: () => {
              router.push("/ticket");
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
          return Alert.alert("Inscrição", "Este email já está cadastrado.");
        }
      }

      Alert.alert("Inscrição", "Não foi possível fazer a inscrição.");
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
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>
        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />
        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
