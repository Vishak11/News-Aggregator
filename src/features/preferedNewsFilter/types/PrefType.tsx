// types.ts
export interface Category {
    id: string;
    label: string;
    selected: boolean;
  }
  
  export interface PreferencesPopupProps {
    onClose: () => void;
    onSave: (categories: string[]) => void;
  }