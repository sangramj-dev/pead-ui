import { useServiceHealth } from '@/hooks/useHealth'
import { cn } from '@/lib/utils'

export function ServiceHealthBar() {
  const services = useServiceHealth()

  return (
    <div className="flex items-center gap-2">
      {services.map((svc) => (
        <div key={svc.name} className="flex items-center gap-1.5">
          <span
            className={cn('h-2 w-2 rounded-full', {
              'bg-green-400 shadow-[0_0_6px_#4ade80]': svc.status === 'UP',
              'bg-red-400': svc.status === 'DOWN' || svc.status === 'ERROR',
              'bg-yellow-400 animate-pulse': svc.status === 'LOADING',
            })}
          />
          <span className="text-xs text-muted-foreground">{svc.name}</span>
        </div>
      ))}
    </div>
  )
}
