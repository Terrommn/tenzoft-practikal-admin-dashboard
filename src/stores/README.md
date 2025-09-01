# Zustand State Management

This project uses **Zustand** for lightweight and efficient state management.

## 📁 Store Structure

```
src/stores/
├── index.ts          # Central export file
├── uiStore.ts        # UI-related state (sidebar, theme, modals)
└── README.md         # This file
```

## 🚀 Usage Examples

### Basic Store Usage

```typescript
import { useUIStore } from '@/stores';

// In your component
function MyComponent() {
  const { isSidebarOpen, toggleSidebar, theme, setTheme } = useUIStore();

  return (
    <div>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
    </div>
  );
}
```

### Creating New Stores

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'Auth Store' }
  )
);

// Add to src/stores/index.ts
export { useAuthStore } from './authStore';
```

## 🎯 Best Practices

### 1. Use DevTools in Development
```typescript
import { devtools } from 'zustand/middleware';

// Always wrap your store with devtools for debugging
export const useMyStore = create<MyState>()(
  devtools(set => ({ ... }), { name: 'My Store' })
);
```

### 2. TypeScript Support
```typescript
interface MyState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<MyState>()(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));
```

### 3. Central Exports
Always export stores from `src/stores/index.ts` for easy importing:

```typescript
// ✅ Good
import { useUIStore, useAuthStore } from '@/stores';

// ❌ Avoid
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
```

## 🔧 Available Stores

### UI Store (`useUIStore`)
- **Purpose**: Manage UI state (sidebar, theme, modals, loading)
- **State**:
  - `isSidebarOpen`: boolean
  - `theme`: 'light' | 'dark' | 'auto'
  - `isLoading`: boolean
  - `activeModal`: string | null

## 🚀 Future Stores

When you need additional stores, consider:

- **Auth Store**: User authentication, tokens, permissions
- **Data Store**: API data caching, offline state
- **Settings Store**: User preferences, configurations
- **Notification Store**: Toast messages, alerts

## 📚 Resources

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) (works with Zustand devtools)
