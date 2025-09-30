import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/app/AppProviders';
import { AppRoutes } from '@/app/AppRoutes';

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}
