import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Linkedin, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/raphael-theuillon-689139261',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Raphael91000',
      icon: Github,
    },
    {
      name: 'Fiverr',
      href: 'https://www.fiverr.com/users/raph910/seller_dashboard',
      icon: ExternalLink,
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">RT</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['home', 'about', 'timeline', 'skills', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(`#${item}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {t(`nav.${item}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 RT. {t('footer.rights')}.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made by Raphaël Theuillon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;