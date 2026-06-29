import { brandAssets, siteDomain } from '../data/brand'

export function ContactFooter() {
  return (
    <footer id="contact" className="contact-footer" aria-labelledby="contact-footer-title">
      <div className="footer-brand">
        <img className="footer-brand-logo" src={brandAssets.dnaWhite} alt="DNA Studio" />
      </div>

      <div className="contact-footer__content">
        <p className="section-eyebrow">Contact</p>
        <h2 id="contact-footer-title">Let&apos;s Build from Essence</h2>
        <p className="contact-footer__body">본질에서 시작해 현실의 제품과 서비스로 구현합니다.</p>
        <a className="contact-footer__cta button-primary" href="#home">
          Contact Us
        </a>
      </div>

      <div className="footer-bottom-bar" aria-label="Site information">
        <span>DNA Studio</span>
        <span>{siteDomain}</span>
      </div>
    </footer>
  )
}

export default ContactFooter
