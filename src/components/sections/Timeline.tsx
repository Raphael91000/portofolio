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
        iconBgColorInline: '#50cf01', // Vert lime flashy
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
          <div className="flex justify-center items-center flex-wrap gap-y-4 gap-x-8">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#50cf01' }} // Vert lime flashy
                data-type="experience"
              >
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-black dark:text-white font-medium">{t('timeline.experience')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#f97316' }} // Orange forcé
                data-type="project"
              >
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="text-black dark:text-white font-medium">{t('timeline.project')}</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line - Toujours centrée */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => {
              const config = getTypeConfig(item.type);
              const Icon = config.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index}>
                  {/* Timeline dot mobile - Au-dessus de la première card, entre les autres */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="md:hidden relative flex justify-center mb-6"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg timeline-icon-${config.dataType} z-10`}
                      style={{ 
                        backgroundColor: config.iconBgColorInline,
                        opacity: 1,
                        visibility: 'visible'
                      }}
                      data-type={config.dataType}
                    >
                      <Icon className="h-5 w-5 text-white" style={{ color: '#ffffff' }} />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className={`relative ${
                      // Desktop: flex avec alternance, Mobile: pas de flex
                      'md:flex md:items-center ' + (isEven ? 'md:flex-row' : 'md:flex-row-reverse')
                    }`}
                    data-timeline-item={config.dataType}
                  >
                    {/* Timeline dot - Desktop: absolu centré, Mobile: caché */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
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

                    {/* Content container */}
                    <div className="flex justify-center md:contents">
                      {/* Content - Mobile: centrée, Desktop: alternance */}
                      <div className={`
                        w-full max-w-md mx-4
                        md:w-5/12 md:max-w-none md:mx-0
                        ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                      `}>
                        <div 
                          className={`bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${config.borderColor} ${config.hoverBgColor}`}
                          data-content-type={config.dataType}
                        >
                          <div className="flex items-center mb-3 justify-start gap-2 flex-wrap">
                            <span className={`text-sm font-medium ${config.textColor} ${config.badgeBgColor} px-3 py-1 rounded-full`}>
                              {t(item.year)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {t(`timeline.${item.type}`)}
                            </span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 text-left">
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
                    </div>

                    {/* Spacer pour desktop */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;