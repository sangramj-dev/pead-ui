import { Link, useLocation } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ServiceHealthBar } from './ServiceHealthBar'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard' },
  { to: '/signals', label: 'Signals' },
  { to: '/earnings', label: 'Earnings' },
  { to: '/backtest', label: 'Backtest' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/settings', label: 'Settings' },
] as const

export function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <TrendingUp className="h-5 w-5" />
            PEAD
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent',
                  pathname === item.to
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <ServiceHealthBar />
      </div>
    </header>
  )
}
