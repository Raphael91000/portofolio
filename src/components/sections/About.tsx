import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {t('about.description')}
            </p>

            <div className="prose dark:prose-invert max-w-none text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Mon approche combine l'expertise technique acquise dans le bâtiment avec une vision
                moderne du business. J'ai appris que chaque projet, qu'il s'agisse d'un mur ou d'une
                startup, nécessite des fondations solides et une exécution minutieuse.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;