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
  const { user, loading: authLoading, signOut } = useContext(AuthContext); // Certifique-se que AuthContext exporta signOut
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // --- FUNÇÃO AUXILIAR PARA CHECAR PERFIL NO BANCO ---
  const checkProfileExists = async (userId: string) => {
    const [resMC, resAud, resOrg] = await Promise.all([
      supabase.from('perfil_mc').select('id').eq('id', userId).maybeSingle(),
      supabase.from('perfil_audiencia').select('id').eq('id', userId).maybeSingle(),
      supabase.from('perfil_organizacao').select('id').eq('id', userId).maybeSingle()
    ]);
    return resMC.data || resAud.data || resOrg.data;
  };

  // --- 1. REDIRECIONAMENTO E VALIDAÇÃO DE SESSÃO ATIVA ---
  useEffect(() => {
    const validateActiveSession = async () => {
      if (!authLoading && user && !isNavigating && isFocused) {
        setIsNavigating(true);
        
        // Verifica se o perfil ainda existe no banco de dados
        const profile = await checkProfileExists(user.id);

        if (!profile) {
          Alert.alert("Sessão Inválida", "Seu perfil não foi encontrado. Por favor, crie uma nova conta.");
          await supabase.auth.signOut(); // Força o logout no Supabase
          if (signOut) signOut(); // Limpa o estado no seu Contexto
          setIsNavigating(false);
          return;
        }

        // Se o perfil existe, redireciona pelo cargo
        const role = user.user_metadata?.role; 
        setTimeout(() => {
          if (role === 'mc') router.replace('/mc');
          else if (role === 'organizer') router.replace('/organizer');
          else router.replace('/audience');
        }, 0);
      }
    };

    validateActiveSession();
  }, [user, authLoading, isFocused]);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' }
  });

  // --- 2. LÓGICA DE LOGIN COM VERIFICAÇÃO DE BANCO ---
  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    let emailFinal = data.identifier.trim();
    const apenasNumeros = data.identifier.replace(/\D/g, '');

    try {
      // Se for CPF, busca o e-mail nas tabelas
      if (!data.identifier.includes('@') && apenasNumeros.length === 11) {
        const [resMC, resAud, resOrg] = await Promise.all([
          supabase.from('perfil_mc').select('email_vinculado').eq('cpf', apenasNumeros).maybeSingle(),
          supabase.from('perfil_audiencia').select('email_vinculado').eq('cpf', apenasNumeros).maybeSingle(),
          supabase.from('perfil_organizacao').select('email_vinculado').eq('cpf_responsavel', apenasNumeros).maybeSingle()
        ]);

        const perfil = resMC.data || resAud.data || resOrg.data;
        if (!perfil) throw new Error("CPF não encontrado no Street Pass.");
        emailFinal = perfil.email_vinculado;
      }

      // Tenta o login no Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: emailFinal,
        password: data.password,
      });

      if (authError) throw authError;

      // --- VALIDAÇÃO CRÍTICA ---
      // Após logar no Auth, checamos se o registro existe no banco de dados público
      if (authData.user) {
        const profile = await checkProfileExists(authData.user.id);
        
        if (!profile) {
          // Se não existe no banco, desloga o cara na hora
          await supabase.auth.signOut();
          throw new Error("Usuário autenticado, mas perfil não encontrado no banco de dados.");
        }
      }

    } catch (error: any) {
      Alert.alert("Erro de Acesso", error.message);
      setIsLoading(false);
    }
  };

  const formatInput = (text: string) => {
    if (text.includes('@')) return text.toLowerCase(); 
    const clean = text.replace(/\D/g, '');
    if (clean.length <= 11 && clean.length > 0) {
      return clean.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2');
    }
    return text;
  };

  if (authLoading && !isNavigating) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#39FF14" />
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
                <Ionicons name="mail-outline" size={20} color="#888" />
                <TextInput 
                  style={styles.input} 
                  placeholder="E-mail ou CPF" 
                  placeholderTextColor="#666"
                  autoCapitalize="none"
                  keyboardType="email-address"
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

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)} disabled={isLoading || isNavigating}>
          {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonPrimaryText}>ENTRAR NA RODA</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Novo na cena?</Text>
        <TouchableOpacity onPress={() => router.replace('/auth/register')}>
          <Text style={styles.footerLink}> Criar passaporte</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 25 },
  header: { marginTop: 80, marginBottom: 40, alignItems: 'center' },
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