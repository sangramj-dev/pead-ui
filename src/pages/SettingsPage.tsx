import { UniverseManager } from '@/components/settings/UniverseManager'
import { StrategyParams } from '@/components/settings/StrategyParams'
import { BrokerStatus } from '@/components/settings/BrokerStatus'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <UniverseManager />
      <StrategyParams />
      <BrokerStatus />
    </div>
  )
}
