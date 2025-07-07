import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Languages, Award, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Colonne gauche - Formations, Langues et Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Formations */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('about.formations')}
                  </h3>
                </div>
                <div className="space-y-4">
                  {formations.map((formation, index) => (
                    <div key={index} className="border-l-2 border-orange-500 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                          {formation.period}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {formation.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {formation.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Languages className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('about.languages')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {languages.map((language, index) => (
                    <div key={index} className="flex justify-between items-center">
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
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('about.certifications')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {certifications.map((certification, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {certification}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Colonne droite - Texte principal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="text-left">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
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