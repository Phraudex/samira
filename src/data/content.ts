export interface BibliothequeItem {
  id: string;
  titre: string;
  description: string;
  photos: string[];
  videos: string[];
}

export const bibliotheque: BibliothequeItem[] = [
  {
    id: "01",
    titre: "Tenue Violette Tabaski",
    description: "Tenue islamique de fête violette, playbacks en Dioula.",
    photos: [
      "/bibliotheque/01_tenue_violette_tabaski/P01.JPG",
      "/bibliotheque/01_tenue_violette_tabaski/P13.JPG",
      "/bibliotheque/01_tenue_violette_tabaski/P14.JPG",
      "/bibliotheque/01_tenue_violette_tabaski/P15.JPG",
      "/bibliotheque/01_tenue_violette_tabaski/P16.JPG",
      "/bibliotheque/01_tenue_violette_tabaski/P17.JPG",
    ],
    videos: [
      "/videos/V01.MP4",
      "/videos/V02.MP4",
      "/videos/V03.MP4",
      "/videos/V04.MP4",
      "/videos/V05.MP4",
      "/videos/V06.MP4",
      "/videos/V07.MP4",
      "/videos/V08.MP4",
    ],
  },
  {
    id: "02",
    titre: "Promenade sur le Goudron",
    description: "Kamis violet au soleil, éclats de rire sur route goudronnée.",
    photos: [
      "/bibliotheque/02_tenue_violette_goudron/P18.png",
      "/bibliotheque/02_tenue_violette_goudron/P19.png",
      "/bibliotheque/02_tenue_violette_goudron/P20.png",
      "/bibliotheque/02_tenue_violette_goudron/P21.png",
      "/bibliotheque/02_tenue_violette_goudron/P22.png",
      "/bibliotheque/02_tenue_violette_goudron/P23.png",
      "/bibliotheque/02_tenue_violette_goudron/P24.png",
      "/bibliotheque/02_tenue_violette_goudron/P25.png",
      "/bibliotheque/02_tenue_violette_goudron/P26.png",
      "/bibliotheque/02_tenue_violette_goudron/P27.png",
      "/bibliotheque/02_tenue_violette_goudron/P28.png",
      "/bibliotheque/02_tenue_violette_goudron/P29.png",
      "/bibliotheque/02_tenue_violette_goudron/P30.png",
    ],
    videos: [],
  },
  {
    id: "03",
    titre: "Restaurant en Jaune & Marron",
    description: "Sortie restaurant, robe jaune et foulard marron.",
    photos: [
      "/bibliotheque/03_tenue_jaune_restaurant/P09.JPG",
      "/bibliotheque/03_tenue_jaune_restaurant/P10.JPG",
      "/bibliotheque/03_tenue_jaune_restaurant/P11.JPG",
      "/bibliotheque/03_tenue_jaune_restaurant/P12.JPG",
    ],
    videos: [],
  },
  {
    id: "04",
    titre: "Rose Ramadan",
    description: "Fête du Ramadan, tenue rose et voiture.",
    photos: [
      "/bibliotheque/04_tenue_rose_ramadan/P32.jpg",
      "/bibliotheque/04_tenue_rose_ramadan/P33.jpg",
      "/bibliotheque/04_tenue_rose_ramadan/P34.jpg",
      "/bibliotheque/04_tenue_rose_ramadan/P35.jpg",
      "/bibliotheque/04_tenue_rose_ramadan/P36.jpg",
      "/bibliotheque/04_tenue_rose_ramadan/P38.jpg",
    ],
    videos: [
      "/videos/V10.mp4",
      "/videos/V11.mp4",
      "/videos/V12.mp4",
      "/videos/V13.mp4",
      "/videos/V14.mp4",
      "/videos/V15.mp4",
      "/videos/V16.mp4",
    ],
  },
  {
    id: "05",
    titre: "Chemise Jaune, Foulard Bleu",
    description: "Selfies Snapchat, chemise jaune sur t-shirt noir.",
    photos: [
      "/bibliotheque/05_chemise_jaune_foulard_bleu/P41.JPG",
      "/bibliotheque/05_chemise_jaune_foulard_bleu/P42.JPG",
      "/bibliotheque/05_chemise_jaune_foulard_bleu/P43.JPG",
    ],
    videos: [
      "/videos/V22.MP4",
      "/videos/V23.MP4",
    ],
  },
  {
    id: "06",
    titre: "Treillis Militaire au Salon",
    description: "Ensemble treillis, playbacks et poses dans un salon.",
    photos: [
      "/bibliotheque/06_treillis_militaire_salon/P44.png",
      "/bibliotheque/06_treillis_militaire_salon/P45.JPG",
      "/bibliotheque/06_treillis_militaire_salon/P46.JPG",
    ],
    videos: [
      "/videos/V34.MP4",
      "/videos/V35.MP4",
      "/videos/V36.MP4",
      "/videos/V37.MP4",
      "/videos/V38.MP4",
      "/videos/V39.MP4",
      "/videos/V40.MP4",
      "/videos/V41.MP4",
      "/videos/V42.MP4",
      "/videos/V43.MP4",
      "/videos/V44.MP4",
      "/videos/V45.MP4",
      "/videos/V46.MP4",
    ],
  },
  {
    id: "07",
    titre: "Robe Noire aux Papillons",
    description: "Robe noire, foulard marron orné de papillons roses.",
    photos: [
      "/bibliotheque/07_robe_noire_foulard_papillons/P48.JPG",
      "/bibliotheque/07_robe_noire_foulard_papillons/P49.JPG",
    ],
    videos: [
      "/videos/V48.MP4",
      "/videos/V49.MP4",
      "/videos/V50.MP4",
      "/videos/V51.MP4",
      "/videos/V52.MP4",
      "/videos/V53.MP4",
    ],
  },
  {
    id: "08",
    titre: "Foulard Noir & Rose Violet",
    description: "Foulard noir superposé sur foulard violet-rose.",
    photos: [
      "/bibliotheque/08_foulard_noir_et_rose_violet/P05.JPG",
      "/bibliotheque/08_foulard_noir_et_rose_violet/P06.JPG",
      "/bibliotheque/08_foulard_noir_et_rose_violet/P07.JPG",
      "/bibliotheque/08_foulard_noir_et_rose_violet/P08.JPG",
    ],
    videos: [],
  },
  {
    id: "09",
    titre: "Complet Blanc, Foulard à Motifs",
    description: "Ensemble blanc avec foulard rose à motifs, pose de dos.",
    photos: [
      "/bibliotheque/09_complet_blanc_foulard_rose_motifs/P39.JPG",
      "/bibliotheque/09_complet_blanc_foulard_rose_motifs/P40.JPG",
    ],
    videos: [],
  },
  {
    id: "10",
    titre: "La Casquette par-dessus le Foulard",
    description: "Style décontracté en voiture, casquette sur le foulard.",
    photos: [],
    videos: [
      "/videos/V18.MP4",
      "/videos/V19.MP4",
      "/videos/V20.MP4",
    ],
  },
];

export interface Souvenir {
  id: string;
  title: string;
  date?: string;
  image?: string;
  video?: string;
  message?: string;
  anecdote?: string;
}

export interface Chapter {
  number: number;
  title: string;
  content?: string;
  quote?: string;
  keywords?: string[];
  souvenirs?: Souvenir[];
}

export const content = {
  lock: {
    title: "Le Livre, Samira",
    subtitle: "Entre ton mot de passe",
    button: "Entrer",
    passwordHash: "b6e064d022b05b5b2f6929776d23639e1dda7d46372d64503df213fde5bd6e2a",
  },

  unlock: {
    line1: "Bienvenue, Samira.",
    line2: "Ce livre parle de toi.",
  },

  hero: {
    name: "Samira",
    tagline: "Une âme rare dans un monde ordinaire.",
    image: "/images/samira/P44.png",
  },

  chapters: [
    {
      number: 1,
      title: "Qui est Samira ?",
      content:
        "Définir Samira, c'est tenter de capturer l'élégance dans sa forme la plus pure et la plus simple. Elle est de ces personnes rares qui n'ont pas besoin de faire de bruit pour se faire remarquer. Son authenticité se lit dans son regard, et sa douceur s'impose comme une évidence. Ce livre n'est pas une simple déclaration : c'est le portrait d'une âme singulière.",
      quote:
        "Il y a des êtres dont la présence suffit à illuminer une pièce. Samira est l'une d'eux.",
    },
    {
      number: 2,
      title: "Une belle âme",
      keywords: [
        "Bienveillante",
        "Généreuse",
        "Inspirante",
        "Rayonnante",
        "Attentionnée",
        "Authentique",
        "Respectueuse",
        "Sincère",
      ],
      content:
        "Il y a chez Samira une prévenance innée, une façon d'être présente pour les autres qui témoigne d'un cœur immense. Sa gentillesse n'est pas une posture, c'est sa nature profonde. Elle rayonne par son attention constante envers autrui, apportant de la lumière et du réconfort à ceux qui l'entourent. Une âme chaleureuse qui rend le quotidien plus doux et inspirant.",
    },
    {
      number: 3,
      title: "Ses valeurs",
      content:
        "La véritable beauté est celle qui s'ancre dans des principes solides. Samira porte ses convictions religieuses comme un vêtement de lumière. Son attachement à l'Islam, sa pudeur et la fierté avec laquelle elle porte son foulard imposent le respect. C'est une élégance spirituelle, guidée par la foi et le respect de ce qu'Allah (SWT) a demandé, qui donne à sa personnalité sa force et sa profondeur unique.",
    },
    {
      number: 5,
      title: "Sa force",
      content:
        "Derrière la douceur de son visage se cache une force tranquille. Samira est une jeune femme déterminée, qui sait se battre face aux épreuves de la vie et avancer pas à pas avec courage. Sa résilience n'est pas un vain mot, c'est une réalité quotidienne. Elle apprend de ses erreurs, grandit à travers ses expériences, et montre que l'on peut être à la fois sensible et profondément solide.",
      keyPhrases: [
        "Une force tranquille.",
        "Elle avance, toujours.",
        "La douceur n'exclut pas la détermination.",
      ],
    },
    {
      number: 6,
      title: "Galerie immersive",
      images: [
        "/images/samira/P01.JPG",
        "/images/samira/P03.jpg",
        "/images/samira/P11.JPG",
        "/images/samira/P13.JPG",
        "/images/samira/P18.png",
        "/images/samira/P19.png",
        "/images/samira/P31.JPG",
        "/images/samira/P32.jpg",
        "/images/samira/P41.JPG",
        "/images/samira/P43.JPG",
        "/images/samira/P44.png",
        "/images/samira/P47.JPG",
        "/images/samira/P49.JPG",
      ],
    },
    {
      number: 7,
      title: "Bibliothèque de souvenirs",
      souvenirs: [
        {
          id: "souvenir-01",
          title: "La tenue de Tabaski",
          date: "Aïd al-Adha",
          image: "/bibliotheque/01_tenue_violette_tabaski/P01.JPG",
          message: "Un moment suspendu dans la joie de la fête.",
          anecdote: "Elle chantait en Dioula, rayonnante dans sa tenue violette.",
        },
        {
          id: "souvenir-02",
          title: "Promenade sur le goudron",
          image: "/bibliotheque/02_tenue_violette_goudron/P18.png",
          message: "Elle riait aux éclats, libre et lumineuse.",
          anecdote: "Une balade simple qui restera gravée.",
        },
        {
          id: "souvenir-03",
          title: "Le restaurant du 20 mars",
          date: "20 mars 2024",
          image: "/bibliotheque/03_tenue_jaune_restaurant/P11.JPG",
          message: "Une semaine après l'anniversaire, une soirée parfaite.",
          anecdote: "Elle portait du jaune, et le restaurant aussi semblait sourire.",
        },
        {
          id: "souvenir-04",
          title: "Le Ramadan en rose",
          date: "20 mars 2026",
          image: "/bibliotheque/04_tenue_rose_ramadan/P32.jpg",
          message: "La fête du Ramadan, elle en était la plus belle lumière.",
          anecdote: "Sa pose de dos avec les deux doigts — iconique.",
        },
        {
          id: "souvenir-05",
          title: "Chemise jaune, foulard bleu",
          image: "/bibliotheque/05_chemise_jaune_foulard_bleu/P43.JPG",
          message: "Un selfie Snapchat qui capturait sa beauté naturelle.",
          anecdote: "Le mélange de couleurs était parfait, comme elle.",
        },
        {
          id: "souvenir-06",
          title: "La masterclass au salon",
          image: "/bibliotheque/06_treillis_militaire_salon/P44.png",
          message: "Assise sur ce fauteuil, elle était simplement exceptionnelle.",
          anecdote: "La photo préférée. Une vraie masterclass.",
        },
        {
          id: "souvenir-07",
          title: "La robe noire aux papillons",
          image: "/bibliotheque/07_robe_noire_foulard_papillons/P49.JPG",
          message: "Elle tournait sur elle-même, pudique et magnifique.",
          anecdote: "Le foulard marron orné de papillons, un détail parfait.",
        },
        {
          id: "souvenir-08",
          title: "Foulard noir et rose violet",
          image: "/bibliotheque/08_foulard_noir_et_rose_violet/P05.JPG",
          message: "Une combinaison de couleurs qui lui allait à merveille.",
          anecdote: "La douceur de ses tons, la richesse de ses détails.",
        },
        {
          id: "souvenir-09",
          title: "Complet blanc et foulard à motifs",
          image: "/bibliotheque/09_complet_blanc_foulard_rose_motifs/P39.JPG",
          message: "La pureté du blanc, la gaieté des motifs.",
          anecdote: "Elle lisait tranquillement, sans poser pour personne.",
        },
        {
          id: "souvenir-10",
          title: "La casquette par-dessus le foulard",
          image: "/videos/V18.MP4",
          video: "/videos/V18.MP4",
          message: "Un style nouveau, une personnalité toujours entière.",
          anecdote: "La casquette par-dessus le foulard — elle crée ses propres règles.",
        },
      ] as Souvenir[],
    },
    {
      number: 8,
      title: "L'empreinte qu'elle laisse",
      content:
        "Traverser la vie de Samira, c'est accepter d'être marqué par son passage. Par sa bienveillance, son aide envers autrui et sa simplicité, elle laisse une empreinte durable et lumineuse dans le cœur de ceux qui ont la chance de la côtoyer. Une femme différente, tout simplement exceptionnelle.",
    },
  ] as (Chapter & { images?: string[]; keyPhrases?: string[] })[],

  end: {
    message: "Merci d'être toi.",
    image: "/images/samira/P47.JPG",
  },
} as const;
