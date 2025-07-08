import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Languages, Award, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Récupération des données d'éducation depuis les traductions
  const formations = t('education.formations', { returnObjects: true }) as Array<{
    period: string;
    title: string;
    institution: string;
  }>;
  
  const languages = t('education.languages', { returnObjects: true }) as Array<{
    name: string;
    level: string;
  }>;
  
  const certifications = t('education.certifications', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Colonne gauche - Formations, Langues et Certifications */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`lg:col-span-1 space-y-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Formations */}
              <div>
                <div className={`flex items-center mb-4 gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('about.formations')}
                  </h3>
                </div>
                <div className="space-y-4">
                  {formations.map((formation, index) => (
                    <div 
                      key={index} 
                      className={`${
                        isRTL 
                          ? 'border-r-2 border-orange-500 pr-4' 
                          : 'border-l-2 border-orange-500 pl-4'
                      }`}
                    >
                      <div className={`flex items-center justify-between mb-1 ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`}>
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                          {formation.period}
                        </span>
                      </div>
                      <h4 className={`font-semibold text-gray-900 dark:text-white text-sm ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {formation.title}
                      </h4>
                      <p className={`text-gray-600 dark:text-gray-400 text-xs ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {formation.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div>
                <div className={`flex items-center mb-4 gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Languages className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('about.languages')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {languages.map((language, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {language.name}
                      </span>
                      <span className="text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                        {language.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className={`flex items-center mb-4 gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('about.certifications')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {certifications.map((certification, index) => (
                    <div key={index} className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-gray-700 dark:text-gray-300 font-medium ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {certification}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Colonne droite - Texte principal */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`lg:col-span-2 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className={`text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('about.description_long')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;