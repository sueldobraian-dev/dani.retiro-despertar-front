-- ==============================================================================
-- 1. Crear la tabla de testimonios (testimonials)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,       -- Escrito: Nombre del autor. Video/Short: Título del video
  content TEXT NOT NULL,     -- Escrito: Texto del testimonio. Video/Short: URL de YouTube
  subtitle TEXT,             -- Escrito: Rol/disciplina. Video/Short: Autor o contexto opcional
  avatar_url TEXT,           -- Opcional: Foto de perfil o thumbnail personalizado
  rating INTEGER DEFAULT 5,  -- Calificación (1 a 5)
  type TEXT NOT NULL CHECK (type IN ('written', 'video', 'short')),
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 2. Índices de Rendimiento
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_testimonials_ranking 
  ON testimonials (type, is_published, likes_count DESC, created_at DESC);

-- ==============================================================================
-- 3. Habilitar Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública: Solo testimonios publicados
DROP POLICY IF EXISTS "Permitir lectura pública de testimonios publicados" ON testimonials;
CREATE POLICY "Permitir lectura pública de testimonios publicados" ON testimonials
  FOR SELECT TO public USING (is_published = true);

-- ==============================================================================
-- 4. Funciones Seguras para Likes (RPC)
-- ==============================================================================
-- Permite incrementar de forma atómica y segura el contador sin exponer UPDATE en toda la fila
CREATE OR REPLACE FUNCTION increment_testimonial_like(testimonial_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE testimonials
  SET likes_count = likes_count + 1
  WHERE id = testimonial_id AND is_published = true
  RETURNING likes_count INTO new_count;

  RETURN COALESCE(new_count, 0);
END;
$$;

-- Permite decrementar en caso de toggle / quitar like sin bajar de 0
CREATE OR REPLACE FUNCTION decrement_testimonial_like(testimonial_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE testimonials
  SET likes_count = GREATEST(0, likes_count - 1)
  WHERE id = testimonial_id AND is_published = true
  RETURNING likes_count INTO new_count;

  RETURN COALESCE(new_count, 0);
END;
$$;

-- Habilitar permisos de ejecución para usuarios anónimos y autenticados
GRANT EXECUTE ON FUNCTION increment_testimonial_like(UUID) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION decrement_testimonial_like(UUID) TO anon, authenticated, service_role;

-- ==============================================================================
-- 5. Semillas de Datos Iniciales (Seed Data)
-- ==============================================================================
-- Testimonios Escritos
INSERT INTO testimonials (title, subtitle, content, rating, type, likes_count, created_at)
VALUES
  (
    'Carolina Gómez',
    'Participante de Constelaciones',
    'El trabajo con las Constelaciones Familiares marcó un antes y un después en mi relación familiar. Pude comprender lazos que venía arrastrando hace años. El entorno natural y la calidez del grupo hicieron todo sumamente sanador.',
    5,
    'written',
    42,
    NOW() - INTERVAL '10 days'
  ),
  (
    'Mariano Silva',
    'Practicante de Yoga y Reiki',
    'Las clases de yoga frente a las sierras y las sesiones de Reiki me devolvieron una paz mental que creía perdida por el estrés de la ciudad. El lugar es mágico y la comida consciente es exquisita.',
    5,
    'written',
    38,
    NOW() - INTERVAL '8 days'
  ),
  (
    'Valeria Castro',
    'Participante de Bienestar Integral',
    'Una experiencia transformadora. Las tres disciplinas se complementan de una forma orgánica e inteligente. La meditación junto a la fogata nocturna fue uno de los momentos más hermosos de mi vida.',
    5,
    'written',
    35,
    NOW() - INTERVAL '7 days'
  ),
  (
    'Lucía Benítez',
    'Participante de Constelaciones Familiares',
    'Llegué con muchas dudas y miedos sobre abrir mis heridas familiares. El respeto y el amor con el que fuimos guiadas me permitieron soltar cargas que no me correspondían. Me siento liviana y en paz.',
    5,
    'written',
    29,
    NOW() - INTERVAL '6 days'
  ),
  (
    'Fernando Domínguez',
    'Practicante de Meditación y Yoga',
    'La atención al detalle en cada comida gourmet y la desconexión total del teléfono me devolvieron la energía para encarar el año. Muy agradecido con el equipo de facilitadoras.',
    5,
    'written',
    24,
    NOW() - INTERVAL '5 days'
  ),
  (
    'Florencia Morales',
    'Participante de Sanación Energética',
    'El círculo de mujeres y la ceremonia de fuego me reconectaron con mi intuición más profunda. Recomiendo este retiro a cualquiera que sienta necesidad de un respiro verdadero.',
    5,
    'written',
    21,
    NOW() - INTERVAL '4 days'
  ),
  (
    'Gonzalo Rossi',
    'Participante de Yoga & Mindfulness',
    'Un fin de semana que vale por meses de terapia tradicional. Respirar aire puro, comer sano y meditar al amanecer frente a la laguna es un regalo que todos nos deberíamos dar.',
    5,
    'written',
    18,
    NOW() - INTERVAL '3 days'
  ),
  (
    'Paula Fernández',
    'Participante de Constelaciones',
    'Pude sanar el vínculo con mi madre desde la comprensión y el amor, sin juzgar. Eternamente agradecida a Dani y a todo el hermoso grupo que se formó.',
    5,
    'written',
    15,
    NOW() - INTERVAL '2 days'
  ),
  (
    'Esteban Méndez',
    'Practicante de Reiki',
    'Nunca había experimentado el Reiki en un entorno tan en sintonía con la naturaleza. La paz que se siente en Finca Los Coipos es indescriptible.',
    5,
    'written',
    12,
    NOW() - INTERVAL '1 day'
  ),
  (
    'Silvina Rivas',
    'Participante de Bienestar Integral',
    'Volví a mi casa siendo otra persona. Mi familia notó el cambio de serenidad de inmediato. Ya estoy esperando la próxima fecha para volver.',
    5,
    'written',
    10,
    NOW() - INTERVAL '12 hours'
  ),
  (
    'Agustín Peralta',
    'Participante de Yoga & Descanso',
    'La combinación de yoga suave, comida consciente y caminatas en silencio por el delta fue el bálsamo que necesitaba para resetear mi mente.',
    5,
    'written',
    7,
    NOW() - INTERVAL '6 hours'
  ),
  (
    'Romina Tagliaferro',
    'Participante de Constelaciones y Fogata',
    'El calor de la fogata y las palabras de cierre todavía resuenan en mi corazón. Una experiencia mágica de hermandad y amor incondicional.',
    5,
    'written',
    5,
    NOW() - INTERVAL '2 hours'
  );

-- Videos Testimoniales (Formato Tradicional 16:9)
INSERT INTO testimonials (title, subtitle, content, type, likes_count, created_at)
VALUES
  (
    'Atardecer en la laguna',
    'Experiencia en la Laguna',
    'https://www.youtube.com/watch?v=cIjc8wOTLwk',
    'video',
    52,
    NOW() - INTERVAL '15 days'
  ),
  (
    'Conexión y Sanación en Grupo',
    'Círculo de Cierre & Gratitud',
    'https://www.youtube.com/watch?v=cIjc8wOTLwk',
    'video',
    34,
    NOW() - INTERVAL '12 days'
  ),
  (
    'Resonancia y Paz Interior',
    'Sonido y Relajación en el Delta',
    'https://www.youtube.com/watch?v=cIjc8wOTLwk',
    'video',
    27,
    NOW() - INTERVAL '9 days'
  );

-- Shorts Testimoniales (Formato Vertical 9:16)
INSERT INTO testimonials (title, subtitle, content, type, likes_count, created_at)
VALUES
  (
    'Testimonio 1 - Retiro Despertar',
    'Camila • Testimonio en Primera Persona',
    'https://www.youtube.com/shorts/TSQ96WksY9w',
    'short',
    48,
    NOW() - INTERVAL '14 days'
  ),
  (
    'Lo que sentí al soltar el pasado',
    'Mariana • Experiencia en Constelaciones',
    'https://www.youtube.com/shorts/TSQ96WksY9w',
    'short',
    31,
    NOW() - INTERVAL '11 days'
  ),
  (
    'Un minuto de paz absoluta',
    'Lucas • Sanación y Conexión Natural',
    'https://www.youtube.com/shorts/TSQ96WksY9w',
    'short',
    23,
    NOW() - INTERVAL '8 days'
  );
