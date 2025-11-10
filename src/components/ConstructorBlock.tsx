import React, { useState, useRef } from 'react';
    import { Button } from '@radix-ui/themes';
    import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
    import { Calendar } from 'lucide-react';
    import { format, isWeekend, addMonths, startOfMonth } from 'date-fns';
    import { motion } from 'framer-motion';

    interface Option {
      id: string;
      title: string;
      price: number;
      image: string;
      description: string;
      features: string[];
      gallery: string[];
      hasCalendar?: boolean;
    }

    interface ConstructorBlockProps {
      category: string;
      icon: React.ReactNode;
      options: Option[];
      selectedId: string | null;
      onSelect: (option: Option) => void;
    }

    const ConstructorBlock: React.FC<ConstructorBlockProps> = ({ category, icon, options, selectedId, onSelect }) => {
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);
      const [previewOption, setPreviewOption] = useState<Option | null>(null);
      const scrollRef = useRef<HTMLDivElement>(null);
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const [scrollLeft, setScrollLeft] = useState(0);

      const calculatePrice = (basePrice: number, date: Date) => {
        const isPeakSeason = date.getMonth() >= 5 && date.getMonth() <= 9; // Летние месяцы
        const isWeekendPrice = isWeekend(date);
        let multiplier = 1;
        if (isPeakSeason) multiplier += 0.2;
        if (isWeekendPrice) multiplier += 0.1;
        return Math.round(basePrice * multiplier);
      };

      const generateCalendar = () => {
        const today = new Date();
        const nextMonth = addMonths(today, 1);
        const start = new Date(); // или ваша начальная дата
        const days: Date[] = []; // Явно указываем тип массива

        for (let i = 0; i < 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        days.push(day);
        }
        return days;
      };

      const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
      };

      const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2; // Скорость прокрутки
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollLeft - walk;
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += e.deltaY;
        }
      };

      return (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                {icon}
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">{category}</h2>
              </div>
            </motion.div>
            <div
              ref={scrollRef}
              className="overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <div className="flex gap-6 min-w-max">
                {options.map((option) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`w-80 bg-white rounded-lg shadow-lg overflow-hidden border-2 ${selectedId === option.title ? 'border-rose-300' : 'border-gray-200'} hover:shadow-xl transition-shadow`}
                  >
                    <img src={option.image} alt={option.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.title}</h3>
                      <p className="text-rose-600 font-bold mb-4">От ${option.price.toLocaleString()}</p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => onSelect(option)}
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg"
                        >
                          Выбрать
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPreviewOption(option)}
                          className="flex-1 border-rose-600 text-rose-600 hover:bg-rose-50 py-2 rounded-lg"
                        >
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {previewOption && (
            <Dialog open={!!previewOption} onOpenChange={() => setPreviewOption(null)}>
              <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full p-6 bg-white/90 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl font-serif font-bold mb-4 text-gray-800">{previewOption.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <img src={previewOption.image} alt={previewOption.title} className="w-full h-48 object-cover rounded-lg" />
                  <div className="space-y-2">
                    {previewOption.gallery.slice(0, 2).map((img, idx) => (
                      <img key={idx} src={img} alt={`${previewOption.title} ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{previewOption.description}</p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {previewOption.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                {previewOption.hasCalendar && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar size={16} />
                      Выберите дату для ценообразования
                    </h4>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendar().map((day, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedDate(day)}
                          className={`p-2 text-sm rounded ${selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'bg-rose-200' : 'hover:bg-gray-100'}`}
                        >
                          {format(day, 'd')}
                        </button>
                      ))}
                    </div>
                    {selectedDate && (
                      <p className="mt-2 text-rose-600 font-bold">
                        Цена на {format(selectedDate, 'MMM d, yyyy')}: ${calculatePrice(previewOption.price, selectedDate).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
                <Button
                  onClick={() => {
                    onSelect(previewOption);
                    setPreviewOption(null);
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg"
                >
                  Добавить в мою свадьбу
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </section>
      );
    };

    export default ConstructorBlock;
