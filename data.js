// =====================================================================
// CATÁLOGO DO MONTADOR (cartela do ateliê) — edite aqui nomes, códigos e cores.
// tipo do papel: "crepom" | "metalizado" | "perolado"  ·  extra = R$ por unidade
// =====================================================================

export const PAPERS = [{"group": "Crepom", "type": "crepom", "extra": 0, "items": [["AMC", "Verde Limão", "#AACC44"], ["AZC", "Azul Claro", "#6BAED6"], ["AZE", "Azul Escuro", "#2B4D9C"], ["AZT", "Azul Turquesa", "#4BACC6"], ["BR", "Branco", "#FFFFFF"], ["CH", "Champagne", "#EDD9A3"], ["KRAFT", "Kraft", "#C4A484"], ["PI", "Rosa", "#F7CAC9"], ["PT", "Preto", "#1A1A1A"], ["MAR", "Marsala", "#955251"], ["RO", "Rosa Médio", "#F48FB1"], ["ROC", "Rosa Choque", "#E91E8C"], ["RX", "Roxo", "#7B3FA0"], ["SA", "Salmão", "#E8A090"], ["TY", "Tiffany", "#81D8D0"], ["VDB", "Verde Bandeira", "#006B3C"], ["VDC", "Verde Claro", "#90C878"], ["VDF", "Verde Folha", "#4CAF50"], ["VDM", "Verde Musgo", "#6B7C45"], ["VDPI", "Verde Pipa", "#8DC26F"], ["VI", "Vinho", "#722F37"], ["VM", "Vermelho", "#C0392B"]]}, {"group": "Metalizado", "type": "metalizado", "extra": 2, "items": [["OUR", "Ouro", "#D4AF37"], ["COB", "Cobre", "#B87333"], ["RSE", "Rosé", "#E8B4A0"], ["RSM", "Rosé Mate", "#C8907A"]]}, {"group": "Perolizado", "type": "perolado", "extra": 2, "items": [["AZA", "Azul Água", "#A8DDE8"], ["BRP", "Branco", "#F8F8F8"], ["CHP", "Champagne", "#F7E7CE"], ["GRF", "Grafite", "#6A6A6A"], ["VJD", "Verde Jade", "#5BAD8C"]]}, {"group": "Ouro | Prata", "type": "metalizado", "extra": 2, "items": [["OUR", "Ouro", "#D4AF37"], ["PRT", "Prata", "#B0B8C4"]]}];

export const RIBBONS = [["01", "Branco", "#FFFFFF"], ["50", "Pérola", "#F0EBE0"], ["25", "Creme", "#FFF8DC"], ["17", "Jasmin", "#FFF5C0"], ["09", "Canário", "#FFF44F"], ["15", "Ouro", "#D4AF37"], ["24", "Prata", "#C0C0C0"], ["65", "Prata Claro", "#E2E2E2"], ["75", "Cinza", "#808080"], ["19", "Preto", "#1A1A1A"], ["10", "Cerâmica", "#CC4E2A"], ["86", "Vitamina", "#E8601C"], ["85", "Lar.Neon", "#FF6600"], ["40", "Laranja", "#E86830"], ["58", "Salmão Real", "#E8735A"], ["79", "Blush", "#F4A6A0"], ["82", "Bronze", "#B85C38"], ["57", "Papaía", "#E8704A"], ["87", "Cabernet", "#7B1C2A"], ["07", "Vermelho", "#CC1414"], ["29", "Bordô", "#6B0D1A"], ["77", "Marsala", "#955251"], ["03", "Rosa Bebê", "#FFD6E0"], ["04", "Rosa", "#F48FB1"], ["36", "Pétala", "#F7C5CC"], ["69", "Nude", "#F0C8A0"], ["200", "Boneca", "#EF9CB8"], ["66", "Pink", "#E91E8C"], ["88", "Penélope", "#D4547A"], ["78", "Chicletes", "#FF69B4"], ["41", "Petúnia", "#CC6699"], ["76", "Profundo", "#C2185B"], ["30", "Bispo", "#9C4070"], ["84", "Flamingo", "#FC8EAC"], ["89", "Pliê", "#FFB6C1"], ["33", "Lavanda", "#D8B4E2"], ["42", "Alfazema", "#B39BC8"], ["31", "Violeta", "#8A2BE2"], ["21", "Turquesa", "#40C8C8"], ["13", "Royal", "#2855A0"], ["55", "Marinho", "#1A237E"], ["26", "Verde Água", "#80DEEA"], ["73", "Verde Mar", "#26A69A"], ["67", "Azul Celeste", "#87CEEB"], ["71", "Airland", "#5BADD9"], ["61", "Piscina", "#48CAE4"], ["83", "Menta", "#98E8C0"], ["39", "Militar", "#4A5C38"], ["70", "Sixtine", "#7CB9A8"], ["59", "Pistache", "#BDD670"], ["27", "Cítrico", "#D4E84A"], ["23", "Bandeira", "#006B3C"], ["05", "Amazonas", "#2E7D32"], ["63", "Areia", "#C8B880"], ["52", "Pêssego", "#FFCC99"], ["80", "Champanhe", "#EDD9A3"], ["64", "Chocolate", "#5D3A1A"], ["91", "Pampas", "#D2B48C"], ["62", "Camuça", "#C19A6B"], ["74", "Dou.Claro", "#F0C040"], ["47", "Dourado", "#DAA520"], ["81", "Mostarda", "#C8960C"], ["92", "Branch", "#E8861C"], ["45", "Marrom", "#8B4513"], ["34", "Café", "#6F4E37"]];

// sabores e preços por unidade do site oficial
export const FLAVORS = [
  { id: "tradicional", img: "assets/fotos/bemcasado-7.jpg", name: "Tradicional", price: 7.00, desc: "Massa tradicional com recheio de leite moça." },
  { id: "doce-de-leite", img: "https://lh7-us.googleusercontent.com/sitesv-images-rt/APXyLQfRZndvWezKsvXqaSQ5t4sWF_6_FHMrwEsV8NK5Ax54vZM_g4q1RkkZnorezCIlq4FYSRSXVdZ-c-hcejmLtHJL-7-euczUzoCzMdoD1jQQxfw08r6TJ0RBdf6IQ41er4U4k5nFvRt-kJ9VumyQq7-jnLgTv_9BaYoIMIGDMfpX31oXFli9i4r5lvmHD7lTgkYDphCAOHBvzmuFOgTNRc4vcloz-ynLhp2BBLsHALs=w900", name: "Doce de Leite", price: 7.00, desc: "Massa tradicional com recheio de doce de leite." },
  { id: "chocolate", img: "assets/fotos/bemcasado-9.jpg", name: "Chocolate", price: 8.00, desc: "Massa de chocolate com recheio de brigadeiro." },
  { id: "red-velvet", img: "assets/fotos/bemcasado-10.jpg", name: "Red Velvet", price: 9.00, desc: "Massa Red Velvet com recheio de cream cheese." },
  { id: "pistache", img: "assets/fotos/bemcasado-11.jpg", name: "Pistache", price: 9.90, desc: "Massa de limão siciliano com recheio de creme de pistache." },
];

export const FINISHES = [
  { id: "padrao", value: 0, name: "Laço padrão", label: "Laço padrão (cetim) · incluso" },
  { id: "pedraria", value: 0.30, name: "Pedraria", label: "Pedraria · + R$ 0,30 / un." },
  { id: "sempre-vivas", value: 1.50, name: "Sempre-viva", label: "Sempre-vivas · + R$ 1,50 / un." },
];

// Doces finos — textos e preços do site oficial; fotos hospedadas no Google Sites
export const PRODUCTS = [
 {
  "name": "Brigadeiro",
  "desc": "Chocolate 50% cacau, textura cremosa e finalização com granule de chocolate puro. Intenso e equilibrado.",
  "price": 3.0,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-1.jpg",
  "cut": "assets/doces/doce-1.webp"
 },
 {
  "name": "Beijinho de coco",
  "desc": "Leite condensado com coco fresco, envolvido em coco fino. Doçura suave e clássica.",
  "price": 2.8,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-2.jpg",
  "cut": "assets/doces/doce-2.webp"
 },
 {
  "name": "Casadinho",
  "desc": "A combinação harmoniosa entre brigadeiro e brigadeiro branco em uma única experiência.",
  "price": 2.8,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-3.jpg",
  "cut": "assets/doces/doce-3.webp"
 },
 {
  "name": "Crocante de amendoim",
  "desc": "Base cremosa com amendoim crocante. Sabor marcante e textura envolvente.",
  "price": 3.0,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-4.jpg",
  "cut": "assets/doces/doce-4.webp"
 },
 {
  "name": "Uvinha",
  "desc": "Brigadeiro macio com uva fresca no interior. Leve, delicado e surpreendente.",
  "price": 2.8,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-5.jpg",
  "cut": "assets/doces/doce-5.webp"
 },
 {
  "name": "Brûlée",
  "desc": "Base cremosa com fava de baunilha e acabamento levemente caramelizado. Sabor sofisticado e marcante.",
  "price": 4.2,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-6.jpg",
  "cut": "assets/doces/doce-6.webp"
 },
 {
  "name": "Limão",
  "desc": "Creme suave com toque cítrico equilibrado. Refrescante e elegante.",
  "price": 3.0,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-7.jpg",
  "cut": "assets/doces/doce-7.webp"
 },
 {
  "name": "Rosinha de leite condensado",
  "desc": "Doce tradicional moldado artesanalmente em formato floral. Delicadeza em cada detalhe.",
  "price": 3.0,
  "cat": "Clássicos",
  "img": "https://lh7-us.googleusercontent.com/sitesv-images-rt/APXyLQdAKbnLj150FWs5Li8G4Xra7U3nYVK3zcovaff32zxQpdUIiypP4bVWeuZHyViz3g-SnZhjc4m2AvaG607j4uXaLO7NUjWL0rhopTKjbgcM_5xdEk4ks8HIIqXfseDkNRYLysbP58puLW9WEEpJUFp5vPIEXdH9-kdd_fQPxC5MuqklyS-17CHylJcaeeM9OuEWRIQZFKXNHh2y4LS_QmSflFeDI1TQXTwqC0eA=w900"
 },
 {
  "name": "Romeu e Julieta",
  "desc": "A união clássica entre queijo e goiabada reinterpretada com suavidade e equilíbrio.",
  "price": 3.0,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-9.jpg",
  "cut": "assets/doces/doce-9.webp"
 },
 {
  "name": "Cappuccino",
  "desc": "Notas intensas de café harmonizadas com chocolate. Aroma envolvente e sabor refinado.",
  "price": 3.0,
  "cat": "Clássicos",
  "img": "assets/fotos/docesfinos-10.jpg",
  "cut": "assets/doces/doce-10.webp"
 },
 {
  "name": "Ouriço de amêndoas",
  "desc": "Brigadeiro envolto em lâminas de amêndoas tostadas. Crocância nobre e acabamento sofisticado.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-11.jpg",
  "cut": "assets/doces/doce-11.webp"
 },
 {
  "name": "Delícia de abacaxi",
  "desc": "Creme suave com toque tropical e leve acidez. Frescor que equilibra o paladar.",
  "price": 3.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-12.jpg"
 },
 {
  "name": "Damasco recheado",
  "desc": "Damasco selecionado e macio, recheado com creme delicado. Equilíbrio entre leve acidez e doçura refinada.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-13.jpg",
  "cut": "assets/doces/doce-13.webp"
 },
 {
  "name": "Manjar",
  "desc": "Doce tradicional moldado artesanalmente em formato floral. Delicadeza em cada detalhe.",
  "price": 4.0,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-14.jpg",
  "cut": "assets/doces/doce-14.webp"
 },
 {
  "name": "Camafeu de nozes",
  "desc": "Massa delicada de nozes com acabamento sofisticado. Sabor marcante e textura macia.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-15.jpg",
  "cut": "assets/doces/doce-15.webp"
 },
 {
  "name": "Brigadeiro de pistache",
  "desc": "Cremoso e aromático, com o sabor nobre do pistache em destaque. Sofisticação em cada detalhe.",
  "price": 5.0,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-16.jpg",
  "cut": "assets/doces/doce-16.webp"
 },
 {
  "name": "Floresta Negra",
  "desc": "Chocolate intenso combinado com toque de cereja. Clássico europeu reinterpretado com leveza.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-17.jpg",
  "cut": "assets/doces/doce-17.webp"
 },
 {
  "name": "Éclair de maracujá",
  "desc": "Intensidade, leveza e sofisticação em uma única mordida.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "https://lh7-us.googleusercontent.com/sitesv-images-rt/APXyLQeXeIUJ7lCwmkKxl3AY42hneTnGoNO-tVmO5ZsSMGcZ_AA3Zpj1m4x8EowNMpAA8uLTWxao7XtZLXsm0ftRLVX9v3Fg5FV7Wh3WqXwKSYgrsDkDI2Z_N_O3M7yJWWpMRI_VwaY7NJJYeL6B6hUsvtHtqPI7U6SpAIjra_pzO8NukRjY8EcXzn7WUwx0nS92GMXixollGX_Su9d4VHc1t2S3_ilSAZBO3MwbmzU5=w900"
 },
 {
  "name": "Frutas vermelhas",
  "desc": "Creme delicado harmonizado com notas levemente ácidas de frutas vermelhas. Refrescante e elegante.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-19.jpg",
  "cut": "assets/doces/doce-19.webp"
 },
 {
  "name": "Shot de cereja",
  "desc": "Camadas cremosas com toque marcante de cereja. Intensidade e delicadeza na medida.",
  "price": 5.0,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-20.jpg"
 },
 {
  "name": "Shot de physalis",
  "desc": "Creme suave contrastando com a acidez sutil da physalis. Leve, sofisticado e surpreendente.",
  "price": 5.5,
  "cat": "Especiais",
  "img": ""
 },
 {
  "name": "Shot de morangos com geleia",
  "desc": "Mousse delicada combinada com geleia artesanal de morango. Frescor e suavidade equilibrados.",
  "price": 5.0,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-21.jpg",
  "cut": "assets/doces/doce-21.webp"
 },
 {
  "name": "Pistache Gold",
  "desc": "Creme intenso de pistache com acabamento dourado. Exclusividade e requinte em cada mordida.",
  "price": 5.2,
  "cat": "Especiais",
  "img": "https://lh7-us.googleusercontent.com/sitesv-images-rt/APXyLQcX1TOLfSBht5vHXwN9cxscQoeSbvvx_lczF3iNSSpMPdfqp1NUlftTE1uaGb7foaOPC20VNUCxAw8SWixEA84LBNy4S_zkzT2CQ_45I7E37p7k2dJJ2Z7DOhn4KEk4BoYsKiboOmrVZbQBN_10ryXN8Ei28_0hTy1oyuosQ7W06enzn0XFN9hoPQIqj7eeVnzKKXJsmd63zYCOP71MrT0n-S9lKPGrJH2-PbNl=w900"
 },
 {
  "name": "Mármore de Oreo",
  "desc": "Creme suave mesclado com pedaços crocantes de Oreo. Textura envolvente e sabor contemporâneo.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "https://lh7-us.googleusercontent.com/sitesv-images-rt/APXyLQcBYoR9RX2xlp4pOHBbgM--Yd9BmFC6lz9hBwEdzeB5VsvBPNTrfl7bQeo7-Sib7TgB-N7bQU2KpkoXyYZMcRDIh8T4jT6ELIU-zErSdtlcJBNKUbN0q9Ds8R_l3Ua_PAcEN_s7rmWVdy1iCaTAclgx6PCxTEitpnrU24iuFY_tbhvlT3IVXkGDrICUDIJqeu-x6bdGzKKPMrFzAbQAGgRTlsXa4qGuOXVx_S61=w900"
 },
 {
  "name": "Cookies in Cream com brigadeiro",
  "desc": "Base cremosa com pedaços de biscoito e camada generosa de brigadeiro. Irresistível e sofisticado.",
  "price": 4.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-24.jpg",
  "cut": "assets/doces/doce-24.webp"
 },
 {
  "name": "Caramelo e flor de sal",
  "desc": "Caixinha de chocolate meio amargo recheada com caramelo salgado e ganache intensa.",
  "price": 5.8,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-25.jpg",
  "cut": "assets/doces/doce-25.webp"
 },
 {
  "name": "Bananinha",
  "desc": "Brigadeiro com toque sutil de canela, recheado com banana passa e finalização contemporânea.",
  "price": 4.0,
  "cat": "Especiais",
  "img": "assets/fotos/docesfinos-26.jpg",
  "cut": "assets/doces/doce-26.webp"
 }
];

// Linha Bem-Celebrados (página "Bens" do site antigo)
export const LINHAS = [
 {
  "name": "Bem-Casados",
  "desc": "Sabor para celebrar o amor e a união.",
  "img": "assets/fotos/bemcasado-1.jpg"
 },
 {
  "name": "Bem-Formados",
  "desc": "O sabor da vitória em cada graduação e conquista acadêmica.",
  "img": "assets/fotos/bemcasado-2.jpg"
 },
 {
  "name": "Bem-Vividos",
  "desc": "O brinde a cada ano de vida e novas conquistas.",
  "img": "assets/fotos/bemcasado-3.jpg"
 },
 {
  "name": "Bem-Sucedidos",
  "desc": "A marca da sofisticação em eventos corporativos e parcerias.",
  "img": "assets/fotos/bemcasado-4.jpg"
 },
 {
  "name": "Bem-Nascidos",
  "desc": "Para as boas-vindas mais doces na maternidade.",
  "img": "https://lh7-us.googleusercontent.com/sitesv-images-rt/APXyLQe_Lnh2t0KicjNZMtF-4mZYfp733bA3HSVMycoJxZiNG1-jcSBc_Og_NiK8QzTZdNiq2q24SBV4Tcsed_jfcWWPbsDxSEmjpte-K_RbxcPSBrLDh2wJMMwarkK7KY7RTIH-XrGe9cKDU5T4MYHnLVHvpcF_wHwO4VOnLj2m_ysum4CrE6Vmab1-kzhUVI-wkUso_Rddc_ZbNL6gtHGBHVE6oTAYHQenCiXEuRwHwJA=w900"
 },
 {
  "name": "Bem-Batizados",
  "desc": "Pureza e delicadeza para celebrar o primeiro sacramento.",
  "img": "assets/fotos/bemcasado-6.jpg"
 }
];

export const VIP_LINK = "https://chat.whatsapp.com/GsjqsFfllpjDdMmGEXN6Er";
export const INSTAGRAM = "https://www.instagram.com/renataalvesdoces/";
export const WHATSAPP = "5583987185735";
export const MIN_QTY = 20;
export const MIN_DAYS = 3; // 72 horas de antecedência
