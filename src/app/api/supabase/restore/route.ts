import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Validar origen para prevenir abuso externo (CSRF)
  const host = request.headers.get('host');
  const referer = request.headers.get('referer');

  if (referer && host && !referer.includes(host)) {
    return NextResponse.json(
      { error: 'No autorizado: Petición restringida al mismo origen (Same-Origin)' },
      { status: 403 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const token = process.env.SUPABASE_MANAGEMENT_PAT;

  // Extraer la referencia del proyecto desde la URL de Supabase
  const match = supabaseUrl.match(/https:\/\/([a-zA-Z0-9\-]+)\.supabase\.(co|net)/i);
  const projectRef = match ? match[1] : '';

  if (!projectRef) {
    return NextResponse.json(
      { error: 'No se pudo identificar la referencia del proyecto desde la URL de Supabase' },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json(
      {
        message: 'Para reactivar automáticamente Supabase, configura la variable SUPABASE_MANAGEMENT_PAT en tus variables de entorno con un Personal Access Token de Supabase.'
      },
      { status: 401 }
    );
  }

  try {
    const url = `https://api.supabase.com/v1/projects/${projectRef}/restore`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return NextResponse.json({ message: 'Solicitud de reactivación de Supabase enviada con éxito.' });
    }

    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: `Error de la API de Supabase al restaurar: ${res.statusText}`, details: errorData },
      { status: res.status }
    );
  } catch (error: any) {
    console.error('Error al intentar reactivar Supabase:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al intentar restaurar Supabase', details: error.message },
      { status: 500 }
    );
  }
}
