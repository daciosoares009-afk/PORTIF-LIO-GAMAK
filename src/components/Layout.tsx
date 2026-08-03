import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { MobileContactBar } from '../components/MobileContactBar'
import { SiteFooter } from '../components/SiteFooter'
import { company, whatsappUrl } from '../config/company'

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <SiteFooter />
      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a GAMAK pelo WhatsApp">
        <img src="/images/social/whatsapp-logo.png" alt="" width="179" height="148" />
      </a>
      <MobileContactBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        name: company.legalName,
        url: company.website,
        logo: `${company.website}/images/brand/gamak-logo-oficial.png`,
        image: `${company.website}/images/projects/optimized/projeto-esteira-rolante-03-1440.webp`,
        description: company.description,
        telephone: company.phoneDisplay,
        email: company.email,
        serviceType: ['Obras', 'Reformas', 'Instalações elétricas', 'Instalações hidráulicas', 'Manutenções', 'Pinturas', 'Reparos'],
      }) }} />
    </>
  )
}
