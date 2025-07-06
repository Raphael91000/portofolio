import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as Icons from 'lucide-react';
import { skillsData } from '../../data/skills';

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Grille de blocs propre et organisée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gray-800 dark:bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-105"
            >
              {/* Titre de la catégorie */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {category.title}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>

              {/* Grille de compétences organisée */}
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                  
                  return (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                      className="group relative"
                    >
                      <div className="bg-gray-700 dark:bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-all duration-300 border border-transparent hover:border-orange-500 cursor-pointer min-h-[100px] flex flex-col justify-center">
                        {/* Icône */}
                        <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg mb-3 mx-auto group-hover:bg-orange-600 transition-colors duration-300 shrink-0">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>

                        {/* Nom de la compétence */}
                        <h4 className="text-white font-medium text-sm group-hover:text-orange-300 transition-colors duration-300 leading-tight line-clamp-2">
                          {skill.name}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;