export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  heroImage: string;
  date: string;
  dateISO: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list';
    text?: string;
    src?: string;
    caption?: string;
    items?: string[];
    author?: string;
  }[];
  tags: string[];
  relatedIds: number[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'el-arte-y-la-ciencia-de-sentarse-bien',
    title: 'El Arte y la Ciencia de Sentarse Bien',
    excerpt: 'Cómo la investigación ergonómica moderna está transformando la forma en que pensamos sobre los asientos — y por qué tu silla importa más de lo que crees.',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1600&auto=format&fit=crop',
    date: '10 de Diciembre, 2024',
    dateISO: '2024-12-10',
    category: 'Bienestar',
    readTime: '5 min de lectura',
    author: {
      name: 'Dra. Carolina Vega',
      role: 'Consultora de Ergonomía',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    },
    content: [
      {
        type: 'paragraph',
        text: 'En un mundo donde pasamos un promedio de 8 a 10 horas sentados cada día, la forma en que nos sentamos se ha convertido en una de las decisiones de salud más importantes que tomamos — a menudo sin darnos cuenta. La investigación ergonómica moderna está revelando lo que los artesanos de muebles han intuido durante siglos: una buena silla no es un lujo, es una necesidad.',
      },
      {
        type: 'heading',
        text: 'La Epidemia Silenciosa del Mal Asiento',
      },
      {
        type: 'paragraph',
        text: 'Según la Organización Mundial de la Salud, el dolor de espalda baja es la principal causa de discapacidad a nivel global. Y aunque existen múltiples factores, los expertos coinciden: la calidad de nuestros asientos juega un papel fundamental. No se trata solo de confort — se trata de cómo nuestro cuerpo se alinea, se mueve y se recupera a lo largo del día.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1200&auto=format&fit=crop',
        caption: 'El diseño ergonómico considera la curva natural de la columna vertebral y promueve una postura activa.',
      },
      {
        type: 'heading',
        text: 'Lo Que la Ciencia Nos Dice',
      },
      {
        type: 'paragraph',
        text: 'Los estudios más recientes en biomecánica del asiento revelan hallazgos fascinantes. La postura "perfecta" de 90 grados que nos enseñaron en la escuela resulta no ser tan ideal como pensábamos. El cuerpo humano está diseñado para el movimiento, no para la rigidez.',
      },
      {
        type: 'list',
        items: [
          'Una inclinación del respaldo de 100-110 grados reduce significativamente la presión sobre los discos intervertebrales.',
          'El soporte lumbar dinámico — que se adapta al movimiento — supera al soporte fijo en la reducción de fatiga muscular.',
          'Los materiales transpirables pueden reducir la temperatura de contacto hasta 5°C, mejorando el confort durante sesiones prolongadas.',
          'Los apoyabrazos a la altura correcta reducen la tensión en hombros y cuello hasta un 30%.',
          'Alternar entre sentarse y estar de pie cada 30-45 minutos mejora la circulación y la concentración.',
        ],
      },
      {
        type: 'quote',
        text: 'La mejor silla no es la que te obliga a sentarte de una forma, sino la que te permite moverte libremente mientras te da el soporte que necesitas.',
        author: 'Dr. Henrik Johansson, Instituto de Ergonomía de Estocolmo',
      },
      {
        type: 'heading',
        text: 'El Enfoque ErgoCraft: Donde la Ciencia se Encuentra con la Artesanía',
      },
      {
        type: 'paragraph',
        text: 'En ErgoCraft, creemos que la ergonomía y la estética no deben competir — deben complementarse. Nuestro equipo de diseño trabaja en estrecha colaboración con fisioterapeutas y ergónomos para crear asientos que cuidan tu cuerpo sin sacrificar la belleza.',
      },
      {
        type: 'paragraph',
        text: 'Cada una de nuestras sillas de oficina, por ejemplo, pasa por un riguroso proceso de pruebas que incluye análisis de presión, mapeo térmico y evaluaciones posturales con usuarios reales. Los datos informan el diseño, pero es la mano del artesano la que le da vida.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
        caption: 'Nuestro Sillón Meridian combina técnicas de carpintería tradicional con principios ergonómicos contemporáneos.',
      },
      {
        type: 'heading',
        text: 'Cinco Señales de que Tu Silla Necesita un Cambio',
      },
      {
        type: 'list',
        items: [
          'Te levantas con dolor o rigidez en la espalda baja después de sesiones de trabajo.',
          'Necesitas cojines adicionales para sentirte cómodo — un parche temporal que esconde un problema de diseño.',
          'El material de asiento se ha compactado y ya no distribuye tu peso uniformemente.',
          'No puedes ajustar la altura, el respaldo o los apoyabrazos a tu cuerpo específico.',
          'Te encuentras cambiando de posición constantemente — una señal de que el soporte es inadecuado.',
        ],
      },
      {
        type: 'heading',
        text: 'Conclusión: Una Inversión en Tu Bienestar',
      },
      {
        type: 'paragraph',
        text: 'Una buena silla es una inversión — no solo en tu espacio, sino en tu salud, tu productividad y tu bienestar a largo plazo. En ErgoCraft, cada pieza que diseñamos parte de esta convicción: los muebles que te rodean tienen el poder de mejorar tu calidad de vida, día tras día.',
      },
      {
        type: 'paragraph',
        text: 'La próxima vez que te sientes, pregúntate: ¿está esta silla trabajando para mí, o estoy trabajando contra ella? La respuesta podría cambiar la forma en que piensas sobre tu espacio para siempre.',
      },
    ],
    tags: ['ergonomía', 'bienestar', 'sillas', 'salud', 'oficina'],
    relatedIds: [2, 3],
  },
  {
    id: 2,
    slug: 'madera-sostenible-del-bosque-al-mueble',
    title: 'Madera Sostenible: Del Bosque al Mueble',
    excerpt: 'Una mirada dentro de nuestro proceso de abastecimiento — cómo nos asociamos con bosques certificados para ofrecerte madera hermosa y responsablemente cosechada.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop',
    date: '28 de Noviembre, 2024',
    dateISO: '2024-11-28',
    category: 'Sostenibilidad',
    readTime: '4 min de lectura',
    author: {
      name: 'Ing. Marcos Delgado',
      role: 'Director de Materiales',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Cada pieza de madera que llega a nuestro taller tiene una historia. Antes de convertirse en la superficie de un escritorio, las patas de una silla o la estructura de una cama, esa madera fue parte de un ecosistema vivo. En ErgoCraft, creemos que esa historia importa — y que nuestra responsabilidad comienza mucho antes del primer corte.',
      },
      {
        type: 'heading',
        text: 'El Problema con la Madera Convencional',
      },
      {
        type: 'paragraph',
        text: 'La industria del mueble es uno de los mayores consumidores de madera del mundo. Cada año, se talan millones de hectáreas de bosque para satisfacer la demanda de mobiliario barato y desechable. La deforestación resultante no solo destruye hábitats — contribuye significativamente al cambio climático y amenaza a comunidades que dependen de los bosques para su sustento.',
      },
      {
        type: 'paragraph',
        text: 'La alternativa no es dejar de usar madera. Es usarla de forma inteligente, responsable y regenerativa.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
        caption: 'Los bosques certificados FSC garantizan prácticas de manejo que protegen la biodiversidad y los derechos de las comunidades locales.',
      },
      {
        type: 'heading',
        text: 'Nuestra Cadena de Suministro: Trazabilidad Total',
      },
      {
        type: 'paragraph',
        text: 'El 100% de la madera que utilizamos en ErgoCraft proviene de fuentes certificadas por el Forest Stewardship Council (FSC). Pero la certificación es solo el punto de partida. Mantenemos relaciones directas con nuestros proveedores — visitamos los aserraderos, conocemos a las familias que gestionan los bosques y verificamos personalmente que las prácticas se alineen con nuestros estándares.',
      },
      {
        type: 'list',
        items: [
          'Roble europeo de bosques gestionados en Francia y Alemania, con ciclos de replantación de 80 años.',
          'Nogal negro americano de familias silvicultoras en Pensilvania y Virginia, certificados desde hace más de dos décadas.',
          'Fresno proveniente de programas de manejo forestal comunitario en el norte de España.',
          'Teca reciclada recuperada de edificaciones antiguas en Indonesia, dándole una segunda vida noble.',
        ],
      },
      {
        type: 'quote',
        text: 'Un mueble verdaderamente sostenible no solo viene de un buen bosque — está diseñado para durar lo suficiente como para que ese bosque se regenere completamente antes de que necesites reemplazarlo.',
        author: 'Marcos Delgado, Director de Materiales de ErgoCraft',
      },
      {
        type: 'heading',
        text: 'Del Aserradero al Taller: Un Proceso Consciente',
      },
      {
        type: 'paragraph',
        text: 'Cuando la madera llega a nuestro taller, comienza un proceso de aclimatación que puede durar semanas. La madera necesita adaptarse a la humedad y temperatura de nuestro espacio antes de poder trabajarla. Este paso, que muchos fabricantes se saltan para ahorrar tiempo, es esencial para la estabilidad a largo plazo de cada pieza.',
      },
      {
        type: 'paragraph',
        text: 'Nuestros artesanos seleccionan personalmente cada tabla, evaluando la dirección de la veta, la presencia de nudos y el potencial de cada pieza. Los recortes y desechos no van al vertedero — se transforman en piezas más pequeñas como portavasos y bandejas, se donan como material educativo a escuelas de carpintería, o se compostan para uso agrícola.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop',
        caption: 'Nuestro maestro ebanista Carlos Mendoza selecciona tablas de nogal para la colección Heritage.',
      },
      {
        type: 'heading',
        text: 'El Futuro: Más Allá de la Sostenibilidad',
      },
      {
        type: 'paragraph',
        text: 'La sostenibilidad, tal como la entendemos hoy, ya no es suficiente. Nuestro objetivo para 2030 es ser una empresa regenerativa — no solo minimizar nuestro impacto, sino contribuir activamente a la recuperación de los ecosistemas forestales. Esto incluye nuestro programa "Un Mueble, Un Árbol", que ha plantado más de 25,000 árboles desde 2018, y nuestra inversión en investigación de nuevos materiales biobasados que puedan complementar a la madera tradicional.',
      },
      {
        type: 'paragraph',
        text: 'Cuando eliges un mueble de ErgoCraft, no solo estás eligiendo calidad y diseño. Estás eligiendo un futuro donde los bosques prosperan, las comunidades se benefician y los muebles se construyen para durar generaciones.',
      },
    ],
    tags: ['sostenibilidad', 'madera', 'FSC', 'medio ambiente', 'materiales'],
    relatedIds: [1, 3],
  },
  {
    id: 3,
    slug: '5-formas-de-disenar-una-oficina-en-casa',
    title: '5 Formas de Diseñar una Oficina en Casa que Inspire',
    excerpt: 'Consejos de expertos para crear un espacio de trabajo que impulse el enfoque y la creatividad sin sacrificar la estética.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
    date: '15 de Noviembre, 2024',
    dateISO: '2024-11-15',
    category: 'Consejos de Interior',
    readTime: '6 min de lectura',
    author: {
      name: 'Elena Marchetti',
      role: 'Directora Creativa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Después de años en que la oficina en casa pasó de ser un privilegio a una necesidad, una cosa ha quedado clara: el espacio donde trabajas afecta directamente cómo trabajas. Un escritorio en la esquina del dormitorio puede funcionar temporalmente, pero para construir una práctica sostenible de trabajo remoto, necesitas un espacio que esté diseñado — no improvisado.',
      },
      {
        type: 'paragraph',
        text: 'Como diseñadores de muebles, hemos visto de primera mano cómo pequeños cambios en el espacio de trabajo pueden generar grandes transformaciones en productividad, creatividad y bienestar. Aquí compartimos cinco principios que hemos aprendido — y que aplicamos en nuestro propio taller.',
      },
      {
        type: 'heading',
        text: '1. Prioriza la Luz Natural (pero Contrólala)',
      },
      {
        type: 'paragraph',
        text: 'La luz natural es el factor ambiental más influyente en tu capacidad de concentración y tu estado de ánimo. Ubica tu escritorio donde reciba luz indirecta — idealmente perpendicular a la ventana para evitar reflejos en la pantalla y resplandor directo. Si no tienes opción de luz natural, invierte en iluminación que imite el espectro de luz diurna con temperatura de color de 5000K durante las horas de trabajo.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop',
        caption: 'El Escritorio Oslo posicionado junto a una ventana norte — la orientación ideal para luz difusa sin deslumbramiento.',
      },
      {
        type: 'heading',
        text: '2. Invierte en tu Silla y tu Escritorio — En Ese Orden',
      },
      {
        type: 'paragraph',
        text: 'Si tienes que priorizar, comienza por la silla. Es la pieza de mobiliario que más impacto tiene en tu salud y productividad a largo plazo. Una buena silla ergonómica con soporte lumbar ajustable, profundidad de asiento regulable y mecanismo de inclinación sincronizado puede transformar tus jornadas de trabajo.',
      },
      {
        type: 'paragraph',
        text: 'Después, el escritorio. Un escritorio de altura ajustable que te permita alternar entre sentarte y estar de pie es ideal. Si tu presupuesto no lo permite, asegúrate al menos de que la altura de tu escritorio fijo posicione tus codos a 90 grados cuando tecleas.',
      },
      {
        type: 'heading',
        text: '3. Crea Zonas con Propósito',
      },
      {
        type: 'paragraph',
        text: 'Si tu espacio lo permite, evita la trampa del escritorio único. Los creativos y profesionales más productivos tienden a moverse entre diferentes zonas durante el día: un escritorio para el trabajo enfocado con pantalla, un sillón cómodo para lectura y pensamiento estratégico, y quizás una mesa auxiliar junto a una ventana para llamadas y reuniones virtuales.',
      },
      {
        type: 'quote',
        text: 'El espacio más productivo no es el más grande ni el más equipado. Es el que te permite trabajar de diferentes formas a lo largo del día, adaptándose a tu energía y tus tareas.',
        author: 'Elena Marchetti, Directora Creativa de ErgoCraft',
      },
      {
        type: 'heading',
        text: '4. Los Materiales Naturales Reducen el Estrés',
      },
      {
        type: 'paragraph',
        text: 'Estudios en neuroarquitectura demuestran que la presencia de materiales naturales — madera, cuero, lino, piedra — reduce los niveles de cortisol y mejora la función cognitiva. Un escritorio de madera maciza no solo es más bello que uno de melamina; literalmente te hace sentir mejor mientras trabajas.',
      },
      {
        type: 'paragraph',
        text: 'Incorpora plantas, textiles naturales y acabados táctiles en tu oficina. Elige piezas que quieras tocar — la conexión sensorial con materiales naturales es una fuente sutil pero poderosa de bienestar.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1200&auto=format&fit=crop',
        caption: 'Materiales naturales como la madera de nogal y el cuero crean un ambiente cálido que favorece la concentración.',
      },
      {
        type: 'heading',
        text: '5. Personaliza sin Desordenar',
      },
      {
        type: 'paragraph',
        text: 'Tu oficina en casa debe sentirse tuya — no como una sala de reuniones corporativa. Pero hay una línea fina entre personalización y desorden. La clave es elegir pocos objetos significativos: un par de libros que te inspiren, una obra de arte que te guste, una pieza heredada con historia. Cada objeto en tu campo visual ocupa un fragmento de tu atención, así que sé selectivo.',
      },
      {
        type: 'paragraph',
        text: 'El almacenamiento inteligente es tu aliado. Cajones de cierre suave, estantes empotrados, bandejas organizadoras — todo lo que mantenga tus herramientas accesibles pero fuera de la vista contribuye a una mente más clara y un trabajo más enfocado.',
      },
      {
        type: 'heading',
        text: 'Reflexión Final',
      },
      {
        type: 'paragraph',
        text: 'Diseñar una oficina en casa es un acto de autoconocimiento. Requiere entender cómo trabajas, qué te motiva y qué te distrae. No existe una fórmula universal — pero sí existen principios que funcionan. Empieza por estos cinco y ajusta sobre la marcha. Tu espacio de trabajo ideal es un proyecto vivo, no un destino fijo.',
      },
    ],
    tags: ['oficina en casa', 'productividad', 'diseño interior', 'trabajo remoto', 'consejos'],
    relatedIds: [1, 2],
  },
];
