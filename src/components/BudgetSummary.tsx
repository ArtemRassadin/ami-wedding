import React, { useState } from 'react';
    import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
    import { ShoppingCart, X } from 'lucide-react';

    interface SelectedItem {
      category: string;
      title: string;
      price: number;
    }

    interface BudgetSummaryProps {
      selectedItems: SelectedItem[];
      total: number;
      onRemove: (category: string) => void;
    }

    const BudgetSummary: React.FC<BudgetSummaryProps> = ({ selectedItems, total, onRemove }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-gray-800">DreamWeave</h1>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  className="flex items-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-2 rounded-lg transition-colors"
                  aria-label="Просмотреть детали бюджета"
                >
                  <ShoppingCart size={20} />
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-serif font-bold mb-4 text-gray-800">Разбивка бюджета</h2>
                {selectedItems.length === 0 ? (
                  <p className="text-gray-600">Элементы еще не выбраны.</p>
                ) : (
                  <ul className="space-y-2">
                    {selectedItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.category}: {item.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${item.price.toLocaleString()}</span>
                          <button
                            onClick={() => onRemove(item.category)}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Удалить ${item.title}`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-lg font-bold text-gray-800">Итого: ${total.toLocaleString()}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>
      );
    };

    export default BudgetSummary;