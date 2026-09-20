import { createFileRoute } from '@tanstack/react-router';
import { TopUtilityStrip } from '@/components/TopUtilityStrip';
import { BurgerMenu } from '@/components/BurgerMenu';
import { SiteFooter } from '@/components/SiteFooter';
import { WhatsAppInquiry } from '@/components/WhatsAppInquiry';
export const Route = createFileRoute('/b2b')({head:()=>({meta:[{title:'B2B Sub-Agent Signup | Al-Bahr Travels'},{name:'description',content:'Partner with Al-Bahr Travels for wholesale travel, group fares and corporate travel services.'},{property:'og:title',content:'Travel Partner Programme | Al-Bahr Travels'},{property:'og:description',content:'Connect with our dedicated B2B travel desk in Arifwala.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:()=> <main><TopUtilityStrip/><BurgerMenu/><section className="portal-section b2b-section"><div><span className="eyebrow">GROW WITH AL-BAHR</span><h1>Your business.<br/>Our travel expertise.</h1><p>Wholesale rates, group fares and a dedicated support desk for travel brokers, sub-agents and corporate accounts.</p></div><WhatsAppInquiry b2b/></section><SiteFooter/></main>});
