import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { skillsData } from '../../data/skills'; // Import corrigé

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Filtrer les catégories en excluant "Commercial"
  const filteredCategories = skillsData.filter(cat => 
    !cat.title.toLowerCase().includes('commercial')
  );
  
  // Séparer Tech/Web et IA des autres catégories
  const techWebCategory = filteredCategories.find(cat => 
    cat.title.toLowerCase().includes('tech') || cat.title.toLowerCase().includes('web')
  );
  const iaCategory = filteredCategories.find(cat => 
    cat.title.toLowerCase() === 'ia'
  );
  const otherCategories = filteredCategories.filter(cat => 
    !cat.title.toLowerCase().includes('tech') && 
    !cat.title.toLowerCase().includes('web') &&
    cat.title.toLowerCase() !== 'ia'
  );

  const renderSkillCard = (skill: any, skillIndex: number, categoryIndex: number, categoryTitle: string, isCompact = false) => {
    const IconComponent = skill.icon && Icons[skill.icon as keyof typeof Icons] 
      ? Icons[skill.icon as keyof typeof Icons]
      : Icons['Circle'];

    return (
      <motion.div
        key={skillIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.4, 
          delay: categoryIndex * 0.1 + skillIndex * 0.05,
          type: "spring",
          stiffness: 100
        }}
        className="relative skill-card-wrapper"
        data-category={categoryTitle}
        style={{ 
          transform: 'none',
          transition: 'none'
        }}
      >
        <div
          className={`
            bg-white dark:bg-gray-700 
            rounded-xl overflow-hidden 
            ${isCompact ? 'p-2 sm:p-3' : 'p-3 sm:p-4'} 
            text-center border-2 border-orange-500 dark:border-orange-500 
            h-full flex flex-col justify-center 
            ${isCompact ? 'min-h-[100px] sm:min-h-[120px]' : 'min-h-[120px] sm:min-h-[140px]'} 
            skill-card skill-card-no-hover
          `}
          style={{ 
            transition: 'none',
            transform: 'none'
          }}
        >
          <div
            className={`
              flex items-center justify-center 
              ${isCompact ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'} 
              bg-orange-500 rounded-lg 
              ${isCompact ? 'mb-1 sm:mb-2' : 'mb-2 sm:mb-3'} 
              mx-auto 
              skill-card__icon-wrapper skill-icon-no-hover
            `}
            style={{ 
              transition: 'none',
              transform: 'none',
              backgroundColor: '#f97316'
            }}
          >
            <IconComponent 
              className={`${isCompact ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} text-white skill-icon`} 
              style={{ color: '#ffffff' }}
            />
          </div>
          <h4 className={`text-orange-600 dark:text-white font-medium ${isCompact ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'} leading-tight px-1 skill-card-title`} style={{ 
            lineHeight: '1.2',
            wordBreak: 'break-word',
            hyphens: 'auto'
          }}>
            {skill.name}
          </h4>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title') || 'Mes Compétences'}
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {t('skills.subtitle') || 'Technologies et outils que je maîtrise'}
          </p>
        </motion.div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Section Tech/Web et IA côte à côte */}
          {techWebCategory && iaCategory && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tech/Web */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {techWebCategory.title}
                    </span>
                    <div className="ml-4 flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {techWebCategory.skills.length} compétence{techWebCategory.skills.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                  {techWebCategory.skills.map((skill, skillIndex) => 
                    renderSkillCard(skill, skillIndex, 0, techWebCategory.title, false)
                  )}
                </div>
              </motion.div>

              {/* IA */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {iaCategory.title}
                    </span>
                    <div className="ml-4 flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {iaCategory.skills.length} compétence{iaCategory.skills.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                  {iaCategory.skills.map((skill, skillIndex) => 
                    renderSkillCard(skill, skillIndex, 1, iaCategory.title, false)
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
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: (categoryIndex + 1) * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4">
                {category.skills.map((skill, skillIndex) => 
                  renderSkillCard(skill, skillIndex, categoryIndex + 2, category.title, false)
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