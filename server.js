const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Catálogo COMPLETO DE PRODUTOS - 20 ITENS
const PRODUCTS = [
  // TOPS (5 produtos)
  {
    id: 'top-001',
    brand: 'Fear of God Essentials',
    category: 'Camiseta',
    gender: 'Unissex',
    title: 'Camiseta Boxy Fit',
    price: 189.90,
    img: 'images/Camiseta Boxy Fit.png',
    description: 'Camiseta de corte quadrado (boxy) com mangas mais largas e ombros caídos. 100% Algodão pesado (Jersey de alta gramatura). Gola alta canelada que não deforma.'
  },
  {
    id: 'top-002',
    brand: 'Champion',
    category: 'Hoodie',
    gender: 'Unissex',
    title: 'Hoodie Reverse Weave',
    price: 279.90,
    img: 'images/Hoodie Reverse Weave.png',
    description: 'Hoodie clássico e pesado com painéis laterais elásticos. Mistura algodão e poliéster com corte transversal. O "padrão ouro" de durabilidade e estrutura.'
  },
  {
    id: 'top-003',
    brand: 'Stüssy',
    category: 'Jaqueta',
    gender: 'Masculino',
    title: 'Jaqueta Coach',
    price: 449.90,
    img: 'images/Jaqueta Coach.png',
    description: 'Jaqueta Coach com exterior em Nylon impermeável e forro em poliéster. Corte regular com ajuste por cordão. Fechamento por botões de pressão e gola dobrável.'
  },
  {
    id: 'top-004',
    brand: 'Supreme',
    category: 'Flanela',
    gender: 'Masculino',
    title: 'Flanela Heavyweight',
    price: 349.90,
    img: 'images/Flanela Heavyweight.png',
    description: 'Flanela de algodão escovado de gramatura alta. Corte relaxado para sobreposição (layering). Toque macio por fora, ultra resistente e durável.'
  },
  {
    id: 'top-005',
    brand: 'Nike ACG',
    category: 'Colete',
    gender: 'Unissex',
    title: 'Colete Utilitário',
    price: 399.90,
    img: 'images/Colete Utilitário.png',
    description: 'Colete de Ripstop Nylon com tecnologia repelente à água. Ajustável por fivelas com múltiplos bolsos 3D. Estética Techwear funcional e moderna.'
  },

  // BOTTOMS (5 produtos)
  {
    id: 'bottom-001',
    brand: 'Dickies',
    category: 'Calça Cargo',
    gender: 'Masculino',
    title: 'Calça Cargo 874',
    price: 189.90,
    img: 'images/Calça Cargo 874.png',
    description: 'Calça Cargo 874 em sarja ultra resistente (65% Poliéster / 35% Algodão). Corte reto com cintura alta. Originalmente de trabalho, tornou-se uniforme do skate.'
  },
  {
    id: 'bottom-002',
    brand: 'Yeezy / Adidas',
    category: 'Sweatpants',
    gender: 'Unissex',
    title: 'Sweatpants de Fleece',
    price: 279.90,
    img: 'images/Sweatpants de Fleece.png',
    description: 'Sweatpants de algodão atoalhado (French Terry). Corte afunilado com punho elástico no tornozelo. Visual volumoso no quadril que vai estreitando.'
  },
  {
    id: 'bottom-003',
    brand: 'Carhartt WIP',
    category: 'Calça',
    gender: 'Masculino',
    title: 'Double Knee Pants',
    price: 349.90,
    img: 'images/Double Knee Pants.png',
    description: 'Calça de Canvas de algodão orgânico "Dearborn". Corte relaxado e reto com painéis duplos no joelho com rebites de metal.'
  },
  {
    id: 'bottom-004',
    brand: 'Eric Emanuel',
    category: 'Bermuda',
    gender: 'Masculino',
    title: 'Bermuda Mesh',
    price: 169.90,
    img: 'images/Bermuda Mesh.png',
    description: 'Bermuda de malha de poliéster de dupla camada (mesh). Acima do joelho, transpirável, leve e com cores vibrantes.'
  },
  {
    id: 'bottom-005',
    brand: 'Levi\'s',
    category: 'Jeans',
    gender: 'Masculino',
    title: 'Jeans Selvedge 501 \'93',
    price: 299.90,
    img: 'images/Jeans Selvedge.png',
    description: 'Jeans Levi\'s 501 com Denim rígido de 12oz a 14oz. Corte reto de inspiração vintage anos 90. Acabamento premium na ourela do tecido.'
  },

  // CALÇADOS (3 produtos)
  {
    id: 'shoe-001',
    brand: 'Nike',
    category: 'Sneaker',
    gender: 'Unissex',
    title: 'Dunk Low',
    price: 549.90,
    img: 'images/Dunk Low.png',
    description: 'Dunk Low em couro liso ou camurça com solado de borracha de alta tração. Fiel ao tamanho (True to size). Um clássico atemporal do streetwear.'
  },
  {
    id: 'shoe-002',
    brand: 'Converse',
    category: 'Sneaker',
    gender: 'Unissex',
    title: 'Chuck 70 High Top',
    price: 399.90,
    img: 'images/Chuck 70 High Top.png',
    description: 'Chuck 70 High Top em lona de 12oz reforçada. Solado de borracha envernizada mais alto que o All Star comum. Geralmente pede um número menor.'
  },
  {
    id: 'shoe-003',
    brand: 'New Balance',
    category: 'Sneaker',
    gender: 'Unissex',
    title: 'New Balance 990v5',
    price: 649.90,
    img: 'images/New Balance 990v5.png',
    description: 'New Balance 990v5 com mix de camurça suína e mesh respirável. Amortecimento ENCAP. O ápice do "Dad Shoe" (tênis de pai) de luxo e conforto.'
  },

  // ACESSÓRIOS (7 novos produtos)
  {
    id: 'acc-001',
    brand: 'Stüssy',
    category: 'Boné',
    gender: 'Unissex',
    title: 'Boné 5-Panel',
    price: 119.90,
    img: 'images/Boné 5-Panel.png',
    description: 'Boné 5-Panel clássico do Stüssy. Estrutura resistente, pala pré-curvada. Perfeito para completar o look streetwear.'
  },
  {
    id: 'acc-002',
    brand: 'Supreme',
    category: 'Chapéu',
    gender: 'Unissex',
    title: 'Bucket Hat',
    price: 159.90,
    img: 'images/Bucket Hat.png',
    description: 'Bucket Hat com logo bordado. Material resistente e confortável. Um essencial para o estilo Y2K e streetwear.'
  },
  {
    id: 'acc-003',
    brand: 'Carhartt WIP',
    category: 'Cinto',
    gender: 'Unissex',
    title: 'Cinto Industrial',
    price: 99.90,
    img: 'images/Cinto Industrial.png',
    description: 'Cinto Industrial de Carhartt WIP com fivela reforçada. Material durável e acabamento de qualidade premium.'
  },
  {
    id: 'acc-004',
    brand: 'Nike SB',
    category: 'Meias',
    gender: 'Unissex',
    title: 'Meias de Cano Alto',
    price: 49.90,
    img: 'images/Meias de Cano Alto.png',
    description: 'Meias de cano alto com o logo da Nike SB. 80% algodão, 15% poliéster, 5% elastano. Conforto garantido.'
  },
  {
    id: 'acc-005',
    brand: 'Off-White',
    category: 'Máscara',
    gender: 'Unissex',
    title: 'Máscara Streetwear',
    price: 69.90,
    img: 'images/Máscara.png',
    description: 'Máscara premium com design streetwear. Material respirável e estruturado com logo bordado.'
  },
  {
    id: 'acc-006',
    brand: 'The North Face',
    category: 'Colete',
    gender: 'Unissex',
    title: 'Puffer Vest',
    price: 329.90,
    img: 'images/Puffer Vest.png',
    description: 'Colete Puffer do The North Face com tecnologia de isolamento. Leve, quente e perfeito para layering.'
  },
  {
    id: 'acc-007',
    brand: 'Carhartt WIP',
    category: 'Bolsa',
    gender: 'Unissex',
    title: 'Shoulder Bag Cordura',
    price: 249.90,
    img: 'images/Shoulder Bag Cordura.png',
    description: 'Bolsa de ombro em Cordura durável com múltiplos compartimentos. Ideal para o dia a dia e viagens.'
  }
];

// API ENDPOINTS
app.get('/api/products', (req, res) => {
  res.json(PRODUCTS);
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const prod = PRODUCTS.find(p => p.id === id);
  if(!prod) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(prod);
});

// Static files da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Fallback para index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FLOW7 rodando em http://localhost:${PORT}`);
  console.log(`📦 ${PRODUCTS.length} produtos carregados`);
});
server.on('error', (err) => {
  console.error('❌ Erro:', err && err.code ? err.code : err);
  process.exit(1);
});
