ls
# CRIATTO — Site de Camisas Personalizadas

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

## 🗄️ Configuração do Supabase

As credenciais já estão configuradas em `src/lib/supabase.js`.

Execute o SQL abaixo no **SQL Editor** do Supabase para criar as tabelas:

```sql
-- Designs prontos
create table if not exists designs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  image_url text not null,
  preview_url text,
  tags text[],
  active boolean default true,
  created_at timestamptz default now()
);

-- Pedidos
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  design_type text not null check (design_type in ('ready','upload','ai')),
  design_data jsonb not null,
  shirt_color text not null default '#FFFFFF',
  shirt_size text not null,
  quantity integer not null default 1,
  position text default 'front',
  status text default 'pending',
  total_price numeric(10,2),
  notes text,
  created_at timestamptz default now()
);

-- Contatos
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Artes geradas por IA
create table if not exists ai_generations (
  id uuid default gen_random_uuid() primary key,
  style text not null,
  elements text[],
  prompt_used text,
  result_url text,
  created_at timestamptz default now()
);

-- RLS policies
alter table designs enable row level security;
create policy "designs_public_read" on designs for select using (true);

alter table orders enable row level security;
create policy "orders_public_insert" on orders for insert with check (true);

alter table contacts enable row level security;
create policy "contacts_public_insert" on contacts for insert with check (true);

alter table ai_generations enable row level security;
create policy "ai_gen_public_insert" on ai_generations for insert with check (true);

-- Designs de exemplo
insert into designs (name, category, image_url, tags) values
  ('Urban Lines', 'Urbano', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', ARRAY['urbano']),
  ('Minimal Logo', 'Minimalista', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', ARRAY['minimal']),
  ('Street Art', 'Streetwear', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', ARRAY['street']),
  ('Corporate Pro', 'Corporativo', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400', ARRAY['corporativo']),
  ('Nature Vibes', 'Natureza', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400', ARRAY['natureza']),
  ('Retro Wave', 'Retrô', 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400', ARRAY['retro']);
```

## 📁 Estrutura

```
src/
  components/
    layout/
      Navbar.jsx       ← Navegação fixa
      Footer.jsx       ← Rodapé
  pages/
    HomePage.jsx       ← Hero + amostras + funcionalidades + depoimentos + CTA
    DesignsPage.jsx    ← Galeria de designs com filtros (Supabase)
    EditorPage.jsx     ← Editor completo: designs prontos, upload, IA + pedido
    ContactPage.jsx    ← Formulário de contato (Supabase)
  lib/
    supabase.js        ← Cliente Supabase + SQL comentado
  index.css            ← Tailwind + estilos globais
  App.jsx              ← Rotas
  main.jsx             ← Entry point
```

## 🎨 Tecnologias

- **React 18** + **Vite**
- **Tailwind CSS** — dark mode, dourado #FFD700
- **Supabase** — banco de dados PostgreSQL
- **Framer Motion** — animações
- **React Router** — roteamento
- **React Dropzone** — upload de imagens
- **Lucide React** — ícones
- **React Hot Toast** — notificações

## 📋 Funcionalidades

1. **Home** — hero animado, galeria de amostras, 3 funcionalidades, depoimentos
2. **Designs Prontos** — galeria com busca e filtro por categoria, dados do Supabase
3. **Editor** — 3 modos: designs prontos, upload de arte, IA generativa + simulador de camisa + formulário de pedido salvo no Supabase
4. **Contato** — formulário completo salvo no Supabase + links para WhatsApp e e-mail
