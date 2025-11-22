import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Routes";

type NavProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function CalcPage() {
  const navigation = useNavigation<NavProps>();

  const [gasolina, setGasolina] = useState<number>(0);
  const [gasolinalitro, setGasolinaLitro] = useState<number>(0);
  const [etanol, setEtanol] = useState<number>(0);
  const [etanolLitro, setEtanolLitro] = useState<number>(0);

  const [errors, setErrors] = useState<any>(false);

  const handleCalc = () => {
    const newErrors: any = {};

    if (gasolina == 0 || !gasolina) {
      newErrors.gasolina = true;
    }

    if (gasolinalitro == 0 || !gasolinalitro) {
      newErrors.gasolinaLitro = true;
    }

    if (etanol == 0 || !etanol) {
      newErrors.etanol = true;
    }

    if (etanolLitro == 0 || !etanolLitro) {
      newErrors.etanolLitro = true;
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors || {}).some(
      (value) => value === true
    );

    if (hasErrors) return;

    const custoGasolina = gasolina / gasolinalitro;
    const custoEtanol = etanol / etanolLitro;

    navigation.navigate("Result", {
      custoGasolina,
      custoEtanol,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <View style={styles.calcContainer}>
        <Text style={styles.title}>Calcular Combustível</Text>

        <View style={styles.inputGroup}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Valor Gasolina</Text>
            <TextInput
              style={[styles.input, errors?.gasolina && styles.inputError]}
              keyboardType="numeric"
              placeholder="Valor do Gasolina"
              onChangeText={(v) => {
                setGasolina(parseFloat(v));

                setErrors((prev: any) => ({
                  ...(prev || {}),
                  gasolina: false,
                }));
              }}
            />
            {errors?.gasolina && (
              <Text style={styles.errorText}>Preencha o campo</Text>
            )}
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Faz por litro</Text>
            <TextInput
              style={[styles.input, errors?.gasolinaLitro && styles.inputError]}
              keyboardType="numeric"
              placeholder="Faz p/l"
              onChangeText={(v) => {
                setGasolinaLitro(parseFloat(v));

                setErrors((prev: any) => ({
                  ...(prev || {}),
                  gasolinaLitro: false,
                }));
              }}
            />
            {errors?.gasolinaLitro && (
              <Text style={styles.errorText}>Preencha o campo</Text>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Valor Etanol</Text>
            <TextInput
              style={[styles.input, errors?.etanol && styles.inputError]}
              keyboardType="numeric"
              placeholder="Valor do Etanol"
              onChangeText={(v) => {
                setEtanol(parseFloat(v));

                setErrors((prev: any) => ({
                  ...(prev || {}),
                  etanol: false,
                }));
              }}
            />
            {errors?.etanol && (
              <Text style={styles.errorText}>Preencha o campo</Text>
            )}
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Faz por litro</Text>
            <TextInput
              style={[styles.input, errors?.etanolLitro && styles.inputError]}
              keyboardType="numeric"
              placeholder="Faz p/l"
              onChangeText={(v) => {
                setEtanolLitro(parseFloat(v));

                setErrors((prev: any) => ({
                  ...(prev || {}),
                  etanolLitro: false,
                }));
              }}
            />
            {errors?.etanolLitro && (
              <Text style={styles.errorText}>Preencha o campo</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleCalc}
        >
          <Text style={styles.buttonText}>Caclular</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  calcContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    // marginTop: 20,
  },
  inputBox: {
    width: "50%",
    gap: 5,
  },
  label: {
    marginLeft: 2,
    fontSize: 16,
    fontWeight: 500,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginLeft: 2,
  },
  button: {
    backgroundColor: "black",
    width: "105%",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
});
