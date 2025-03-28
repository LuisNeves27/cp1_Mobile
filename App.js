
import React, { useState } from 'react';
import fiapLogo from './assets/fiap-logo.png';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';




export default function App() {
  // Utilizando "pm" como iniciais (exemplo: Pedro Martins)
  const [pmNota1, setPmNota1] = useState('');
  const [pmNota2, setPmNota2] = useState('');
  const [pmNota3, setPmNota3] = useState('');
  const [pmFaltas, setPmFaltas] = useState('');
  const [pmResultado, setPmResultado] = useState('');

  // Função para validar entrada: permite apenas números com até duas casas decimais
  const pmValidarEntrada = (valor) => {
    if (valor === '') return true; // Campo vazio é interpretado como zero
    return /^[0-9]*\.?[0-9]{0,2}$/.test(valor);
  };

  // Handlers para cada campo, com validação
  const pmHandleNota1Change = (texto) => {
    if (pmValidarEntrada(texto)) setPmNota1(texto);
  };

  const pmHandleNota2Change = (texto) => {
    if (pmValidarEntrada(texto)) setPmNota2(texto);
  };

  const pmHandleNota3Change = (texto) => {
    if (pmValidarEntrada(texto)) setPmNota3(texto);
  };

  const pmHandleFaltasChange = (texto) => {
    if (pmValidarEntrada(texto)) setPmFaltas(texto);
  };

  // Função para validar o aluno com base na média e no número de faltas
  const pmValidarAluno = () => {
    const nota1 = parseFloat(pmNota1) || 0;
    const nota2 = parseFloat(pmNota2) || 0;
    const nota3 = parseFloat(pmNota3) || 0;
    const faltas = parseInt(pmFaltas) || 0;

    const pmLimiteFaltas = 10; // Limite de faltas definido pela FIAP
    if (faltas > pmLimiteFaltas) {
      setPmResultado("Reprovado por falta");
      return;
    }

    // Descarte da menor nota: utiliza as duas maiores para calcular a média
    const pmNotas = [nota1, nota2, nota3].sort((a, b) => a - b);
    const media = ((pmNotas[1] + pmNotas[2]) / 2).toFixed(2);

    if (media < 6) {
      setPmResultado("Reprovado por nota");
    } else {
      setPmResultado(`Aprovado com média de ${media}`);
    }
  };

  // Função para resetar todos os campos (acionada ao tocar no logo da FIAP)
  const pmResetarCampos = () => {
    setPmNota1('');
    setPmNota2('');
    setPmNota3('');
    setPmFaltas('');
    setPmResultado('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={pmResetarCampos}>
          {/* Coloque a imagem "fiap-logo.png" na pasta "assets" */}
          <Image source={require('./assets/fiap-logo.png')} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nota 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Nota 1"
            keyboardType="numeric"
            value={pmNota1}
            onChangeText={pmHandleNota1Change}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nota 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Nota 2"
            keyboardType="numeric"
            value={pmNota2}
            onChangeText={pmHandleNota2Change}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nota 3</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Nota 3"
            keyboardType="numeric"
            value={pmNota3}
            onChangeText={pmHandleNota3Change}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Faltas</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o número de faltas"
            keyboardType="numeric"
            value={pmFaltas}
            onChangeText={pmHandleFaltasChange}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={pmValidarAluno}>
          <Text style={styles.botaoTexto}>Validar</Text>
        </TouchableOpacity>

        {pmResultado ? <Text style={styles.resultado}>{pmResultado}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
