import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Globe, Twitter, ExternalLink } from 'lucide-react'

interface TokenData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
  description: string
  website: string
  twitter: string
  github: string
}

const TokenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [token, setToken] = useState<TokenData | null>(null)

  useEffect(() => {
    // Fetch token data from an API here
    // For now, we'll use placeholder data
    const placeholderToken: TokenData = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 50000,
      change24h: 2.5,
      marketCap: 1000000000000,
      volume: 50000000000,
      description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.',
      website: 'https://bitcoin.org',
      twitter: 'https://twitter.com/bitcoin',
      github: 'https://github.com/bitcoin',
    }
    setToken(placeholderToken)
  }, [id])

  if (!token) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (previous code remains unchanged) ... */}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About {token.name}</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <p className="text-gray-300 mb-4">{token.description}</p>
          <div className="flex flex-col space-y-2">
            <a
              href={token.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <Globe className="mr-2" /> Website
            </a>
            <a
              href={token.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <Twitter className="mr-2" /> Twitter
            </a>
            <a
              href={token.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="mr-2" /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* ... (rest of the code remains unchanged) ... */}
    </div>
  )
}

export default TokenDetail