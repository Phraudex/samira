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
    password: "sogbe",
  },

  unlock: {
    line1: "Bienvenue, Samira.",
    line2: "Ce livre parle de toi.",
  },

  hero: {
    name: "Samira",
    tagline: "Une âme rare dans un monde ordinaire.",
    image: "/images/samira/P44.JPG",
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
      number: 4,
      title: "Ses talents",
      content:
        "La cuisine chez Samira n'est pas seulement une habitude, c'est un véritable talent. Elle sait transformer les repas en moments uniques, alliant la créativité à la rigueur des saveurs. C'est une autre facette de sa générosité : donner du plaisir et partager son savoir-faire à travers des plats qui en disent long sur son sens du détail.",
      images: [] as string[],
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
        "/images/samira/P11.HEIC",
        "/images/samira/P13.JPG",
        "/images/samira/P18.png",
        "/images/samira/P19.png",
        "/images/samira/P31.JPG",
        "/images/samira/P32.jpg",
        "/images/samira/P41.JPG",
        "/images/samira/P43.JPG",
        "/images/samira/P44.JPG",
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
          image: "/bibliotheque/03_tenue_jaune_restaurant/P11.HEIC",
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
          image: "/bibliotheque/06_treillis_militaire_salon/P44.JPG",
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
          image: "/bibliotheque/10_foulard_et_casquette_voiture/V18.MP4",
          video: "/bibliotheque/10_foulard_et_casquette_voiture/V18.MP4",
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
    image: "/images/samira/P15.JPG",
  },
} as const;
