import { supabase } from "../lib/supabase";

export interface Order {
  id?: string;
  email: string;
  total: number;
  currency: string;
  status: string;
  created_at?: string;
}

export interface OrderItem {
  id?: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export const createOrder = async (orderData: Order) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const addOrderItems = async (orderId: string, items: Omit<OrderItem, "order_id">[]) => {
  const itemsWithOrderId = items.map((item) => ({ ...item, order_id: orderId }));
  const { data, error } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId)
    .select();

  if (error) throw error;
  return data;
};
