import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  {
    icon: FaLinkedin,
    href: 'https://linkedin.com/in/rakibul263',
    label: 'LinkedIn',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/rakibul263',
    label: 'GitHub',
  },
  {
    icon: FaFacebook,
    href: 'https://facebook.com/rakibul263',
    label: 'Facebook',
  },
  {
    icon: FaInstagram,
    href: 'https://instagram.com/rakibul263',
    label: 'Instagram',
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#0A192F] py-8 border-t border-[#64FFDA]/20">
      <div className="container">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#8892B0] text-center">
            © {new Date().getFullYear()} Rakibul Hasan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 