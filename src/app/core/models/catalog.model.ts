export interface Catalog {
  catalogId: string;
  catalogName: string;
  catalogDescription: string;
}
export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  count: number;
}