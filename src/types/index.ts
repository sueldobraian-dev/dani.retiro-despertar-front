export interface FeedbackParticipant {
  id: string;
  name: string;
  role: string; // Rol o subtítulo (ej. "Participante de Constelaciones", "Practicante de Yoga")
  comment: string;
  avatarUrl: string;
  rating?: number; // Calificación opcional (1-5)
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
