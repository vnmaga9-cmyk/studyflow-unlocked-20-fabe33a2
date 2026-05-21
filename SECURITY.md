# 🔐 Política de Segurança

## Boas Práticas de Segurança

### 1. **Nunca commite dados sensíveis**
- ❌ Senhas, tokens, chaves de API
- ❌ Credenciais de banco de dados
- ❌ URLs internas sensíveis
- ✅ Use `.env.local` (ignorado pelo git)
- ✅ Use `GitHub Secrets` para CI/CD

### 2. **Arquivos ignorados automaticamente**
Este repositório usa `.gitignore` para proteger:
```
*.local          # Arquivos de ambiente locais
.dev.vars        # Variáveis Cloudflare
node_modules     # Dependências
dist/            # Build output
```

### 3. **GitHub Secrets (para Actions/CI-CD)**
Se tiver GitHub Actions configurado, adicione secrets em:
**Settings → Secrets and variables → Actions**

Exemplo de uso em workflows:
```yaml
- name: Deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    API_KEY: ${{ secrets.API_KEY }}
  run: npm run deploy
```

### 4. **Cloudflare Workers Secrets**
Para produção, use variáveis do Cloudflare:
```bash
wrangler secret put DATABASE_URL
wrangler secret put API_KEY
```

### 5. **Se já expostas credenciais**
1. Regenere IMEDIATAMENTE todas as chaves/tokens
2. Use `git filter-branch` ou `BFG Repo-Cleaner` para remover do histórico
3. Notifique administradores se credenciais de sistema foram expostas

## Dependências com Vulnerabilidades
Execute regularmente:
```bash
npm audit
npm audit fix
```

Ou ative **Dependabot alerts** em:
**Settings → Code security and analysis**

## Reportar Vulnerabilidades
Se encontrar uma vulnerabilidade:
1. NÃO crie uma issue pública
2. Use **Security → Report a vulnerability** 
3. Ou envie email para o mantenedor

---

**Última atualização:** 2026-05-21
