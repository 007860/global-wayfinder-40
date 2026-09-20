import { ArrowDown, BadgeCheck } from 'lucide-react';
import hero from '@/assets/travel-istanbul.jpg';
import { WhatsAppInquiry } from './WhatsAppInquiry';
export function Hero() {
 return <section className="travel-hero"><img src={hero} width={1920} height={1024} alt="Istanbul mosque and the Bosphorus waterfront" fetchPriority="high" className="hero-photo"/><div className="hero-shade"/><div className="hero-content"><div className="hero-copy"><div className="hero-badge"><BadgeCheck size={16}/> SECP REGISTERED · PERSONALLY COMMITTED</div><p className="hero-brand">AL-BAHR TRAVELS & CONSULTANTS</p><h1>Your Trusted Partner for <em>Global Visas, Umrah Packages</em> & Travel Consultancy</h1><p className="hero-description">SECP Registered Private Limited Company delivering hassle-free visa processing, direct air ticketing, and customized pilgrimage tours.</p><a href="#services" className="hero-explore">A world of possibilities, one trusted partner <ArrowDown size={17}/></a></div><WhatsAppInquiry/></div><div className="hero-location">ISTANBUL, TÜRKİYE <span>41.0082° N · 28.9784° E</span></div></section>;
}
