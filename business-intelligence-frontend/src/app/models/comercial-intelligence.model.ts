export interface SalesMetrics {
  totalSales: number;
  monthlyGrowth: number;
  topProducts: Product[];
}

export interface Product {
  name: string;
  sales: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  customerRetention: number;
}

export interface MarketAnalysis {
  marketShare: number;
  competitorAnalysis: Competitor[];
}

export interface Competitor {
  competitor: string;
  marketShare: number;
}

export interface ComercialDashboard {
  salesMetrics: SalesMetrics;
  customerMetrics: CustomerMetrics;
  marketAnalysis: MarketAnalysis;
}

export interface Report {
  id: number;
  title: string;
  date: string;
  type: string;
}

export interface SalesTrend {
  month: string;
  sales: number;
}

export interface CustomerSegmentation {
  enterprise: number;
  midMarket: number;
  smallBusiness: number;
}

export interface RevenueByRegion {
  region: string;
  revenue: number;
}

export interface Analytics {
  salesTrends: SalesTrend[];
  customerSegmentation: CustomerSegmentation;
  revenueByRegion: RevenueByRegion[];
}
