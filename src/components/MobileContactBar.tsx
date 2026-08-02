import { ArrowUpRight } from 'lucide-react'
import { whatsappUrl } from '../config/company'

export function MobileContactBar() {
  return (
    <a className="mobile-contact-bar" href={whatsappUrl()} target="_blank" rel="noreferrer">
      <img src="/images/social/whatsapp-logo.png" alt="" width="180" height="180" />
      <span><small>Fale com a GAMAK</small><strong>Solicitar uma avaliação</strong></span>
      <ArrowUpRight />
    </a>
  )
}
