import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { Category, PreferencesPopupProps } from '../types/PrefType';
import '../styles/style.css';

const PreferencesPopup: React.FC<PreferencesPopupProps> = ({ onClose, onSave }) => {
  const defaultCategories: Category[] = [
    { id: 'technology', label: 'Technology', selected: false },
    { id: 'politics', label: 'Politics', selected: false },
    { id: 'environment', label: 'Environment', selected: false },
    { id: 'business', label: 'Business', selected: false },
    { id: 'sports', label: 'Sports', selected: false },
    { id: 'culture', label: 'Culture', selected: false }
  ];

  const [categories, setCategories] = useState<Category[]>([]);
  const [customCategory, setCustomCategory] = useState<string>('');

  useEffect(() => {
    const savedCategories = localStorage.getItem('userCategories');
    const savedCustomCategories = localStorage.getItem('customCategories');
    
    let initialCategories = [...defaultCategories];
    
    if (savedCustomCategories) {
      const customCats: Category[] = JSON.parse(savedCustomCategories);
      initialCategories = [...initialCategories, ...customCats];
    }
    
    if (savedCategories) {
      const selectedIds = JSON.parse(savedCategories);
      initialCategories = initialCategories.map(cat => ({
        ...cat,
        selected: selectedIds.includes(cat.id)
      }));
    }
    
    setCategories(initialCategories);
  }, []);

  const handleCategoryToggle = (id: string): void => {
    setCategories(prevCategories => {
      const updatedCategories = prevCategories.map(cat =>
        cat.id === id ? { ...cat, selected: !cat.selected } : cat
      );
      
      const selectedIds = updatedCategories
        .filter(cat => cat.selected)
        .map(cat => cat.id);
      localStorage.setItem('userCategories', JSON.stringify(selectedIds));
      
      return updatedCategories;
    });
  };

  const handleCustomCategoryAdd = (): void => {
    if (customCategory.trim() && !categories.find(cat => 
      cat.id === customCategory.toLowerCase() || 
      cat.label.toLowerCase() === customCategory.toLowerCase()
    )) {
      const newCategory: Category = {
        id: customCategory.toLowerCase(),
        label: customCategory.trim(),
        selected: true
      };
      
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      
      const customCategories = updatedCategories.filter(
        cat => !defaultCategories.some(defCat => defCat.id === cat.id)
      );
      localStorage.setItem('customCategories', JSON.stringify(customCategories));
      
      const selectedIds = updatedCategories
        .filter(cat => cat.selected)
        .map(cat => cat.id);
      localStorage.setItem('userCategories', JSON.stringify(selectedIds));
      
      setCustomCategory('');
    }
  };

  const handleSave = (): void => {
    const selectedIds = categories
      .filter(cat => cat.selected)
      .map(cat => cat.id);
    
    localStorage.setItem('userCategories', JSON.stringify(selectedIds));
    const customCategories = categories.filter(
      cat => !defaultCategories.some(defCat => defCat.id === cat.id)
    );
    localStorage.setItem('customCategories', JSON.stringify(customCategories));
    
    onSave(selectedIds);
    onClose();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleCustomCategoryAdd();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCustomCategory(e.target.value);
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('customCategories');
    
    const selectedDefaultCategories = categories
      .filter(cat => 
        defaultCategories.some(defCat => defCat.id === cat.id) && 
        cat.selected
      )
      .map(cat => cat.id);
    
    localStorage.setItem('userCategories', JSON.stringify(selectedDefaultCategories));
    
    setCategories(defaultCategories.map(cat => ({
      ...cat,
      selected: selectedDefaultCategories.includes(cat.id)
    })));
  };

  return (
    <div className="preferences-overlay">
      <div className="preferences-modal">
        <div className="modal-header">
          <h2 className="modal-title">Category Preferences</h2>
          <button 
            onClick={onClose}
            className="close-button"
            aria-label="Close preferences"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="category-section">
       
          <h3 className="section-title">Select Categories</h3>
          <div className="category-grid">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
                className={`category-button ${category.selected ? 'selected' : ''}`}
                aria-pressed={category.selected}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="category-section">
          <h3 className="section-title">Add Custom Category</h3>
          <div className="custom-category">
            <input
              type="text"
              value={customCategory}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter category name"
              className="custom-input"
              aria-label="Custom category name"
            />
            <button
              onClick={handleCustomCategoryAdd}
              className="add-button"
              aria-label="Add custom category"
              disabled={!customCategory.trim()}
            >
              Add
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="save-button"
          >
            Save Preferences
          </button>
         <button
              onClick={handleResetToDefault}
              className="cancel-button"
              aria-label="Reset to default categories"
            >
              Reset to Default
            </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPopup;