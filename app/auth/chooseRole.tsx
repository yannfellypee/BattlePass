import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ==========================================
// 1. ZOD: O Cérebro da Validação Dinâmica
// ==========================================

// 1. Criamos a lista e "congelamos" ela com as const para o TypeScript
const ROLES = ['audiencia', 'mc', 'poeta', 'organizador', 'jurado'] as const;

// 2. O Zod agora reconhece como um Enum perfeito usando a propriedade "message"
const roleSchema = z.object({
  role: z.enum(ROLES, {
    message: "Escolha qual é a sua vivência na cena."
  }),
  artisticName: z.string().optional(),
  collectiveName: z.string().optional(),
}).superRefine((data, ctx) => {
  // Se for MC ou Poeta, exigir o Nome Artístico (Vulgo)
  if ((data.role === 'mc' || data.role === 'poeta') && (!data.artisticName || data.artisticName.length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "O seu Vulgo/Nome Artístico é obrigatório.",
      path: ['artisticName'],
    });
  }
  // Se for Organizador, exigir o nome do movimento/batalha
  if (data.role === 'organizador' && (!data.collectiveName || data.collectiveName.length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "O nome da sua Batalha/Slam é obrigatório.",
      path: ['collectiveName'],
    });
  }
});

type RoleData = z.infer<typeof roleSchema>;

// Lista dos 5 Perfis com Ícones e Descrições
const ROLES_LIST = [
  { id: 'audiencia', title: 'Audiência', desc: 'Apoio a cena e coleciono carimbos.', icon: 'people' },
  { id: 'mc', title: 'MC', desc: 'Rima, flow e punchline. Atleta das batalhas.', icon: 'mic' },
  { id: 'poeta', title: 'Poeta', desc: 'Poesia marginal e recitação nos Slams.', icon: 'book' },
  { id: 'organizador', title: 'Organizador', desc: 'Levanto o evento e faço a roda girar.', icon: 'megaphone' },
  { id: 'jurado', title: 'Jurado', desc: 'Visão técnica e ouvidos atentos.', icon: 'eye' },
];

export default function ChooseRoleScreen() {
  const router = useRouter();

  // ==========================================
  // 2. MOTOR DO FORMULÁRIO
  // ==========================================
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<RoleData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { 
      role: undefined, 
      artisticName: '', 
      collectiveName: '' 
    }
  });

  const selectedRole = watch('role');

  const onSubmit = (data: RoleData) => {
    console.log("Perfil escolhido para o StreetPass:", data);
    // Aqui nós enviaríamos para o Supabase (Update na tabela users)
    // Após salvar, joga para o Feed unificado:
    router.replace('/(tabs)/feed');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>QUEM ÉS TU NA <Text style={styles.textNeon}>CENA?</Text></Text>
          <Text style={styles.subtitle}>Escolha o seu caminho para liberar os seus privilégios no aplicativo.</Text>
        </View>

        {/* ========================================== */}
        {/* LISTA DE PERFIS (OS 5 CAMINHOS) */}
        {/* ========================================== */}
        <View style={styles.rolesContainer}>
          {ROLES_LIST.map((item) => {
            const isActive = selectedRole === item.id;
            return (
              <TouchableOpacity 
                key={item.id}
                style={[styles.roleCard, isActive && styles.roleCardActive]} 
                onPress={() => setValue('role', item.id as any, { shouldValidate: true })}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                  <Ionicons name={item.icon as any} size={24} color={isActive ? '#000' : '#888'} />
                </View>
                <View style={styles.roleTextContent}>
                  <Text style={[styles.roleTitle, isActive && styles.textBlack]}>{item.title}</Text>
                  <Text style={[styles.roleDesc, isActive && styles.textBlack]}>{item.desc}</Text>
                </View>
                {isActive && <Ionicons name="checkmark-circle" size={24} color="#000" />}
              </TouchableOpacity>
            )
          })}
        </View>

        {errors.role && <Text style={styles.errorTextMain}>{errors.role.message}</Text>}

        {/* ========================================== */}
        {/* INPUTS DINÂMICOS (Mágica acontecendo) */}
        {/* ========================================== */}
        
        {/* Se for MC ou Poeta, pede o Vulgo */}
        {(selectedRole === 'mc' || selectedRole === 'poeta') && (
          <View style={styles.dynamicInputArea}>
            <Text style={styles.sectionTitle}>COMO A RUA TE CONHECE?</Text>
            <Controller
              control={control}
              name="artisticName"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputWrapper, errors.artisticName && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color={errors.artisticName ? "#FF3333" : "#39FF14"} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Seu Vulgo (Ex: MC Kaos)" 
                    placeholderTextColor="#666"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.artisticName && <Text style={styles.errorText}>{errors.artisticName.message}</Text>}
          </View>
        )}

        {/* Se for Organizador, pede o nome do Evento/Coletivo */}
        {selectedRole === 'organizador' && (
          <View style={styles.dynamicInputArea}>
            <Text style={styles.sectionTitle}>QUAL A SUA BANDEIRA?</Text>
            <Controller
              control={control}
              name="collectiveName"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputWrapper, errors.collectiveName && styles.inputError]}>
                  <Ionicons name="megaphone-outline" size={20} color={errors.collectiveName ? "#FF3333" : "#39FF14"} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Nome da Batalha/Slam" 
                    placeholderTextColor="#666"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.collectiveName && <Text style={styles.errorText}>{errors.collectiveName.message}</Text>}
          </View>
        )}

        {/* Botão de Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>ENTRAR NA RODA</Text>
          <Ionicons name="arrow-forward" size={20} color="#000" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 60 },
  
  header: { marginBottom: 30 },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },
  subtitle: { color: '#888', fontSize: 14, marginTop: 10, lineHeight: 20 },

  // Lista de Perfis
  rolesContainer: { marginBottom: 20 },
  roleCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1A1A1A', 
    padding: 15, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#222', 
    marginBottom: 12 
  },
  roleCardActive: { 
    backgroundColor: '#39FF14', 
    borderColor: '#39FF14',
    transform: [{ scale: 1.02 }]
  },
  
  iconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconContainerActive: { backgroundColor: 'transparent' },
  
  roleTextContent: { flex: 1 },
  roleTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  roleDesc: { color: '#888', fontSize: 12 },
  textBlack: { color: '#000' },

  // Inputs Dinâmicos
  dynamicInputArea: { marginTop: 10, marginBottom: 20, padding: 20, backgroundColor: '#111', borderRadius: 16, borderWidth: 1, borderColor: '#222' },
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15 },
  
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, borderWidth: 1, borderColor: '#333', height: 60 },
  inputIcon: { paddingHorizontal: 15 },
  input: { flex: 1, color: '#FFF', fontSize: 16, height: '100%' },
  inputError: { borderColor: '#FF3333', borderWidth: 1 },
  
  errorTextMain: { color: '#FF3333', fontSize: 14, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  errorText: { color: '#FF3333', fontSize: 12, marginTop: 8, marginLeft: 5 },

  // Botão Principal
  submitButton: { flexDirection: 'row', backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: '#39FF14', shadowOpacity: 0.3, shadowRadius: 10 },
  submitButtonText: { color: '#000', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
});