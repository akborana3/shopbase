import { CartItem } from '../types';

export function generateWhatsAppMessage(items: CartItem[], customerName?: string): string {
  const message = `*New Order*\n\n${
    customerName ? `Customer: ${customerName}\n` : ''
  }*Order Details:*\n${items
    .map(item => `- ${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`)
    .join('\n')}\n\n*Total: ₹${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}*`;

  return encodeURIComponent(message);
}

export function openWhatsApp(message: string, phoneNumber: string = '919179368559'): void {
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}