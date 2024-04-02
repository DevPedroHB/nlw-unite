import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface IInput {
  children: ReactNode;
}

function Input({ children }: IInput) {
  return (
    <View className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">
      {children}
    </View>
  );
}

interface IField extends TextInputProps {}

function Field({ ...props }: IField) {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...props}
    />
  );
}

Input.Field = Field;

export { Input };
