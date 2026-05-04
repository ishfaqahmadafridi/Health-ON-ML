# Redux Implementation Guide

## Quick Start

### 1. Install Redux Toolkit
```bash
npm install @reduxjs/toolkit react-redux
```
✅ Already done!

### 2. Store Structure
```
src/store/
├── store.ts           # Store configuration
├── hooks.ts           # Typed hooks
├── slices/            # State slices
│   ├── patientSlice.ts
│   ├── predictionSlice.ts
│   ├── uiSlice.ts
│   └── index.ts
└── thunks/            # Async thunks
    └── predictionThunks.ts
```

### 3. Wrap App with Provider
**In main.tsx:**
```typescript
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```
✅ Already done!

---

## Component Migration Examples

### Pattern 1: Form Component
**Before (useState):**
```typescript
function PatientForm() {
  const [formData, setFormData] = useState<PatientInput>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PatientInput) => {
    setLoading(true);
    try {
      await api.submit(data);
      setError(null);
    } catch (err) {
      setError('Failed');
    } finally {
      setLoading(false);
    }
  };
}
```

**After (Redux):**
```typescript
function PatientForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.ui.loading);
  const error = useAppSelector(state => state.ui.error);

  const handleSubmit = async (data: PatientInput) => {
    dispatch(setLoading(true));
    try {
      const results = await predictHealthRisks(data);
      dispatch(setPatientData(data));
      dispatch(setPredictionResults(results));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('Failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
```

### Pattern 2: Display Component
**Before (props drilling):**
```typescript
function Dashboard({ patientData, results, loading }) {
  // Prop drilling becomes complex
}

// Parent component
<Dashboard 
  patientData={data}
  results={results}
  loading={loading}
/>
```

**After (Redux):**
```typescript
function Dashboard() {
  const patientData = useAppSelector(state => state.patient.data);
  const results = useAppSelector(state => state.prediction.results);
  const loading = useAppSelector(state => state.ui.loading);
  // No props needed!
}
```

### Pattern 3: Modal Management
**Before (useState):**
```typescript
function ModalContainer() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'pdf' | 'save' | null>(null);

  const openPdfModal = () => {
    setShowModal(true);
    setModalType('pdf');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };
}
```

**After (Redux):**
```typescript
function ModalContainer() {
  const dispatch = useAppDispatch();
  const { showModal, modalType } = useAppSelector(state => state.ui);

  const openPdfModal = () => {
    dispatch(openModal('pdf'));
  };

  const closeModal = () => {
    dispatch(closeModal());
  };
}
```

### Pattern 4: History Display
**Before (state prop):**
```typescript
function History({ history }) {
  return history.map((item) => <HistoryItem key={item.id} {...item} />);
}
```

**After (Redux):**
```typescript
function History() {
  const history = useAppSelector(state => state.prediction.history);
  
  return history.map((item) => (
    <HistoryItem key={item.id} {...item} />
  ));
}
```

---

## Common Redux Operations

### Reading State
```typescript
// Single value
const data = useAppSelector(state => state.patient.data);

// Multiple values
const { loading, error } = useAppSelector(state => state.ui);

// Computed value (with selector)
const riskScore = useAppSelector(
  state => state.prediction.results?.heartDisease.riskScore ?? 0
);
```

### Writing State
```typescript
const dispatch = useAppDispatch();

// Simple action
dispatch(setError('Something went wrong'));

// Action with payload
dispatch(setPatientData(formData));

// Complex flow
dispatch(setLoading(true));
// ... do something
dispatch(setError(null));
dispatch(setLoading(false));
```

### Clearing State
```typescript
dispatch(clearPatientData());
dispatch(clearPredictionResults());
dispatch(clearError());
dispatch(closeModal());
```

---

## Redux Patterns to Follow

### ✅ DO:
- Use `useAppSelector` to read state
- Use `useAppDispatch` to write state
- Keep selectors close to component
- Dispatch actions for every state change
- Handle loading and error states
- Clear errors before new operations

### ❌ DON'T:
- Directly mutate state
- Mix useState with Redux
- Pass Redux state as props
- Forget to dispatch on errors
- Leave loading states undefined
- Skip error handling

---

## Advanced: Creating Selectors

For complex or reused queries, create selectors file:

**src/store/selectors.ts:**
```typescript
import type { RootState } from './store';

// Patient selectors
export const selectPatientData = (state: RootState) => state.patient.data;
export const selectPatientHistory = (state: RootState) => state.patient.history;

// Prediction selectors
export const selectPredictionResults = (state: RootState) => state.prediction.results;
export const selectPredictionHistory = (state: RootState) => state.prediction.history;

// UI selectors
export const selectUIState = (state: RootState) => state.ui;
export const selectIsLoading = (state: RootState) => state.ui.loading;
export const selectError = (state: RootState) => state.ui.error;

// Computed selectors
export const selectAllData = (state: RootState) => ({
  patient: state.patient.data,
  results: state.prediction.results,
  ui: state.ui,
});
```

**Usage:**
```typescript
import { selectPatientData, selectIsLoading } from '../store/selectors';

function MyComponent() {
  const patientData = useAppSelector(selectPatientData);
  const isLoading = useAppSelector(selectIsLoading);
}
```

---

## Debugging with Redux DevTools

Install Redux DevTools extension:
- Chrome: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)
- Firefox: [Redux DevTools](https://addons.mozilla.org/firefox/addon/reduxdevtools/)

Features:
- 🔴 Record all actions
- ⏮️ Time-travel debug
- 📊 Inspect state changes
- 📤 Export/import state
- 🔧 Dispatch actions manually

---

## Migration Checklist

- [ ] App.tsx wrapped with Redux Provider
- [ ] useAppDispatch and useAppSelector imported
- [ ] Patient data uses Redux state
- [ ] Prediction results use Redux state
- [ ] UI loading/error states use Redux
- [ ] Modal state uses Redux
- [ ] Form submissions dispatch actions
- [ ] Error handling dispatches setError
- [ ] History managed in Redux
- [ ] Components don't use useState for shared state

---

## Next Steps

1. **Gradual Migration**: Migrate one component at a time
2. **Test Components**: Verify each component works after migration
3. **DevTools**: Install and use Redux DevTools for debugging
4. **Selectors**: Create selectors.ts for reused queries
5. **Middleware**: Consider adding middleware for logging/persistence

---

## Additional Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React-Redux Docs](https://react-redux.js.org/)
- [Redux Style Guide](https://redux.js.org/style-guide/style-guide)
