import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Play, Pause } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { useAudio } from '../../hooks/useAudio';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const { speak, stop, isListening } = useAudio();

  const categories = [
    'learning',
    'professional',
    'entrepreneurial',
    'reading',
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      learning: 'bg-blue-500',
      professional: 'bg-green-500',
      entrepreneurial: 'bg-orange-500',
      reading: 'bg-purple-500',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const handleListen = (post: any) => {
    if (isListening) {
      stop();
    } else {
      speak(post.content);
    }
  };

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <span
              key={category}
              className={`px-4 py-2 rounded-full text-white text-sm font-medium ${getCategoryColor(category)}`}
            >
              {t(`blog.categories.${category}`)}
            </span>
          ))}
        </motion.div>

        {/* Blog posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {t(`blog.categories.${post.category}`)}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} {t('blog.readTime')}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {post.excerpt}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose dark:prose-invert max-w-none text-sm">
                  {selectedPost === post.id ? (
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                      {post.content}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                      {post.content.substring(0, 200)}...
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium text-sm"
                  >
                    {selectedPost === post.id ? t('blog.readLess') : t('blog.readMore')}
                  </button>
                  <button
                    onClick={() => handleListen(post)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
                  >
                    {isListening ? (
                      <>
                        <Pause className="h-4 w-4" />
                        <span>{t('blog.stopListening')}</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span>{t('blog.listenMode')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;