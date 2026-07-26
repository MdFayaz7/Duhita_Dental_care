import { FaFacebookF, FaGoogle, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { allServices, navigation, site } from '../../data/content';
import { images } from '../../data/assets';
import LazyImage from '../ui/LazyImage';

const socialLinks = [
  { icon: FaFacebookF, href: site.social.facebook, label: 'Facebook' },
  { icon: FaInstagram, href: site.social.instagram, label: 'Instagram' },
  { icon: FaGoogle, href: site.social.google, label: 'Google' },
  { icon: FaWhatsapp, href: site.social.whatsapp, label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <LazyImage
              src={images.logo}
              alt={`${site.name} logo`}
              className="h-10 w-auto brightness-0 invert"
              wrapperClassName="mb-5"
            />
            <p className="text-sm leading-relaxed text-white/65">{site.description}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand-accent hover:bg-brand-accent hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">
              Services
            </h4>
            <ul className="space-y-3">
              {allServices.map((item) => (
                <li key={item}>
                  <a
                    href="/services"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-brand-accent" />
                <span>{site.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <FiPhone className="shrink-0 text-brand-accent" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <FiMail className="shrink-0 text-brand-accent" />
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="font-semibold text-white">Hospital Timings</p>
              <p className="mt-2 text-white/65">Morning: {site.hours.morning}</p>
              <p className="text-white/65">Evening: {site.hours.evening}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p>Benz Circle, Vijayawada · Multispeciality Dental Care</p>
        </div>
      </div>
    </footer>
  );
}
