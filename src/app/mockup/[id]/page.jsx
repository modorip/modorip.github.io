import { notFound } from 'next/navigation';
import FullScreenView from '@/components/FullScreenView';
import { SCREENS, byId } from '@/lib/screens';

export function generateStaticParams() { return SCREENS.map((s) => ({ id: s.id })); }
export function generateMetadata({ params }) { const m = byId(params.id); return { title: m ? `${m.no} ${m.name} · 목업` : '목업' }; }

export default function MockupScreenPage({ params }) {
  const m = byId(params.id);
  if (!m) notFound();
  return <FullScreenView mode="screen" id={params.id} backHref="/mockup" title={`${m.no} · ${m.name}`} />;
}
