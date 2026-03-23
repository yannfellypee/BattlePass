import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// --- 1. ESQUEMA DE VALIDAÇÃO (ZOD) ---
const registerSchema = z.object({
  role: z.enum(['Public', 'MC', 'Organizer']),
  name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres'),
  fullName: z.string().optional(), 
  document: z.string().min(11, 'Documento inválido (mínimo 11 dígitos)'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})
.refine((data) => {
  if (data.role === 'MC') {
    return !!data.fullName && data.fullName.trim().length >= 5;
  }
  return true;
}, {
  message: 'Nome completo é obrigatório para MC',
  path: ['fullName'],
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'Public',
      name: '',
      fullName: '',
      email: '',
      document: '',
      password: '',
      confirmPassword: '',
    }
  });

  const selectedRole = watch('role');

  // --- 2. LÓGICA DE ENVIO ---
  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);

    // Limpeza do documento (remove pontos, traços, etc)
    const rawDocument = data.document.replace(/\D/g, '');

    // Preparação dos dados para o banco
    const dadosParaOBanco = {
      nome_usuario: data.name,
      nome_completo: data.role === 'MC' ? data.fullName : data.name,
      email: data.email,
      password: data.password,
      role: data.role.toLowerCase(),
      documento_numero: rawDocument, // Aqui está o número puro
      tipo_documento: rawDocument.length > 11 ? 'CNPJ' : 'CPF' // Identificação do tipo
    };

    // Log detalhado conforme solicitado
    console.log("-----------------------------------------");
    console.log("DADOS VALIDADOS PRONTOS PARA O BANCO:");
    console.log(JSON.stringify(dadosParaOBanco, null, 2));
    console.log("-----------------------------------------");

    // Fluxo Visual: 5 segundos de Spinner -> Mensagem de Sucesso -> Redirecionamento
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        router.replace('/auth/login');
      }, 2000);
    }, 5000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>CRIAR <Text style={styles.textNeon}>CONTA</Text></Text>
        </View>

        {isSubmitting || showSuccess ? (
          <View style={styles.feedbackContainer}>
            {isSubmitting ? (
              <>
                <ActivityIndicator size="large" color="#39FF14" />
                <Text style={styles.feedbackText}>Processando teu registro na cena...</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={80} color="#39FF14" />
                <Text style={styles.successTitle}>Conta criada com Sucesso!</Text>
                <Text style={styles.feedbackText}>Redirecionando para o login...</Text>
              </>
            )}
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>QUEM ÉS TU NA CENA?</Text>
            <View style={styles.rolesContainer}>
              {['Public', 'MC', 'Organizer'].map((role) => (
                <TouchableOpacity 
                  key={role}
                  style={[styles.roleCard, selectedRole === role && styles.roleCardActive]} 
                  onPress={() => setValue('role', role as any)}
                >
                  <Ionicons 
                    name={role === 'Public' ? 'people' : role === 'MC' ? 'mic' : 'megaphone'} 
                    size={24} 
                    color={selectedRole === role ? '#000' : '#888'} 
                  />
                  <Text style={[styles.roleTitle, selectedRole === role && styles.textBlack]}>
                    {role === 'Public' ? 'Público' : role === 'MC' ? 'MC' : 'Org'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>OS TEUS DADOS</Text>

            {selectedRole === 'MC' && (
              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
                      <TextInput 
                        style={styles.input} 
                        placeholder="Nome Completo (Identidade)" 
                        placeholderTextColor="#666" 
                        onChangeText={onChange} 
                        value={value} 
                      />
                    </View>
                  )}
                />
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
              </View>
            )}

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                    <TextInput 
                      style={styles.input} 
                      placeholder={selectedRole === 'MC' ? "Nome Artístico (Vulgo)" : "Nome de Usuário"} 
                      placeholderTextColor="#666" 
                      onChangeText={onChange} 
                      value={value} 
                    />
                  </View>
                )}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="document"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputWrapper, errors.document && styles.inputError]}>
                    <TextInput 
                      style={styles.input} 
                      placeholder={selectedRole === 'Organizer' ? "CPF ou CNPJ" : "CPF"} 
                      placeholderTextColor="#666" 
                      keyboardType="numeric" 
                      onChangeText={onChange} 
                      value={value} 
                    />
                  </View>
                )}
              />
              {errors.document && <Text style={styles.errorText}>{errors.document.message}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="E-mail" 
                      placeholderTextColor="#666" 
                      keyboardType="email-address" 
                      autoCapitalize="none" 
                      onChangeText={onChange} 
                      value={value} 
                    />
                  </View>
                )}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Senha" 
                      placeholderTextColor="#666" 
                      secureTextEntry 
                      onChangeText={onChange} 
                      value={value} 
                    />
                  </View>
                )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Confirmar Senha" 
                      placeholderTextColor="#666" 
                      secureTextEntry 
                      onChangeText={onChange} 
                      value={value} 
                    />
                  </View>
                )}
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.registerButtonText}>FINALIZAR REGISTO</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, gap: 15 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  textNeon: { color: '#39FF14' },
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15, marginTop: 10 },
  rolesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  roleCard: { width: '31%', backgroundColor: '#1A1A1A', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  roleCardActive: { backgroundColor: '#39FF14', borderColor: '#39FF14' },
  roleTitle: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginTop: 10 },
  textBlack: { color: '#000' },
  inputGroup: { marginBottom: 15 },
  inputWrapper: { backgroundColor: '#1A1A1A', borderRadius: 12, borderWidth: 1, borderColor: '#333', height: 60, paddingHorizontal: 15, justifyContent: 'center' },
  input: { color: '#FFF', fontSize: 16 },
  inputError: { borderColor: '#FF3333' },
  errorText: { color: '#FF3333', fontSize: 12, marginTop: 5, marginLeft: 5 },
  registerButton: { backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  registerButtonText: { color: '#000', fontSize: 16, fontWeight: '900' },
  feedbackContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 120 },
  feedbackText: { color: '#888', marginTop: 20, fontSize: 16, textAlign: 'center' },
  successTitle: { color: '#39FF14', fontSize: 24, fontWeight: 'bold', marginTop: 20 },
});