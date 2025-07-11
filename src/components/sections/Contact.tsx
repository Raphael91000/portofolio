import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Linkedin, Github, ExternalLink } from 'lucide-react';
import { ContactForm } from '../../types';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Initialisation d'EmailJS avec debug
  useEffect(() => {
    console.log('🔧 Initialisation EmailJS...');
    try {
      // Méthode alternative d'initialisation
      emailjs.init({
        publicKey: "b7g8fAENSrRYsQcP9",
      });
      console.log('✅ EmailJS initialisé avec succès (méthode alternative)');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation EmailJS:', error);
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📨 Début de l\'envoi du formulaire');
    
    // Vérification de la disponibilité d'EmailJS
    console.log('🔍 EmailJS disponible:', typeof emailjs);
    console.log('🔍 Méthode send disponible:', typeof emailjs.send);
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      console.log('❌ Validation échouée - champs manquants');
      alert('Veuillez remplir tous les champs');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    console.log('📝 Données du formulaire:', formData);
    setStatus('sending');

    try {
      // Paramètres pour EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      console.log('🚀 Envoi avec les paramètres:', {
        serviceId: 'service_pr9szhk',
        templateId: 'template_9ug02na',
        templateParams: templateParams,
        publicKey: 'b7g8fAENSrRYsQcP9'
      });

      // Test avec le bon Service ID
      const response = await emailjs.send(
        'service_pr9szhk',    // Nouveau Service ID correct
        'template_9ug02na',   // Template ID vérifié  
        templateParams,
        {
          publicKey: 'b7g8fAENSrRYsQcP9'
        }
      );

      console.log('✅ Email envoyé avec succès!', response);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('❌ Erreur complète lors de l\'envoi:', error);
      console.error('❌ Type d\'erreur:', typeof error);
      console.error('❌ Status de l\'erreur:', (error as any)?.status);
      console.error('❌ Text de l\'erreur:', (error as any)?.text);
      console.error('❌ Message d\'erreur:', (error as any)?.message);
      console.error('❌ Détails complets:', JSON.stringify(error, null, 2));
      
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={isRTL ? 'lg:order-2' : 'lg:order-1'}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors font-medium ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>{t('contact.form.success')}</span>
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="h-5 w-5" />
                    <span>{t('contact.form.error')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('contact.form.send')}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`space-y-8 ${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div>
              <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {t('contact.stayConnected')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-400 leading-relaxed ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {t('contact.stayConnectedDescription')}
              </p>
            </div>

            <div>
              <h4 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {t('contact.socialNetworks')}
              </h4>
              <div className={`flex gap-4 ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-3 rounded-lg border-2 border-transparent
                      bg-gray-100 dark:bg-gray-800
                      text-gray-600 dark:text-gray-400
                      transition-all duration-300 ease-in-out
                      transform hover:scale-110 hover:-translate-y-1
                      hover:shadow-lg hover:shadow-orange-500/20
                      hover:bg-orange-500 hover:text-white
                      dark:hover:bg-orange-500 dark:hover:text-white
                    `}
                    whileHover={{ 
                      scale: 1.1,
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-6 w-6 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;