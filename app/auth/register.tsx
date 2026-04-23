import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from "../../src/utils/supabase";

// --- 1. ESQUEMA DE VALIDAÇÃO SIMPLIFICADO ---
const registerSchema = z.object({
  fullName: z.string().min(5, 'Informe seu nome completo'), 
  document: z.string().min(14, 'CPF inválido'), 
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      fullName: '', email: '', document: '', password: '', confirmPassword: '' 
    }
  });

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .substring(0, 14);
  };

  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);
    const rawDocument = data.document.replace(/\D/g, '');

    try {
      // A. Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { 
            data: { display_name: data.fullName } 
        }
      });

      if (authError) throw authError;
      const userId = authData.user!.id;

      // B. Tabela Única de Perfis
      const { error: profileError } = await supabase.from('perfis').insert({
        id: userId,
        nome_completo: data.fullName,
        cpf: rawDocument,
        email_vinculado: data.email,
        nivel_acesso: 1 // Nível base: Público
      });

      if (profileError) throw profileError;

      setShowSuccess(true);
      setTimeout(() => router.replace('/auth/chooseRole'), 4000);

    } catch (error: any) {
      Alert.alert("Erro no Cadastro", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="flash" size={80} color="#39FF14" />
        <Text style={styles.successTitle}>CONTA CRIADA!</Text>
        <Text style={styles.successSubtitle}>Prepare sua rima...</Text>
        <ActivityIndicator size="large" color="#39FF14" style={{ marginTop: 30 }} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.title}>STREET<Text style={styles.textNeon}>PASS</Text></Text>
        
        <Text style={styles.welcomeText}>Crie seu perfil e faça parte da cena!</Text>

        <View style={styles.form}>
          {/* Nome Completo */}
          <Controller control={control} name="fullName" render={({ field: { onChange, value } }) => (
            <View style={styles.fieldGroup}>
              <View style={[styles.inputBox, errors.fullName && styles.inputBoxError]}>
                <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#555" onChangeText={onChange} value={value} />
              </View>
              {errors.fullName && <Text style={styles.errTxt}>{errors.fullName.message}</Text>}
            </View>
          )} />

          {/* CPF */}
          <Controller control={control} name="document" render={({ field: { onChange, value } }) => (
            <View style={styles.fieldGroup}>
              <View style={[styles.inputBox, errors.document && styles.inputBoxError]}>
                <TextInput 
                  style={styles.input} 
                  placeholder="CPF" 
                  placeholderTextColor="#555" 
                  keyboardType="numeric" 
                  maxLength={14} 
                  onChangeText={(t) => onChange(formatCPF(t))} 
                  value={value} 
                />
              </View>
              {errors.document && <Text style={styles.errTxt}>{errors.document.message}</Text>}
            </View>
          )} />

          {/* E-mail */}
          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
            <View style={styles.fieldGroup}>
              <View style={[styles.inputBox, errors.email && styles.inputBoxError]}>
                <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#555" autoCapitalize="none" keyboardType="email-address" onChangeText={onChange} value={value} />
              </View>
              {errors.email && <Text style={styles.errTxt}>{errors.email.message}</Text>}
            </View>
          )} />

          {/* Senha */}
          <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
            <View style={styles.fieldGroup}>
              <View style={[styles.inputBox, errors.password && styles.inputBoxError]}>
                <TextInput style={styles.input} placeholder="Senha (mín. 6 dígitos)" placeholderTextColor="#555" secureTextEntry={!isPasswordVisible} onChangeText={onChange} value={value} />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#555" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errTxt}>{errors.password.message}</Text>}
            </View>
          )} />

          {/* Confirmar Senha */}
          <Controller control={control} name="confirmPassword" render={({ field: { onChange, value } }) => (
            <View style={styles.fieldGroup}>
              <View style={[styles.inputBox, errors.confirmPassword && styles.inputBoxError]}>
                <TextInput style={styles.input} placeholder="Confirmar Senha" placeholderTextColor="#555" secureTextEntry={!isPasswordVisible} onChangeText={onChange} value={value} />
              </View>
              {errors.confirmPassword && <Text style={styles.errTxt}>{errors.confirmPassword.message}</Text>}
            </View>
          )} />

          <TouchableOpacity 
            style={[styles.mainBtn, isSubmitting && { opacity: 0.7 }]} 
            onPress={handleSubmit(onSubmit)} 
            disabled={isSubmitting}
          >
            {isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.mainBtnText}>CRIAR MEU PERFIL</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContent: { paddingHorizontal: 25, paddingTop: 50, paddingBottom: 40 },
  backBtn: { marginBottom: 20 },
  title: { fontSize: 36, fontWeight: '900', color: '#FFF', fontStyle: 'italic', textAlign: 'center', marginBottom: 10 },
  textNeon: { color: '#39FF14' },
  welcomeText: { color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  form: { gap: 12 },
  fieldGroup: { marginBottom: 5 },
  inputBox: { backgroundColor: '#1A1A1A', borderRadius: 12, borderWidth: 1, borderColor: '#333', height: 58, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' },
  inputBoxError: { borderColor: '#FF3333' },
  input: { flex: 1, color: '#FFF', fontSize: 16 },
  errTxt: { color: '#FF3333', fontSize: 11, marginTop: 4, marginLeft: 5 },
  mainBtn: { backgroundColor: '#39FF14', paddingVertical: 20, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  mainBtnText: { color: '#000', fontSize: 16, fontWeight: '900' },
  successContainer: { flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' },
  successTitle: { color: '#FFF', fontSize: 28, fontWeight: '900', marginTop: 20 },
  successSubtitle: { color: '#39FF14', fontSize: 16, marginTop: 5 },
});