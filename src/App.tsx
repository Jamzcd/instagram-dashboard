// src/App.tsx
import HubstackDashboard from './components/HubstackDashboard';

function App() {
  return (
    <>
      <div className="bg-red-500 text-white p-4 rounded-xl text-center font-bold">
        Tailwind está funcionando?
      </div>
      <div className="min-h-screen">
        <HubstackDashboard />
      </div>
    </>
  );
}

export default App;
