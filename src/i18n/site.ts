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
  writeToSpeak: {
    eyebrow: string;
    title: { line1: string; accent: string };
    description: string;
    body1: string;
    body2: string;
    cta: string;
    ctaNote: string;
    langNote: string;
    steps: string[];
  };
  faq: {
    meta: {
      title: string;
      description: string;
    };
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    back: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    tagline: string;
    faq: string;
    privacy: string;
    contact: string;
  };
  privacy: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    lastUpdated: string;
    back: string;
    s1: { heading: string; body: string };
    s2: {
      heading: string;
      items: Array<{ label: string; text: string }>;
    };
    s3: {
      heading: string;
      items: string[];
      note: string;
    };
    s4: { heading: string; body: string };
    s5: { heading: string; body: string };
    s6: { heading: string; body: string };
    s7: { heading: string; body: string };
    s8: { heading: string; body: string };
    s9: { heading: string; body: string };
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
      eyebrow: 'Real Conversation Practice',
      title: {
        top: 'Speak.',
        accent: 'Learn.',
        bottom: 'Speak Better.',
      },
      description:
        'Have a real AI conversation — no typing, no scripts. After each session, SpeakPath shows you the grammar mistakes you made and tells you exactly which topic to work on. Then you go back and speak again.',
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
          title: 'Get feedback — and fix it',
          body: 'After each session, SpeakPath flags your grammar patterns and links you directly to the theory page for each issue. Study it, then come back and speak again.',
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
          body: 'No typing. Speak and be heard. Natural speech interaction optimized for any microphone or device.',
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
          body: 'Found a bug or have an idea? Click or tap the feedback button and the team sees it directly. We read everything.',
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
      body: 'Free to start. No credit card, no download.',
      button: 'Try SpeakPath Free',
    },
    writeToSpeak: {
      eyebrow: 'Learning Path',
      title: { line1: 'Build Your', accent: 'Speaking Foundation' },
      description: 'Fluency means speaking without thinking. Six theory pages covering the grammar patterns that come up most in real conversation — study the foundation here, then practice it out loud in SpeakPath.',
      body1: 'Real fluency is when grammar becomes automatic — you stop translating and start speaking. Studying the patterns behind natural speech builds that automation faster than conversation practice alone.',
      body2: 'Work through the pages, then open the app and speak. When SpeakPath flags a grammar issue, come back to the relevant page. That closed loop is where real fluency builds.',
      cta: 'Open the Theory Pages',
      ctaNote: 'Free — no account needed to read the theory',
      langNote: 'Currently available for English learners — more languages coming.',
      steps: ['Grammar', 'Key Verbs', 'Connectors', 'Phrasal Verbs', 'Nouns', 'Essay Template'],
    },
    faq: {
      meta: {
        title: 'FAQ — SpeakPath',
        description:
          'Answers about SpeakPath, the AI language speaking practice app for English, Spanish, French, and German. Start free, no download required.',
      },
      eyebrow: 'Frequently Asked Questions',
      title: 'Clear answers before you start speaking.',
      intro:
        'SpeakPath helps language learners practice real conversations with AI in the browser. Start free, choose a language, and speak from the device you already use.',
      cta: 'Start Practicing Free',
      back: 'Back to SpeakPath',
      items: [
        {
          question: 'What is SpeakPath?',
          answer:
            'SpeakPath is an AI language speaking practice app that helps you build fluency through real-time voice conversations, grammar feedback, vocabulary growth, and confidence-building sessions.',
        },
        {
          question: 'Which languages does SpeakPath support?',
          answer:
            'SpeakPath currently supports English, Spanish, French, and German for AI-powered conversation practice.',
        },
        {
          question: 'Is SpeakPath free to start?',
          answer:
            'Yes. SpeakPath is free to start, so you can begin practicing without a credit card.',
        },
        {
          question: 'Do I need to install anything?',
          answer:
            'No. SpeakPath runs in your browser, so there is nothing to download or install.',
        },
        {
          question: 'Does SpeakPath store voice recordings?',
          answer:
            'No. SpeakPath does not store voice recordings. Audio is processed in real time and never retained after your session ends.',
        },
        {
          question: 'Does SpeakPath work on all devices?',
          answer:
            'Yes. SpeakPath is designed to work smoothly across modern phones, tablets, laptops, and desktop computers with a supported browser and microphone access.',
        },
      ],
    },
    footer: {
      tagline: 'Real conversations. Real fluency.',
      faq: 'FAQ',
      privacy: 'Privacy',
      contact: 'Contact',
    },
    privacy: {
      meta: {
        title: 'Privacy Policy — SpeakPath',
        description: 'SpeakPath privacy policy. Learn how we handle your voice data, account information, and session data.',
      },
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: May 2025',
      back: '← Back to SpeakPath',
      s1: {
        heading: '1. Who we are',
        body: 'SpeakPath (speakpath.dev) is an AI-powered language practice platform that lets you have real voice conversations to build fluency. This policy explains what data we collect when you use the service and how we use it.',
      },
      s2: {
        heading: '2. Data we collect',
        items: [
          { label: 'Account information.', text: 'When you sign in we collect your email address and, if provided, your name. This is used only to identify your account and save your progress.' },
          { label: 'Voice audio.', text: 'Your microphone input is streamed to our AI in real time so it can listen and respond. Audio is processed only for the duration needed to deliver a response and is not retained for any other purpose.' },
          { label: 'Session data.', text: 'After each conversation we save a summary of your session — grammar notes, vocabulary encountered, fluency scores, and recurring mistakes. This is what powers your progress tracking over time.' },
          { label: 'Usage data.', text: 'Basic information about how the service is used, such as session activity and error logs, used to improve reliability and performance.' },
        ],
      },
      s3: {
        heading: '3. How we use your data',
        items: [
          'To run the conversation AI and deliver real-time responses.',
          'To save and display your progress, grammar trends, and fluency scores.',
          'To authenticate you across sessions.',
          'To diagnose bugs and improve the service.',
        ],
        note: 'We do not sell your data or share it with advertisers.',
      },
      s4: {
        heading: '4. Voice data & privacy by design',
        body: 'SpeakPath is built with a voice-first, privacy-first philosophy. Voice audio is used only to power your live conversation and is not retained by SpeakPath beyond what is needed to deliver a response.',
      },
      s5: {
        heading: '5. Cookies & local storage',
        body: 'We use cookies and browser local storage to keep you signed in and remember your language and level preferences. We do not use third-party advertising cookies.',
      },
      s6: {
        heading: '6. Data retention',
        body: 'Session summaries and progress data are kept for as long as your account is active.',
      },
      s7: {
        heading: '7. Third-party services',
        body: 'SpeakPath uses third-party APIs to power speech recognition and AI responses. These providers handle your data according to their own privacy policies and terms of service.',
      },
      s8: {
        heading: '8. Changes to this policy',
        body: 'We may update this policy as the service evolves. When we make material changes we will update the date at the top of this page. Continued use of SpeakPath after changes constitutes acceptance of the revised policy.',
      },
      s9: {
        heading: '9. Contact',
        body: 'Questions about this policy? Reach us through the feedback button inside the app or use the Contact link in the footer.',
      },
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
      eyebrow: 'Práctica de conversación real',
      title: {
        top: 'Habla.',
        accent: 'Aprende.',
        bottom: 'Habla mejor.',
      },
      description:
        'Ten una conversación real con IA — sin escribir, sin guiones. Después de cada sesión, SpeakPath te muestra los errores gramaticales que cometiste y te indica exactamente en qué tema trabajar. Luego vuelves a hablar.',
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
          title: 'Recibe feedback — y corrígelo',
          body: 'Después de cada sesión, SpeakPath identifica tus patrones gramaticales y te indica exactamente en qué temas enfocarte. Trabaja en ellos y vuelve a practicar.',
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
          title: 'Multilingüe',
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
        line1: '¿Listo para empezar',
        line2: 'a hablar?',

      },
      body: 'Sin tarjeta. Empieza en minutos.',
      button: 'Probar SpeakPath gratis',
    },
    writeToSpeak: {
      eyebrow: 'Ruta de aprendizaje',
      title: { line1: 'Construye tu', accent: 'base para hablar' },
      description: 'La fluidez es hablar sin pensar. Seis páginas de teoría con los patrones gramaticales que más aparecen en conversaciones reales — estudia la base aquí y practica en voz alta en SpeakPath.',
      body1: 'La verdadera fluidez es cuando la gramática se vuelve automática — dejas de traducir y empiezas a hablar. Estudiar los patrones del habla natural acelera esa automatización más que solo conversar.',
      body2: 'Recorre las páginas, luego abre la app y habla. Cuando SpeakPath detecte un error gramatical, vuelve a la página correspondiente. Ese ciclo cerrado es donde se construye la fluidez real.',
      cta: 'Abrir las páginas de teoría',
      ctaNote: 'Gratis — sin cuenta para leer la teoría',
      langNote: 'Actualmente disponible para estudiantes de inglés — más idiomas próximamente.',
      steps: ['Gramática', 'Verbos clave', 'Conectores', 'Verbos frasales', 'Sustantivos', 'Ensayo'],
    },
    faq: {
      meta: {
        title: 'FAQ — SpeakPath',
        description:
          'Respuestas sobre SpeakPath, la app de práctica oral con IA para inglés, español, francés y alemán. Empieza gratis, sin descargar nada.',
      },
      eyebrow: 'Preguntas frecuentes',
      title: 'Respuestas claras antes de empezar a hablar.',
      intro:
        'SpeakPath ayuda a estudiantes de idiomas a practicar conversaciones reales con IA desde el navegador. Empieza gratis, elige un idioma y habla desde el dispositivo que ya usas.',
      cta: 'Empieza gratis',
      back: 'Volver a SpeakPath',
      items: [
        {
          question: '¿Qué es SpeakPath?',
          answer:
            'SpeakPath es una app de práctica oral de idiomas con IA que te ayuda a desarrollar fluidez con conversaciones de voz en tiempo real, comentarios de gramática, crecimiento de vocabulario y sesiones para ganar confianza.',
        },
        {
          question: '¿Qué idiomas admite SpeakPath?',
          answer:
            'SpeakPath actualmente admite inglés, español, francés y alemán para práctica de conversación con IA.',
        },
        {
          question: '¿SpeakPath es gratis para empezar?',
          answer:
            'Sí. SpeakPath es gratis para empezar, así que puedes practicar sin tarjeta de crédito.',
        },
        {
          question: '¿Necesito instalar algo?',
          answer:
            'No. SpeakPath funciona en tu navegador, así que no necesitas descargar ni instalar nada.',
        },
        {
          question: '¿SpeakPath guarda grabaciones de voz?',
          answer:
            'No. SpeakPath no guarda grabaciones de voz. El audio se procesa solo cuando es necesario para la conversación en vivo.',
        },
        {
          question: '¿SpeakPath funciona en todos los dispositivos?',
          answer:
            'Sí. SpeakPath está diseñado para funcionar bien en teléfonos, tabletas, portátiles y ordenadores modernos con un navegador compatible y acceso al micrófono.',
        },
      ],
    },
    footer: {
      tagline: 'Ingeniería de audio de precisión para la fluidez.',
      faq: 'FAQ',
      privacy: 'Privacidad',
      contact: 'Contacto',
    },
    privacy: {
      meta: {
        title: 'Política de privacidad — SpeakPath',
        description: 'Política de privacidad de SpeakPath. Conoce cómo gestionamos tus datos de voz, información de cuenta y datos de sesión.',
      },
      eyebrow: 'Legal',
      title: 'Política de privacidad',
      lastUpdated: 'Última actualización: mayo de 2025',
      back: '← Volver a SpeakPath',
      s1: {
        heading: '1. Quiénes somos',
        body: 'SpeakPath (speakpath.dev) es una plataforma de práctica de idiomas con IA que te permite mantener conversaciones de voz reales para desarrollar fluidez. Esta política explica qué datos recopilamos cuando usas el servicio y cómo los utilizamos.',
      },
      s2: {
        heading: '2. Datos que recopilamos',
        items: [
          { label: 'Información de cuenta.', text: 'Al iniciar sesión, recopilamos tu dirección de correo electrónico y, si la proporcionas, tu nombre. Esto se usa únicamente para identificar tu cuenta y guardar tu progreso.' },
          { label: 'Audio de voz.', text: 'Tu entrada de micrófono se transmite a nuestra IA en tiempo real para que pueda escuchar y responder. El audio se procesa solo durante el tiempo necesario para generar una respuesta y no se conserva para ningún otro fin.' },
          { label: 'Datos de sesión.', text: 'Después de cada conversación guardamos un resumen de tu sesión — notas gramaticales, vocabulario encontrado, puntuaciones de fluidez y errores recurrentes. Esto es lo que impulsa tu seguimiento de progreso a lo largo del tiempo.' },
          { label: 'Datos de uso.', text: 'Información básica sobre cómo se utiliza el servicio, como actividad de sesión y registros de errores, utilizada para mejorar la fiabilidad y el rendimiento.' },
        ],
      },
      s3: {
        heading: '3. Cómo usamos tus datos',
        items: [
          'Para ejecutar la IA de conversación y ofrecer respuestas en tiempo real.',
          'Para guardar y mostrar tu progreso, tendencias gramaticales y puntuaciones de fluidez.',
          'Para autenticarte en cada sesión.',
          'Para diagnosticar errores y mejorar el servicio.',
        ],
        note: 'No vendemos tus datos ni los compartimos con anunciantes.',
      },
      s4: {
        heading: '4. Datos de voz y privacidad por diseño',
        body: 'SpeakPath está construido con una filosofía de voz primero y privacidad primero. El audio de voz se usa únicamente para alimentar tu conversación en vivo y SpeakPath no lo conserva más allá de lo necesario para generar una respuesta.',
      },
      s5: {
        heading: '5. Cookies y almacenamiento local',
        body: 'Usamos cookies y almacenamiento local del navegador para mantenerte con la sesión iniciada y recordar tus preferencias de idioma y nivel. No utilizamos cookies de publicidad de terceros.',
      },
      s6: {
        heading: '6. Retención de datos',
        body: 'Los resúmenes de sesión y los datos de progreso se conservan mientras tu cuenta esté activa.',
      },
      s7: {
        heading: '7. Servicios de terceros',
        body: 'SpeakPath utiliza APIs de terceros para el reconocimiento de voz y las respuestas de IA. Estos proveedores gestionan tus datos según sus propias políticas de privacidad y términos de servicio.',
      },
      s8: {
        heading: '8. Cambios en esta política',
        body: 'Podemos actualizar esta política a medida que el servicio evolucione. Cuando hagamos cambios sustanciales, actualizaremos la fecha en la parte superior de esta página. El uso continuado de SpeakPath tras los cambios implica la aceptación de la política revisada.',
      },
      s9: {
        heading: '9. Contacto',
        body: '¿Preguntas sobre esta política? Contáctanos a través del botón de comentarios dentro de la app o usa el enlace de Contacto en el pie de página.',
      },
    },
  },
  fr: {
    meta: {
      title: 'SpeakPath — Pratiquez de vraies conversations avec l\'IA',
      description:
        'Pratiquez de vraies conversations en anglais, espagnol, français ou allemand avec une IA qui écoute, répond et vous aide à progresser. Commencez gratuitement, sans téléchargement.',
      ogLocale: 'fr_FR',
    },
    nav: {
      signIn: 'Connexion',
      languageSwitcherLabel: 'Choisir la langue du site',
    },
    hero: {
      eyebrow: 'Pratique de conversation réelle',
      title: {
        top: 'Parlez.',
        accent: 'Apprenez.',
        bottom: 'Parlez mieux.',
      },
      description:
        "Ayez une vraie conversation avec l'IA — sans clavier, sans script. Après chaque session, SpeakPath vous montre les erreurs grammaticales que vous avez commises et vous indique exactement quel sujet travailler. Puis vous reprenez la parole.",
      cta: 'Commencer gratuitement',
      note: 'Sans carte bancaire. Commencez en quelques minutes.',
      companionEyebrow: 'Compagnon IA',
      companionTitle: 'Réponse en temps réel...',
      companionLanguages: 'Français • Anglais • Allemand • Espagnol',
    },
    languages: {
      title: 'Choisissez votre langue',
      intro: 'Commencez où vous en êtes. Changez à tout moment.',
      moreSoon: 'D\'autres langues arrivent bientôt.',
      cards: [
        { flag: '🇺🇸', name: 'Anglais', label: 'Business', tagline: 'La langue mondiale des affaires' },
        { flag: '🇪🇸', name: 'Espagnol', label: '500M', tagline: '500 millions de locuteurs natifs' },
        { flag: '🇫🇷', name: 'Français', label: 'Culture', tagline: 'Romance, culture et opportunité' },
        { flag: '🇩🇪', name: 'Allemand', label: 'Science', tagline: 'Précision, science et évolution de carrière' },
      ],
    },
    howItWorks: {
      eyebrow: 'Comment ça marche',
      title: {
        line1: 'Aussi simple qu\'avoir',
        line2: 'une conversation',
      },
      stepLabel: 'Étape',
      steps: [
        {
          icon: 'settings_voice',
          color: 'text-primary',
          title: 'Choisissez la langue et le niveau',
          body: 'Sélectionnez votre langue cible et votre niveau actuel, du débutant à l\'avancé.',
          offset: false,
        },
        {
          icon: 'record_voice_over',
          color: 'text-tertiary',
          title: 'Commencez à parler',
          body: 'Parlez naturellement. Sans clavier, sans délai. L\'IA écoute et répond en temps réel.',
          offset: true,
        },
        {
          icon: 'analytics',
          color: 'text-primary',
          title: 'Recevez vos retours — et corrigez-vous',
          body: 'Après chaque session, SpeakPath identifie vos schémas grammaticaux et vous indique exactement les sujets sur lesquels vous concentrer. Travaillez-les, puis revenez parler.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Difficulté',
      title: 'Votre rythme. Votre niveau.',
      note: 'Les niveaux ajustent automatiquement la difficulté, la complexité du vocabulaire et la profondeur des réponses de l\'IA.',
      items: [
        {
          name: 'Débutant',
          body: 'Des phrases courtes et simples pour construire vos bases et votre confiance. Sujets du quotidien et vocabulaire courant.',
          fill: 'w-1/3',
        },
        {
          name: 'Intermédiaire',
          body: 'Des dialogues fluides sur la vie quotidienne, les centres d\'intérêt et le travail. Un vocabulaire plus large et des expressions naturelles.',
          fill: 'w-2/3',
        },
        {
          name: 'Avancé',
          body: 'Des débats nuancés, des discussions techniques, un langage idiomatique et une vraie profondeur culturelle.',
          fill: 'w-full',
        },
      ],
    },
    features: {
      eyebrow: 'Pourquoi SpeakPath',
      title: 'Conçu pour une vraie progression',
      items: [
        {
          icon: 'keyboard_voice',
          title: 'La voix d\'abord',
          body: 'Pas de saisie. Parlez et soyez compris. Une interaction naturelle optimisée pour tout microphone.',
        },
        {
          icon: 'bolt',
          title: 'Réponses IA en temps réel',
          body: 'Pas de silences gênants. Une vraie conversation, pas des exercices scriptés.',
        },
        {
          icon: 'waving_hand',
          title: 'Interrompez à tout moment',
          body: 'Pas besoin d\'attendre que l\'IA finisse de parler. Prenez la parole à tout instant et elle s\'arrête, écoute et répond, comme une vraie conversation.',
        },
        {
          icon: 'spellcheck',
          title: 'Analyse grammaticale',
          body: 'Le résumé de session montre quoi travailler sans casser votre élan.',
        },
        {
          icon: 'trending_up',
          title: 'Suivi de progression',
          body: 'Voyez comment vos compétences s\'améliorent session après session. Tendances grammaticales, fluidité et erreurs récurrentes, tout suivi automatiquement.',
        },
        {
          icon: 'language',
          title: 'Multilingue',
          body: 'Changez de langue en pleine conversation rien qu\'en parlant. L\'IA s\'adapte instantanément sans interrompre la session.',
        },
        {
          icon: 'cloud_off',
          title: 'Sans téléchargement',
          body: 'Fonctionne parfaitement dans tout navigateur moderne. Zéro friction : ouvrez et parlez.',
        },
        {
          icon: 'shield',
          title: 'Confidentialité intégrée',
          body: 'Vos enregistrements vocaux ne sont jamais conservés plus longtemps que nécessaire. Vos conversations vous appartiennent.',
        },
        {
          icon: 'rate_review',
          title: 'Retours intégrés',
          body: 'Vous avez trouvé un bug ou une idée ? Appuyez sur le bouton de retour et l\'équipe le reçoit directement. Nous lisons tout.',
        },
      ],
    },
    comingSoon: {
      eyebrow: 'Feuille de route',
      badge: 'Bientôt',
      title: {
        line1: 'Ce n\'est que',
        line2: 'le début',
      },
      description:
        'Notre équipe repousse en permanence les limites de l\'apprentissage des langues avec l\'IA.',
      items: [
        {
          title: 'Séries',
          body: 'Restez motivé avec des séries quotidiennes et des objectifs hebdomadaires qui récompensent une pratique régulière.',
        },
        {
          title: 'Analyse de prise de parole',
          body: 'Obtenez des retours plus détaillés sur le rythme, la régularité et la fluidité de vos conversations.',
        },
        {
          title: 'Application mobile',
          body: 'Emmenez votre pratique partout avec des applis natives iOS et Android.',
        },
        {
          title: 'Cartes de vocabulaire',
          body: 'Des jeux de cartes personnalisés générés automatiquement à partir des mots rencontrés pendant vos sessions.',
        },
      ],
    },
    cta: {
      eyebrow: 'Commencez aujourd\'hui',
      title: {
        line1: 'Prêt à commencer',
        line2: 'à parler ?',
      },
      body: 'Sans carte bancaire. Commencez en quelques minutes.',
      button: 'Essayer SpeakPath gratuitement',
    },
    writeToSpeak: {
      eyebrow: 'Parcours d\'apprentissage',
      title: { line1: 'Construisez votre', accent: 'base pour parler' },
      description: 'La fluidité, c\'est parler sans réfléchir. Six pages de théorie couvrant les structures grammaticales les plus fréquentes en conversation réelle — étudiez la base ici, puis pratiquez à voix haute dans SpeakPath.',
      body1: 'La vraie fluidité, c\'est quand la grammaire devient automatique — vous arrêtez de traduire et vous commencez à parler. Étudier les structures du discours naturel accélère cette automatisation plus que la simple pratique conversationnelle.',
      body2: 'Parcourez les pages, puis ouvrez l\'app et parlez. Quand SpeakPath signale un problème de grammaire, revenez à la page correspondante. Cette boucle fermée est là où la vraie fluidité se construit.',
      cta: 'Ouvrir les pages de théorie',
      ctaNote: 'Gratuit — aucun compte requis pour lire la théorie',
      langNote: "Actuellement disponible pour les apprenants d'anglais — d'autres langues bientôt.",
      steps: ['Grammaire', 'Verbes clés', 'Connecteurs', 'Verbes à particule', 'Noms', 'Essai'],
    },
    faq: {
      meta: {
        title: 'FAQ — SpeakPath',
        description:
          'Réponses sur SpeakPath, l\'app de pratique orale avec IA pour l\'anglais, l\'espagnol, le français et l\'allemand. Commencez gratuitement, sans téléchargement.',
      },
      eyebrow: 'Questions fréquentes',
      title: 'Des réponses claires avant de commencer à parler.',
      intro:
        'SpeakPath aide les apprenants à pratiquer de vraies conversations avec l\'IA dans le navigateur. Commencez gratuitement, choisissez une langue et parlez depuis l\'appareil que vous utilisez déjà.',
      cta: 'Commencer gratuitement',
      back: 'Retour à SpeakPath',
      items: [
        {
          question: 'Qu\'est-ce que SpeakPath ?',
          answer:
            'SpeakPath est une app de pratique orale des langues avec IA qui vous aide à gagner en fluidité grâce à des conversations vocales en temps réel, des retours grammaticaux, du vocabulaire et des sessions pour renforcer votre confiance.',
        },
        {
          question: 'Quelles langues SpeakPath prend-il en charge ?',
          answer:
            'SpeakPath prend actuellement en charge l\'anglais, l\'espagnol, le français et l\'allemand pour la pratique conversationnelle avec IA.',
        },
        {
          question: 'SpeakPath est-il gratuit pour commencer ?',
          answer:
            'Oui. SpeakPath est gratuit pour commencer, vous pouvez donc vous entraîner sans carte bancaire.',
        },
        {
          question: 'Dois-je installer quelque chose ?',
          answer:
            'Non. SpeakPath fonctionne dans votre navigateur, il n\'y a donc rien à télécharger ni à installer.',
        },
        {
          question: 'SpeakPath stocke-t-il les enregistrements vocaux ?',
          answer:
            'Non. SpeakPath ne stocke pas les enregistrements vocaux. L\'audio est traité uniquement lorsque c\'est nécessaire pour alimenter la conversation en direct.',
        },
        {
          question: 'SpeakPath fonctionne-t-il sur tous les appareils ?',
          answer:
            'Oui. SpeakPath est conçu pour fonctionner sur les téléphones, tablettes, ordinateurs portables et ordinateurs de bureau modernes avec un navigateur compatible et l\'accès au microphone.',
        },
      ],
    },
    footer: {
      tagline: 'Ingénierie audio de précision au service de la fluidité.',
      faq: 'FAQ',
      privacy: 'Confidentialité',
      contact: 'Contact',
    },
    privacy: {
      meta: {
        title: 'Politique de confidentialité — SpeakPath',
        description: 'Politique de confidentialité de SpeakPath. Découvrez comment nous traitons vos données vocales, vos informations de compte et vos données de session.',
      },
      eyebrow: 'Légal',
      title: 'Politique de confidentialité',
      lastUpdated: 'Dernière mise à jour : mai 2025',
      back: '← Retour à SpeakPath',
      s1: {
        heading: '1. Qui sommes-nous',
        body: "SpeakPath (speakpath.dev) est une plateforme de pratique des langues basée sur l'IA qui vous permet d'avoir de vraies conversations vocales pour développer votre fluidité. Cette politique explique quelles données nous collectons lorsque vous utilisez le service et comment nous les utilisons.",
      },
      s2: {
        heading: '2. Données que nous collectons',
        items: [
          { label: 'Informations de compte.', text: 'Lors de votre connexion, nous collectons votre adresse e-mail et, si fourni, votre nom. Ces données servent uniquement à identifier votre compte et à sauvegarder votre progression.' },
          { label: 'Audio vocal.', text: "Votre entrée microphone est diffusée en temps réel à notre IA afin qu'elle puisse écouter et répondre. L'audio est traité uniquement pendant le temps nécessaire à la génération d'une réponse et n'est pas conservé à d'autres fins." },
          { label: 'Données de session.', text: "Après chaque conversation, nous sauvegardons un résumé de votre session — notes de grammaire, vocabulaire rencontré, scores de fluidité et erreurs récurrentes. C'est ce qui alimente votre suivi de progression dans le temps." },
          { label: "Données d'utilisation.", text: "Informations de base sur l'utilisation du service, comme l'activité des sessions et les journaux d'erreurs, utilisées pour améliorer la fiabilité et les performances." },
        ],
      },
      s3: {
        heading: '3. Comment nous utilisons vos données',
        items: [
          "Pour alimenter l'IA de conversation et fournir des réponses en temps réel.",
          'Pour sauvegarder et afficher votre progression, vos tendances grammaticales et vos scores de fluidité.',
          "Pour vous authentifier d'une session à l'autre.",
          'Pour diagnostiquer les bugs et améliorer le service.',
        ],
        note: 'Nous ne vendons pas vos données et ne les partageons pas avec des annonceurs.',
      },
      s4: {
        heading: '4. Données vocales et confidentialité par conception',
        body: "SpeakPath est conçu avec une philosophie axée sur la voix et la confidentialité. L'audio vocal est utilisé uniquement pour alimenter votre conversation en direct et n'est pas conservé par SpeakPath au-delà de ce qui est nécessaire pour fournir une réponse.",
      },
      s5: {
        heading: '5. Cookies et stockage local',
        body: "Nous utilisons des cookies et le stockage local du navigateur pour vous maintenir connecté et mémoriser vos préférences de langue et de niveau. Nous n'utilisons pas de cookies publicitaires tiers.",
      },
      s6: {
        heading: '6. Conservation des données',
        body: 'Les résumés de session et les données de progression sont conservés tant que votre compte est actif.',
      },
      s7: {
        heading: '7. Services tiers',
        body: "SpeakPath utilise des API tierces pour alimenter la reconnaissance vocale et les réponses de l'IA. Ces fournisseurs traitent vos données conformément à leurs propres politiques de confidentialité et conditions d'utilisation.",
      },
      s8: {
        heading: '8. Modifications de cette politique',
        body: "Nous pouvons mettre à jour cette politique au fil de l'évolution du service. Lorsque nous apportons des modifications importantes, nous mettrons à jour la date en haut de cette page. L'utilisation continue de SpeakPath après les modifications constitue une acceptation de la politique révisée.",
      },
      s9: {
        heading: '9. Contact',
        body: 'Des questions sur cette politique ? Contactez-nous via le bouton de feedback dans l\'application ou en utilisant le lien Contact dans le pied de page.',
      },
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
      languageSwitcherLabel: 'Seitensprache auswählen',
    },
    hero: {
      eyebrow: 'Echte Konversationspraxis',
      title: {
        top: 'Sprich.',
        accent: 'Lerne.',
        bottom: 'Sprich besser.',
      },
      description:
        'Führe ein echtes KI-Gespräch — kein Tippen, kein Skript. Nach jeder Session zeigt dir SpeakPath die Grammatikfehler, die du gemacht hast, und sagt dir genau, an welchem Thema du arbeiten solltest. Dann sprichst du wieder.',
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
          title: 'Feedback erhalten — und verbessern',
          body: 'Nach jeder Session erkennt SpeakPath deine Grammatikmuster und sagt dir genau, welche Themen du vertiefen solltest. Arbeite daran und komme wieder zum Sprechen.',
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
        'Unser Team verschiebt ständig die Grenzen dessen, was KI-gestütztes Sprachenlernen sein kann.',
      items: [
        {
          title: 'Serien',
          body: 'Bleib motiviert mit täglichen Serien und wöchentlichen Zielen, die konsequentes Üben belohnen.',
        },
        {
          title: 'Sprechanalyse',
          body: 'Erhalte detaillierteres Feedback zu Tempo, Konstanz und Gesprächsfluss.',
        },
        {
          title: 'Mobile App',
          body: 'Nimm dein Training überallhin mit nativen iOS- und Android-Apps.',
        },
        {
          title: 'Vokabelkarten',
          body: 'Individuelle Kartenstapel werden automatisch aus den Wörtern deiner Sessions erstellt.',
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
    writeToSpeak: {
      eyebrow: 'Lernpfad',
      title: { line1: 'Baue dein', accent: 'Sprech-Fundament' },
      description: 'Fließend sprechen bedeutet, ohne Nachdenken zu sprechen. Sechs Theorieseiten mit den Grammatikmustern, die in echten Gesprächen am häufigsten vorkommen — lerne die Grundlagen hier und übe sie laut in SpeakPath.',
      body1: 'Echte Sprachflüssigkeit bedeutet, dass Grammatik automatisch wird — du hörst auf zu übersetzen und fängst an zu sprechen. Die Muster natürlicher Sprache zu studieren beschleunigt diese Automatisierung schneller als reines Gesprächsüben.',
      body2: 'Arbeite die Seiten durch, öffne dann die App und sprich. Wenn SpeakPath ein Grammatikproblem erkennt, kehre zur entsprechenden Seite zurück. Dieser Kreislauf ist der Ort, wo echte Sprachflüssigkeit entsteht.',
      cta: 'Theorieseiten öffnen',
      ctaNote: 'Kostenlos — kein Konto erforderlich',
      langNote: 'Derzeit für Englischlernende verfügbar — weitere Sprachen kommen bald.',
      steps: ['Grammatik', 'Schlüsselverben', 'Konnektoren', 'Phrasal-Verben', 'Nomen', 'Aufsatz'],
    },
    faq: {
      meta: {
        title: 'FAQ — SpeakPath',
        description:
          'Antworten zu SpeakPath, der KI-App zum Sprechen üben für Englisch, Spanisch, Französisch und Deutsch. Kostenlos starten, kein Download nötig.',
      },
      eyebrow: 'Häufige Fragen',
      title: 'Klare Antworten, bevor du mit dem Sprechen beginnst.',
      intro:
        'SpeakPath hilft Sprachlernenden, echte Gespräche mit KI direkt im Browser zu üben. Starte kostenlos, wähle eine Sprache und sprich mit dem Gerät, das du bereits nutzt.',
      cta: 'Kostenlos starten',
      back: 'Zurück zu SpeakPath',
      items: [
        {
          question: 'Was ist SpeakPath?',
          answer:
            'SpeakPath ist eine KI-App zum Üben des Sprechens, die dir hilft, Sprachfluss durch Echtzeit-Sprachgespräche, Grammatikfeedback, Wortschatzaufbau und vertrauensbildende Sessions zu entwickeln.',
        },
        {
          question: 'Welche Sprachen unterstützt SpeakPath?',
          answer:
            'SpeakPath unterstützt derzeit Englisch, Spanisch, Französisch und Deutsch für KI-gestützte Gesprächspraxis.',
        },
        {
          question: 'Kann ich mit SpeakPath kostenlos starten?',
          answer:
            'Ja. Du kannst mit SpeakPath kostenlos starten und ohne Kreditkarte mit dem Üben beginnen.',
        },
        {
          question: 'Muss ich etwas installieren?',
          answer:
            'Nein. SpeakPath läuft in deinem Browser, du musst also nichts herunterladen oder installieren.',
        },
        {
          question: 'Speichert SpeakPath Sprachaufnahmen?',
          answer:
            'Nein. SpeakPath speichert keine Sprachaufnahmen. Audio wird nur verarbeitet, wenn es für die Live-Konversation notwendig ist.',
        },
        {
          question: 'Funktioniert SpeakPath auf allen Geräten?',
          answer:
            'Ja. SpeakPath ist für moderne Smartphones, Tablets, Laptops und Desktop-Computer mit unterstütztem Browser und Mikrofonzugriff entwickelt.',
        },
      ],
    },
    footer: {
      tagline: 'Präzises Audio-Engineering für echte Sprachflüssigkeit.',
      faq: 'FAQ',
      privacy: 'Datenschutz',
      contact: 'Kontakt',
    },
    privacy: {
      meta: {
        title: 'Datenschutzerklärung — SpeakPath',
        description: 'Datenschutzerklärung von SpeakPath. Erfahre, wie wir mit deinen Sprachdaten, Kontoinformationen und Sitzungsdaten umgehen.',
      },
      eyebrow: 'Rechtliches',
      title: 'Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert: Mai 2025',
      back: '← Zurück zu SpeakPath',
      s1: {
        heading: '1. Wer wir sind',
        body: 'SpeakPath (speakpath.dev) ist eine KI-gestützte Sprachübungsplattform, mit der du echte Sprachgespräche führen kannst, um Fließfähigkeit zu entwickeln. Diese Richtlinie erklärt, welche Daten wir bei der Nutzung des Dienstes erheben und wie wir sie verwenden.',
      },
      s2: {
        heading: '2. Daten, die wir erheben',
        items: [
          { label: 'Kontodaten.', text: 'Beim Anmelden erheben wir deine E-Mail-Adresse und, falls angegeben, deinen Namen. Diese werden ausschließlich zur Identifizierung deines Kontos und zur Speicherung deines Fortschritts verwendet.' },
          { label: 'Sprachaudio.', text: 'Deine Mikrofoneingabe wird in Echtzeit an unsere KI übertragen, damit sie zuhören und antworten kann. Das Audio wird nur so lange verarbeitet, wie es für eine Antwort nötig ist, und nicht für andere Zwecke gespeichert.' },
          { label: 'Sitzungsdaten.', text: 'Nach jedem Gespräch speichern wir eine Zusammenfassung deiner Sitzung — Grammatikhinweise, angetroffenes Vokabular, Flüssigkeitswerte und wiederkehrende Fehler. Dies ist die Grundlage deiner Fortschrittsverfolgung über die Zeit.' },
          { label: 'Nutzungsdaten.', text: 'Grundlegende Informationen über die Nutzung des Dienstes, wie Sitzungsaktivität und Fehlerprotokolle, zur Verbesserung von Zuverlässigkeit und Leistung.' },
        ],
      },
      s3: {
        heading: '3. Wie wir deine Daten verwenden',
        items: [
          'Um die Konversations-KI zu betreiben und Antworten in Echtzeit zu liefern.',
          'Um deinen Fortschritt, deine Grammatiktrends und Flüssigkeitswerte zu speichern und anzuzeigen.',
          'Um dich über Sitzungen hinweg zu authentifizieren.',
          'Um Fehler zu diagnostizieren und den Dienst zu verbessern.',
        ],
        note: 'Wir verkaufen deine Daten nicht und geben sie nicht an Werbetreibende weiter.',
      },
      s4: {
        heading: '4. Sprachdaten und Datenschutz by Design',
        body: 'SpeakPath ist mit einer Voice-first- und Privacy-first-Philosophie gebaut. Sprachaudio wird nur verwendet, um dein Live-Gespräch zu unterstützen, und wird von SpeakPath nicht über das Nötige hinaus gespeichert.',
      },
      s5: {
        heading: '5. Cookies und lokaler Speicher',
        body: 'Wir verwenden Cookies und den lokalen Browserspeicher, um dich angemeldet zu halten und deine Sprach- und Niveaupräferenzen zu speichern. Wir verwenden keine Werbe-Cookies von Drittanbietern.',
      },
      s6: {
        heading: '6. Datenspeicherung',
        body: 'Sitzungszusammenfassungen und Fortschrittsdaten werden so lange aufbewahrt, wie dein Konto aktiv ist.',
      },
      s7: {
        heading: '7. Dienste von Drittanbietern',
        body: 'SpeakPath nutzt Drittanbieter-APIs für die Spracherkennung und KI-Antworten. Diese Anbieter verarbeiten deine Daten gemäß ihren eigenen Datenschutzrichtlinien und Nutzungsbedingungen.',
      },
      s8: {
        heading: '8. Änderungen dieser Richtlinie',
        body: 'Wir können diese Richtlinie aktualisieren, wenn der Dienst sich weiterentwickelt. Bei wesentlichen Änderungen aktualisieren wir das Datum oben auf dieser Seite. Die weitere Nutzung von SpeakPath nach Änderungen gilt als Zustimmung zur geänderten Richtlinie.',
      },
      s9: {
        heading: '9. Kontakt',
        body: 'Fragen zu dieser Richtlinie? Erreiche uns über den Feedback-Button in der App oder nutze den Kontakt-Link im Footer.',
      },
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
      eyebrow: 'Prática de Conversação Real',
      title: {
        top: 'Fale.',
        accent: 'Aprenda.',
        bottom: 'Fale melhor.',
      },
      description:
        'Tenha uma conversa real com IA — sem digitar, sem roteiro. Após cada sessão, o SpeakPath mostra os erros gramaticais que você cometeu e diz exatamente qual tema trabalhar. Então você volta a falar.',
      cta: 'Comece Grátis',
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
          title: 'Receba feedback — e corrija',
          body: 'Após cada sessão, o SpeakPath identifica seus padrões gramaticais e diz exatamente em quais temas focar. Trabalhe neles e volte a praticar.',
          offset: false,
        },
      ],
    },
    levels: {
      eyebrow: 'Dificuldade',
      title: 'Seu ritmo. Seu nível.',
      note: 'Os níveis se ajustam automaticamente à dificuldade, à complexidade do vocabulário e à profundidade das respostas da IA.',
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
          body: 'Debates aprofundados, discussões técnicas, linguagem idiomática e imersão cultural.',
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
    writeToSpeak: {
      eyebrow: 'Caminho de Aprendizado',
      title: { line1: 'Construa sua', accent: 'Base para Falar' },
      description: 'Fluência é falar sem pensar. Seis páginas de teoria com os padrões gramaticais que mais aparecem em conversas reais — estude a base aqui e pratique em voz alta no SpeakPath.',
      body1: 'A verdadeira fluência é quando a gramática se torna automática — você para de traduzir e começa a falar. Estudar os padrões da fala natural acelera essa automatização mais do que só praticar conversas.',
      body2: 'Percorra as páginas, depois abra o app e fale. Quando o SpeakPath identificar um problema gramatical, volte à página correspondente. Esse ciclo fechado é onde a fluência real se constrói.',
      cta: 'Abrir as páginas de teoria',
      ctaNote: 'Grátis — sem conta para ler a teoria',
      langNote: 'Atualmente disponível para estudantes de inglês — mais idiomas em breve.',
      steps: ['Gramática', 'Verbos-Chave', 'Conectores', 'Phrasal Verbs', 'Substantivos', 'Redação'],
    },
    faq: {
      meta: {
        title: 'FAQ — SpeakPath',
        description:
          'Respostas sobre o SpeakPath, app de prática oral com IA para inglês, espanhol, francês e alemão. Comece grátis, sem download.',
      },
      eyebrow: 'Perguntas frequentes',
      title: 'Respostas claras antes de começar a falar.',
      intro:
        'O SpeakPath ajuda estudantes de idiomas a praticar conversas reais com IA no navegador. Comece grátis, escolha um idioma e fale usando o dispositivo que você já tem.',
      cta: 'Comece Gratuitamente',
      back: 'Voltar para SpeakPath',
      items: [
        {
          question: 'O que é o SpeakPath?',
          answer:
            'O SpeakPath é um app de prática oral de idiomas com IA que ajuda você a desenvolver fluência com conversas de voz em tempo real, feedback de gramática, crescimento de vocabulário e sessões para ganhar confiança.',
        },
        {
          question: 'Quais idiomas o SpeakPath oferece?',
          answer:
            'O SpeakPath atualmente oferece inglês, espanhol, francês e alemão para prática de conversação com IA.',
        },
        {
          question: 'O SpeakPath é grátis para começar?',
          answer:
            'Sim. O SpeakPath é grátis para começar, então você pode iniciar a prática sem cartão de crédito.',
        },
        {
          question: 'Preciso instalar alguma coisa?',
          answer:
            'Não. O SpeakPath roda no navegador, então você não precisa baixar nem instalar nada.',
        },
        {
          question: 'O SpeakPath armazena gravações de voz?',
          answer:
            'Não. O SpeakPath não armazena gravações de voz. O áudio é processado somente quando necessário para a experiência de conversa ao vivo.',
        },
        {
          question: 'O SpeakPath funciona em todos os dispositivos?',
          answer:
            'Sim. O SpeakPath foi desenvolvido para funcionar bem em celulares, tablets, laptops e computadores modernos com navegador compatível e acesso ao microfone.',
        },
      ],
    },
    footer: {
      tagline: 'Engenharia de áudio de precisão para fluência.',
      faq: 'FAQ',
      privacy: 'Privacidade',
      contact: 'Contato',
    },
    privacy: {
      meta: {
        title: 'Política de Privacidade — SpeakPath',
        description: 'Política de privacidade do SpeakPath. Saiba como tratamos seus dados de voz, informações de conta e dados de sessão.',
      },
      eyebrow: 'Legal',
      title: 'Política de Privacidade',
      lastUpdated: 'Última atualização: maio de 2025',
      back: '← Voltar ao SpeakPath',
      s1: {
        heading: '1. Quem somos',
        body: 'O SpeakPath (speakpath.dev) é uma plataforma de prática de idiomas com IA que permite ter conversas de voz reais para desenvolver fluência. Esta política explica quais dados coletamos quando você usa o serviço e como os utilizamos.',
      },
      s2: {
        heading: '2. Dados que coletamos',
        items: [
          { label: 'Informações de conta.', text: 'Quando você faz login, coletamos seu endereço de e-mail e, se fornecido, seu nome. Isso é usado apenas para identificar sua conta e salvar seu progresso.' },
          { label: 'Áudio de voz.', text: 'Sua entrada de microfone é transmitida para nossa IA em tempo real para que ela possa ouvir e responder. O áudio é processado apenas pelo tempo necessário para entregar uma resposta e não é retido para nenhum outro fim.' },
          { label: 'Dados de sessão.', text: 'Após cada conversa, salvamos um resumo da sua sessão — notas gramaticais, vocabulário encontrado, pontuações de fluência e erros recorrentes. Isso é o que alimenta seu acompanhamento de progresso ao longo do tempo.' },
          { label: 'Dados de uso.', text: 'Informações básicas sobre como o serviço é usado, como atividade de sessão e registros de erros, usadas para melhorar a confiabilidade e o desempenho.' },
        ],
      },
      s3: {
        heading: '3. Como usamos seus dados',
        items: [
          'Para executar a IA de conversa e fornecer respostas em tempo real.',
          'Para salvar e exibir seu progresso, tendências gramaticais e pontuações de fluência.',
          'Para autenticá-lo entre sessões.',
          'Para diagnosticar bugs e melhorar o serviço.',
        ],
        note: 'Não vendemos seus dados nem os compartilhamos com anunciantes.',
      },
      s4: {
        heading: '4. Dados de voz e privacidade por design',
        body: 'O SpeakPath foi desenvolvido com uma filosofia de voz em primeiro lugar e privacidade em primeiro lugar. O áudio de voz é usado apenas para alimentar sua conversa ao vivo e não é retido pelo SpeakPath além do necessário para entregar uma resposta.',
      },
      s5: {
        heading: '5. Cookies e armazenamento local',
        body: 'Usamos cookies e armazenamento local do navegador para mantê-lo conectado e lembrar suas preferências de idioma e nível. Não usamos cookies de publicidade de terceiros.',
      },
      s6: {
        heading: '6. Retenção de dados',
        body: 'Resumos de sessão e dados de progresso são mantidos enquanto sua conta estiver ativa.',
      },
      s7: {
        heading: '7. Serviços de terceiros',
        body: 'O SpeakPath usa APIs de terceiros para alimentar o reconhecimento de voz e as respostas de IA. Esses provedores tratam seus dados de acordo com suas próprias políticas de privacidade e termos de serviço.',
      },
      s8: {
        heading: '8. Alterações nesta política',
        body: 'Podemos atualizar esta política à medida que o serviço evolui. Quando fizermos alterações materiais, atualizaremos a data no topo desta página. O uso contínuo do SpeakPath após alterações constitui aceitação da política revisada.',
      },
      s9: {
        heading: '9. Contato',
        body: 'Dúvidas sobre esta política? Entre em contato através do botão de feedback dentro do app ou use o link de Contato no rodapé.',
      },
    },
  },
};
