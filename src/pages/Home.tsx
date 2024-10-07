import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, BarChart2, Activity, MessageCircle, Users, Zap, Brain } from 'lucide-react'
import BlockchainPerformance from '../components/BlockchainPerformance'

const Home: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const topTokens = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5, logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3000, change24h: 1.8, logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 2, change24h: -0.5, logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
  ]

  const trendingTokens = [
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 150, change24h: 5.2, logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 30, change24h: 3.7, logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 80, change24h: 4.5, logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  ]

  const latestNews = [
    { id: 1, title: 'Bitcoin Reaches New All-Time High', url: '#', summary: 'Bitcoin surpasses previous records, reaching $70,000 for the first time.' },
    { id: 2, title: 'Ethereum 2.0 Upgrade Scheduled for Next Month', url: '#', summary: 'The long-awaited Ethereum upgrade promises improved scalability and reduced energy consumption.' },
    { id: 3, title: 'Regulatory Concerns Grow for DeFi Projects', url: '#', summary: 'Governments worldwide are increasing scrutiny on decentralized finance projects.' },
    { id: 4, title: 'New Blockchain Aims to Revolutionize Supply Chain Management', url: '#', summary: 'Innovative blockchain solution could transform how global supply chains operate.' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % latestNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [latestNews.length]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to DisplayTokens</h1>
      <p className="text-xl mb-8">Your AI-powered crypto companion: Analyze, predict, and stay ahead in the dynamic world of digital assets.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Top Cryptocurrencies</h2>
          <ul>
            {topTokens.map(token => (
              <li key={token.id} className="mb-2">
                <Link to={`/tokens/${token.id}`} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={token.logo} alt={token.name} className="w-6 h-6 mr-2" />
                    <span>{token.name} ({token.symbol})</span>
                  </div>
                  <span className={token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                    ${token.price.toLocaleString()} ({token.change24h}%)
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Trending Tokens</h2>
          <ul>
            {trendingTokens.map(token => (
              <li key={token.id} className="mb-2">
                <Link to={`/tokens/${token.id}`} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={token.logo} alt={token.name} className="w-6 h-6 mr-2" />
                    <span>{token.name} ({token.symbol})</span>
                  </div>
                  <span className={token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                    ${token.price.toLocaleString()} ({token.change24h}%)
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Latest AI-Curated News</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{latestNews[currentNewsIndex].title}</h3>
            <p className="text-gray-400">{latestNews[currentNewsIndex].summary}</p>
          </div>
          <div className="flex justify-center space-x-2">
            {latestNews.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentNewsIndex ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Blockchain Performance Comparison</h2>
        <BlockchainPerformance />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2" /> Crypto Project Health Checker
          </h2>
          <p>Assess the overall health and potential of crypto projects based on factors like developer activity, community engagement, and tokenomics.</p>
          <Link to="/health-checker" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Check Project Health
          </Link>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Brain className="mr-2" /> AI Sentiment Analysis
          </h2>
          <p>Analyze social media, news articles, and forum discussions to gauge overall market sentiment for different cryptocurrencies.</p>
          <Link to="/sentiment-analysis" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Analyze Sentiment
          </Link>
        </div>
      </div>

      <div className="text-center">
        <Link to="/tokens" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
          Explore All Tokens
        </Link>
      </div>
    </div>
  )
}

export default Home