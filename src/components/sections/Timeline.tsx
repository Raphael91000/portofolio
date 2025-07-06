import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, Rocket } from 'lucide-react';
import { timelineData } from '../../data/timeline';

const Timeline: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return GraduationCap;
      case 'experience':
        return Briefcase;
      case 'project':
        return Rocket;
      default:
        return Briefcase;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-500';
      case 'experience':
        return 'bg-green-500';
      case 'project':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'border-blue-500';
      case 'experience':
        return 'border-green-500';
      case 'project':
        return 'border-orange-500';
      default:
        return 'border-gray-500';
    }
  };

  const getHoverBgColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'hover:bg-blue-50 dark:hover:bg-blue-900/10';
      case 'experience':
        return 'hover:bg-green-50 dark:hover:bg-green-900/10';
      case 'project':
        return 'hover:bg-orange-50 dark:hover:bg-orange-900/10';
      default:
        return 'hover:bg-gray-50 dark:hover:bg-gray-900/10';
    }
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
          
          {/* Légende */}
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-blue-500 font-medium">Formation</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-green-500 font-medium">Expérience</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="text-orange-500 font-medium">Projet</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = getIcon(item.type);
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
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full ${getColor(item.type)} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                    <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${getBorderColor(item.type)} ${getHoverBgColor(item.type)}`}>
                      <div className="flex items-center mb-3 justify-start">
                        <span className="text-sm font-medium text-orange-500 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                          {item.year}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          {t(`timeline.${item.type}`)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-left">
                        {item.title}
                      </h3>
                      <p className="text-orange-600 dark:text-orange-400 font-medium mb-3 text-left">
                        {item.company}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-left">
                        {item.description}
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