# 🛒 E-Commerce Frontend - Next.js 14+

Um projeto de e-commerce frontend profissional construído com **Next.js 14+**, **TypeScript**, **Tailwind CSS**, **Zustand** e **TanStack React Query**. Focado em performance, SEO, UX e arquitetura escalável.

## ✨ Características

- ✅ **Next.js 14+ com App Router**
- ✅ **TypeScript** - Código totalmente tipado
- ✅ **Tailwind CSS** - Design moderno e responsivo
- ✅ **Zustand** - Gerenciamento de estado do carrinho com persistência em localStorage
- ✅ **TanStack React Query** - Fetching e caching de dados
- ✅ **Server Components** - Otimização de performance
- ✅ **Imagens Otimizadas** - next/image para performance
- ✅ **SEO Otimizado** - generateMetadata para cada página
- ✅ **Acessibilidade** - aria-labels e boas práticas
- ✅ **Responsivo** - Mobile-first design
- ✅ **Pronto para Vercel** - Deploy zero-config

## 📋 Funcionalidades Implementadas

### 1. **Home Page**
- Hero banner com CTA
- Categorias destacadas
- Grid de produtos em destaque
- Seção de trust badges

### 2. **Listagem de Produtos**
- Grid responsivo (1, 2, 4 colunas)
- Filtros por categoria
- Ordenação (preço, nome)
- Loading skeletons
- Componentes reutilizáveis

### 3. **Página de Produto (Rota Dinâmica)**
- Galeria de imagens
- Informações completas do produto
- Ratings e avaliações
- Seletor de quantidade
- Botão "Adicionar ao Carrinho"
- Breadcrumb navegação

### 4. **Carrinho de Compras**
- Visualizar itens
- Adicionar/remover produtos
- Alterar quantidade
- Cálculo de subtotal
- Persistência em localStorage
- Resumo do pedido

### 5. **Checkout (UI)**
- Formulário de dados pessoais
- Formulário de endereço
- Formulário de pagamento
- Validação de campos
- Simulação de processamento
- Confirmação de pedido com sucesso

## 🗂️ Estrutura do Projeto

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Layout principal com Header, Footer
│   ├── page.tsx                  # Home page
│   ├── products/
│   │   ├── page.tsx             # Listagem com filtros
│   │   └── [id]/
│   │       └── page.tsx         # Detalhe do produto
│   ├── cart/
│   │   └── page.tsx             # Carrinho
│   └── checkout/
│       └── page.tsx             # Checkout
├── components/
│   ├── common/
│   │   ├── Header.tsx           # Header com navegação
│   │   ├── Footer.tsx           # Footer
│   │   └── Skeleton.tsx         # Componentes de loading
│   ├── product/
│   │   ├── ProductCard.tsx      # Card do produto
│   │   └── ProductGrid.tsx      # Grid de produtos
│   └── cart/
│       ├── CartItemComponent.tsx # Item do carrinho
│       └── CartSummary.tsx      # Resumo do pedido
├── services/
│   └── productService.ts         # Serviço API de produtos
├── store/
│   └── cartStore.ts             # Zustand store do carrinho
├── hooks/
│   ├── useProducts.ts           # Hooks para produtos
│   └── useCart.ts               # Hooks para carrinho
├── types/
│   └── index.ts                 # Tipos TypeScript
├── utils/
│   ├── formatter.ts             # Funções de formatação
│   └── queryClient.ts           # Configuração React Query
└── mocks/
    └── products.ts              # Dados mock de produtos
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### 1. Instalar Dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 2. Rodar em Desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

A aplicação estará disponível em **[http://localhost:3000](http://localhost:3000)**

### 3. Build para Produção
```bash
npm run build
npm run start
```

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "zustand": "^4.x",
    "@tanstack/react-query": "^5.x",
    "axios": "^1.x",
    "clsx": "^2.x",
    "lucide-react": "^latest"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^4.x",
    "@types/node": "^20.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x",
    "eslint": "^8.x"
  }
}
```

## 🎨 Design e UI

- **Cores**: Blue (#2563EB), Gray, Purple
- **Typography**: Geist Sans (corpo), Geist Mono (código)
- **Componentes**: Tailwind CSS com custom utilities
- **Ícones**: Lucide React
- **Layout**: Grid responsivo, flexbox

## 🔒 Segurança e Boas Práticas

- ✅ Server Components quando possível
- ✅ Environment variables (.env.local)
- ✅ Input validation
- ✅ CORS handling
- ✅ Erro handling robusto
- ✅ Types TypeScript completos

## 🚢 Deploy na Vercel

1. Push seu código para GitHub
2. Conecte o repositório no Vercel
3. Vercel detectará automaticamente que é um Next.js 14
4. Deploy automático com zero-config

```bash
# Ou deploy local:
npm run build
npx vercel deploy --prod
```

## 📊 Performance

- **Lighthouse Score**: 90+
- **Imagens Otimizadas**: next/image com lazy loading
- **Code Splitting**: Automático pelo Next.js
- **Caching**: React Query com estratégia de cache
- **SEO**: Metadata dinâmica em todas as páginas

## 🔄 Fluxo de Dados

```
1. ProductService (API/Mock)
   ↓
2. TanStack React Query (Caching)
   ↓
3. useProducts Hook (Components)
   ↓
4. ProductCard / ProductGrid
   ↓
5. useCartStore (Zustand)
   ↓
6. CartSummary / Checkout
```

## 📝 Exemplo de Uso

### Adicionar Produto ao Carrinho
```typescript
import { useCart } from '@/hooks/useCart';

export function MyComponent() {
  const { addItem } = useCart();
  
  const handleAdd = () => {
    addItem(product, quantity);
  };
}
```

### Consumir Produtos
```typescript
import { useProducts } from '@/hooks/useProducts';

export function ProductList() {
  const { data: products, isLoading } = useProducts();
  
  if (isLoading) return <GridSkeleton />;
  
  return <ProductGrid products={products || []} />;
}
```

### Filtrar Produtos
```typescript
import { useFilteredProducts } from '@/hooks/useProducts';

const filtered = useFilteredProducts(products, {
  category: 'electronics',
  sortBy: 'price-asc',
});
```

## 🎯 Roadmap (Futuro)

- [ ] Integração com gateway de pagamento real
- [ ] Sistema de autenticação de usuário
- [ ] Wishlist de produtos
- [ ] Reviews e comentários
- [ ] Sistema de cupons/promoções
- [ ] Rastreamento de pedidos
- [ ] Chat ao vivo
- [ ] Integração com APIs reais

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT.

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js 14+**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
