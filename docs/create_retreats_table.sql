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

-- 7. Insertar registros iniciales de prueba (Ubicaciones primero)
INSERT INTO locations (id, name, address, maps_url, directions)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Complejo Minahasa',
    'Tigre, Buenos Aires (Delta)',
    'https://maps.app.goo.gl/d9Z1w2x3y4z5a6b7c',
    'Se llega mediante lancha colectiva "Línea Interisleña" desde la Estación Fluvial de Tigre (Muelle 1).'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Finca los Coipos',
    'Chascomús, Buenos Aires',
    'https://maps.app.goo.gl/k8j7i6h5g4f3e2d1c',
    'Tomar Autovía 2 hasta el km 120, luego continuar por el camino de circunvalación hacia la laguna.'
  );

-- 8. Insertar registros de Retiros referenciando a las ubicaciones creadas
INSERT INTO retreats (title, start_date, end_date, location_id, is_confirmed, status_text)
VALUES
  (
    'Retiro Despertar - Conexión Delta',
    '2026-08-01',
    '2026-08-02',
    '11111111-1111-1111-1111-111111111111',
    true,
    NULL
  ),
  (
    'Retiro Despertar - Encuentro de Primavera',
    '2026-10-17',
    '2026-10-18',
    '22222222-2222-2222-2222-222222222222',
    false,
    'Próximamente confirmamos'
  );
