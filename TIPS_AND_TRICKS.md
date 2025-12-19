# 💡 Dicas e Truques - E-Commerce Frontend

## 🎯 Customizações Rápidas

### Mudar Cores da Marca
Editar em `tailwind.config.ts`:
```typescript
theme: {
  colors: {
    primary: '#667eea',  // Alterar azul
    secondary: '#764ba2', // Alterar roxo
  }
}
```

### Adicionar Novo Produto ao Mock
Editar `src/mocks/products.ts`:
```typescript
const mockProducts: Product[] = [
  // Copiar estrutura de um produto existente
  {
    id: 11,
    title: 'Novo Produto',
    price: 99.99,
    description: 'Descrição...',
    category: 'electronics',
    image: 'https://...',
    rating: { rate: 4.5, count: 100 },
  },
  // ...resto dos produtos
];
```

### Conectar API Real
1. Criar `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=https://sua-api.com/api
```

2. Atualizar `src/services/productService.ts`:
```typescript
private baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com/products';
```

### Adicionar Nova Página
1. Criar arquivo em `src/app/novaagina/page.tsx`
2. Adicionar rota ao Header
3. Pronto! (routing automático)

---

## 🚀 Performance Tips

### 1. Otimizar Imagens
```typescript
// Ruim ❌
<img src={url} />

// Bom ✅
<Image
  src={url}
  alt="descrição"
  width={300}
  height={200}
  priority={false}
  loading="lazy"
/>
```

### 2. Usar Server Components
```typescript
// Padrão: Server Component (mais rápido)
export default function Home() {
  return <div>...</div>
}

// Apenas quando necessário
'use client'
export default function ClientComp() {
  const [state, setState] = useState()
  return <div>...</div>
}
```

### 3. React Query Caching
```typescript
// Cache de 5 minutos automático
const { data } = useProducts();

// Customizar cache
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 1000 * 60 * 10, // 10 min
});
```

---

## 🔐 Segurança

### ✅ Fazer
- Usar `.env.local` para secrets
- Validar inputs em formulários
- Sanitizar HTML (React faz auto)
- HTTPS em produção (Vercel automático)
- Respeitar CORS

### ❌ Não Fazer
- Commitar `.env.local` ou secrets
- Usar `dangerouslySetInnerHTML`
- Confiança total em dados do cliente
- Deixar console.logs em produção
- Hardcodes de API keys

---

## 🧪 Testando Componentes

### Testar ProductCard
1. Abrir Dev Tools (F12)
2. Network → desabilitar cache
3. Performance → registrar
4. Navegar pelas páginas
5. Checar bundle size

### Testar Carrinho
1. Adicionar itens ao carrinho
2. Verificar localStorage (DevTools > Application)
3. Atualizar página - itens devem persistir
4. Limpar carrinho - localStorage limpo

### Testar Filtros
1. Ir para /products
2. Filtrar por categoria
3. Verificar URL (?category=...)
4. Ordenar por preço
5. Verificar ordem correta

---

## 📱 Teste Responsivo

### Breakpoints do Tailwind
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

### Testar em Dev Tools
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Selecionar diferentes dispositivos
3. Verificar que layout adapta corretamente
4. Testar touch interactions

---

## 🎨 Design System

### Cores
- **Primary**: `#667eea` (Blue)
- **Secondary**: `#764ba2` (Purple)
- **Success**: `#28a745` (Green)
- **Error**: `#dc3545` (Red)
- **Gray**: `#6c757d` (Gray)

### Espaçamento
- `p-4` = 16px padding
- `m-2` = 8px margin
- `gap-4` = 16px gap

### Tipografia
- `text-xs` = 12px
- `text-sm` = 14px
- `text-base` = 16px
- `text-lg` = 18px
- `text-xl` = 20px
- `text-2xl` = 24px

---

## 🐛 Debugging

### Console Logs Úteis
```typescript
// Ver objeto completo
console.log({ products, cart, filters });

// Ver estrutura
console.table(products);

// Medir performance
console.time('fetch');
await fetchProducts();
console.timeEnd('fetch');
```

### React DevTools
1. Instalar: [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
2. F12 → Components tab
3. Inspecionar componentes
4. Ver props e state

### Next.js Debug
```bash
# Modo debug
NODE_OPTIONS='--inspect' npm run dev

# Ou no VS Code (launch.json fornecido)
F5 → Debug
```

---

## 📊 Monitorar Performance

### Lighthouse
1. F12 → Lighthouse
2. Gerar relatório
3. Checklist:
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90

### Web Vitals
```typescript
// src/utils/webVitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric) {
  console.log(metric);
}
```

---

## 🚢 Deploy

### Vercel (1-Click)
1. Push para GitHub
2. Conectar repo em [vercel.com](https://vercel.com)
3. Auto-deploy a cada push
4. Custom domain: Project Settings

### Variáveis de Ambiente
1. Project Settings → Environment Variables
2. Adicionar `NEXT_PUBLIC_API_URL=...`
3. Redeploy

### Monitorar
1. Analytics no Vercel dashboard
2. Performance insights
3. Edge function logs

---

## 📚 Recursos Úteis

### Documentação
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Inspiração
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)

### Comunidades
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://discord.gg/react)
- [TypeScript Community](https://discord.gg/typescript)

---

## 🎓 Próximos Aprendizados

### Avançado
1. **Advanced TypeScript**
   - Generic constraints
   - Conditional types
   - Mapped types

2. **Performance Optimization**
   - Bundle analysis
   - Code splitting strategies
   - Server-side rendering

3. **Testing**
   - Unit tests (Vitest)
   - Integration tests
   - E2E tests (Cypress)

4. **Backend Integration**
   - API Routes
   - Middleware
   - Authentication (NextAuth.js)

5. **DevOps**
   - Docker
   - GitHub Actions
   - Monitoring

---

## ⚡ Checklist Antes de Produção

- [ ] Build sem erros: `npm run build`
- [ ] ESLint sem warnings: `npm run lint`
- [ ] TypeScript sem errors
- [ ] Lighthouse 90+ em todas métricas
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Testar em 2-3 navegadores
- [ ] Testar fluxo completo (home → produto → carrinho → checkout)
- [ ] Performance DevTools < 3s para home
- [ ] SEO: todas páginas com metadata
- [ ] Acessibilidade: Tab navigation funciona
- [ ] .env variáveis configuradas
- [ ] Domínios de imagem adicionados
- [ ] Cookie/Privacy policy (opcional mas recomendado)
- [ ] 404 page customizada (temos default)
- [ ] Loading state em todas rotas

---

## 🤝 Contribuindo

### Se trabalhar em equipe:
1. Criar branch: `git checkout -b feature/meu-feature`
2. Commit: `git commit -m "feat: descrição"`
3. Push: `git push origin feature/meu-feature`
4. PR: Criar pull request no GitHub
5. Review: Esperar aprovação
6. Merge: Fazer merge para main

### Padrão de Commits
```
feat:    Nova funcionalidade
fix:     Corrigir bug
docs:    Documentação
style:   Formatação
refactor: Reorganizar código
test:    Adicionar testes
chore:   Tarefas (deps, config)
```

---

**Dúvidas? Consulte DEVELOPMENT.md ou veja a documentação em comentários no código!** 🚀
