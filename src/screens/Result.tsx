import { StyleSheet, Text, View } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Routes";

type ResultRouteProp = RouteProp<RootStackParamList, "Result">;

export default function Result() {
  const route = useRoute<ResultRouteProp>();
  const { custoGasolina, custoEtanol } = route.params;

  const igual = custoEtanol === custoGasolina;
  const custoBeneficio = custoEtanol < custoGasolina ? "Etanol" : "Gasolina";
  const diferença = custoGasolina - custoEtanol;

  return (
    <View style={styles.resultContainer}>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        <View style={styles.resultGroup}>
          <Text style={styles.label}>Gasto com Gasolina</Text>
          <Text style={styles.fakeInput}>
            Gasolina R${custoGasolina.toFixed(2).toString().replace(".", ",")}
            /Km
          </Text>
        </View>

        <View style={styles.resultGroup}>
          <Text style={styles.label}>Gasto com Etanol</Text>
          <Text style={styles.fakeInput}>
            Etanol R${custoEtanol.toFixed(2).toString().replace(".", ",")}/Km
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Resultado</Text>
      {igual ? (
        <Text style={{ textAlign: "center" }}>
          Não a diferença entre a Gasolina e o Etanol, os dois possuem o mesmo
          custo beneficio
        </Text>
      ) : (
        <Text style={{ textAlign: "center" }}>
          Vale mais apena utilizar{" "}
          <Text style={styles.boldText}>{custoBeneficio}</Text>, existindo uma
          diferença de{" "}
          <Text style={styles.boldText}>
            R$
            {diferença.toFixed(2).toString().replace("-", "").replace(".", ",")}
          </Text>{" "}
          por Km rodado
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  resultGroup: {
    gap: 10,
    width: "50%",
  },
  fakeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  label: {
    textAlign: "center",
  },
});
