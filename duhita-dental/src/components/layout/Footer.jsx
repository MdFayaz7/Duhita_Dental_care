import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiArrowUpRight } from 'react-icons/fi';
import { navigation, site } from '../../data/content';
import { services } from '../../data/services';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-black pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.18),transparent)]" />

      <div className="shell relative">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="group inline-flex">
              <Logo height={96} />
            </Link>
            <p className="type-body mt-5 max-w-sm text-mute">
              {site.fullName}. Multispeciality dental care in Vijayawada since {site.established}.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { icon: FiInstagram, href: site.social.instagram, label: 'Instagram' },
                { icon: FiFacebook, href: site.social.facebook, label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mute transition-all duration-400 hover:border-white/30 hover:text-white"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="type-caption font-semibold uppercase tracking-[0.08em] text-brand-orange">Navigate</h4>
            <ul className="mt-5 space-y-3">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link to={n.href} className="type-body text-mute transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="type-caption font-semibold uppercase tracking-[0.08em] text-brand-orange">Treatments</h4>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`} className="type-body text-mute transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="type-caption font-semibold uppercase tracking-[0.08em] text-brand-orange">Reach us</h4>
            <ul className="type-body mt-5 space-y-4 text-mute">
              <li className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-brand-cyan" size={15} />
                <span className="leading-relaxed">{site.address}</span>
              </li>
              <li>
                <a href={`tel:${site.phone}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <FiPhone className="shrink-0 text-brand-cyan" size={15} />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <FiMail className="shrink-0 text-brand-cyan" size={15} />
                  {site.email}
                </a>
              </li>
            </ul>
            <p className="type-body mt-5 text-mute-2">
              {site.hours.morning} · {site.hours.evening}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-7 sm:flex-row">
          <p className="type-caption text-mute-2">
            © {year} {site.fullName}. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="type-caption group inline-flex items-center gap-1.5 text-mute-2 transition-colors hover:text-mute"
          >
            Staff login
            <FiArrowUpRight size={13} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
