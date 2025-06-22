import { ThemeSwitcher } from '@/components/ThemeSwitcher'

// O tipo no TS deve corresponder ao Pydantic no Python
type Asset = {
  rank: number
  id: string
  name: string
  symbol: string
  price: number // TypeScript usa 'number' para float e int
  percent_from_ath: number
  pain_score: number
  logo_url: string
}

const getPainColor = (score: number): string => {
  if (score > 80) return 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200'
  if (score > 60) return 'bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200'
  if (score > 40) return 'bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
  return 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200'
}

async function getLeaderboardData(): Promise<Asset[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/leaderboard`, { cache: 'no-store' });
    if (!res.ok) {
      console.error("Failed to fetch from backend, status:", res.status);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function Home() {
  const assets = await getLeaderboardData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          {/* Removi o emoji como medida de segurança contra erros de codificação de caracteres */}
          <h1 className="text-2xl font-bold">The Pain Index</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Where Degens Find Their Next Max Long.</p>
        </div>
        <ThemeSwitcher />
      </header>

      <main className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pain Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">% From ATH</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {assets && assets.length > 0 ? (
                assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap font-bold">{asset.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-6 w-6 rounded-full mr-3" src={asset.logo_url} alt={`${asset.name} logo`} />
                        <div>
                          <div className="font-bold">{asset.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{asset.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPainColor(asset.pain_score)}`}>
                        {asset.pain_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${asset.price.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-500 font-medium">{asset.percent_from_ath.toFixed(1)}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    Loading data or failed to connect to backend... Make sure the backend server is running.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <footer className="text-center mt-8 p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This is not financial advice. This is a statistical tool for degenerates. You will probably lose all your money. DYOR.
          </p>
        </footer>
      </main>
    </div>
  )
}