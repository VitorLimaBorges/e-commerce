import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  street: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido (formato: 00000-000)'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Número do cartão inválido (16 dígitos)'),
  cardName: z.string().min(3, 'Nome no cartão é obrigatório'),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Data inválida (formato: MM/AA)'),
  cardCVV: z.string().regex(/^\d{3,4}$/, 'CVV inválido (3 ou 4 dígitos)'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
