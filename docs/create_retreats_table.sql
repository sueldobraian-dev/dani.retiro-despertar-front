-- 1. Eliminar tablas previas si existen
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS retreats;
DROP TABLE IF EXISTS locations;

-- 2. Crear la tabla de ubicaciones (para evitar repeticiones)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  maps_url TEXT NOT NULL,
  directions TEXT,
  gallery_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Crear la tabla de retiros referenciando a ubicaciones
CREATE TABLE retreats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  is_confirmed BOOLEAN DEFAULT TRUE,
  status_text TEXT,
  max_capacity INTEGER DEFAULT 9,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Crear la tabla de registros / pre-inscripciones
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest_discipline TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Habilitar RLS en todas las tablas
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE retreats ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 6. Crear políticas de seguridad RLS
-- Lectura pública para ubicaciones y retiros
CREATE POLICY "Permitir lectura pública de ubicaciones" ON locations
  FOR SELECT TO public USING (true);

CREATE POLICY "Permitir lectura pública de retiros" ON retreats
  FOR SELECT TO public USING (true);

-- Solo inserción pública para pre-inscripciones (nadie público puede leer los datos sensibles de otros)
CREATE POLICY "Permitir inserción pública de pre-inscripciones" ON registrations
  FOR INSERT TO public WITH CHECK (true);

-- 7. Insertar registros iniciales de datos reales (Ubicaciones primero)
-- MIGRATION
INSERT INTO locations (name, address, maps_url, directions, gallery_url)
VALUES
  (
    'Complejo Minahasa',
    'Tigre, Buenos Aires (Delta)',
    'https://www.google.com/maps/place/Complejo+Minahasa/@-34.3791964,-58.6053874,15.29z/data=!4m6!3m5!1s0x95bca6f57d080321:0x94236f0775954974!8m2!3d-34.3784129!4d-58.600232!16s%2Fg%2F11ggn4mbgh?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D',
    'Se llega mediante lancha colectiva "Línea Interisleña" desde la Estación Fluvial de Tigre (Muelle 1).',
    '/galeria#retiro-despertar/tigre-delta-minahasa/retiro-despertar/tigre-delta-minahasa/'
  ),
  (
    'Finca los Coipos',
    'Chascomús, Buenos Aires',
    'https://www.google.com/maps/place/FINCA+LOS+COIPOS/@-35.6872383,-57.9587255,17z/data=!4m6!3m5!1s0x95986b00246fef5d:0x1d00c91f49723b18!8m2!3d-35.6872383!4d-57.9587255!16s%2Fg%2F11z4ymqqx8?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D',
    'Tomar Autovía 2 hasta el km 134.5, la entrada es a 25mts de la ruta. Ingreso directamente desde ruta 2',
    '/galeria#retiro-despertar/chascomus-finca-los-coipos/retiro-despertar/chascomus-finca-los-coipos'
  );

-- 8. Insertar registros de Retiros referenciando a las ubicaciones creadas (max_capacity por defecto en 9)
-- EXAMPLE
INSERT INTO retreats (title, start_date, end_date, location_id, is_confirmed, status_text, max_capacity)
VALUES
  (
    'Retiro Despertar - Conexión Delta',
    '2026-08-01',
    '2026-08-02',
    '11111111-1111-1111-1111-111111111111', -- guid de locations
    true,
    NULL,
    9
  ),
  (
    'Retiro Despertar - Encuentro de Primavera',
    '2026-10-17',
    '2026-10-18',
    '22222222-2222-2222-2222-222222222222', -- guid de locations
    false,
    'Próximamente confirmamos',
    9
  );
