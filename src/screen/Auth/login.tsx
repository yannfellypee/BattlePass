import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. ZOD: O Esquema de Validação do Login
const loginSchema = z.object({
  email: z.string().email('Introduza um e-mail válido'),
  password: z.string().min(6, 'A palavra-passe deve ter no mínimo 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();

  // 2. REACT HOOK FORM: O Motor do Formulário
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // 3. FUNÇÃO DE ENVIO: Só executa se o e-mail e a senha passarem pelo Zod
  const onSubmit = (data: LoginData) => {
    console.log("Dados prontos para autenticar no Supabase:", data);
    // Simulação de login: Joga para a Home (Feed)
    router.replace('/(tabs)/feed');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>ENTRAR NA <Text style={styles.textNeon}>RODA</Text></Text>
        <Text style={styles.subtitle}>Acesse o seu BattlePass para continuar.</Text>
      </View>

      <View style={styles.form}>
        
        {/* Campo: E-MAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={20} color={errors.email ? "#FF3333" : "#888"} style={styles.icon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="E-mail" 
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        {/* Campo: SENHA */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color={errors.password ? "#FF3333" : "#888"} style={styles.icon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Senha" 
                  placeholderTextColor="#666"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* Botão conectado ao handleSubmit */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonPrimaryText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem o passaporte?</Text>
        {/* Ajustado o caminho para garantir que vai para a tela certa */}
        <TouchableOpacity onPress={() => router.push('/auth/resgister')}>
          <Text style={styles.footerLink}> Crie sua conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 20 },
  backButton: { marginTop: 50, marginBottom: 20 },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  textNeon: { color: '#39FF14' },
  subtitle: { color: '#888', fontSize: 16, marginTop: 10 },
  form: { flex: 1 },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 60,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#FFF', fontSize: 16 },
  
  // Estilos de Erro
  inputError: { borderColor: '#FF3333', borderWidth: 1 },
  errorText: { color: '#FF3333', fontSize: 12, marginBottom: 15, marginLeft: 5, marginTop: -5 },

  forgotPassword: { alignItems: 'flex-end', marginBottom: 30, marginTop: 5 },
  forgotPasswordText: { color: '#888', fontSize: 14 },
  
  buttonPrimary: {
    backgroundColor: '#39FF14',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimaryText: { color: '#000', fontSize: 16, fontWeight: '900' },
  
  footer: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 40 },
  footerText: { color: '#888', fontSize: 14 },
  footerLink: { color: '#39FF14', fontSize: 14, fontWeight: 'bold' },
});