import { useState } from 'react';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { Button } from './ui/button';
import { WHATSAPP_URL } from '@/lib/countries';
export function WhatsAppInquiry({ destination = '', b2b = false }: { destination?: string; b2b?: boolean }) {
  const [ready, setReady] = useState(false);
  return <form className="inquiry-form" onSubmit={e => { e.preventDefault(); const data = new FormData(e.currentTarget); const text = `Assalam-o-Alaikum Al-Bahr Travels & Consultants,\n${b2b ? 'B2B Sub-Agent Signup' : 'Free Visa Consultation'}\n` + Array.from(data.entries()).map(([k,v]) => `${k}: ${v}`).join('\n'); window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer'); setReady(true); }}>
    <span className="eyebrow">LET’S PLAN YOUR NEXT CHAPTER</span><h2>{b2b ? 'Become a travel partner' : 'Where do you want to go?'}</h2><p>{b2b ? 'Connect with our wholesale travel desk.' : 'Tell us a little. We’ll take it from here.'}</p>
    <label>Full name<input name="Full name" placeholder="Your full name" required minLength={2} autoComplete="name" /></label>
    {b2b && <label>Agency / company<input name="Agency" placeholder="Your agency name" required /></label>}
    <label>WhatsApp number<input name="WhatsApp number" type="tel" placeholder="+92 3XX XXXXXXX" autoComplete="tel" pattern="[+0-9 ()-]{7,20}" required /></label>
    <div className="form-pair"><label>Destination<select name="Destination" defaultValue={destination} required><option value="" disabled>Select destination</option>{['Saudi Arabia','UAE','Turkey','UK','USA','Europe/Schengen','Malaysia','Thailand','Other'].map(d => <option key={d}>{d}</option>)}</select></label><label>Service<select name="Service" required defaultValue=""><option value="" disabled>Select service</option>{['Visit Visa','Umrah Package','Work/Study File Prep','Air Ticket',...(b2b ? ['B2B Partnership'] : [])].map(d => <option key={d}>{d}</option>)}</select></label></div>
    <Button type="submit" className="consultation-submit">{b2b ? 'Request B2B Partnership' : 'Get Free Visa Consultation'}<ArrowUpRight /></Button>
    <small><LockKeyhole size={12}/>{ready ? 'Continue in WhatsApp and send your inquiry to our team.' : 'Your details stay private. No obligation, just guidance.'}</small>
  </form>;
}
