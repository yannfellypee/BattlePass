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
import { useIsFocused } from '@react-navigation/native';

import { supabase } from "../../src/utils/supabase"; 
import { AuthContext } from "../../src/context/AuthContext";

const loginSchema = z.object({
  identifier: z.string().min(1, 'Informe seu E-mail ou CPF'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  
  // Pegamos o estado global do contexto revisado
  const { perfil, loading: authLoading, user } = useContext(AuthContext); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- REDIRECIONAMENTO INTELIGENTE ---
  useEffect(() => {
    // Se o loading do contexto parou E temos um usuário/perfil
    if (!authLoading && user && perfil && isFocused) {
      console.log("Redirecionando usuário nível:", perfil.nivel_acesso);
      
      if (perfil.nivel_acesso === 2) router.replace('/mc');
      else if (perfil.nivel_acesso === 3) router.replace('/organizer');
      else router.replace('/audience'); // Garanta que esta pasta existe em app/(protected)/audience
    }
  }, [perfil, authLoading, user, isFocused]);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' }
  });

  const onSubmit = async (data: LoginData) => {
    if (isLoading) return;
    setIsLoading(true);
    
    let emailFinal = data.identifier.trim();
    const apenasNumeros = data.identifier.replace(/\D/g, '');

    try {
      // 1. Busca e-mail por CPF se necessário
      if (!data.identifier.includes('@') && apenasNumeros.length === 11) {
        const { data: dbPerfil, error: cpfError } = await supabase
          .from('perfis')
          .select('email_vinculado')
          .eq('cpf', apenasNumeros)
          .maybeSingle();

        if (!dbPerfil) throw new Error("CPF não cadastrado no Street Pass.");
        emailFinal = dbPerfil.email_vinculado;
      }

      // 2. Login no Supabase Auth
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: emailFinal,
        password: data.password,
      });

      if (authError) throw authError;

      // O useEffect acima cuidará do redirecionamento assim que o Contexto atualizar
    } catch (error: any) {
      Alert.alert("Erro de Acesso", error.message);
      setIsLoading(false);
    }
  };

  const formatInput = (text: string) => {
    if (text.includes('@')) return text.toLowerCase(); 
    const clean = text.replace(/\D/g, '');
    if (clean.length <= 11 && clean.length > 0) {
      return clean
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    }
    return text;
  };

  // Se o App está checando se você já está logado, mostramos apenas o loading
  // Isso evita o flash da tela de login e o redirecionamento forçado para o cadastro
  if (authLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#39FF14" />
        <Text style={{ color: '#888', marginTop: 15 }}>Validando passaporte...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>STREET<Text style={styles.textNeon}>PASS</Text></Text>
        <Text style={styles.subtitle}>E-mail ou CPF para entrar na cena.</Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="identifier"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <View style={[styles.inputContainer, errors.identifier && styles.inputError]}>
                <Ionicons name="person-outline" size={20} color="#888" />
                <TextInput 
                  style={styles.input} 
                  placeholder="E-mail ou CPF" 
                  placeholderTextColor="#666"
                  autoCapitalize="none"
                  onChangeText={(text) => onChange(formatInput(text))}
                  value={value}
                />
              </View>
              {errors.identifier && <Text style={styles.errorText}>{errors.identifier.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Senha" 
                  placeholderTextColor="#666"
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={22} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={handleSubmit(onSubmit)} 
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonPrimaryText}>ENTRAR NA RODA</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem passaporte?</Text>
        <TouchableOpacity onPress={() => router.replace('/auth/register')}>
          <Text style={styles.footerLink}> Criar conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 25 },
  header: { marginTop: 100, marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 38, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  textNeon: { color: '#39FF14' },
  subtitle: { color: '#888', fontSize: 14, marginTop: 10 },
  form: { width: '100%' },
  inputGroup: { marginBottom: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, borderWidth: 1, borderColor: '#333', paddingHorizontal: 15, height: 60 },
  input: { flex: 1, color: '#FFF', fontSize: 16, marginLeft: 10 },
  inputError: { borderColor: '#FF3333' },
  errorText: { color: '#FF3333', fontSize: 12, marginTop: 5, marginLeft: 5 },
  buttonPrimary: { backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonPrimaryText: { color: '#000', fontSize: 16, fontWeight: '900' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: '#888', fontSize: 14 },
  footerLink: { color: '#39FF14', fontSize: 14, fontWeight: 'bold' },
});