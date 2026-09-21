import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/countries';
export function FloatingEmailButton(){return <a className="global-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Al-Bahr Travels on WhatsApp"><MessageCircle /></a>}
