import {
  BadgeCheck,
  Building2,
  Code2,
  Compass,
  FileText,
  Flag,
  GraduationCap,
  HelpCircle,
  Landmark,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Users2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'badge-check': BadgeCheck,
  'building-2': Building2,
  'code-2': Code2,
  compass: Compass,
  'file-text': FileText,
  flag: Flag,
  'graduation-cap': GraduationCap,
  'help-circle': HelpCircle,
  landmark: Landmark,
  mail: Mail,
  'map-pin': MapPin,
  rocket: Rocket,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  users: Users,
  'users-2': Users2,
};

export function resolveIcon(iconKey?: string, fallback: LucideIcon = Sparkles) {
  return (iconKey ? iconMap[iconKey] : undefined) ?? fallback;
}
