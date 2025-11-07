import React from 'react';
    import { Button } from '@radix-ui/themes';
    import { motion } from 'framer-motion';

    interface FinalCTAProps {
      total: number;
    }

    const FinalCTA: React.FC<FinalCTAProps> = ({ total }) => {
      return (
        <section className="py-16 px-4 bg-rose-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4"
            >
              Ваша мечта о свадьбе спланирована!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Предполагаемая общая стоимость: <span className="font-bold text-rose-600">${total.toLocaleString()}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-rose-600 hover:bg-rose-700 text-white py-3 px-8 rounded-lg text-lg">
                Сохранить мой проект
              </Button>
              <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50 py-3 px-8 rounded-lg text-lg">
                Связаться с консультантом по свадьбам
              </Button>
            </motion.div>
          </div>
        </section>
      );
    };

    export default FinalCTA;