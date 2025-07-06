import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Languages, Award } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            {/* Colonne gauche - Langues et Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* Langues */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Languages className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Langues
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Français
                    </span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                      Natif
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Anglais
                    </span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                      A2
                    </span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Certifications
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Permis de conduire
                    </span>
                  </div>
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
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Après 7 ans dans le bâtiment, j'ai décidé de changer de cap. J'ai commencé par la vente, en CDI, où j'ai affûté mes compétences commerciales sur le terrain. En parallèle, j'ai lancé mes premiers projets entrepreneuriaux.
                  <br /><br />
                  Cette double expérience — salarié et entrepreneur — m'a appris à vendre, gérer, structurer… et surtout à m'adapter.
                  <br /><br />
                  Aujourd'hui, je combine cette rigueur avec ma passion pour le digital et l'IA pour créer des solutions concrètes et innovantes. Mon ambition : transformer les idées en leviers de croissance et construire les entreprises de demain.
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