import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpDown, ExternalLink } from 'lucide-react'
import { Treemap, ResponsiveContainer } from 'recharts'

interface Token {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
}

const TokenExplorer: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [sortColumn, setSortColumn] = useState<keyof Token>('marketCap')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    // Fetch token data from an API here
    // For now, we'll use placeholder data
    const placeholderTokens: Token[] = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5, marketCap: 1000000000000, volume: 50000000000 },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3000, change24h: 1.8, marketCap: 350000000000, volume: 25000000000 },
      { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 2, change24h: -0.5, marketCap: 70000000000, volume: 5000000000 },
      { id: 'solana', name: 'Solana', symbol: 'SOL', price: 150, change24h: 5.2, marketCap: 45000000000, volume: 3000000000 },
      { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 30, change24h: 3.7, marketCap: 30000000000, volume: 2000000000 },
    ]
    setTokens(placeholderTokens)
  }, [])

  const handleSort = (column: keyof Token) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const sortedTokens = [...tokens].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const getColorByChange = (change: number) => {
    const hue = change > 0 ? 120 : 0 // Green for positive, red for negative
    const saturation = Math.min(Math.abs(change) * 10, 100) // Intensity based on change magnitude
    return `hsl(${hue}, ${saturation}%, 50%)`
  }

  const treemapData = {
    name: 'Tokens',
    children: sortedTokens.map(token => ({
      name: token.symbol,
      size: token.marketCap,
      color: getColorByChange(token.change24h),
    })),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Token Explorer</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Token Market Cap Treemap</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData.children}
              dataKey="size"
              ratio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
              content={<CustomizedContent />}
            />
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="text-left text-gray-300 border-b border-gray-700">
              <th className="p-4 cursor-pointer" onClick={() => handleSort('name')}>
                Name <ArrowUpDown className="inline-block w-4 h-4 ml-1" />
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort('price')}>
                Price <ArrowUpDown className="inline-block w-4 h-4 ml-1" />
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort('change24h')}>
                24h Change <ArrowUpDown className="inline-block w-4 h-4 ml-1" />
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort('marketCap')}>
                Market Cap <ArrowUpDown className="inline-block w-4 h-4 ml-1" />
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort('volume')}>
                Volume <ArrowUpDown className="inline-block w-4 h-4 ml-1" />
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens.map((token) => (
              <tr key={token.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-4">
                  <Link to={`/tokens/${token.id}`} className="flex items-center">
                    <span className="font-bold">{token.name}</span>
                    <span className="ml-2 text-gray-400">{token.symbol}</span>
                  </Link>
                </td>
                <td className="p-4">${token.price.toLocaleString()}</td>
                <td className={`p-4 ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {token.change24h.toFixed(2)}%
                </td>
                <td className="p-4">${token.marketCap.toLocaleString()}</td>
                <td className="p-4">${token.volume.toLocaleString()}</td>
                <td className="p-4">
                  <Link to={`/tokens/${token.id}`} className="text-blue-400 hover:text-blue-300">
                    <ExternalLink className="inline-block w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, name, color } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {name}
        </text>
      )}
    </g>
  );
};

export default TokenExplorer