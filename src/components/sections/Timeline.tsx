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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('timeline.title')}
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {t('timeline.subtitle')}
          </p>
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
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className={`flex items-center mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
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