import React from 'react';
    import { ChevronDown } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Hero: React.FC = () => {
      return (
        <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-4"
            >
              Создайте свой идеальный день. По кусочкам.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Интерактивный планировщик свадьбы, который воплощает ваше видение в жизнь с четким бюджетом с самого начала.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <ChevronDown size={40} className="animate-bounce" />
            </motion.div>
          </div>
        </section>
      );
    };

    export default Hero;