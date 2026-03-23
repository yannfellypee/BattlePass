import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. ZOD: O Cão de Guarda (Esquema de Validação)
const registerSchema = z.object({
  role: z.enum(['Public', 'MC', 'Organizer']),
  name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres'),
  email: z.string().email('Introduza um e-mail válido'),
  password: z.string().min(6, 'A palavra-passe deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As palavras-passe não coincidem',
  path: ['confirmPassword'], // O erro vai aparecer especificamente no campo de confirmar senha
});

// Tipo inferido automaticamente pelo Zod
type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  
  // 2. REACT HOOK FORM: O Motor do Formulário
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'Public',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  // Fica observando qual o perfil selecionado para mudar a cor dos botões e o texto do placeholder
  const selectedRole = watch('role');

  // 3. FUNÇÃO DE ENVIO: Só é chamada se passar em TODAS as validações do Zod
  const onSubmit = (data: RegisterData) => {
    console.log("Dados validados prontos para o banco:", data);
    // Aqui os dados (data.email, data.password, data.role) serão enviados para o Supabase
    router.replace('/(tabs)/feed');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>CRIAR <Text style={styles.textNeon}>CONTA</Text></Text>
        </View>

        <Text style={styles.sectionTitle}>QUEM ÉS TU NA CENA?</Text>
        
        {/* Seleção de Perfil conectada ao React Hook Form via setValue */}
        <View style={styles.rolesContainer}>
          <TouchableOpacity 
            style={[styles.roleCard, selectedRole === 'Public' && styles.roleCardActive]} 
            onPress={() => setValue('role', 'Public')}
          >
            <Ionicons name="people" size={28} color={selectedRole === 'Public' ? '#000' : '#888'} />
            <Text style={[styles.roleTitle, selectedRole === 'Public' && styles.textBlack]}>Público</Text>
            <Text style={[styles.roleDesc, selectedRole === 'Public' && styles.textBlack]}>Apoio e coleciono carimbos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleCard, selectedRole === 'MC' && styles.roleCardActive]} 
            onPress={() => setValue('role', 'MC')}
          >
            <Ionicons name="mic" size={28} color={selectedRole === 'MC' ? '#000' : '#888'} />
            <Text style={[styles.roleTitle, selectedRole === 'MC' && styles.textBlack]}>MC</Text>
            <Text style={[styles.roleDesc, selectedRole === 'MC' && styles.textBlack]}>Batalho e conquisto títulos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleCard, selectedRole === 'Organizer' && styles.roleCardActive]} 
            onPress={() => setValue('role', 'Organizer')}
          >
            <Ionicons name="megaphone" size={28} color={selectedRole === 'Organizer' ? '#000' : '#888'} />
            <Text style={[styles.roleTitle, selectedRole === 'Organizer' && styles.textBlack]}>Organizador</Text>
            <Text style={[styles.roleDesc, selectedRole === 'Organizer' && styles.textBlack]}>Crio e giro os eventos</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>OS TEUS DADOS</Text>

        {/* Campo: NOME */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                <Ionicons name="person-outline" size={20} color={errors.name ? "#FF3333" : "#888"} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder={selectedRole === 'MC' ? "Nome Artístico (Ex: MC Kaos)" : "Nome Completo"} 
                  placeholderTextColor="#666"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>
          )}
        />

        {/* Campo: E-MAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={20} color={errors.email ? "#FF3333" : "#888"} style={styles.inputIcon} />
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
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color={errors.password ? "#FF3333" : "#888"} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Criar Palavra-passe" 
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

        {/* Campo: CONFIRMAR SENHA */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                <Ionicons name="checkmark-circle-outline" size={20} color={errors.confirmPassword ? "#FF3333" : "#888"} style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Confirmar Palavra-passe" 
                  placeholderTextColor="#666"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </View>
          )}
        />

        {/* Botão de Submit */}
        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.registerButtonText}>FINALIZAR REGISTO</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 50 },
  
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  backButton: { marginRight: 15 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },

  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15, marginTop: 10 },

  // Cartões de Perfil
  rolesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  roleCard: { width: '31%', backgroundColor: '#1A1A1A', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  roleCardActive: { backgroundColor: '#39FF14', borderColor: '#39FF14' },
  roleTitle: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  roleDesc: { color: '#666', fontSize: 9, textAlign: 'center', marginTop: 4 },
  textBlack: { color: '#000' },

  // Inputs
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, borderWidth: 1, borderColor: '#333', height: 60, marginBottom: 10 },
  inputIcon: { paddingHorizontal: 15 },
  input: { flex: 1, color: '#FFF', fontSize: 16, height: '100%' },
  
  // Estilos de Erro
  inputError: { borderColor: '#FF3333', borderWidth: 1 },
  errorText: { color: '#FF3333', fontSize: 12, marginBottom: 15, marginLeft: 5, marginTop: -5 },

  registerButton: { backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#39FF14', shadowOpacity: 0.3, shadowRadius: 10 },
  registerButtonText: { color: '#000', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
});