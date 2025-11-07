export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Pizza' | 'Burger' | 'Drink';
  imageUrl: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export enum OrderStatus {
  NEW = 'New',
  COMPLETED = 'Completed',
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  timestamp: Date;
}
