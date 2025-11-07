import React, { useState, useEffect } from 'react';
import BudgetSummary from '../components/BudgetSummary';
import Hero from '../components/Hero';
import ConstructorBlock from '../components/ConstructorBlock';
import FinalCTA from '../components/FinalCTA';
import { Heart, MapPin, Utensils, Camera, Music, Shirt, Flower, Car, User, Scissors, Pen } from 'lucide-react';

interface SelectedItem {
  category: string;
  title: string;
  price: number;
}

const Home: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [total, setTotal] = useState(0);

  const categories = [
    {
      name: 'Зона приветствия и декор',
      icon: <Heart className="text-rose-500" size={32} />,
      options: [
        { id: '1', title: 'Элегантная арка', price: 1500, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', description: 'Красивая арка для церемоний.', features: ['Настраиваемая', 'Устойчивая к погоде'], gallery: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200&h=150&fit=crop', 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=200&h=150&fit=crop'] },
        { id: '2', title: 'Цветочная арка', price: 1800, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Арка с живыми цветами.', features: ['Сезонные цветы', 'Доставка включена'], gallery: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop'] },
        { id: '3', title: 'Деревянная арка', price: 1200, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop', description: 'Натуральная деревянная конструкция.', features: ['Экологично', 'Прочная'], gallery: [] },
        { id: '4', title: 'Металлическая арка', price: 2000, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', description: 'Современная металлическая арка.', features: ['Долговечная', 'Минималистичный дизайн'], gallery: [] },
        { id: '5', title: 'Арка с подсветкой', price: 2500, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop', description: 'Арка с LED-подсветкой.', features: ['Романтическое освещение', 'Энергосберегающая'], gallery: [] },
        { id: '6', title: 'Классическая арка', price: 1600, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop', description: 'Традиционная белая арка.', features: ['Классический стиль', 'Легкая установка'], gallery: [] },
        { id: '7', title: 'Арка из балдахина', price: 2200, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Арка с тканевым балдахином.', features: ['Защита от солнца', 'Элегантная ткань'], gallery: [] },
        { id: '8', title: 'Арка с зеркалами', price: 2800, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', description: 'Арка с декоративными зеркалами.', features: ['Визуально увеличивает пространство', 'Роскошный вид'], gallery: [] },
        { id: '9', title: 'Арка из камня', price: 3000, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop', description: 'Каменная арка для вечности.', features: ['Долговечная', 'Натуральный материал'], gallery: [] },
        { id: '10', title: 'Арка с цветами и свечами', price: 2600, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop', description: 'Арка с цветами и свечами.', features: ['Романтическая атмосфера', 'Безопасные свечи'], gallery: [] },
      ]
    },
    {
      name: 'Место проведения свадьбы',
      icon: <MapPin className="text-rose-500" size={32} />,
      options: [
        { id: '11', title: 'Садовый павильон', price: 5000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Потрясающее открытое место.', features: ['Вместимость 200', 'Кейтеринг включен'], gallery: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=150&fit=crop'], hasCalendar: true },
        { id: '12', title: 'Отельный зал', price: 6000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Роскошный зал в отеле.', features: ['Вместимость 150', 'Парковка'], gallery: [], hasCalendar: true },
        { id: '13', title: 'Пляжная церемония', price: 4500, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Романтика у моря.', features: ['Вместимость 100', 'Вид на океан'], gallery: [], hasCalendar: true },
        { id: '14', title: 'Замок', price: 8000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Сказочный замок.', features: ['Историческое место', 'Вместимость 300'], gallery: [], hasCalendar: true },
        { id: '15', title: 'Ресторан', price: 5500, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Элегантный ресторан.', features: ['Кухня включена', 'Вместимость 120'], gallery: [], hasCalendar: true },
        { id: '16', title: 'Парк', price: 4000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Зеленый парк.', features: ['Природа', 'Вместимость 250'], gallery: [], hasCalendar: true },
        { id: '17', title: 'Виноградник', price: 7000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Свадьба среди виноградников.', features: ['Вино включено', 'Вместимость 180'], gallery: [], hasCalendar: true },
        { id: '18', title: 'Лесная поляна', price: 3500, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Уединенная поляна.', features: ['Природа', 'Вместимость 80'], gallery: [], hasCalendar: true },
        { id: '19', title: 'Городская площадь', price: 4800, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Центр города.', features: ['Доступность', 'Вместимость 400'], gallery: [], hasCalendar: true },
        { id: '20', title: 'Яхта', price: 9000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Свадьба на яхте.', features: ['Морской вид', 'Вместимость 50'], gallery: [], hasCalendar: true },
      ]
    },
    {
      name: 'Кейтеринг и свадебный торт',
      icon: <Utensils className="text-rose-500" size={32} />,
      options: [
        { id: '21', title: 'Гурманский буфет', price: 3000, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Вкусный кейтеринг.', features: ['Диетические опции', 'Торт включен'], gallery: [] },
        { id: '22', title: 'Итальянская кухня', price: 3500, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Паста и пицца.', features: ['Свежие ингредиенты', 'Вегетарианские опции'], gallery: [] },
        { id: '23', title: 'Азиатская кухня', price: 3200, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Суши и wok.', features: ['Экзотические вкусы', 'Торт включен'], gallery: [] },
        { id: '24', title: 'Французская кухня', price: 4000, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Деликатесы Франции.', features: ['Вино включено', 'Десерты'], gallery: [] },
        { id: '25', title: 'Веганский буфет', price: 2800, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Полностью веганский.', features: ['Здоровое питание', 'Торт без сахара'], gallery: [] },
        { id: '26', title: 'Морепродукты', price: 3800, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Свежие морепродукты.', features: ['Морской вкус', 'Торт с фруктами'], gallery: [] },
        { id: '27', title: 'Барбекю', price: 2600, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Гриль на открытом воздухе.', features: ['Мясо и овощи', 'Простой торт'], gallery: [] },
        { id: '28', title: 'Коктейльная вечеринка', price: 3400, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Коктейли и закуски.', features: ['Алкоголь включен', 'Маленький торт'], gallery: [] },
        { id: '29', title: 'Традиционная кухня', price: 3100, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Классические блюда.', features: ['Домашний вкус', 'Торт с кремом'], gallery: [] },
        { id: '30', title: 'Экзотическая кухня', price: 4200, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', description: 'Вкусы мира.', features: ['Разнообразие', 'Торт с экзотикой'], gallery: [] },
      ]
    },
    {
      name: 'Фотограф / Видеограф',
      icon: <Camera className="text-rose-500" size={32} />,
      options: [
        { id: '31', title: 'Профессиональный фотограф', price: 2500, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Захватите особые моменты.', features: ['Полный день', 'Обработанные фото'], gallery: [], hasCalendar: true },
        { id: '32', title: 'Видеограф', price: 3000, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Видео свадьбы.', features: ['HD видео', 'Монтаж'], gallery: [], hasCalendar: true },
        { id: '33', title: 'Фотограф и видеограф', price: 4000, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Полный пакет.', features: ['Фото и видео', 'Дрон'], gallery: [], hasCalendar: true },
        { id: '34', title: 'Свадебный фотограф', price: 2700, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Специалист по свадьбам.', features: ['Опыт', 'Портфолио'], gallery: [], hasCalendar: true },
        { id: '35', title: 'Художественный фотограф', price: 3500, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Арт-фото.', features: ['Креативный стиль', 'Редактирование'], gallery: [], hasCalendar: true },
        { id: '36', title: 'Видеограф с дроном', price: 4500, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Воздушные съемки.', features: ['Дрон', '4K видео'], gallery: [], hasCalendar: true },
        { id: '37', title: 'Фотограф для портретов', price: 2200, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Портреты пары.', features: ['Студийные фото', 'Цифровые'], gallery: [], hasCalendar: true },
        { id: '38', title: 'Видеограф для монтажа', price: 3200, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Профессиональный монтаж.', features: ['Музыка', 'Эффекты'], gallery: [], hasCalendar: true },
        { id: '39', title: 'Фотограф с камерой', price: 2800, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Классическая фотография.', features: ['Пленка', 'Цветные фото'], gallery: [], hasCalendar: true },
        { id: '40', title: 'Видеограф для церемонии', price: 2600, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', description: 'Фокус на церемонии.', features: ['Близкие планы', 'Звук'], gallery: [], hasCalendar: true },
      ]
    },
    {
      name: 'Развлечения и ведущий',
      icon: <Music className="text-rose-500" size={32} />,
      options: [
        { id: '41', title: 'Живая группа и ведущий', price: 2000, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Развлечения для вашего события.', features: ['Пользовательский плейлист', 'Опытный ведущий'], gallery: [], hasCalendar: true },
        { id: '42', title: 'DJ', price: 1500, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Музыка от DJ.', features: ['Современные треки', 'Звуковое оборудование'], gallery: [], hasCalendar: true },
        { id: '43', title: 'Оркестр', price: 3000, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Классическая музыка.', features: ['Струнные', 'Ведущий'], gallery: [], hasCalendar: true },
        { id: '44', title: 'Квартет', price: 1800, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Маленький ансамбль.', features: ['Интимно', 'Разнообразие'], gallery: [], hasCalendar: true },
        { id: '45', title: 'Танцевальная группа', price: 2500, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Танцы для гостей.', features: ['Профессионалы', 'Развлечение'], gallery: [], hasCalendar: true },
        { id: '46', title: 'Ведущий без музыки', price: 1200, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Только ведущий.', features: ['Юмор', 'Игры'], gallery: [], hasCalendar: true },
        { id: '47', title: 'Живая музыка и фокусник', price: 2200, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Музыка и магия.', features: ['Развлечение', 'Ведущий'], gallery: [], hasCalendar: true },
        { id: '48', title: 'Караоке', price: 1600, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Пение гостей.', features: ['Микрофоны', 'Плейлист'], gallery: [], hasCalendar: true },
        { id: '49', title: 'Фейерверк', price: 2800, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Завершение с фейерверком.', features: ['Безопасно', 'Зрелищно'], gallery: [], hasCalendar: true },
        { id: '50', title: 'Театральное шоу', price: 3500, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', description: 'Театральное представление.', features: ['Актеры', 'Сценарий'], gallery: [], hasCalendar: true },
      ]
    },
    {
      name: 'Свадебный наряд',
      icon: <Shirt className="text-rose-500" size={32} />,
      options: [
        { id: '51', title: 'Платье невесты и костюм жениха', price: 4000, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Элегантный свадебный наряд.', features: ['Индивидуальные примерки', 'Изменения включены'], gallery: [] },
        { id: '52', title: 'Короткое платье', price: 2500, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Современное короткое платье.', features: ['Комфорт', 'Стиль'], gallery: [] },
        { id: '53', title: 'Длинное платье', price: 5000, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Классическое длинное.', features: ['Шлейф', 'Кружево'], gallery: [] },
        { id: '54', title: 'Костюм жениха', price: 2000, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Элегантный костюм.', features: ['Классика', 'Подгонка'], gallery: [] },
        { id: '55', title: 'Смокинг', price: 3000, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Роскошный смокинг.', features: ['Вечерний стиль', 'Аксессуары'], gallery: [] },
        { id: '56', title: 'Платье с открытой спиной', price: 4500, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Сексуальное платье.', features: ['Драма', 'Комфорт'], gallery: [] },
        { id: '57', title: 'Традиционный наряд', price: 3500, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Культурный стиль.', features: ['Традиции', 'Уникально'], gallery: [] },
        { id: '58', title: 'Минималистичный костюм', price: 1800, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Простой и элегантный.', features: ['Современный', 'Комфорт'], gallery: [] },
        { id: '59', title: 'Платье с перьями', price: 5500, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Роскошное с перьями.', features: ['Драматично', 'Уникально'], gallery: [] },
        { id: '60', title: 'Костюм с жилетом', price: 2200, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', description: 'Классический с жилетом.', features: ['Стиль', 'Подгонка'], gallery: [] },
      ]
    },
    {
      name: 'Флорист',
      icon: <Flower className="text-rose-500" size={32} />,
      options: [
        { id: '61', title: 'Букеты и композиции', price: 1200, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Красивые цветочные композиции.', features: ['Сезонные цветы', 'Доставка включена'], gallery: [] },
        { id: '62', title: 'Розы', price: 1000, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Классические розы.', features: ['Красные', 'Белые'], gallery: [] },
        { id: '63', title: 'Лилии', price: 1300, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Элегантные лилии.', features: ['Аромат', 'Красота'], gallery: [] },
        { id: '64', title: 'Тюльпаны', price: 900, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Весенние тюльпаны.', features: ['Яркие', 'Свежие'], gallery: [] },
        { id: '65', title: 'Орхидеи', price: 1500, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Экзотические орхидеи.', features: ['Роскошь', 'Долговечность'], gallery: [] },
        { id: '66', title: 'Подсолнухи', price: 800, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Солнечные подсолнухи.', features: ['Радость', 'Простота'], gallery: [] },
        { id: '67', title: 'Гвоздики', price: 1100, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Классические гвоздики.', features: ['Долговечность', 'Цвета'], gallery: [] },
        { id: '68', title: 'Хризантемы', price: 1200, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Осенние хризантемы.', features: ['Разнообразие', 'Свежие'], gallery: [] },
        { id: '69', title: 'Ирисы', price: 1400, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Изящные ирисы.', features: ['Голубые', 'Белые'], gallery: [] },
        { id: '70', title: 'Смешанный букет', price: 1600, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Сочетание цветов.', features: ['Персонализация', 'Красота'], gallery: [] },
      ]
    },
    {
      name: 'Транспорт',
      icon: <Car className="text-rose-500" size={32} />,
      options: [
        { id: '71', title: 'Роскошный лимузин', price: 800, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Элегантный транспорт.', features: ['Шофер включен', 'Кондиционер'], gallery: [] },
        { id: '72', title: 'Классический автомобиль', price: 600, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Винтажный автомобиль.', features: ['Ретро', 'Комфорт'], gallery: [] },
        { id: '73', title: 'Белый лимузин', price: 900, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Белый для невесты.', features: ['Стиль', 'Пространство'], gallery: [] },
        { id: '74', title: 'Мотоцикл', price: 400, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Для смелых.', features: ['Адреналин', 'Скорость'], gallery: [] },
        { id: '75', title: 'Автобус', price: 1200, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Для большой группы.', features: ['Вместимость', 'Комфорт'], gallery: [] },
        { id: '76', title: 'Электромобиль', price: 700, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Экологичный транспорт.', features: ['Зеленый', 'Тихий'], gallery: [] },
        { id: '77', title: 'Конный экипаж', price: 1000, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Романтический экипаж.', features: ['Лошади', 'Сказка'], gallery: [] },
        { id: '78', title: 'Велосипеды', price: 300, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Экологично и весело.', features: ['Здоровье', 'Приключение'], gallery: [] },
        { id: '79', title: 'Гольф-кар', price: 500, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Для парка.', features: ['Маленький', 'Электрический'], gallery: [] },
        { id: '80', title: 'Такси', price: 200, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', description: 'Простой транспорт.', features: ['Доступно', 'Быстро'], gallery: [] },
      ]
    },
    {
      name: 'Планировщик свадьбы',
      icon: <User className="text-rose-500" size={32} />,
      options: [
        { id: '81', title: 'Полноценный планировщик', price: 3500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Экспертное планирование свадьбы.', features: ['Координация поставщиков', 'Управление днем'], gallery: [], hasCalendar: true },
        { id: '82', title: 'Базовый планировщик', price: 2000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Основные услуги.', features: ['Консультации', 'Списки'], gallery: [], hasCalendar: true },
        { id: '83', title: 'Премиум планировщик', price: 5000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Роскошное планирование.', features: ['Все включено', 'Персональный'], gallery: [], hasCalendar: true },
        { id: '84', title: 'Дневной координатор', price: 1500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Только день свадьбы.', features: ['Управление', 'Помощь'], gallery: [], hasCalendar: true },
        { id: '85', title: 'Виртуальный планировщик', price: 1200, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Онлайн-планирование.', features: ['Zoom', 'Документы'], gallery: [], hasCalendar: true },
        { id: '86', title: 'Семейный планировщик', price: 1800, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Для семейных свадьб.', features: ['Традиции', 'Координация'], gallery: [], hasCalendar: true },
        { id: '87', title: 'Международный планировщик', price: 4000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Для destination свадьб.', features: ['Путешествия', 'Визы'], gallery: [], hasCalendar: true },
        { id: '88', title: 'Экологичный планировщик', price: 2500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Зеленое планирование.', features: ['Эко-материалы', 'Устойчивость'], gallery: [], hasCalendar: true },
        { id: '89', title: 'Креативный планировщик', price: 3000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Уникальные идеи.', features: ['Креативность', 'Инновации'], gallery: [], hasCalendar: true },
        { id: '90', title: 'Бюджетный планировщик', price: 1000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Экономное планирование.', features: ['Сбережения', 'Советы'], gallery: [], hasCalendar: true },
      ]
    },
    {
      name: 'Парикмахер и визажист',
      icon: <Scissors className="text-rose-500" size={32} />,
      options: [
        { id: '91', title: 'Профессиональный стилист', price: 600, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Услуги по волосам и макияжу.', features: ['Пробная сессия', 'Свадебная вечеринка включена'], gallery: [] },
        { id: '92', title: 'Макияжист', price: 400, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Только макияж.', features: ['Натуральный', 'Долговечный'], gallery: [] },
        { id: '93', title: 'Парикмахер', price: 300, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Укладка волос.', features: ['Стиль', 'Продукты'], gallery: [] },
        { id: '94', title: 'Полный образ', price: 700, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Волосы и макияж.', features: ['Комплект', 'Профессионал'], gallery: [] },
        { id: '95', title: 'Натуральный вид', price: 500, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Естественный макияж.', features: ['Легкий', 'Свежий'], gallery: [] },
        { id: '96', title: 'Драматичный макияж', price: 600, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Смелый стиль.', features: ['Цвета', 'Эффекты'], gallery: [] },
        { id: '97', title: 'Классическая укладка', price: 350, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Традиционная прическа.', features: ['Элегантно', 'Долговечно'], gallery: [] },
        { id: '98', title: 'Современная стрижка', price: 450, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Модный стиль.', features: ['Тренды', 'Индивидуально'], gallery: [] },
        { id: '99', title: 'Для жениха', price: 250, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Укладка для мужчин.', features: ['Простота', 'Стиль'], gallery: [] },
        { id: '100', title: 'Групповой стилист', price: 800, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Для всей вечеринки.', features: ['Команда', 'Экономия'], gallery: [] },
      ]
    },
    {
      name: 'Приглашения и канцелярия',
      icon: <Pen className="text-rose-500" size={32} />,
      options: [
        { id: '101', title: 'Пользовательские приглашения', price: 500, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Элегантная канцелярия.', features: ['Пользовательский дизайн', 'Отслеживание RSVP'], gallery: [] },
        { id: '102', title: 'Цифровые приглашения', price: 200, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Электронные.', features: ['Эко', 'Легко'], gallery: [] },
        { id: '103', title: 'Классические приглашения', price: 400, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Традиционные.', features: ['Бумага', 'Печать'], gallery: [] },
        { id: '104', title: 'Современные дизайны', price: 600, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Минималистичные.', features: ['Стиль', 'Цвета'], gallery: [] },
        { id: '105', title: 'Приглашения с фото', price: 700, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'С личными фото.', features: ['Персонализация', 'Воспоминания'], gallery: [] },
        { id: '106', title: 'Экзотические материалы', price: 800, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Особые материалы.', features: ['Текстура', 'Уникальность'], gallery: [] },
        { id: '107', title: 'Приглашения с QR', price: 550, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'С QR-кодами.', features: ['Интерактив', 'Информация'], gallery: [] },
        { id: '108', title: 'Бюджетные варианты', price: 300, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Дешевые.', features: ['Простота', 'Функциональность'], gallery: [] },
        { id: '109', title: 'Роскошные приглашения', price: 1000, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'Премиум.', features: ['Золото', 'Дизайн'], gallery: [] },
        { id: '110', title: 'Тематические', price: 650, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop', description: 'По теме свадьбы.', features: ['Тема', 'Креативность'], gallery: [] },
      ]
    },
  ];

  const handleSelect = (category: string, option: any) => {
    const newItem = { category, title: option.title, price: option.price };
    setSelectedItems(prev => {
      const filtered = prev.filter(item => item.category !== category);
      return [...filtered, newItem];
    });
  };

  const handleRemove = (category: string) => {
    setSelectedItems(prev => prev.filter(item => item.category !== category));
  };

  useEffect(() => {
    setTotal(selectedItems.reduce((sum, item) => sum + item.price, 0));
  }, [selectedItems]);

  return (
    <div className="pt-20">
      <BudgetSummary selectedItems={selectedItems} total={total} onRemove={handleRemove} />
      <Hero />
      {categories.map((cat, index) => (
        <ConstructorBlock
          key={index}
          category={cat.name}
          icon={cat.icon}
          options={cat.options}
          selectedId={selectedItems.find(item => item.category === cat.name)?.title || null}
          onSelect={(option) => handleSelect(cat.name, option)}
        />
      ))}
      <FinalCTA total={total} />
    </div>
  );
};

export default Home;