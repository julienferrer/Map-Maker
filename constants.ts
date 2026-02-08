
import { StyleCategory, MapStyle } from './types';

export const MAP_STYLES: MapStyle[] = [
  // --- CARTOGRAPHIC ---
  {
    id: 'realistic',
    name: 'Realistic Map',
    category: StyleCategory.CARTOGRAPHIC,
    description: 'Similar to Google Maps, faithful roads, natural colors.',
    promptAddon: 'ultra-realistic professional street map, google maps aesthetic, natural green and blue tones, accurate urban infrastructure',
    icon: '🗺️'
  },
  {
    id: 'topo',
    name: 'Topographic Map',
    category: StyleCategory.CARTOGRAPHIC,
    description: 'Contour lines, accented relief, detailed rivers.',
    promptAddon: 'detailed topographic map with elevation contour lines, relief shading, mountain peaks, and flowing river systems',
    icon: '🏔️'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Map',
    category: StyleCategory.CARTOGRAPHIC,
    description: 'Few colors, simple roads, very readable.',
    promptAddon: 'clean modern minimalist map, simple flat lines, limited neutral color palette, high legibility',
    icon: '⚪'
  },
  {
    id: 'bw',
    name: 'B&W Map',
    category: StyleCategory.CARTOGRAPHIC,
    description: 'High contrast, graphic design, ideal for printing.',
    promptAddon: 'high contrast black and white graphic street map, bold ink lines, professional printing aesthetic',
    icon: '⚫'
  },
  {
    id: 'monochrome',
    name: 'Monochrome Map',
    category: StyleCategory.CARTOGRAPHIC,
    description: 'Single dominant color, very stylish (poster).',
    promptAddon: 'stylish monochromatic map poster, single dominant hue with varying shades, sophisticated interior design style',
    icon: '🟦'
  },

  // --- GAMING ---
  {
    id: 'rpg-fantasy',
    name: 'Fantasy RPG Map',
    category: StyleCategory.GAMING,
    description: 'Parchment, irregular paths, drawn forests.',
    promptAddon: 'fantasy world map on old yellowed parchment, hand-drawn medieval paths, illustrated pine forests and dragon peaks',
    icon: '🧙‍♂️'
  },
  {
    id: 'rpg-modern',
    name: 'Modern RPG Map',
    category: StyleCategory.GAMING,
    description: 'MMO inspired, quest icons, district zones.',
    promptAddon: 'modern MMORPG world map UI, quest icons, glowing objective markers, distinct colorful territory zones',
    icon: '🎮'
  },
  {
    id: 'open-world',
    name: 'Open-World Map',
    category: StyleCategory.GAMING,
    description: 'GTA / Watch Dogs style, thick roads, clear zones.',
    promptAddon: 'action game mini-map style like GTA or Watch Dogs, thick neon-lit roads, high contrast dark theme, bold district borders',
    icon: '🚗'
  },
  {
    id: 'isometric',
    name: 'Isometric Map',
    category: StyleCategory.GAMING,
    description: 'Tilted 3D view, management game vibe.',
    promptAddon: 'isometric 3D perspective city map, sim-city tycoon style, detailed 3D building blocks and infrastructure',
    icon: '🏗️'
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art Map',
    category: StyleCategory.GAMING,
    description: '8-bit / 16-bit, visible grid, nostalgic.',
    promptAddon: '16-bit retro pixel art city map, visible square grid, vibrant nostalgic colors, old-school video game vibe',
    icon: '👾'
  },

  // --- ARTISTIC ---
  {
    id: 'hand-drawn',
    name: 'Hand-Drawn Map',
    category: StyleCategory.ARTISTIC,
    description: 'Irregular lines, sketchbook effect.',
    promptAddon: 'artist sketchbook hand-drawn map, loose graphite pencil lines, irregular organic strokes, notebook paper texture',
    icon: '✍️'
  },
  {
    id: 'watercolor',
    name: 'Watercolor Map',
    category: StyleCategory.ARTISTIC,
    description: 'Diffuse colors, very soft.',
    promptAddon: 'watercolor painting map, bleeding pastel colors, soft edges, artistic fluid wash effect',
    icon: '🎨'
  },
  {
    id: 'ink',
    name: 'Inked Map',
    category: StyleCategory.ARTISTIC,
    description: 'Black ink, engraving effect.',
    promptAddon: 'black ink etching map, woodcut illustration style, fine cross-hatching, intense line detail',
    icon: '🖋️'
  },
  {
    id: 'vintage-paper',
    name: 'Old Paper Map',
    category: StyleCategory.ARTISTIC,
    description: 'Aged, stains, tears.',
    promptAddon: 'antique historical map, aged paper with coffee stains, torn edges, faded ink, 18th century exploration feel',
    icon: '📜'
  },
  {
    id: 'manga',
    name: 'Manga / Anime Map',
    category: StyleCategory.ARTISTIC,
    description: 'Sharp lines, stylized city.',
    promptAddon: 'japanese anime background art map style, clean cel-shading, vibrant lighting, stylized urban layout',
    icon: '🍱'
  },

  // --- FUTURISTIC ---
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Map',
    category: StyleCategory.FUTURISTIC,
    description: 'Neons, dark background, glow.',
    promptAddon: 'cyberpunk neon city grid, pitch black background, glowing electric pink and teal roads, rain-slicked aesthetic',
    icon: '🌃'
  },
  {
    id: 'holographic',
    name: 'Holographic Map',
    category: StyleCategory.FUTURISTIC,
    description: 'Transparency, projection effect.',
    promptAddon: '3D translucent holographic projection map, glowing blue light layers, digital noise, sci-fi interface',
    icon: '💎'
  },
  {
    id: 'techno-hud',
    name: 'Techno HUD Map',
    category: StyleCategory.FUTURISTIC,
    description: 'Futuristic interface, grids and figures.',
    promptAddon: 'tactical HUD military map display, scanning lines, numeric coordinates, digital targeting overlays',
    icon: '📡'
  },
  {
    id: 'ia-data',
    name: 'AI / Data Map',
    category: StyleCategory.FUTURISTIC,
    description: 'Data flow, dynamic lines.',
    promptAddon: 'big data visualization map, dynamic flow lines representing traffic, neural network nodes, glowing pulse effects',
    icon: '🧠'
  },

  // --- TECHNICAL ---
  {
    id: 'blueprint',
    name: 'Blueprint Map',
    category: StyleCategory.TECHNICAL,
    description: 'Blue + white, technical lines.',
    promptAddon: 'architectural blueprint map, cyanotype blue background, white technical drafting lines, engineering details',
    icon: '📐'
  },
  {
    id: 'wireframe',
    name: 'Wireframe Map',
    category: StyleCategory.TECHNICAL,
    description: 'Outlines only, very clean.',
    promptAddon: '3D wireframe computer model map, glowing vector contours, empty mesh, digital skeleton of a city',
    icon: '🌐'
  },
  {
    id: 'geometric',
    name: 'Geometric Map',
    category: StyleCategory.TECHNICAL,
    description: 'Simplified shapes, polygon districts.',
    promptAddon: 'low-poly geometric city map, abstract polygonal district shapes, flat shaded facets, modern vector art',
    icon: '🔺'
  },
  {
    id: 'abstract',
    name: 'Abstract Map',
    category: StyleCategory.TECHNICAL,
    description: 'Reinterpreted city, non-realistic.',
    promptAddon: 'abstract modern art map, non-literal city interpretation, experimental shapes and vibrant splashes of color',
    icon: '🌀'
  },

  // --- CULTURAL ---
  {
    id: 'japanese',
    name: 'Japanese Map',
    category: StyleCategory.CULTURAL,
    description: 'Ukiyo-e aesthetic, calligraphy.',
    promptAddon: 'traditional Ukiyo-e woodblock print style map, mount fuji aesthetic, kanji decorative elements, washi paper texture',
    icon: '🗾'
  },
  {
    id: 'medieval',
    name: 'Medieval Map',
    category: StyleCategory.CULTURAL,
    description: 'Ancient symbols, heraldry.',
    promptAddon: 'late medieval European city map, heraldic crests, castle icons, gothic calligraphy, walled city representation',
    icon: '🏰'
  },
  {
    id: 'oriental',
    name: 'Oriental Map',
    category: StyleCategory.CULTURAL,
    description: 'Arabic motifs, warm colors.',
    promptAddon: 'middle-eastern oriental map art, intricate arabesque borders, terracotta and sand colors, mosaic tile patterns',
    icon: '🕌'
  },
  {
    id: 'art-deco',
    name: 'Art Deco Map',
    category: StyleCategory.CULTURAL,
    description: 'Symmetry, elegant lines.',
    promptAddon: 'Art Deco architectural map style, symmetry, gold and black decorative lines, 1920s luxury aesthetic',
    icon: '🎷'
  },

  // --- PLAYFUL ---
  {
    id: 'lego',
    name: 'Lego Map',
    category: StyleCategory.PLAYFUL,
    description: 'Brick roads, "toy" city.',
    promptAddon: 'toy brick map world (Lego), plastic block studs, vibrant primary colors, playful isometric plastic city',
    icon: '🧱'
  },
  {
    id: 'cartoon',
    name: 'Cartoon Map',
    category: StyleCategory.PLAYFUL,
    description: 'Bright colors, exaggerated shapes.',
    promptAddon: 'bubbly cartoon city map, rounded exaggerated roads, bright playful colors, friendly animation style',
    icon: '🎈'
  },
  {
    id: 'paper-cut',
    name: 'Paper-Cut Map',
    category: StyleCategory.PLAYFUL,
    description: 'Layered effect, soft shadows.',
    promptAddon: 'layered paper-cut craft map, physical depth with drop shadows, colorful construction paper sheets',
    icon: '✂️'
  },
  {
    id: 'chalkboard',
    name: 'Chalkboard Map',
    category: StyleCategory.PLAYFUL,
    description: 'Blackboard, white chalk.',
    promptAddon: 'white chalk drawing on a dusty classroom blackboard, rough hand-sketched city map',
    icon: '🖍️'
  },
  {
    id: 'glitch',
    name: 'Glitch Map',
    category: StyleCategory.PLAYFUL,
    description: 'Distortions, visual bugs.',
    promptAddon: 'digital glitch art map, chromatic aberration, pixel distortion, data corruption aesthetics',
    icon: '📠'
  },

  // --- NARRATIVE ---
  {
    id: 'post-apocalyptic',
    name: 'Post-Apocalyptic Map',
    category: StyleCategory.NARRATIVE,
    description: 'Broken roads, forbidden zones.',
    promptAddon: 'post-apocalyptic wasteland map, overgrown nature in streets, cracked pavement, radiation zones, rusty fallout vibe',
    icon: '☢️'
  },
  {
    id: 'dystopian',
    name: 'Dystopian Map',
    category: StyleCategory.NARRATIVE,
    description: 'Social divisions, walls, checkpoints.',
    promptAddon: 'oppressive dystopian city map, massive grey concrete walls, surveillance districts, industrial pollution haze',
    icon: '👁️‍🗨️'
  },
  {
    id: 'utopian',
    name: 'Utopian Map',
    category: StyleCategory.NARRATIVE,
    description: 'Perfect city, soft symmetry.',
    promptAddon: 'solar-punk utopian map, white eco-buildings, lush green parks, clean energy canals, harmonious urban design',
    icon: '🕊️'
  },
  {
    id: 'dreamy',
    name: 'Dreamy Map',
    category: StyleCategory.NARRATIVE,
    description: 'Blurred, unreal colors.',
    promptAddon: 'surrealist dream map, floating island districts, soft bokeh clouds, iridescent glowing colors, impossible paths',
    icon: '✨'
  }
];
