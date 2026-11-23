# Portfolio de Merveille AGOSSOU-VE

**« Deux regards, un seul projet »** : le terrain et le code.
Site en **React + Vite + TypeScript**, avec des animations (GSAP, Lenis).

---

## 1. Lancer le site sur ton ordinateur

Ouvre un terminal dans le dossier du projet, puis :

```bash
npm install
```

```bash
npm run dev
```

Ouvre ensuite l'adresse affichée (en général `http://localhost:5173`).

---

## 2. Changer les textes

**Tout le texte du site est dans un seul fichier : `src/data/content.ts`.**

| Ce que tu veux changer | Où, dans `content.ts` |
| --- | --- |
| Nom, titre, phrase d'accroche, email, ville | `site` |
| Présentation « À propos » et chiffres clés | `about` |
| Frise du parcours (BAC, licences…) | `parcours` |
| Stages en entreprise | `stages` |
| Compétences | `skills` (`side` : `'territoire'`, `'code'` ou `'pont'`) |
| Projets | `projects` |
| Marche et Style, loisirs | `horsEcran` |

### Ajouter un projet (ex. FlashPi, Cap Histo-Géo)

Les projets **FlashPi** et **Cap Histo-Géo** sont déjà prêts mais **cachés** (`visible: false`).
Remplis `role`, `problem`, `solution` et `stack`, puis mets `visible: true`.

### Ajouter LinkedIn, GitHub ou WhatsApp

Dans `site`, remplis `linkedin`, `github` ou `whatsapp` (numéro sans `+` ni espaces, ex. `22997000000`).
Les icônes apparaissent alors toutes seules dans la partie Contact.

---

## 3. Ajouter ta photo

1. Mets ta photo dans le dossier **`public`**, par exemple `public/merveille.jpg`
   (une photo carrée, au moins 400 × 400 pixels).
2. Dans `src/data/content.ts`, écris : `photo: '/merveille.jpg',`

Elle apparaît dans le cercle de la section « À propos ».

## 3 bis. Ajouter les logos des entreprises de stage

1. Mets chaque logo dans `public/logos/` (ex. `public/logos/digiweb.png`).
2. Dans `src/data/content.ts`, partie `stages`, écris `logo: '/logos/digiweb.png'`.

Sans logo, un badge avec les initiales s'affiche.

---

## 4. Le formulaire de contact

**Il marche déjà** : quand un visiteur clique sur « Envoyer », sa messagerie s'ouvre avec le message
tout prêt, adressé à ton email.

Pour recevoir les messages **directement** dans ta boîte mail (sans que le visiteur ouvre sa messagerie) :

1. Va sur **https://web3forms.com/** et entre ton adresse email.
2. Ouvre l'email reçu pour **activer ta clé**.
3. Dans `src/data/content.ts`, remplace `'VOTRE_CLE_WEB3FORMS_ICI'` par ta clé.

---

## 5. Mettre le site en ligne (gratuit)

### Avec Vercel (recommandé)
1. Mets le projet sur GitHub.
2. Crée un compte sur https://vercel.com et importe le dépôt.
3. Vercel reconnaît Vite tout seul : clique sur **Deploy**.

### Avec Netlify
- Commande de build : `npm run build`
- Dossier à publier : `dist`

Pour vérifier la version finale avant de la mettre en ligne :

```bash
npm run build
```

```bash
npm run preview
```

---

## 6. Les couleurs

Elles sont dans `src/styles/tokens.css` :

Une seule ambiance, **noir et or** : texte crème, or pour les accents, cuivre pour le côté code.

L'image du fond (lignes dorées sur cuir noir) est `public/fond.jpg` (et `public/fond-large.jpg` pour les écrans en largeur).

---

## 7. Ce qui marche partout

- **Téléphone** : mise en page adaptée, le plan se transforme quand il est entièrement visible.
- **Visiteurs qui ont réduit les animations** sur leur appareil : les animations sont coupées.
- **Compétences** : deux rubans qui défilent et se croisent ; ils s'arrêtent hors de l'écran et ralentissent au survol.

---

## Organisation des fichiers

```
src/
├── data/content.ts        ← tous les textes
├── components/            ← les sections (Hero = le plan qui devient site, About, Parcours, Skills, Projects…)
├── hooks/                 ← défilement fluide, effet aimant, animations partagées (useMotion)
├── lib/                   ← détection de l'appareil, GSAP (gsap.ts), liens de contact (links.ts)
└── styles/                ← tout le design (tokens.css = les couleurs)
```
