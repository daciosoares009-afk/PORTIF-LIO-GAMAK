# GAMAK — Soluções em Engenharia

Site institucional one-page desenvolvido em React, TypeScript e Vite.

## Executar

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
npm run preview
```

O conteúdo de `dist/` pode ser publicado em qualquer hospedagem estática. Antes da publicação, substitua o domínio provisório em `public/sitemap.xml`.

## Configuração

- Contatos e dados empresariais: `src/config/company.ts`
- Serviços e projetos: `src/data/content.ts`
- Fotografias otimizadas: `public/images/projects/`

As fotografias e a logo originais citadas no briefing não estavam presentes nos anexos recebidos. Por isso, o site não inventa projetos, clientes ou imagens. Quando o acervo for adicionado, cadastre cada fotografia no array `projects` e substitua o favicon/OG provisórios pelos arquivos derivados da marca original.
