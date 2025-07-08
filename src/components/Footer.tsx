import {
  Heart,
  Mail,
  Shield,
  FileText,
  Phone,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, name: "Twitter", url: "https://twitter.com" },
    { icon: Github, name: "GitHub", url: "https://github.com" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bhukya-govardhan-naik-221799272/",
    },
  ];

  const footerLinks = [
    { icon: Shield, name: "Privacy Policy", url: "#privacy" },
    { icon: FileText, name: "Terms of Service", url: "#terms" },
    {
      icon: Mail,
      name: "Contact Support",
      url: "mailto:govardhannaik1438@gmail.com",
    },
    {
      icon: Phone,
      name: "Call Support",
      url: "tel:+917202149158",
    },
    {
      icon: Phone,
      name: "Alternative Number",
      url: "tel:+916302174395",
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-black via-slate-950 to-slate-900 border-t border-white/10 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
              GetInMono
            </h3>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
              Revolutionizing digital productivity by unifying all your
              messaging and social media platforms into one seamless,
              distraction-free dashboard experience.
            </p>
            <div className="flex items-center text-slate-300">
              <span>Crafted with</span>
              <Heart className="h-5 w-5 mx-2 text-red-400 animate-pulse" />
              <span>for digital minimalists worldwide</span>
            </div>
          </div>

          {/* Quick Access Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Access</h4>
            <div className="space-y-3">
              {footerLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                  >
                    <IconComponent className="h-4 w-4 mr-3 group-hover:text-blue-400" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Connect With Us</h4>
            <div className="space-y-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 group border border-white/10 hover:border-blue-500/30"
                    title={social.name}
                  >
                    <IconComponent className="h-5 w-5 mr-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-slate-300 group-hover:text-white text-sm font-medium">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Newsletter */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
              <p className="text-blue-300 text-sm font-medium mb-1">📧 Newsletter</p>
              <p className="text-slate-400 text-xs">
                Get productivity tips and updates delivered to your inbox weekly.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-slate-400 text-sm">
                © {currentYear} GetInMono. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <span>Version 2.0.1</span>
                <span>•</span>
                <span>Built with React & TypeScript</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm mb-1">
                Empowering productivity for
              </p>
              <p className="text-slate-300 text-sm font-medium">
                🎓 Students • 💼 Freelancers • 🏠 Remote Workers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};
