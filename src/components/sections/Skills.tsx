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

  // Séparer Tech/Web et IA des autres catégories
  const techWebCategory = skillsData.find(cat => 
    cat.title.toLowerCase().includes('tech') || cat.title.toLowerCase().includes('web')
  );
  const iaCategory = skillsData.find(cat => 
    cat.title.toLowerCase().includes('ia') || cat.title.toLowerCase().includes('ai')
  );
  const otherCategories = skillsData.filter(cat => 
    !cat.title.toLowerCase().includes('tech') && 
    !cat.title.toLowerCase().includes('web') &&
    !cat.title.toLowerCase().includes('ia') && 
    !cat.title.toLowerCase().includes('ai')
  );

  const renderSkillCard = (skill: any, skillIndex: number, categoryIndex: number, isCompact = false) => {
    const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    
    return (
      <motion.div
        key={skillIndex}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ 
          duration: 0.4, 
          delay: categoryIndex * 0.1 + skillIndex * 0.05,
          type: "spring",
          stiffness: 100
        }}
        className="group relative"
      >
        <div className={`bg-white dark:bg-gray-700 rounded-xl ${isCompact ? 'p-3' : 'p-4'} text-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 cursor-pointer transform hover:scale-105 hover:shadow-md`}>
          <div className={`flex items-center justify-center ${isCompact ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg ${isCompact ? 'mb-2' : 'mb-3'} mx-auto group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 shadow-md`}>
            <IconComponent className={`${isCompact ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
          </div>
          <h4 className={`text-gray-900 dark:text-white font-medium ${isCompact ? 'text-xs' : 'text-sm'} group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight`}>
            {skill.name}
          </h4>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </motion.div>
    );
  };

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

        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Section Tech/Web et IA côte à côte */}
          {techWebCategory && iaCategory && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tech/Web */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {techWebCategory.title}
                    </span>
                    <div className="ml-3 flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {techWebCategory.skills.length} compétence{techWebCategory.skills.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {techWebCategory.skills.map((skill, skillIndex) => 
                    renderSkillCard(skill, skillIndex, 0, true)
                  )}
                </div>
              </motion.div>

              {/* IA */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {iaCategory.title}
                    </span>
                    <div className="ml-3 flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {iaCategory.skills.length} compétence{iaCategory.skills.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {iaCategory.skills.map((skill, skillIndex) => 
                    renderSkillCard(skill, skillIndex, 1, true)
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Autres catégories */}
          {otherCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: (categoryIndex + 1) * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {category.title}
                  </span>
                  <div className="ml-4 flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.skills.length} compétence{category.skills.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => 
                  renderSkillCard(skill, skillIndex, categoryIndex + 2, false)
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;