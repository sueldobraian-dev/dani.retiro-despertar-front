export type CapsuleTab = 'quienes-somos' | 'chascomus-finca-los-coipos' | 'tigre-delta-minahasa' | string;

export interface CapsuleNavConfig {
  id: CapsuleTab;
  label: string;
  shortLabel?: string;
  hash: string;
  subtitle: string;
  iconType: 'users' | 'trees' | 'waves';
}

export interface ActivityItem {
  title: string;
  description: string;
  iconName: 'heart' | 'sun' | 'sparkles' | 'utensils';
}

export interface TimelineEvent {
  time: string;
  title: string;
  highlight?: boolean;
}

export interface LocationCapsuleData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  dateText: string;
  description: string;
  hectaresText?: string;
  lagoonText?: string;
  capacityText?: string;
  galleryUrl: string;
  activities: ActivityItem[];
  day1Timeline: TimelineEvent[];
  day2Timeline: TimelineEvent[];
  preventaCouponCode: string;
  preventaDiscountText: string;
  promoGrupalCouponCode: string;
  promoGrupalDiscountText: string;
  terms: string[];
}
