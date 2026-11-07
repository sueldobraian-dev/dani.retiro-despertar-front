export type TestimonialType = 'written' | 'video' | 'short';

export interface Testimonial {
  id: string;
  title: string;       // Nombre de participante (escrito) o título del video (video/short)
  content: string;     // Comentario/reseña (escrito) o URL de YouTube (video/short)
  subtitle?: string;   // Rol/disciplina (escrito) o autor/contexto (video/short)
  avatarUrl?: string;
  rating?: number;
  type: TestimonialType;
  likesCount: number;
  isPublished: boolean;
  createdAt: string;
}


export interface FeedbackParticipant {
  id: string;
  name: string;
  role: string; // Rol o subtítulo (ej. "Participante de Constelaciones", "Practicante de Yoga")
  comment: string;
  avatarUrl: string;
  rating?: number; // Calificación opcional (1-5)
  likesCount?: number;
}

export interface ExperienceImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface FormRegisterInput {
  fullName: string;
  email: string;
  phone: string;
  interestDiscipline: string; // Disciplina de interés: "Constelaciones Familiares" | "Reiki" | "Yoga" | "Todas"
  message?: string; // Comentarios adicionales
}

