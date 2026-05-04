export const defaultLocale = 'en';

export const locales = ['en', 'es', 'fr', 'de', 'pt'] as const;

export type Locale = (typeof locales)[number];

export interface LocalizedPageCopy {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    signIn: string;
    languageSwitcherLabel: string;
  };
  hero: {
    eyebrow: string;
    title: {
      top: string;
      accent: string;
      bottom: string;
    };
    description: string;
    cta: string;
    note: string;
    companionEyebrow: string;
    companionTitle: string;
    companionLanguages: string;
  };
  languages: {
    title: string;
    intro: string;
    moreSoon: string;
    cards: Array<{
      flag: string;
      name: string;
      label: string;
      tagline: string;
    }>;
  };
  howItWorks: {
    eyebrow: string;
    title: {
      line1: string;
      line2: string;
    };
    stepLabel: string;
    steps: Array<{
      icon: string;
      color: string;
      title: string;
      body: string;
      offset: boolean;
    }>;
  };
  levels: {
    eyebrow: string;
    title: string;
    note: string;
    items: Array<{
      name: string;
      body: string;
      fill: string;
    }>;
  };
  features: {
    eyebrow: string;
    title: string;
    items: Array<{
      icon: string;
      title: string;
      body: string;
    }>;
  };
  comingSoon: {
    eyebrow: string;
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    description: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  cta: {
    eyebrow: string;
    title: {
      line1: string;
      line2: string;
    };
    body: string;
    button: string;
  };
  footer: {
    tagline: string;
    privacy: string;
    contact: string;
  };
}

export const localeLabels: Record<Locale, { label: string; nativeLabel: string }> = {
  en: { label: 'English', nativeLabel: 'English' },
  es: { label: 'Spanish', nativeLabel: 'Español' },
  fr: { label: 'French', nativeLabel: 'Français' },
  de: { label: 'German', nativeLabel: 'Deutsch' },
  pt: { label: 'Portuguese', nativeLabel: 'Português' },
};

export const localeOgLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLocalizedPath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

export function getLocaleCopy(locale: Locale): LocalizedPageCopy {
  return pageCopy[locale];
}

const pageCopy: Record<Locale, LocalizedPageCopy> = {
  en: {
    meta: {
      title: 'SpeakPath — Practice Real Language Conversations with AI',
      description:
        'Practice real conversations in English, Spanish, French, or German with an AI that listens, responds, and helps you grow. Start free, no download needed.',
      ogLocale: 'en_US',
    },
    nav: {
      signIn: 'Sign In',
      languageSwitcherLabel: 'Choose site language',
    },
    hero: {
      eyebrow: 'AI-Powered Fluency Engine',
      title: {
        top: 'Speak.',
        accent: 'Learn.',
        bottom: 'Improve.',
      },
      description:
        'Master any language through real conversation practice. SpeakPath helps you build confidence, vocabulary, and fluency with responsive AI sessions in real time.',
      cta: 'Start Practicing Free',
      note: 'No credit card. Get started in minutes.',
      companionEyebrow: 'AI Companion',
      companionTitle: 'Responding in Real-time...',
      companionLanguages: 'French • English • German • Spanish',
    },
    languages: {
      title: 'Pick Your Language',
      intro: 'Start where you are. Switch anytime.',
      moreSoon: 'More languages coming soon.',
      cards: [
        { flag: '🇺🇸', name: 'English', label: 'Business', tagline: "The world's business language" },
        { flag: '🇪🇸', name: 'Spanish', label: '500M', tagline: '500 million native speakers' },
        { flag: '🇫🇷', name: 'French', label: 'Culture', tagline: 'Romance, culture, opportunity' },
        { flag: '🇩🇪', name: 'German', label: 'Science', tagline: 'Precision, science, career growth' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: {
        line1: 'As easy as having',
        line2: 'a conversation',
      },
      stepLabel: 'Step',
      steps: [
        {
          icon: 'settings_voice',
          color: 'text-primary',
          title: 'Choose language & level',
          body: 'Pick your target language and current proficiency — from beginner to advanced.',
          offset: false,
        },
        {
          icon: 'record_voice_over',
          color: 'text-tertiary',
          title: 'Start talking',
          body: 'Speak naturally. No typing, no lag. The AI listens and responds in real time.',
          offset: true,
        },
        {
          icon: 'analytics',
          color: 'text-primary',
          title: 'Get feedback',
          body: 'After each session, review grammar insights, vocabulary notes, and progress.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Difficulty',
      title: 'Your pace. Your level.',
      note: 'Levels adjust difficulty, vocabulary complexity, and AI response depth automatically.',
      items: [
        {
          name: 'Beginner',
          body: 'Short, simple sentences to build your foundation and confidence. Everyday topics, common vocabulary.',
          fill: 'w-1/3',
        },
        {
          name: 'Intermediate',
          body: 'Flowing dialogue about daily life, interests, and work. Wider vocabulary and natural expressions.',
          fill: 'w-2/3',
        },
        {
          name: 'Advanced',
          body: 'Nuanced debates, technical discussions, idiomatic language, and cultural deep-dives.',
          fill: 'w-full',
        },
      ],
    },
    features: {
      eyebrow: 'Why SpeakPath',
      title: 'Built for real improvement',
      items: [
        {
          icon: 'keyboard_voice',
          title: 'Voice-first',
          body: 'No typing. Speak and be heard. Natural speech interaction optimized for any microphone.',
        },
        {
          icon: 'bolt',
          title: 'Real-time AI responses',
          body: 'No awkward pauses. Natural back-and-forth conversation, not scripted drills.',
        },
        {
          icon: 'waving_hand',
          title: 'Interrupt anytime',
          body: 'No need to wait for the AI to finish speaking. Jump in at any moment and it stops, listens, and responds — just like a real conversation.',
        },
        {
          icon: 'spellcheck',
          title: 'Grammar analysis',
          body: 'Session summary highlights what to work on without interrupting your flow.',
        },
        {
          icon: 'trending_up',
          title: 'Progress tracking',
          body: 'See how your skills improve session over session. Grammar trends, fluency scores, and recurring mistakes — all tracked automatically.',
        },
        {
          icon: 'language',
          title: 'Multi-language',
          body: 'Switch languages mid-conversation just by speaking. The AI adapts instantly — no need to stop the session.',
        },
        {
          icon: 'cloud_off',
          title: 'No downloads',
          body: 'Runs perfectly in any modern browser. Zero friction — open it and talk.',
        },
        {
          icon: 'shield',
          title: 'Private by design',
          body: 'Your voice recordings are never stored longer than needed. Conversations stay yours.',
        },
        {
          icon: 'rate_review',
          title: 'Built-in feedback',
          body: 'Found a bug or have an idea? Tap the feedback button and the team sees it directly. We read everything.',
        },
      ],
    },
    comingSoon: {
      eyebrow: 'Roadmap',
      badge: 'Soon',
      title: {
        line1: 'This is just',
        line2: 'the beginning',
      },
      description:
        'Our team is constantly pushing the boundaries of what AI-powered language learning can be.',
      items: [
        {
          title: 'Streaks',
          body: 'Stay motivated with daily streaks and weekly goals that reward consistent practice.',
        },
        {
          title: 'Speaking insights',
          body: 'Get more detailed feedback on pacing, consistency, and conversation flow.',
        },
        {
          title: 'Mobile app',
          body: 'Take your practice anywhere with native iOS and Android apps.',
        },
        {
          title: 'Vocabulary flashcards',
          body: 'Custom decks auto-generated from words you encountered in your sessions.',
        },
      ],
    },
    cta: {
      eyebrow: 'Start today',
      title: {
        line1: 'Ready to start',
        line2: 'speaking?',
      },
      body: 'No credit card. Get started in minutes.',
      button: 'Try SpeakPath Free',
    },
    footer: {
      tagline: 'Precision Audio Engineering for Fluency.',
      privacy: 'Privacy',
      contact: 'Contact',
    },
  },
  es: {
    meta: {
      title: 'SpeakPath — Practica conversaciones reales con IA',
      description:
        'Practica conversaciones reales en inglés, español, francés o alemán con una IA que escucha, responde y te ayuda a mejorar. Empieza gratis, sin descargas.',
      ogLocale: 'es_ES',
    },
    nav: {
      signIn: 'Iniciar sesión',
      languageSwitcherLabel: 'Elegir idioma del sitio',
    },
    hero: {
      eyebrow: 'Motor de fluidez con IA',
      title: {
        top: 'Habla.',
        accent: 'Aprende.',
        bottom: 'Mejora.',
      },
      description:
        'Domina cualquier idioma con práctica de conversación real. SpeakPath te ayuda a desarrollar confianza, vocabulario y fluidez con sesiones de IA que responden en tiempo real.',
      cta: 'Empieza gratis',
      note: 'Sin tarjeta. Empieza en minutos.',
      companionEyebrow: 'Compañero con IA',
      companionTitle: 'Respondiendo en tiempo real...',
      companionLanguages: 'Francés • Inglés • Alemán • Español',
    },
    languages: {
      title: 'Elige tu idioma',
      intro: 'Empieza donde estés. Cambia cuando quieras.',
      moreSoon: 'Pronto habrá más idiomas.',
      cards: [
        { flag: '🇺🇸', name: 'Inglés', label: 'Negocios', tagline: 'El idioma global de los negocios' },
        { flag: '🇪🇸', name: 'Español', label: '500M', tagline: '500 millones de hablantes nativos' },
        { flag: '🇫🇷', name: 'Francés', label: 'Cultura', tagline: 'Romance, cultura y oportunidad' },
        { flag: '🇩🇪', name: 'Alemán', label: 'Ciencia', tagline: 'Precisión, ciencia y crecimiento profesional' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: {
        line1: 'Tan fácil como tener',
        line2: 'una conversación',
      },
      stepLabel: 'Paso',
      steps: [
        {
          icon: 'settings_voice',
          color: 'text-primary',
          title: 'Elige idioma y nivel',
          body: 'Selecciona tu idioma objetivo y tu nivel actual, desde principiante hasta avanzado.',
          offset: false,
        },
        {
          icon: 'record_voice_over',
          color: 'text-tertiary',
          title: 'Empieza a hablar',
          body: 'Habla con naturalidad. Sin escribir y sin retrasos. La IA escucha y responde al instante.',
          offset: true,
        },
        {
          icon: 'analytics',
          color: 'text-primary',
          title: 'Recibe retroalimentación',
          body: 'Después de cada sesión, revisa gramática, vocabulario y tu progreso.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Dificultad',
      title: 'Tu ritmo. Tu nivel.',
      note: 'Los niveles ajustan automáticamente la dificultad, la complejidad del vocabulario y la profundidad de las respuestas de la IA.',
      items: [
        {
          name: 'Principiante',
          body: 'Frases cortas y simples para construir tu base y tu confianza. Temas cotidianos y vocabulario común.',
          fill: 'w-1/3',
        },
        {
          name: 'Intermedio',
          body: 'Diálogos fluidos sobre la vida diaria, intereses y trabajo. Vocabulario más amplio y expresiones naturales.',
          fill: 'w-2/3',
        },
        {
          name: 'Avanzado',
          body: 'Debates matizados, conversaciones técnicas, lenguaje idiomático y profundidad cultural.',
          fill: 'w-full',
        },
      ],
    },
    features: {
      eyebrow: 'Por qué SpeakPath',
      title: 'Creado para mejorar de verdad',
      items: [
        {
          icon: 'keyboard_voice',
          title: 'Primero la voz',
          body: 'Sin escribir. Habla y hazte entender. Interacción natural optimizada para cualquier micrófono.',
        },
        {
          icon: 'bolt',
          title: 'Respuestas con IA en tiempo real',
          body: 'Sin pausas incómodas. Conversaciones naturales, no ejercicios mecánicos.',
        },
        {
          icon: 'waving_hand',
          title: 'Interrumpe cuando quieras',
          body: 'No hace falta esperar a que la IA termine de hablar. Empieza a hablar en cualquier momento y ella para, escucha y responde, como en una conversación real.',
        },
        {
          icon: 'spellcheck',
          title: 'Análisis gramatical',
          body: 'El resumen de cada sesión destaca qué mejorar sin interrumpir tu fluidez.',
        },
        {
          icon: 'trending_up',
          title: 'Seguimiento de progreso',
          body: 'Observa cómo mejoran tus habilidades sesión a sesión. Tendencias gramaticales, fluidez y errores recurrentes, todo registrado automáticamente.',
        },
        {
          icon: 'language',
          title: 'Multiidioma',
          body: 'Cambia de idioma durante la conversación simplemente hablando. La IA se adapta al instante sin interrumpir la sesión.',
        },
        {
          icon: 'cloud_off',
          title: 'Sin descargas',
          body: 'Funciona en cualquier navegador moderno. Cero fricción: abre y habla.',
        },
        {
          icon: 'shield',
          title: 'Privacidad por diseño',
          body: 'Tus grabaciones de voz nunca se guardan más tiempo del necesario. Tus conversaciones siguen siendo tuyas.',
        },
        {
          icon: 'rate_review',
          title: 'Comentarios integrados',
          body: '¿Encontraste un error o tienes una idea? Toca el botón de comentarios y el equipo lo recibe directamente. Leemos todo.',
        },
      ],
    },
    comingSoon: {
      eyebrow: 'Hoja de ruta',
      badge: 'Pronto',
      title: {
        line1: 'Esto es solo',
        line2: 'el comienzo',
      },
      description:
        'Nuestro equipo sigue ampliando los límites de lo que puede ser el aprendizaje de idiomas con IA.',
      items: [
        {
          title: 'Rachas',
          body: 'Mantente motivado con rachas diarias y metas semanales que recompensan la práctica constante.',
        },
        {
          title: 'Análisis del habla',
          body: 'Recibe comentarios más detallados sobre ritmo, consistencia y fluidez en la conversación.',
        },
        {
          title: 'App móvil',
          body: 'Practica en cualquier lugar con apps nativas para iOS y Android.',
        },
        {
          title: 'Tarjetas de vocabulario',
          body: 'Mazos personalizados generados automáticamente con las palabras que encontraste en tus sesiones.',
        },
      ],
    },
    cta: {
      eyebrow: 'Empieza hoy',
      title: {
        line1: 'Listo para empezar',
        line2: 'a hablar?',
      },
      body: 'Sin tarjeta. Empieza en minutos.',
      button: 'Probar SpeakPath gratis',
    },
    footer: {
      tagline: 'Ingeniería de audio de precisión para la fluidez.',
      privacy: 'Privacidad',
      contact: 'Contacto',
    },
  },
  fr: {
    meta: {
      title: 'SpeakPath — Pratiquez de vraies conversations avec l IA',
      description:
        'Pratiquez de vraies conversations en anglais, espagnol, francais ou allemand avec une IA qui ecoute, repond et vous aide a progresser. Commencez gratuitement, sans telechargement.',
      ogLocale: 'fr_FR',
    },
    nav: {
      signIn: 'Connexion',
      languageSwitcherLabel: 'Choisir la langue du site',
    },
    hero: {
      eyebrow: 'Moteur de fluidite par IA',
      title: {
        top: 'Parlez.',
        accent: 'Apprenez.',
        bottom: 'Progressez.',
      },
      description:
        'Maitrisez une langue grace a de vraies conversations. SpeakPath vous aide a developper votre confiance, votre vocabulaire et votre fluidite avec des sessions IA qui repondent en temps reel.',
      cta: 'Commencer gratuitement',
      note: 'Sans carte bancaire. Commencez en quelques minutes.',
      companionEyebrow: 'Compagnon IA',
      companionTitle: 'Reponse en temps reel...',
      companionLanguages: 'Francais • Anglais • Allemand • Espagnol',
    },
    languages: {
      title: 'Choisissez votre langue',
      intro: 'Commencez ou vous en etes. Changez a tout moment.',
      moreSoon: 'D autres langues arrivent bientot.',
      cards: [
        { flag: '🇺🇸', name: 'Anglais', label: 'Business', tagline: 'La langue mondiale des affaires' },
        { flag: '🇪🇸', name: 'Espagnol', label: '500M', tagline: '500 millions de locuteurs natifs' },
        { flag: '🇫🇷', name: 'Francais', label: 'Culture', tagline: 'Romance, culture et opportunite' },
        { flag: '🇩🇪', name: 'Allemand', label: 'Science', tagline: 'Precision, science et evolution de carriere' },
      ],
    },
    howItWorks: {
      eyebrow: 'Comment ca marche',
      title: {
        line1: 'Aussi simple qu avoir',
        line2: 'une conversation',
      },
      stepLabel: 'Etape',
      steps: [
        {
          icon: 'settings_voice',
          color: 'text-primary',
          title: 'Choisissez la langue et le niveau',
          body: 'Selectionnez votre langue cible et votre niveau actuel, du debutant a l avance.',
          offset: false,
        },
        {
          icon: 'record_voice_over',
          color: 'text-tertiary',
          title: 'Commencez a parler',
          body: 'Parlez naturellement. Sans clavier, sans delai. L IA ecoute et repond en temps reel.',
          offset: true,
        },
        {
          icon: 'analytics',
          color: 'text-primary',
          title: 'Recevez des retours',
          body: 'Apres chaque session, consultez les points de grammaire, le vocabulaire et vos progres.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Difficulte',
      title: 'Votre rythme. Votre niveau.',
      note: 'Les niveaux ajustent automatiquement la difficulte, la complexite du vocabulaire et la profondeur des reponses de l IA.',
      items: [
        {
          name: 'Debutant',
          body: 'Des phrases courtes et simples pour construire vos bases et votre confiance. Sujets du quotidien et vocabulaire courant.',
          fill: 'w-1/3',
        },
        {
          name: 'Intermediaire',
          body: 'Des dialogues fluides sur la vie quotidienne, les centres d interet et le travail. Un vocabulaire plus large et des expressions naturelles.',
          fill: 'w-2/3',
        },
        {
          name: 'Avance',
          body: 'Des debats nuances, des discussions techniques, un langage idiomatique et une vraie profondeur culturelle.',
          fill: 'w-full',
        },
      ],
    },
    features: {
      eyebrow: 'Pourquoi SpeakPath',
      title: 'Concu pour une vraie progression',
      items: [
        {
          icon: 'keyboard_voice',
          title: 'La voix d abord',
          body: 'Pas de saisie. Parlez et soyez compris. Une interaction naturelle optimisee pour tout microphone.',
        },
        {
          icon: 'bolt',
          title: 'Reponses IA en temps reel',
          body: 'Pas de silences genants. Une vraie conversation, pas des exercices scripts.',
        },
        {
          icon: 'waving_hand',
          title: 'Interrompez a tout moment',
          body: 'Pas besoin d attendre que l IA finisse de parler. Prenez la parole a tout instant et elle s arrete, ecoute et repond, comme une vraie conversation.',
        },
        {
          icon: 'spellcheck',
          title: 'Analyse grammaticale',
          body: 'Le resume de session montre quoi travailler sans casser votre elan.',
        },
        {
          icon: 'trending_up',
          title: 'Suivi de progression',
          body: 'Voyez comment vos competences s ameliorent session apres session. Tendances grammaticales, fluidite et erreurs recurrentes, tout suivi automatiquement.',
        },
        {
          icon: 'language',
          title: 'Multilingue',
          body: 'Changez de langue en pleine conversation rien qu en parlant. L IA s adapte instantanement sans interrompre la session.',
        },
        {
          icon: 'cloud_off',
          title: 'Sans telechargement',
          body: 'Fonctionne parfaitement dans tout navigateur moderne. Zero friction : ouvrez et parlez.',
        },
        {
          icon: 'shield',
          title: 'Confidentialite integree',
          body: 'Vos enregistrements vocaux ne sont jamais conserves plus longtemps que necessaire. Vos conversations vous appartiennent.',
        },
        {
          icon: 'rate_review',
          title: 'Retours integres',
          body: 'Vous avez trouve un bug ou une idee ? Appuyez sur le bouton de retour et l equipe le reçoit directement. On lit tout.',
        },
      ],
    },
    comingSoon: {
      eyebrow: 'Feuille de route',
      badge: 'Bientot',
      title: {
        line1: 'Ce n est que',
        line2: 'le debut',
      },
      description:
        'Notre equipe repousse en permanence les limites de l apprentissage des langues avec l IA.',
      items: [
        {
          title: 'Series',
          body: 'Restez motive avec des series quotidiennes et des objectifs hebdomadaires qui recompensent une pratique reguliere.',
        },
        {
          title: 'Analyse de prise de parole',
          body: 'Obtenez des retours plus detailles sur le rythme, la regularite et la fluidite de vos conversations.',
        },
        {
          title: 'Application mobile',
          body: 'Emmenez votre pratique partout avec des apps natives iOS et Android.',
        },
        {
          title: 'Cartes de vocabulaire',
          body: 'Des decks personnalises generes automatiquement a partir des mots rencontres pendant vos sessions.',
        },
      ],
    },
    cta: {
      eyebrow: 'Commencez aujourd hui',
      title: {
        line1: 'Pret a commencer',
        line2: 'a parler ?',
      },
      body: 'Sans carte bancaire. Commencez en quelques minutes.',
      button: 'Essayer SpeakPath gratuitement',
    },
    footer: {
      tagline: 'Ingenierie audio de precision au service de la fluidite.',
      privacy: 'Confidentialite',
      contact: 'Contact',
    },
  },
  de: {
    meta: {
      title: 'SpeakPath — Sprachen lernen mit KI | Sprechen üben',
      description:
        'KI-App zum Sprechen üben: Englisch, Spanisch, Französisch oder Deutsch. Echte Konversationen mit KI in Echtzeit. Kostenloser Sprachkurs online – kein Download nötig.',
      ogLocale: 'de_DE',
    },
    nav: {
      signIn: 'Anmelden',
      languageSwitcherLabel: 'Seitensprache auswahlen',
    },
    hero: {
      eyebrow: 'KI-gestutzte Fluency Engine',
      title: {
        top: 'Sprich.',
        accent: 'Lerne.',
        bottom: 'Verbessere dich.',
      },
      description:
        'Beherrsche jede Sprache durch echte Gespraechspraxis. SpeakPath hilft dir, Selbstvertrauen, Wortschatz und Sprachfluss mit KI-Sessions in Echtzeit aufzubauen.',
      cta: 'Kostenlos starten',
      note: 'Keine Kreditkarte. Starte in wenigen Minuten.',
      companionEyebrow: 'KI-Begleiter',
      companionTitle: 'Antwortet in Echtzeit...',
      companionLanguages: 'Französisch • Englisch • Deutsch • Spanisch',
    },
    languages: {
      title: 'Wähle deine Sprache',
      intro: 'Beginne dort, wo du gerade bist. Wechsle jederzeit.',
      moreSoon: 'Weitere Sprachen folgen bald.',
      cards: [
        { flag: '🇺🇸', name: 'Englisch', label: 'Business', tagline: 'Die globale Sprache der Wirtschaft' },
        { flag: '🇪🇸', name: 'Spanisch', label: '500M', tagline: '500 Millionen Muttersprachler' },
        { flag: '🇫🇷', name: 'Französisch', label: 'Kultur', tagline: 'Romantik, Kultur und Chancen' },
        { flag: '🇩🇪', name: 'Deutsch', label: 'Wissen', tagline: 'Präzision, Wissenschaft und Karrierewachstum' },
      ],
    },
    howItWorks: {
      eyebrow: 'So funktioniert es',
      title: {
        line1: 'So einfach wie',
        line2: 'ein Gespräch',
      },
      stepLabel: 'Schritt',
      steps: [
        {
          icon: 'settings_voice',
          color: 'text-primary',
          title: 'Sprache und Niveau wählen',
          body: 'Wähle deine Zielsprache und dein aktuelles Niveau, von Anfänger bis Fortgeschritten.',
          offset: false,
        },
        {
          icon: 'record_voice_over',
          color: 'text-tertiary',
          title: 'Einfach sprechen',
          body: 'Sprich natürlich. Kein Tippen, keine Verzögerung. Die KI hört zu und antwortet sofort.',
          offset: true,
        },
        {
          icon: 'analytics',
          color: 'text-primary',
          title: 'Feedback erhalten',
          body: 'Nach jeder Session siehst du Grammatikhinweise, Vokabelnotizen und deinen Fortschritt.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Schwierigkeit',
      title: 'Dein Tempo. Dein Niveau.',
      note: 'Die Stufen passen Schwierigkeit, Wortschatz-Komplexität und Antworttiefe der KI automatisch an.',
      items: [
        {
          name: 'Anfänger',
          body: 'Kurze, einfache Sätze für ein starkes Fundament und mehr Sicherheit. Alltagsthemen und häufiger Wortschatz.',
          fill: 'w-1/3',
        },
        {
          name: 'Mittelstufe',
          body: 'Flüssige Dialoge über Alltag, Interessen und Arbeit. Breiterer Wortschatz und natürliche Ausdrücke.',
          fill: 'w-2/3',
        },
        {
          name: 'Fortgeschritten',
          body: 'Nuancierte Debatten, technische Gespräche, idiomatische Sprache und kulturelle Tiefe.',
          fill: 'w-full',
        },
      ],
    },
    features: {
      eyebrow: 'Warum SpeakPath',
      title: 'Für echten Fortschritt gebaut',
      items: [
        {
          icon: 'keyboard_voice',
          title: 'Voice-first',
          body: 'Kein Tippen. Einfach sprechen. Natürliche Sprachinteraktion für jedes Mikrofon optimiert.',
        },
        {
          icon: 'bolt',
          title: 'KI-Antworten in Echtzeit',
          body: 'Keine peinlichen Pausen. Ein natürlicher Dialog statt starrer Übungen.',
        },
        {
          icon: 'waving_hand',
          title: 'Jederzeit unterbrechen',
          body: 'Du musst nicht warten, bis die KI fertig spricht. Sprich einfach drein — sie hört sofort auf, hört zu und antwortet, ganz wie im echten Gespräch.',
        },
        {
          icon: 'spellcheck',
          title: 'Grammatik-Analyse',
          body: 'Die Session-Zusammenfassung zeigt, woran du arbeiten solltest, ohne deinen Flow zu unterbrechen.',
        },
        {
          icon: 'trending_up',
          title: 'Fortschrittsverfolgung',
          body: 'Sieh, wie sich deine Fähigkeiten von Session zu Session verbessern. Grammatiktrends, Flüssigkeitswerte und häufige Fehler — alles automatisch erfasst.',
        },
        {
          icon: 'language',
          title: 'Mehrsprachig',
          body: 'Wechsle die Sprache mitten im Gespräch, einfach durch Sprechen. Die KI passt sich sofort an — ohne die Session zu unterbrechen.',
        },
        {
          icon: 'cloud_off',
          title: 'Keine Downloads',
          body: 'Läuft perfekt in jedem modernen Browser. Null Reibung: öffnen und sprechen.',
        },
        {
          icon: 'shield',
          title: 'Datenschutz by design',
          body: 'Deine Sprachaufnahmen werden nie länger als nötig gespeichert. Deine Gespräche gehören dir.',
        },
        {
          icon: 'rate_review',
          title: 'Integriertes Feedback',
          body: 'Einen Fehler gefunden oder eine Idee? Tippe auf den Feedback-Button und das Team sieht es direkt. Wir lesen alles.',
        },
      ],
    },
    comingSoon: {
      eyebrow: 'Roadmap',
      badge: 'Bald',
      title: {
        line1: 'Das ist erst',
        line2: 'der Anfang',
      },
      description:
        'Unser Team verschiebt standig die Grenzen dessen, was KI-gestutztes Sprachenlernen sein kann.',
      items: [
        {
          title: 'Serien',
          body: 'Bleib motiviert mit täglichen Serien und wöchentlichen Zielen, die konsequentes Üben belohnen.',
        },
        {
          title: 'Sprechanalyse',
          body: 'Erhalte detaillierteres Feedback zu Tempo, Konstanz und Gespraechsfluss.',
        },
        {
          title: 'Mobile App',
          body: 'Nimm dein Training uberallhin mit nativen iOS- und Android-Apps.',
        },
        {
          title: 'Vokabelkarten',
          body: 'Individuelle Kartenstapel werden automatisch aus den Wortern deiner Sessions erstellt.',
        },
      ],
    },
    cta: {
      eyebrow: 'Heute starten',
      title: {
        line1: 'Bereit, mit dem Sprechen',
        line2: 'zu beginnen?',
      },
      body: 'Keine Kreditkarte. Starte in wenigen Minuten.',
      button: 'SpeakPath kostenlos testen',
    },
    footer: {
      tagline: 'Präzises Audio-Engineering für echte Sprachflüssigkeit.',
      privacy: 'Datenschutz',
      contact: 'Kontakt',
    },
  },
  pt: {
    meta: {
      title: 'SpeakPath — Pratique conversas reais de idiomas com IA',
      description:
        'Pratique conversas reais em inglês, espanhol, francês ou alemão com uma IA que escuta, responde e te ajuda a evoluir. Comece grátis, sem download.',
      ogLocale: 'pt_BR',
    },
    nav: {
      signIn: 'Entrar',
      languageSwitcherLabel: 'Escolher idioma do site',
    },
    hero: {
      eyebrow: 'Motor de Fluência com IA',
      title: {
        top: 'Fale.',
        accent: 'Aprenda.',
        bottom: 'Evolua.',
      },
      description:
        'Domine qualquer idioma com prática de conversação real. O SpeakPath te ajuda a desenvolver confiança, vocabulário e fluência com sessões de IA que respondem em tempo real.',
      cta: 'Comece Gratuitamente',
      note: 'Sem cartão de crédito. Comece em minutos.',
      companionEyebrow: 'Companheiro de IA',
      companionTitle: 'Respondendo em tempo real...',
      companionLanguages: 'Francês • Inglês • Alemão • Espanhol',
    },
    languages: {
      title: 'Escolha seu idioma',
      intro: 'Comece onde você está. Mude quando quiser.',
      moreSoon: 'Mais idiomas em breve.',
      cards: [
        { flag: '🇺🇸', name: 'Inglês', label: 'Negócios', tagline: 'O idioma global dos negócios' },
        { flag: '🇪🇸', name: 'Espanhol', label: '500M', tagline: '500 milhões de falantes nativos' },
        { flag: '🇫🇷', name: 'Francês', label: 'Cultura', tagline: 'Romance, cultura e oportunidade' },
        { flag: '🇩🇪', name: 'Alemão', label: 'Ciência', tagline: 'Precisão, ciência e crescimento profissional' },
      ],
    },
    howItWorks: {
      eyebrow: 'Como funciona',
      title: {
        line1: 'Tão fácil quanto ter',
        line2: 'uma conversa',
      },
      stepLabel: 'Passo',
      steps: [
        {
          icon: 'settings_voice',
          color: 'text-primary',
          title: 'Escolha o idioma e o nível',
          body: 'Selecione seu idioma-alvo e seu nível atual, do iniciante ao avançado.',
          offset: false,
        },
        {
          icon: 'record_voice_over',
          color: 'text-tertiary',
          title: 'Comece a falar',
          body: 'Fale naturalmente. Sem digitar, sem atraso. A IA escuta e responde em tempo real.',
          offset: true,
        },
        {
          icon: 'analytics',
          color: 'text-primary',
          title: 'Receba feedback',
          body: 'Após cada sessão, revise gramática, vocabulário e seu progresso.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Dificuldade',
      title: 'Seu ritmo. Seu nível.',
      note: 'Os níveis ajustam automaticamente a dificuldade, a complexidade do vocabulário e a profundidade das respostas da IA.',
      items: [
        {
          name: 'Iniciante',
          body: 'Frases curtas e simples para construir sua base e confiança. Temas do dia a dia e vocabulário comum.',
          fill: 'w-1/3',
        },
        {
          name: 'Intermediário',
          body: 'Diálogos fluidos sobre o cotidiano, interesses e trabalho. Vocabulário mais amplo e expressões naturais.',
          fill: 'w-2/3',
        },
        {
          name: 'Avançado',
          body: 'Debates aprofundados, discussões técnicas, linguagem idiomática e mergulhos culturais.',
          fill: 'w-full',
        },
      ],
    },
    features: {
      eyebrow: 'Por que o SpeakPath',
      title: 'Feito para uma evolução real',
      items: [
        {
          icon: 'keyboard_voice',
          title: 'Voz em primeiro lugar',
          body: 'Sem digitar. Fale e seja ouvido. Interação de fala natural otimizada para qualquer microfone.',
        },
        {
          icon: 'bolt',
          title: 'Respostas de IA em tempo real',
          body: 'Sem pausas constrangedoras. Conversa natural de verdade, não exercícios roteirizados.',
        },
        {
          icon: 'waving_hand',
          title: 'Interrompa a qualquer momento',
          body: 'Não precisa esperar a IA terminar de falar. Entre na conversa quando quiser e ela para, escuta e responde — exatamente como uma conversa real.',
        },
        {
          icon: 'spellcheck',
          title: 'Análise gramatical',
          body: 'O resumo da sessão destaca o que melhorar sem interromper seu fluxo.',
        },
        {
          icon: 'trending_up',
          title: 'Acompanhamento de progresso',
          body: 'Veja como suas habilidades evoluem sessão a sessão. Tendências de gramática, pontuações de fluência e erros recorrentes — tudo registrado automaticamente.',
        },
        {
          icon: 'language',
          title: 'Multilíngue',
          body: 'Mude de idioma no meio da conversa apenas falando. A IA se adapta na hora — sem precisar encerrar a sessão.',
        },
        {
          icon: 'cloud_off',
          title: 'Sem downloads',
          body: 'Funciona perfeitamente em qualquer navegador moderno. Zero atrito — abra e fale.',
        },
        {
          icon: 'shield',
          title: 'Privacidade por design',
          body: 'Suas gravações de voz nunca são armazenadas por mais tempo do que o necessário. Suas conversas são suas.',
        },
        {
          icon: 'rate_review',
          title: 'Feedback integrado',
          body: 'Encontrou um bug ou tem uma ideia? Toque no botão de feedback e a equipe vê diretamente. Lemos tudo.',
        },
      ],
    },
    comingSoon: {
      eyebrow: 'Roadmap',
      badge: 'Em breve',
      title: {
        line1: 'Isso é só',
        line2: 'o começo',
      },
      description:
        'Nossa equipe está constantemente expandindo os limites do que o aprendizado de idiomas com IA pode ser.',
      items: [
        {
          title: 'Sequências',
          body: 'Mantenha-se motivado com sequências diárias e metas semanais que recompensam a prática consistente.',
        },
        {
          title: 'Análise de fala',
          body: 'Receba feedback mais detalhado sobre ritmo, consistência e fluidez na conversa.',
        },
        {
          title: 'App mobile',
          body: 'Leve sua prática para qualquer lugar com apps nativos para iOS e Android.',
        },
        {
          title: 'Flashcards de vocabulário',
          body: 'Decks personalizados gerados automaticamente com palavras que você encontrou em suas sessões.',
        },
      ],
    },
    cta: {
      eyebrow: 'Comece hoje',
      title: {
        line1: 'Pronto para começar',
        line2: 'a falar?',
      },
      body: 'Sem cartão de crédito. Comece em minutos.',
      button: 'Experimente o SpeakPath Grátis',
    },
    footer: {
      tagline: 'Engenharia de áudio de precisão para fluência.',
      privacy: 'Privacidade',
      contact: 'Contato',
    },
  },
};
