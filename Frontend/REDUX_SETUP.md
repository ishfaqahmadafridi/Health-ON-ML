# Redux Toolkit Integration Guide

## Overview
Redux Toolkit is now integrated for global state management. This guide explains the store structure and how to use Redux throughout the application.

## Store Structure

### Store Directory
```
src/store/
├── store.ts              # Redux store configuration
├── hooks.ts              # Typed Redux hooks
├── slices/               # Redux slices (reducers + actions)
│   ├── patientSlice.ts   # Patient data state
│   ├── predictionSlice.ts # Prediction results state
│   ├── uiSlice.ts        # UI state (loading, errors, modals)
│   └── index.ts
└── thunks/               # Async thunks for API calls
    └── predictionThunks.ts
```

## Store Slices

### 1. Patient Slice (`patientSlice.ts`)
**State:**
```typescript
{
  data: PatientInput | null,        // Current patient data
  history: PatientInput[]           // History of past patient data
}
```

**Actions:**
- `setPatientData(data)` - Save patient data
- `clearPatientData()` - Clear current patient
- `loadPatientFromHistory(data)` - Load from history
- `clearHistory()` - Clear all history
- `removeFromHistory(index)` - Remove specific history entry

### 2. Prediction Slice (`predictionSlice.ts`)
**State:**
```typescript
{
  results: PredictionResponse | null,    // Current prediction results
  history: Array<{                       // Historical predictions
    id: string,
    timestamp: string,
    results: PredictionResponse
  }>
}
```

**Actions:**
- `setPredictionResults(results)` - Save prediction results
- `clearPredictionResults()` - Clear current results
- `loadPredictionFromHistory(results)` - Load from history
- `clearPredictionHistory()` - Clear all history
- `removePredictionFromHistory(id)` - Remove specific prediction

### 3. UI Slice (`uiSlice.ts`)
**State:**
```typescript
{
  loading: boolean,                      // API call in progress
  error: string | null,                  // Error message
  currentView: 'empty' | 'form' | 'analysis',  // Current view
  showModal: boolean,                    // Modal visibility
  modalType: 'pdf' | 'save' | 'history', // Type of modal
  backendAvailable: boolean,             // Backend connection status
  initializing: boolean                  // App initialization status
}
```

**Actions:**
- `setLoading(boolean)` - Toggle loading state
- `setError(message)` - Set error message
- `clearError()` - Clear error
- `setCurrentView(view)` - Change current view
- `openModal(type)` - Open modal
- `closeModal()` - Close modal
- `setBackendAvailable(boolean)` - Update backend status
- `setInitializing(boolean)` - Set initializing state
- `finishInitializing()` - Mark initialization complete

## Using Redux in Components

### Basic Pattern

```typescript
import { useAppDispatch, useAppSelector } from '../store';
import { setPatientData, setError } from '../store';

function MyComponent() {
  const dispatch = useAppDispatch();
  const patientData = useAppSelector(state => state.patient.data);
  const loading = useAppSelector(state => state.ui.loading);
  
  const handleAction = () => {
    dispatch(setPatientData(newData));
  };
  
  return (
    // JSX here
  );
}
```

### Access Different Slices

```typescript
// Patient state
const patientData = useAppSelector(state => state.patient.data);
const patientHistory = useAppSelector(state => state.patient.history);

// Prediction state
const results = useAppSelector(state => state.prediction.results);
const predictionHistory = useAppSelector(state => state.prediction.history);

// UI state
const { loading, error, currentView, showModal } = useAppSelector(
  state => state.ui
);
```

### Dispatching Actions

```typescript
import { useAppDispatch, setError, setLoading } from '../store';

function MyComponent() {
  const dispatch = useAppDispatch();
  
  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      // Perform action
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('Something went wrong'));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
```

## Redux Integration Points

### App.tsx
- Uses Redux for initialization state
- Dispatches `finishInitializing()` after backend check
- Dispatches `setBackendAvailable()` based on health check

### Dashboard Components
- Uses Redux to access patient data and prediction results
- Can dispatch actions to update UI state
- Uses selectors for reactive updates

### Form Submission
- Dispatch `setPatientData()` when form submitted
- Dispatch `setPredictionResults()` when API returns
- Dispatch `setError()` on validation/API failures

### Modal Management
- Use `openModal(type)` to show modals
- Use `closeModal()` to hide modals
- Access `showModal` and `modalType` from Redux state

## Benefits of Redux Toolkit

✅ **Centralized State** - Single source of truth for entire app  
✅ **Easier Debugging** - Redux DevTools integration available  
✅ **Scalable** - Easy to add new slices as app grows  
✅ **Type Safe** - Full TypeScript support with typed hooks  
✅ **Immutable Updates** - Immer middleware handles mutations  
✅ **DevX** - Less boilerplate with Redux Toolkit  

## Migration from Local State

### Before (useState)
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### After (Redux)
```typescript
const data = useAppSelector(state => state.patient.data);
const loading = useAppSelector(state => state.ui.loading);
const error = useAppSelector(state => state.ui.error);
const dispatch = useAppDispatch();

// Update: dispatch(setPatientData(newData));
```

## Next Steps

1. **Gradually Migrate Components** - Update components to use Redux
2. **Extract Complex Logic** - Create more thunks for API calls
3. **Add Redux DevTools** - Install extension for debugging
4. **Add Selectors** - Create `selectors.ts` files for reusable queries
5. **Add Middleware** - Consider Redux middleware for logging, persistence

## Redux DevTools

Install the Redux DevTools browser extension to:
- Time-travel debug
- Inspect state changes
- Dispatch actions manually
- Export/import state

Available for Chrome, Firefox, and Safari.
