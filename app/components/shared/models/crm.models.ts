export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavSubItem[];
}

export interface MasterModuleCards {
  title: string;
  icon: string;
  theme: string;
  route: string;
}

export interface NavSubItem {
  label: string;
  route: string;
}

export interface KpiCard {
  icon: string;
  iconClass: string;
  value: string;
  label: string;
  badge: string;
  badgeClass: string;
  sub: string;
}

export interface ActivityItem {
  iconClass: string;
  icon: string;
  title: string;
  meta: string;
  time: string;
}

export interface RecentRecord {
  ref: string;
  customer: string;
  customerInitials: string;
  customerColor: string;
  project: string;
  type: string;
  typeClass: string;
  value: string;
  statusLabel: string;
  statusClass: string;
  date: string;
}

export interface PipelineItem {
  label: string;
  count: number;
  value: string;
  width: number;
  color: string;
}

export interface TopCustomer {
  initials: string;
  color: string;
  name: string;
  revenue: string;
  width: number;
  barColor: string;
}
