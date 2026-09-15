import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CadastroScreen() {
  const { width } = useWindowDimensions();
  const tablet = width >= 600;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            tablet && styles.containerTablet,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Fazer uma doação</Text>

          <Text style={styles.subtitulo}>
            Preencha seus dados para registrar sua doação.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#777"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu telefone"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Tipo de doação</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex.: alimentos, roupas, materiais..."
              placeholderTextColor="#777"
              multiline
            />

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe a quantidade"
              placeholderTextColor="#777"
              keyboardType="numeric"
            />

            <Pressable
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressed,
              ]}
              onPress={() => router.back()}
            >
              <Text style={styles.botaoTexto}>Registrar doação</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.voltar,
                pressed && styles.botaoPressed,
              ]}
              onPress={() => router.back()}
            >
              <Text style={styles.voltarTexto}>Voltar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    width: '100%',
    padding: 20,
  },

  containerTablet: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    lineHeight: 23,
    color: '#555',
    marginBottom: 24,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    width: '100%',
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    fontSize: 16,
  },

  textArea: {
    minHeight: 100,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  botao: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    marginTop: 24,
    paddingHorizontal: 20,
  },

  botaoPressed: {
    opacity: 0.75,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  voltar: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  voltarTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
});