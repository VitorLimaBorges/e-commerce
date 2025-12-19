# Configuração para VS Code e Desenvolvimento

## Extensões Recomendadas

Instale no VS Code para melhor experiência:

1. **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
2. **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
3. **TypeScript Vue Plugin** - Vue.vscode-typescript-vue-plugin
4. **ESLint** - dbaeumer.vscode-eslint
5. **Prettier - Code formatter** - esbenp.prettier-vscode
6. **REST Client** - humao.rest-client (para testar APIs)
7. **Thunder Client** - rangav.vscode-thunder-client (alternativa ao Postman)

## Settings.json Recomendado

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript-react]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`|\\()([^']*)(?:'|\"|`|\\))"]
  ],
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload

# Build e Deploy
npm run build            # Build otimizado
npm start                # Roda build em produção

# Linting
npm run lint             # Verifica ESLint

# Database (futuro)
npx prisma studio       # Admin Prisma
npx prisma migrate dev  # Executar migrations

# Docker (opcional)
docker build -t ecommerce .
docker run -p 3000:3000 ecommerce
```

## Estrutura de Branches Git

```
main                    # Produção
├── develop             # Staging
│   ├── feature/auth
│   ├── feature/payments
│   └── bugfix/checkout
```

## Padrão de Commits

```
feat: Add product filtering
fix: Cart quantity calculation
docs: Update README
style: Format code
refactor: Simplify ProductCard
test: Add useCart tests
chore: Update dependencies
```

## Debugger VS Code

### Arquivo `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "runtimeArgs": ["dev"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
      "sourceMapPathOverride": {
        "webpack://_N_E/*": "${webRoot}/.next/*"
      }
    }
  ]
}
```

## Troubleshooting

### Servidor não inicia

```bash
# Limpar cache
rm -rf .next
npm run dev
```

### Módulos não encontrados

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 já em uso

```bash
# Usar outra porta
npm run dev -- -p 3001
```

### Erro de TypeScript

```bash
# Forçar recompilação
npm run build -- --no-cache
```

## Performance Tips

1. **Usar Server Components** por padrão
2. **Image Optimization** - sempre usar next/image
3. **Code Splitting** - importar dinamicamente quando necessário
4. **React Query** - caching inteligente
5. **Tailwind PurgeCSS** - remove CSS não usado

## Segurança

- ✅ Nunca commitar `.env.local`
- ✅ Usar `NEXT_PUBLIC_` apenas para variáveis públicas
- ✅ Validar inputs no backend quando pronto
- ✅ Usar HTTPS em produção
- ✅ CORS headers configurado

## Deploy Checklist

- [ ] Build passa sem erros: `npm run build`
- [ ] ESLint sem warnings: `npm run lint`
- [ ] Variáveis de ambiente configuradas
- [ ] Domínios de imagem adicionados
- [ ] Database migrations (quando backend ready)
- [ ] Environment variables na Vercel
- [ ] Custom domain (opcional)
- [ ] SSL certificate (automático Vercel)

---

**Happy Coding! 🚀**
