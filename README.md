# FutPlan – Arões Sport Clube

App de gestão de jogos e treinos. Mapa mensal de jogos por escalão + microciclo semanal de treinos.

## Publicar no GitHub Pages

### 1. Criar o repositório
- Vai a https://github.com/new
- Nome: `futplan`
- Visibilidade: Public (necessário para GitHub Pages gratuito)
- Clica em "Create repository"

### 2. Fazer upload dos ficheiros
```
futplan/
├── index.html
├── manifest.json
├── sw.js
├── README.md
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

### 3. Ativar GitHub Pages
- Settings → Pages → Source: **Deploy from a branch**
- Branch: `main` / `(root)`
- Clica em Save

A app fica disponível em: `https://josecdfonseca-prog.github.io/futplan/`

### 4. Configurar Supabase (IMPORTANTE)
Vai a https://supabase.com/dashboard/project/ektzjdhqbgcbrvmhcqqj
→ Authentication → URL Configuration
- **Site URL**: `https://josecdfonseca-prog.github.io/futplan/`
- **Redirect URLs**: adiciona `https://josecdfonseca-prog.github.io/futplan/`

### 5. Criar utilizador admin
Supabase Dashboard → Authentication → Users → Add user → Create new user
- Email: jose.c.fonseca@outlook.com
- Password: (escolhe uma)

## Instalar no telemóvel (PWA)
- **Android/Chrome**: Menu → "Adicionar ao ecrã principal"
- **iOS/Safari**: Partilhar → "Adicionar ao ecrã de início"
