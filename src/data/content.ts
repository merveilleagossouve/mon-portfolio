/**
 * ✏️  TOUT LE TEXTE DU SITE EST ICI, EN FRANÇAIS ET EN ANGLAIS.
 * Change ce qui est entre guillemets, enregistre : le site se met à jour.
 * Les deux langues ont exactement la même structure : si tu ajoutes un texte,
 * ajoute-le dans `fr` ET dans `en`.
 */

/** Informations qui ne changent pas de langue. */
export const site = {
  firstName: 'Merveille',
  lastName: 'AGOSSOU-VE',
  initials: 'MA',
  email: 'merveilleagossouve@gmail.com',
  timeZone: 'Africa/Porto-Novo',

  // Tes réseaux : colle le lien complet. Laisse vide ('') pour ne pas l'afficher.
  socials: {
    github: 'https://github.com/merveilleagossouve',
    gitlab: 'https://gitlab.com/merveilleagossouve',
    tiktok: 'https://www.tiktok.com/@mervo.19',
    comeup: 'https://comeup.com/fr/@merveilleagossouve',
  },
  // Téléphone : comme il s'affiche, puis le même en chiffres (avec l'indicatif 229 du Bénin)
  phone: '+229 01 46 04 65 44',
  phoneDigits: '2290146046544',
  // WhatsApp : même format en chiffres. Laisse vide ('') si ce numéro n'a pas WhatsApp.
  whatsapp: '22946046544',

  // Ta photo : mets le fichier dans le dossier "public" (ex. public/merveille.jpg)
  // puis écris ici '/merveille.jpg'. Laisse vide pour afficher ton monogramme.
  photo: '/merveille.jpeg',

  // Formulaire de contact : voir le README (étape « Activer le formulaire »).
  web3formsKey: '155cd665-4787-45a3-98fc-b74875457b18',
}

/** Stages : les logos ne changent pas de langue. */
export const stages = [
  { company: 'DigiWeb', logo: '/logos/digiweb.jpeg' },
  { company: 'Kas Digit', logo: '/logos/kas-digit.jpeg' },
  { company: 'DBC', full: 'Digital Business Company', logo: '/logos/dbc.jpeg' },
]

export type Lang = 'fr' | 'en'
export type Lane = 'commun' | 'territoire' | 'code'
export type SkillSide = 'code' | 'territoire'
type ServiceSide = 'Code' | 'Terrain'

export type Project = {
  name: string
  kind: string
  status?: string
  team?: boolean
  role?: string
  problem: string
  solution: string
  stack: string[]
  link?: string
  image?: string
  /** Remplace « Voir l'aperçu » sur la carte de ce projet (facultatif) */
  previewLabel?: string
  mock?: 'foodstore' | 'vigibat'
  visible: boolean
}

/* ------------------------------------------------------------------ */
/*  FRANÇAIS                                                            */
/* ------------------------------------------------------------------ */

const fr = {
  site: {
    title: 'Développeuse Full-Stack & Aménagiste du territoire',
    tagline: 'Je crée des solutions numériques pour répondre à des besoins concrets.',
    country: 'Bénin',
  },

  seo: {
    title: 'Merveille AGOSSOU-VE · Développeuse Full-Stack & Aménagiste du territoire',
    description:
      'Merveille AGOSSOU-VE, développeuse full-stack et Aménagiste du territoire. Je crée des solutions numériques pour répondre à des besoins concrets.',
    ogDescription:
      'Deux regards, un seul projet : le terrain et le code. Des solutions numériques pour des besoins concrets.',
    twitterDescription: 'Deux regards, un seul projet : le terrain et le code.',
    locale: 'fr_FR',
  },

  ui: {
    skip: 'Aller au contenu',
    backHome: "Retour à l'accueil",
    mainNav: 'Navigation principale',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    seeProjects: 'Voir mes projets',
    contactMe: 'Me contacter',
    scrollDown: 'Descendre',
    whatsappTip: 'Écrivez-moi sur WhatsApp',
  },

  nav: {
    about: 'À propos',
    parcours: 'Parcours',
    skills: 'Compétences',
    projects: 'Projets',
    services: 'Services',
    horsEcran: 'Hors écran',
    contact: 'Contact',
  },

  about: {
    meta: 'À propos',
    terrainCode: 'Terrain & code',
    portraitAlt: `Portrait de ${site.firstName} ${site.lastName}`,
    signed: `Signé ${site.firstName}`,
    intro: [
      'Votre projet mérite d’être compris avant d’être codé.',
      'C’est ma façon de travailler : d’abord comprendre les besoins sur le terrain, ensuite créer un site ou une application simple, rapide et agréable à utiliser.',
      'Aménagiste du territoire et développeuse full-stack : je parle à la fois le langage des habitants et celui du code.',
    ],
  },

  parcours: {
    meta: 'Parcours',
    titleA: 'Deux chemins',
    titleB: 'qui se rejoignent.',
    aside:
      'Comme une ligne de transport en ville : un départ commun, deux voies qui avancent en même temps, puis un même terminus.',
    stages: 'Stages en entreprise',
    roleStage: 'Stage',
    items: [
      {
        lane: 'commun' as Lane,
        years: '2023',
        title: 'Baccalauréat série D',
        place: 'CEG Vakon',
        text: 'Une base scientifique, et l’envie de comprendre comment fonctionnent les choses.',
      },
      {
        lane: 'territoire' as Lane,
        years: '2023 → 2026',
        title: 'Licence en Aménagement du territoire',
        place: 'FLASH Adjarra',
        text: 'Diagnostic de territoire, enquêtes de terrain, analyse des besoins des habitants.',
      },
      {
        lane: 'code' as Lane,
        years: '2023 → 2026',
        title: 'Licence en Systèmes Informatiques et Logiciels',
        place: 'UPAO',
        text: 'Développement web, bases de données, conception d’applications.',
      },
      {
        lane: 'commun' as Lane,
        years: '2026',
        title: 'Les deux chemins se rejoignent',
        place: 'Porto-Novo',
        text: 'Développeuse full-stack et Aménagiste du territoire : je relie la ville et le code.',
      },
    ],
  },

  skills: {
    meta: 'Compétences',
    titleA: 'Deux métiers,',
    titleB: 'un même fil.',
    aside:
      'Deux collections, une même signature. Chaque compétence est une pièce taillée pour un vrai besoin.',
    labels: { territoire: 'Aménagement', code: 'Développement' },
    pieces: 'pièces',
    items: [
      { name: 'HTML', note: 'La structure claire de chaque page', side: 'code' as SkillSide },
      { name: 'CSS', note: 'Le style, et un site parfait sur téléphone', side: 'code' as SkillSide },
      { name: 'JavaScript', note: 'Les interactions et les animations', side: 'code' as SkillSide },
      { name: 'Laravel', note: 'Des sites et espaces de gestion solides', side: 'code' as SkillSide },
      { name: 'Django', note: 'Des applications web en Python', side: 'code' as SkillSide },
      { name: 'React', note: 'Des interfaces rapides et modernes', side: 'code' as SkillSide },
      { name: 'MySQL', note: 'Des bases de données fiables', side: 'code' as SkillSide },
      { name: 'PostgreSQL', note: 'Des données riches, même cartographiques', side: 'code' as SkillSide },
      { name: 'Bootstrap', note: 'Des mises en page propres, vite', side: 'code' as SkillSide },
      { name: 'Modélisation UML', note: 'Le plan du logiciel avant de coder', side: 'code' as SkillSide },
      { name: 'Diagnostic territorial', note: 'Lire un territoire : ses forces, ses manques', side: 'territoire' as SkillSide },
      { name: 'Gestion urbaine', note: 'Organiser la ville et la faire vivre', side: 'territoire' as SkillSide },
      { name: 'Analyse environnementale', note: 'Mesurer l’impact d’un projet sur le milieu', side: 'territoire' as SkillSide },
      { name: 'Planification spatiale', note: 'Prévoir le bon usage de chaque espace', side: 'territoire' as SkillSide },
      { name: 'KoboCollect', note: 'Des enquêtes de terrain, sur téléphone', side: 'territoire' as SkillSide },
      { name: 'Analyse des besoins', note: 'Écouter, puis classer les vraies attentes', side: 'territoire' as SkillSide },
      { name: 'SIG Web', note: 'Des cartes en ligne pour décider', side: 'territoire' as SkillSide },
    ],
  },

  projects: {
    meta: 'Projets',
    titleA: 'Chaque projet a',
    titleB: 'deux faces.',
    intro:
      'Côté terrain, la question que pose la ville. Côté code, l’outil qui y répond. Retournez les cartes pour passer de l’un à l’autre.',
    hintTerrain: 'terrain',
    hintCode: 'code',
    team: 'Projet d’équipe',
    myRole: 'Mon rôle :',
    problem: 'Le problème',
    solution: 'La solution',
    preview: 'Voir l’aperçu',
    back: 'Revenir',
    visit: 'Visiter',
    mockTag: 'Maquette',
    previewAlt: 'Aperçu du site ',
    enlarge: 'Agrandir',
    close: 'Fermer',
    nextA: 'Le prochain projet,',
    nextB: 'c’est le vôtre.',
    nextCta: 'Parlons-en',
    items: [
      {
        name: 'BeninClean',
        kind: 'Gestion des déchets',
        problem:
          'Dans nos quartiers, les déchets ménagers s’accumulent : les passages de collecte sont irréguliers et les ménages ne savent pas à qui s’adresser.',
        solution:
          'Une plateforme qui relie ménages, collecteurs et autorités : abonnement à la collecte, planning des passages, signalement des dépôts sauvages sur la carte.',
        stack: ['Laravel', 'MySQL', 'OpenStreetMap'],
        image: '/projets-beninclean.webp',
        link: 'https://benincleaan.onrender.com/',
        visible: true,
      },
      {
        name: 'FoodStore',
        kind: 'Restauration de proximité',
        problem:
          'Les petits restaurants de quartier sont nombreux mais invisibles en ligne : difficile de savoir où bien manger près de chez soi.',
        solution:
          'Une application qui localise les petits restos les plus proches, affiche leurs plats et leurs prix, et guide jusqu’à eux grâce à la carte.',
        stack: ['React', 'Django', 'PostgreSQL', 'OpenStreetMap'],
        image: '/projets-foodstore.webp',
        link: 'https://food-store-f1ab.onrender.com/',
        visible: true,
      },
      {
        name: 'VigiBat',
        kind: 'Suivi de chantier',
        status: 'En cours',
        problem:
          'Beaucoup de propriétaires construisent à distance et ne voient pas l’avancement réel de leur chantier : retards, dépenses floues, malentendus.',
        solution:
          'Une plateforme où le propriétaire suit son chantier de près : étapes, photos, dépenses et échanges avec l’équipe, au même endroit.',
        stack: ['React', 'Laravel', 'PostgreSQL'],
        mock: 'vigibat' as const,
        visible: true,
      },
      {
        name: 'FlashPi',
        kind: 'Projet d’équipe',
        team: true,
        role: 'À compléter',
        problem: 'À compléter.',
        solution: 'À compléter.',
        stack: [],
        visible: false,
      },
      {
        name: 'Cap Histo-Géo',
        kind: 'Projet d’équipe',
        team: true,
        role: 'À compléter',
        problem: 'À compléter.',
        solution: 'À compléter.',
        stack: [],
        visible: false,
      },
    ] as Project[],
  },

  services: {
    meta: 'Services',
    scriptTitle: 'Mes',
    mainTitle: 'Services',
    introBefore: 'Deux métiers, une seule personne : je construis votre outil numérique ',
    introWord: 'et',
    introAfter: ' je comprends le terrain où il sera utilisé.',
    labels: { Code: 'À l’écran', Terrain: 'Sur le terrain' },
    keys: { Code: 'Code', Terrain: 'Terrain' },
    cta: 'Parler de mon projet',
    note: 'Tous mes sites s’adaptent au téléphone, à la tablette et à l’ordinateur.',
    items: [
      {
        title: 'Sites web sur mesure',
        side: 'Code' as ServiceSide,
        text: 'Un site complet, pensé pour votre activité : plusieurs pages, un espace pour vos clients et un tableau de bord pour tout gérer vous-même.',
        gets: ['Des pages adaptées à vos besoins', 'Espace client et formulaires', 'Un site rapide et sécurisé'],
      },
      {
        title: 'Sites vitrines',
        side: 'Code' as ServiceSide,
        text: 'Un site clair qui présente votre activité, rassure vos clients et leur donne envie de vous appeler.',
        gets: ['Un design fait pour vous, pas un modèle', 'Bien placé sur Google', 'Facile à mettre à jour'],
      },
      {
        title: 'Pages de lancement',
        side: 'Code' as ServiceSide,
        text: 'Une seule page, un seul but : faire réserver, s’inscrire ou commander. Idéale pour un produit, une offre ou un événement.',
        gets: ['Un message court qui va droit au but', 'Le bouton d’action au bon endroit', 'Formulaire ou WhatsApp intégré'],
      },
      {
        title: 'Boutiques en ligne',
        side: 'Code' as ServiceSide,
        text: 'Vos produits en vitrine, un panier et des commandes qui vous arrivent directement, même quand la boutique est fermée.',
        gets: ['Un catalogue simple à gérer', 'Commande directe ou par WhatsApp', 'Le suivi de chaque commande'],
      },
      {
        title: 'Applications SaaS',
        side: 'Code' as ServiceSide,
        text: 'Un logiciel en ligne que vos clients utilisent sur abonnement, depuis leur téléphone ou leur ordinateur, sans rien installer.',
        gets: ['Comptes utilisateurs et abonnements', 'Tableau de bord clair', 'Une base solide qui grandit avec vous'],
      },
      {
        title: 'Design UI/UX',
        side: 'Code' as ServiceSide,
        text: 'Avant de coder, je dessine vos écrans : un parcours simple, des pages claires et agréables, testées pour que vos visiteurs trouvent tout sans effort.',
        gets: ['Maquettes de chaque écran', 'Un parcours pensé pour vos clients', 'Une identité visuelle cohérente'],
      },
      {
        title: 'Refonte de site',
        side: 'Code' as ServiceSide,
        text: 'Votre site est lent, daté ou mal vu sur téléphone ? Je le modernise en gardant ce qui marche, pour qu’il redevienne votre meilleure vitrine.',
        gets: ['Un nouveau design moderne', 'Un site plus rapide et lisible sur mobile', 'Vos contenus repris sans rien perdre'],
      },
      {
        title: 'Maintenance',
        side: 'Code' as ServiceSide,
        text: 'Je veille sur votre site après sa mise en ligne : mises à jour, sauvegardes, corrections et petites évolutions, pour qu’il reste rapide et sûr.',
        gets: ['Mises à jour et sauvegardes', 'Corrections rapides en cas de souci', 'Petits ajouts quand vous en avez besoin'],
      },
      {
        title: 'Cartes interactives',
        side: 'Code' as ServiceSide,
        text: 'Vos points de vente, zones de livraison ou itinéraires sur une carte claire, dans votre site ou votre application.',
        gets: ['Cartes OpenStreetMap, sans abonnement', 'Recherche d’adresse', 'Vos lieux et vos zones bien visibles'],
      },
      {
        title: 'Études de terrain',
        side: 'Terrain' as ServiceSide,
        text: 'Je vais à la rencontre des habitants, j’observe et je mesure les besoins, puis je vous remets un rapport clair pour bien décider.',
        gets: ['Enquêtes et entretiens', 'Diagnostic du quartier ou de la zone', 'Un rapport simple, avec cartes et chiffres'],
      },
      {
        title: 'Valorisation de vos espaces',
        side: 'Terrain' as ServiceSide,
        text: 'Un terrain, une cour, un local ou un quartier : je vous propose comment l’organiser et le mettre en valeur pour qu’il serve mieux.',
        gets: ['Lecture de l’espace tel qu’il est', 'Des propositions d’aménagement', 'Un accompagnement jusqu’au bout'],
      },
    ],
  },

  horsEcran: {
    meta: 'Hors écran',
    titleA: 'Ce qui me fait',
    titleB: 'avancer.',
    kicker: 'Entrepreneuse',
    business: {
      name: 'Marche & Style',
      text: 'Entrepreneuse, je dirige aussi ma propre activité de vente de chaussures. Elle m’apprend chaque jour la responsabilité, la négociation et le soin du détail.',
    },
    hobbiesLabel: 'Mes loisirs',
    hobbies: ['Mode & style', 'Lecture', 'Musique', 'Vidéos publicitaires & motion'],
  },

  contact: {
    meta: 'Contact',
    bigA: 'Parlons',
    bigB: '-en',
    srTitle: 'Contact',
    available: 'Disponible pour vos projets',
    copy: 'Copier',
    copied: 'Copié',
    copyAria: 'Copier l’adresse email',
    write: 'Écrire',
    call: 'Appeler',
    phoneKicker: 'Votre projet',
    phoneTitleA: 'Le prochain projet',
    phoneTitleB: ', c’est le vôtre.',
    phoneLive: 'En ligne',
    progress: 'Avancement',
    phoneCta: 'Lancer mon projet',
    steps: [
      { title: 'L’idée', text: 'On en parle ensemble' },
      { title: 'Le terrain', text: 'Je comprends les besoins' },
      { title: 'La maquette', text: 'On dessine les écrans' },
      { title: 'En ligne', text: 'Votre site est lancé' },
    ],
    name: 'Votre nom *',
    email: 'Votre email *',
    subject: 'Sujet',
    message: 'Votre message *',
    required: 'Merci de remplir votre nom, votre email et votre message.',
    invalidEmail: 'Cette adresse email ne semble pas valide.',
    genericError: 'Une erreur est survenue. Réessayez un peu plus tard.',
    networkError: `Impossible d’envoyer le message pour le moment. Écrivez-moi directement à ${site.email}.`,
    success: 'Message envoyé ! Je vous réponds très vite.',
    mailto: 'Votre messagerie s’est ouverte avec le message prêt : il ne reste qu’à envoyer.',
    sending: 'Envoi en cours…',
    submit: 'Envoyer le message',
    note: 'Vos informations servent uniquement à vous répondre.',
    mailtoSubject: 'Message depuis votre portfolio',
    web3formsSubject: 'Nouveau message depuis votre portfolio',
  },

  footer: {
    ring: 'Solutions numériques · Besoins concrets · Villes & territoires · ',
    sloganA: 'Vous avez l’idée.',
    sloganB: 'Je la rends réelle.',
    cta: 'Démarrer mon projet',
    note: 'Réponse sous 24 h',
    copy: 'Imaginons. Concevons. Développons. Innovons.',
  },

  /** Textes des maquettes dessinées en code (projets sans capture d'écran). */
  mocks: {
    food: {
      search: 'Un plat, un quartier…',
      title: 'Les plus proches de vous',
      currency: 'F',
      restos: [
        { name: 'Chez Tantie Rose', dish: 'Amiwo & poulet', price: '1 500', dist: '250 m', note: '4,8' },
        { name: 'Le Maquis du Coin', dish: 'Pâte rouge & poisson', price: '1 200', dist: '600 m', note: '4,6' },
        { name: 'Saveurs de Ouando', dish: 'Riz au gras', price: '1 000', dist: '900 m', note: '4,5' },
      ],
    },
    vigi: {
      site: 'Mon chantier',
      place: 'Villa · Abomey-Calavi',
      pct: '64 % réalisé · livraison prévue en mars',
      expenses: 'Dépenses',
      budget: 'sur 13 M F prévus',
      photos: 'Photos du jour',
      steps: [
        { label: 'Fondations', state: 'done' },
        { label: 'Élévation des murs', state: 'done' },
        { label: 'Toiture', state: 'now' },
        { label: 'Finitions', state: 'todo' },
      ],
    },
  },
}

export type Content = typeof fr

/* ------------------------------------------------------------------ */
/*  ANGLAIS                                                             */
/* ------------------------------------------------------------------ */

const en: Content = {
  site: {
    title: 'Full-Stack Developer & Territorial Planner',
    tagline: 'I create digital solutions to meet concrete needs.',
    country: 'Benin',
  },

  seo: {
    title: 'Merveille AGOSSOU-VE · Full-Stack Developer & Territorial Planner',
    description:
      'Merveille AGOSSOU-VE, full-stack developer and Territorial Planner. I create digital solutions to meet concrete needs.',
    ogDescription:
      'Two perspectives, one goal: the field and the code. Digital solutions for concrete needs.',
    twitterDescription: 'Two perspectives, one goal: the field and the code.',
    locale: 'en_US',
  },

  ui: {
    skip: 'Skip to content',
    backHome: 'Back to home',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    seeProjects: 'See my projects',
    contactMe: 'Contact me',
    scrollDown: 'Scroll down',
    whatsappTip: 'Message me on WhatsApp',
  },

  nav: {
    about: 'About',
    parcours: 'Journey',
    skills: 'Skills',
    projects: 'Projects',
    services: 'Services',
    horsEcran: 'Off screen',
    contact: 'Contact',
  },

  about: {
    meta: 'About',
    terrainCode: 'Field & code',
    portraitAlt: `Portrait of ${site.firstName} ${site.lastName}`,
    signed: `Signed, ${site.firstName}`,
    intro: [
      'Your project deserves to be understood before it is coded.',
      'That is how I work: first I understand the needs on the ground, then I build a simple, fast and enjoyable website or app.',
      'Territorial planner and full-stack developer: I speak both the language of local residents and the language of code.',
    ],
  },

  parcours: {
    meta: 'Journey',
    titleA: 'Two paths',
    titleB: 'that meet.',
    aside: 'Like a city transit line: a shared starting point, two tracks running side by side, then the same destination.',
    stages: 'Work placements',
    roleStage: 'Internship',
    items: [
      {
        lane: 'commun',
        years: '2023',
        title: 'Scientific high school diploma',
        place: 'CEG Vakon',
        text: 'A scientific foundation, and a real curiosity about how things work.',
      },
      {
        lane: 'territoire',
        years: '2023 → 2026',
        title: 'Degree in Territorial Planning',
        place: 'FLASH Adjarra',
        text: 'Territorial diagnosis, field surveys, analysis of residents’ needs.',
      },
      {
        lane: 'code',
        years: '2023 → 2026',
        title: 'Degree in Computer Systems and Software',
        place: 'UPAO',
        text: 'Web development, databases, application design.',
      },
      {
        lane: 'commun',
        years: '2026',
        title: 'The two paths meet',
        place: 'Porto-Novo',
        text: 'Full-stack developer and Territorial Planner: I connect the city and the code.',
      },
    ],
  },

  skills: {
    meta: 'Skills',
    titleA: 'Two professions,',
    titleB: 'one common thread.',
    aside: 'Two collections, one signature. Each skill is a piece cut for a real need.',
    labels: { territoire: 'Planning', code: 'Development' },
    pieces: 'pieces',
    items: [
      { name: 'HTML', note: 'The clear structure of every page', side: 'code' },
      { name: 'CSS', note: 'Style, and a site that shines on phones', side: 'code' },
      { name: 'JavaScript', note: 'Interactions and animations', side: 'code' },
      { name: 'Laravel', note: 'Solid websites and admin areas', side: 'code' },
      { name: 'Django', note: 'Web applications in Python', side: 'code' },
      { name: 'React', note: 'Fast, modern interfaces', side: 'code' },
      { name: 'MySQL', note: 'Reliable databases', side: 'code' },
      { name: 'PostgreSQL', note: 'Rich data, maps included', side: 'code' },
      { name: 'Bootstrap', note: 'Clean layouts, quickly', side: 'code' },
      { name: 'UML modelling', note: 'The software blueprint before coding', side: 'code' },
      { name: 'Territorial diagnosis', note: 'Reading a territory: strengths and gaps', side: 'territoire' },
      { name: 'Urban management', note: 'Organising the city and keeping it alive', side: 'territoire' },
      { name: 'Environmental analysis', note: 'Measuring a project’s impact on its setting', side: 'territoire' },
      { name: 'Spatial planning', note: 'Planning the right use of every space', side: 'territoire' },
      { name: 'KoboCollect', note: 'Field surveys, on a phone', side: 'territoire' },
      { name: 'Needs analysis', note: 'Listening, then ranking real needs', side: 'territoire' },
      { name: 'Web GIS', note: 'Online maps to support decisions', side: 'territoire' },
    ],
  },

  projects: {
    meta: 'Projects',
    titleA: 'Every project has',
    titleB: 'two sides.',
    intro:
      'On the field side, the question the city asks. On the code side, the tool that answers it. Flip the cards to move from one to the other.',
    hintTerrain: 'field',
    hintCode: 'code',
    team: 'Team project',
    myRole: 'My role:',
    problem: 'The problem',
    solution: 'The solution',
    preview: 'See the preview',
    back: 'Go back',
    visit: 'Visit',
    mockTag: 'Mock-up',
    previewAlt: 'Preview of the site ',
    enlarge: 'Enlarge',
    close: 'Close',
    nextA: 'The next project,',
    nextB: 'could be yours.',
    nextCta: 'Let’s talk',
    items: [
      {
        name: 'BeninClean',
        kind: 'Waste management',
        problem:
          'In our neighbourhoods, household waste piles up: collection rounds are irregular and residents do not know who to contact.',
        solution:
          'A platform connecting households, collectors and local authorities: collection subscriptions, pickup schedules and reports of illegal dumping on the map.',
        stack: ['Laravel', 'MySQL', 'OpenStreetMap'],
        image: '/projets-beninclean.webp',
        link: 'https://benincleaan.onrender.com/',
        visible: true,
      },
      {
        name: 'FoodStore',
        kind: 'Local food',
        problem:
          'Small neighbourhood restaurants are plentiful but invisible online: it is hard to know where to eat well nearby.',
        solution:
          'An app that finds the nearest small restaurants, shows their dishes and prices, and guides you there with a map.',
        stack: ['React', 'Django', 'PostgreSQL', 'OpenStreetMap'],
        image: '/projets-foodstore.webp',
        link: 'https://food-store-f1ab.onrender.com/',
        visible: true,
      },
      {
        name: 'VigiBat',
        kind: 'Construction tracking',
        status: 'In progress',
        problem:
          'Many owners build from a distance and cannot see the real progress of their site: delays, unclear costs and misunderstandings.',
        solution:
          'A platform where owners follow their build closely: milestones, photos, expenses and chats with the team, all in one place.',
        stack: ['React', 'Laravel', 'PostgreSQL'],
        mock: 'vigibat',
        visible: true,
      },
      {
        name: 'FlashPi',
        kind: 'Team project',
        team: true,
        role: 'To be completed',
        problem: 'To be completed.',
        solution: 'To be completed.',
        stack: [],
        visible: false,
      },
      {
        name: 'Cap Histo-Géo',
        kind: 'Team project',
        team: true,
        role: 'To be completed',
        problem: 'To be completed.',
        solution: 'To be completed.',
        stack: [],
        visible: false,
      },
    ],
  },

  services: {
    meta: 'Services',
    scriptTitle: 'My',
    mainTitle: 'Services',
    introBefore: 'Two professions, one person: I build your digital tool ',
    introWord: 'and',
    introAfter: ' I understand the field where it will be used.',
    labels: { Code: 'On screen', Terrain: 'On the field' },
    keys: { Code: 'Code', Terrain: 'Field' },
    cta: 'Talk about my project',
    note: 'All my websites work on phones, tablets and computers.',
    items: [
      {
        title: 'Custom websites',
        side: 'Code',
        text: 'A complete website, built around your business: several pages, a space for your customers and a dashboard to manage everything yourself.',
        gets: ['Pages tailored to your needs', 'Client area and forms', 'A fast and secure website'],
      },
      {
        title: 'Brochure websites',
        side: 'Code',
        text: 'A clear website that presents your business, reassures your customers and makes them want to call you.',
        gets: ['A design made for you, not a template', 'Well positioned on Google', 'Easy to update'],
      },
      {
        title: 'Landing pages',
        side: 'Code',
        text: 'One page, one goal: get bookings, sign-ups or orders. Ideal for a product, an offer or an event.',
        gets: ['A short message that gets to the point', 'The call-to-action in the right place', 'Form or WhatsApp integrated'],
      },
      {
        title: 'Online shops',
        side: 'Code',
        text: 'Your products on display, a cart and orders arriving directly to you, even when the shop is closed.',
        gets: ['A catalogue that is easy to manage', 'Direct orders or via WhatsApp', 'Tracking for every order'],
      },
      {
        title: 'SaaS applications',
        side: 'Code',
        text: 'An online software your customers use on a subscription, from their phone or computer, with nothing to install.',
        gets: ['User accounts and subscriptions', 'A clear dashboard', 'A solid foundation that grows with you'],
      },
      {
        title: 'UI/UX design',
        side: 'Code',
        text: 'Before coding, I design your screens: a simple journey, clear and pleasant pages, tested so your visitors find everything easily.',
        gets: ['Mock-ups of every screen', 'A journey designed for your customers', 'A consistent visual identity'],
      },
      {
        title: 'Website redesign',
        side: 'Code',
        text: 'Is your site slow, outdated or awkward on mobile? I modernise it while keeping what works, so it becomes your best showcase again.',
        gets: ['A fresh modern design', 'A faster, more readable site on mobile', 'All your content kept, nothing lost'],
      },
      {
        title: 'Maintenance',
        side: 'Code',
        text: 'I look after your site after launch: updates, backups, fixes and small improvements, so it stays fast and secure.',
        gets: ['Updates and backups', 'Quick fixes when something breaks', 'Small additions whenever you need them'],
      },
      {
        title: 'Interactive maps',
        side: 'Code',
        text: 'Your shops, delivery areas or routes on a clear map, inside your website or app.',
        gets: ['OpenStreetMap maps, no subscription', 'Address search', 'Your places and areas clearly visible'],
      },
      {
        title: 'Field studies',
        side: 'Terrain',
        text: 'I meet residents, observe and measure needs, then give you a clear report to help you decide.',
        gets: ['Surveys and interviews', 'Diagnosis of the neighbourhood or area', 'A simple report, with maps and figures'],
      },
      {
        title: 'Making the most of your spaces',
        side: 'Terrain',
        text: 'A plot, a courtyard, a room or a neighbourhood: I suggest how to organise and improve it so it works better.',
        gets: ['A reading of the space as it is', 'Planning proposals', 'Support all the way through'],
      },
    ],
  },

  horsEcran: {
    meta: 'Off screen',
    titleA: 'What keeps me',
    titleB: 'moving.',
    kicker: 'Entrepreneur',
    business: {
      name: 'Marche & Style',
      text: 'As an entrepreneur, I also run my own shoe business. It teaches me every day responsibility, negotiation and care for details.',
    },
    hobbiesLabel: 'My hobbies',
    hobbies: ['Fashion & style', 'Reading', 'Music', 'Ad videos & motion'],
  },

  contact: {
    meta: 'Contact',
    bigA: 'Let’s',
    bigB: ' talk',
    srTitle: 'Contact',
    available: 'Available for your projects',
    copy: 'Copy',
    copied: 'Copied',
    copyAria: 'Copy email address',
    write: 'Email',
    call: 'Call',
    phoneKicker: 'Your project',
    phoneTitleA: 'The next project',
    phoneTitleB: ', could be yours.',
    phoneLive: 'Live',
    progress: 'Progress',
    phoneCta: 'Start my project',
    steps: [
      { title: 'The idea', text: 'We talk it through' },
      { title: 'The field', text: 'I understand the needs' },
      { title: 'The mock-up', text: 'We design the screens' },
      { title: 'Live', text: 'Your site is launched' },
    ],
    name: 'Your name *',
    email: 'Your email *',
    subject: 'Subject',
    message: 'Your message *',
    required: 'Please fill in your name, email and message.',
    invalidEmail: 'This email address does not seem valid.',
    genericError: 'Something went wrong. Please try again later.',
    networkError: `Could not send the message right now. You can email me directly at ${site.email}.`,
    success: 'Message sent! I will get back to you very soon.',
    mailto: 'Your email app opened with the message ready: all you have to do is send it.',
    sending: 'Sending…',
    submit: 'Send message',
    note: 'Your details are only used to reply to you.',
    mailtoSubject: 'Message from your portfolio',
    web3formsSubject: 'New message from your portfolio',
  },

  footer: {
    ring: 'Digital solutions · Concrete needs · Towns & territories · ',
    sloganA: 'You have the idea.',
    sloganB: 'I make it real.',
    cta: 'Start my project',
    note: 'Reply within 24 h',
    copy: 'Let’s imagine. Let’s design. Let’s build. Let’s innovate.',
  },

  mocks: {
    food: {
      search: 'A dish, a neighbourhood…',
      title: 'Nearest to you',
      currency: 'F',
      restos: [
        { name: 'Chez Tantie Rose', dish: 'Amiwo & chicken', price: '1 500', dist: '250 m', note: '4.8' },
        { name: 'Le Maquis du Coin', dish: 'Red paste & fish', price: '1 200', dist: '600 m', note: '4.6' },
        { name: 'Saveurs de Ouando', dish: 'Fried rice', price: '1 000', dist: '900 m', note: '4.5' },
      ],
    },
    vigi: {
      site: 'My build',
      place: 'Villa · Abomey-Calavi',
      pct: '64% complete · delivery expected in March',
      expenses: 'Expenses',
      budget: 'of 13M F budgeted',
      photos: 'Today’s photos',
      steps: [
        { label: 'Foundations', state: 'done' },
        { label: 'Walls', state: 'done' },
        { label: 'Roof', state: 'now' },
        { label: 'Finishing', state: 'todo' },
      ],
    },
  },
}

/** La bonne langue, avec la même structure dans les deux cas. */
export function getContent(lang: Lang): Content {
  return lang === 'en' ? en : fr
}
