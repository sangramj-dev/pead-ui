import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTriggerIngestion } from '@/hooks/useEarnings'
import { useToast } from '@/hooks/useToast'
import { formatDate } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'

interface Props {
  date: string
}

export function TriggerIngestionButton({ date }: Props) {
  const [open, setOpen] = useState(false)
  const mutation = useTriggerIngestion()
  const { toast } = useToast()

  function handleConfirm() {
    mutation.mutate(date, {
      onSuccess: (data) => {
        setOpen(false)
        toast({
          title: 'Ingestion complete',
          description: `Ingested ${data.recordsIngested} records for ${formatDate(date)}`,
        })
      },
      onError: (err) => {
        setOpen(false)
        toast({
          variant: 'destructive',
          title: 'Ingestion failed',
          description: err instanceof Error ? err.message : 'Unknown error',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Trigger Ingestion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trigger Earnings Ingestion</DialogTitle>
          <DialogDescription>
            This will fetch and ingest earnings data for{' '}
            <strong>{formatDate(date)}</strong> from all configured data sources.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={mutation.isPending}>
            {mutation.isPending ? 'Running…' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
