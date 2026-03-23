import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Imports dos teus serviços e contexto
import { login } from "../../src/Services/authService";
import { AuthContext } from "../../src/context/AuthContext";

// --- 1. ESQUEMA DE VALIDAÇÃO (ZOD) ---
const loginSchema = z.object({
  email: z.string().email('Introduza um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isAuthenticated, user, isLoading: authLoading } = useContext(AuthContext);
  
  // ESTADOS DE CONTROLE
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- 2. PROTEÇÃO DE ROTA INVERSA ---
  // Se o usuário já estiver logado, não permite que ele fique nesta tela
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const target = user.type === 'mc' ? '/mc' : user.type === 'organizer' ? '/organizer' : '/audience';
      router.replace(target as any);
    }
  }, [isAuthenticated, authLoading, user]);

  // --- 3. CONFIGURAÇÃO DO FORMULÁRIO ---
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // --- 4. LÓGICA DE SUBMISSÃO ---
  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);

    // Simulação de delay para feedback visual
    setTimeout(async () => {
      const userFound = login(data.email, data.password);

      if (!userFound) {
        setIsLoading(false);
        Alert.alert(
          "Acesso Negado", 
          "Usuário não encontrado ou senha incorreta.",
          [{ text: "Tentar novamente", style: "cancel" }]
        );
        return;
      }

      // 1. Salva no Contexto Global (que agora persiste no AsyncStorage)
      await signIn({
        name: userFound.name,
        type: userFound.role as 'mc' | 'organizer' | 'audience', 
      });

      setIsLoading(false);

      // 2. REDIRECIONAMENTO COM REPLACE (Essencial para não voltar ao login)
      let path = '/audience';
      if (userFound.role === 'mc') path = '/mc';
      else if (userFound.role === 'organizer') path = '/organizer';

      router.replace(path as any);
    }, 1500);
  };

  if (authLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

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
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={20} color={errors.email ? "#FF3333" : "#888"} />
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

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color={errors.password ? "#FF3333" : "#888"} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Senha" 
                  placeholderTextColor="#666"
                  secureTextEntry={!isPasswordVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeButton}>
                  <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={22} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonPrimaryText}>ENTRAR</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem o passaporte?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
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
  inputGroup: { marginBottom: 15 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 15,
    height: 60,
  },
  input: { flex: 1, color: '#FFF', fontSize: 16, marginLeft: 10 },
  eyeButton: { padding: 5 },
  inputError: { borderColor: '#FF3333' },
  errorText: { color: '#FF3333', fontSize: 12, marginTop: 5, marginLeft: 5 },
  forgotPassword: { alignItems: 'flex-end', marginBottom: 30 },
  forgotPasswordText: { color: '#888', fontSize: 14 },
  buttonPrimary: { backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center', height: 60, justifyContent: 'center' },
  buttonPrimaryText: { color: '#000', fontSize: 16, fontWeight: '900' },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 40, marginTop: 20 },
  footerText: { color: '#888', fontSize: 14 },
  footerLink: { color: '#39FF14', fontSize: 14, fontWeight: 'bold' },
});