import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Rocket } from 'lucide-react';
import { timelineData } from '../../data/timeline';

const Timeline: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Configuration complète pour chaque type - 100% fiable
  const getTypeConfig = (type: string) => {
    const configs = {
      experience: {
        icon: Briefcase,
        iconBgColor: 'bg-green-500',
        iconBgColorInline: '#10b981', // Vert
        borderColor: 'border-green-500',
        hoverBgColor: 'hover:bg-green-50 dark:hover:bg-green-900/10',
        textColor: 'text-green-500',
        badgeBgColor: 'bg-green-100 dark:bg-green-900/20',
        dataType: 'experience'
      },
      project: {
        icon: Rocket,
        iconBgColor: 'bg-orange-500',
        iconBgColorInline: '#f97316', // Orange
        borderColor: 'border-orange-500',
        hoverBgColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/10',
        textColor: 'text-orange-500',
        badgeBgColor: 'bg-orange-100 dark:bg-orange-900/20',
        dataType: 'project'
      }
    };
    
    return configs[type] || configs.project; // Fallback sur project
  };

  return (
    <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            {t('timeline.title')}
          </h2>
          
          {/* Légende avec couleurs forcées */}
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#10b981' }} // Vert forcé
                data-type="experience"
              >
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-green-500 font-medium">{t('timeline.experience')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#f97316' }} // Orange forcé
                data-type="project"
              >
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="text-orange-500 font-medium">{t('timeline.project')}</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const config = getTypeConfig(item.type);
              const Icon = config.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  data-timeline-item={config.dataType}
                >
                  {/* Timeline dot avec style inline pour garantir la couleur */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg timeline-icon-${config.dataType}`}
                      style={{ 
                        backgroundColor: config.iconBgColorInline,
                        opacity: 1,
                        visibility: 'visible'
                      }}
                      data-type={config.dataType}
                    >
                      <Icon className="h-6 w-6 text-white" style={{ color: '#ffffff' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                    <div 
                      className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${config.borderColor} ${config.hoverBgColor}`}
                      data-content-type={config.dataType}
                    >
                      <div className="flex items-center mb-3 justify-start">
                        <span className={`text-sm font-medium ${config.textColor} ${config.badgeBgColor} px-3 py-1 rounded-full`}>
                          {t(item.year)}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          {t(`timeline.${item.type}`)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-left">
                        {t(item.title)}
                      </h3>
                      <p className="text-orange-600 dark:text-orange-400 font-medium mb-3 text-left">
                        {t(item.company)}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-left">
                        {t(item.description)}
                      </p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;