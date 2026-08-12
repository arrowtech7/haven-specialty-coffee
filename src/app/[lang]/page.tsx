import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Signature from '@/components/Signature';
import MenuPreview from '@/components/MenuPreview';
import QrCta from '@/components/QrCta';
import Reviews from '@/components/Reviews';
import GoodToKnow from '@/components/GoodToKnow';
import Visit from '@/components/Visit';
import Footer from '@/components/Footer';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <div className="frame">
      <Navbar lang={lang} t={d.nav} />
      <main className="sheet">
        <Hero lang={lang} t={d.hero} />
        <About lang={lang} t={d.about} />
        <Signature lang={lang} t={d.signature} tags={d.tags} />
        <MenuPreview lang={lang} t={d.menuPreview} tags={d.tags} />
        <QrCta lang={lang} t={d.qrCta} />
        <Reviews t={d.reviews} />
        <GoodToKnow t={d.gtk} />
        <Visit t={d.visit} />
        <Footer lang={lang} t={d.footer} />
      </main>
    </div>
  );
}
