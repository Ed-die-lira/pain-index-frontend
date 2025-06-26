'use client' // <<< TORNAMOS A PÁGINA INTEIRA UM CLIENT COMPONENT PARA O TESTE

import { useState, useEffect } from 'react';

// --- COMPONENTE TOOLTIP MANUAL ---
const Tooltip = ({ children, content }: { children: React.ReactNode, content: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-10">
          {content}
        </div>
      )}
    </div>
  );
};

// --- Tipos e Funções de Dados (iguais a antes) ---
type Asset = {
  rank: number, id: string, name: string, symbol: string, price: number,
  percent_from_ath: number, pain_score: number, logo_url: string
}

const getPainColor = (score: number): string => {
  if (score > 80) return 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200';
  if (score > 60) return 'bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200';
  if (score > 40) return 'bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200';
  return 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200';
};

// --- PÁGINA PRINCIPAL ---
export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [theme, setTheme] = useState('dark');

  // Lógica para carregar os dados no cliente
  useEffect(() => {
    // Definimos a função aqui dentro para usar o 'process.env' do cliente
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const res = await fetch(`${apiUrl}/api/leaderboard`);
        if (res.ok) {
          const data = await res.json();
          setAssets(data);
        }
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    }
    fetchData();
  }, []);

  // Lógica para trocar o tema manualmente
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-bold">The Pain Index</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Where Degens Find Their Next Max Long.</p>
        </div>
        <button onClick={toggleTheme} className="px-4 py-2 border rounded-lg">
          Toggle Theme ({theme})
        </button>
      </header>

      <main className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th>Rank</th>
                <th>Asset</th>
                <th className="flex justify-center items-center">
                  <Tooltip content={
                    <div>
                      <h3 className="font-bold">Pain Score Logic</h3>
                      <p className="text-xs">Based on a weighted average of 24h, 7d, and 30d price drops. Higher is more pain.</p>
                    </div>
                  }>
                    <span className="mr-1">Pain Score</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </Tooltip>
                </th>
                <th>Price</th>
                <th>% From ATH</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="text-center border-b border-gray-200 dark:border-gray-700">
                  <td>{asset.rank}</td>
                  <td>{asset.name} ({asset.symbol})</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPainColor(asset.pain_score)}`}>
                      {asset.pain_score}
                    </span>
                  </td>
                  <td>${asset.price.toLocaleString()}</td>
                  <td className={asset.percent_from_ath < 0 ? 'text-red-500' : 'text-green-500'}>
                    {asset.percent_from_ath.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}