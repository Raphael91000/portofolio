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
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              Après 7 ans dans le bâtiment, j'ai décidé de changer de cap. J'ai commencé par la vente, en CDI, où j'ai affûté mes compétences commerciales sur le terrain. En parallèle, j'ai lancé mes premiers projets entrepreneuriaux. Cette double expérience — salarié et entrepreneur — m'a appris à vendre, gérer, structurer… et surtout à m'adapter. Aujourd'hui, je combine cette rigueur avec ma passion pour le digital et l'IA pour créer des solutions concrètes et innovantes. Mon ambition : transformer les idées en leviers de croissance et construire les entreprises de demain.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;