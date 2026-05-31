import * as React from 'react'
import type { ToastProps } from '@/components/ui/toast'

interface ToastState {
  id: string
  title?: string
  description?: string
  variant?: ToastProps['variant']
  open: boolean
}

type ToastAction =
  | { type: 'ADD'; toast: Omit<ToastState, 'id' | 'open'> }
  | { type: 'DISMISS'; id: string }
  | { type: 'REMOVE'; id: string }

const listeners: Array<(state: ToastState[]) => void> = []
let memoryState: ToastState[] = []

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((l) => l(memoryState))
}

function reducer(state: ToastState[], action: ToastAction): ToastState[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { ...action.toast, id: String(Date.now()), open: true }]
    case 'DISMISS':
      return state.map((t) => (t.id === action.id ? { ...t, open: false } : t))
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id)
  }
}

export function useToast() {
  const [state, setState] = React.useState<ToastState[]>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const idx = listeners.indexOf(setState)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])

  return {
    toasts: state,
    toast: (props: Omit<ToastState, 'id' | 'open'>) => dispatch({ type: 'ADD', toast: props }),
    dismiss: (id: string) => dispatch({ type: 'DISMISS', id }),
  }
}
