const OREA_WHATSAPP_NUMBER = "34615367717";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${OREA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
