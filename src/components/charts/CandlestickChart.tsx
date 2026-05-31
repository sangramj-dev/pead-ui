import { useEffect, useRef } from 'react'
import {
  createChart,
  ColorType,
  type IChartApi,
  type CandlestickSeriesOptions,
} from 'lightweight-charts'
import type { PriceBar } from '@/types/market'
import { CHART_COLORS } from '@/lib/constants'

interface PriceLevels {
  entry?: number
  stop?: number
  target1?: number
  target2?: number
  ema20?: number[]
  ema50?: number[]
}

interface Props {
  bars: PriceBar[]
  levels?: PriceLevels
  height?: number
}

export function CandlestickChart({ bars, levels, height = 400 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!containerRef.current || bars.length === 0) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'hsl(222.2 84% 4.9%)' },
        textColor: 'hsl(215 20.2% 65.1%)',
      },
      grid: {
        vertLines: { color: 'hsl(217.2 32.6% 12%)' },
        horzLines: { color: 'hsl(217.2 32.6% 12%)' },
      },
      width: containerRef.current.clientWidth,
      height,
      timeScale: { borderColor: 'hsl(217.2 32.6% 17.5%)' },
      rightPriceScale: { borderColor: 'hsl(217.2 32.6% 17.5%)' },
    })
    chartRef.current = chart

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    } as Partial<CandlestickSeriesOptions>)

    const candleData = bars.map((b) => ({
      time: b.barDate as unknown as import('lightweight-charts').Time,
      open: b.openPrice,
      high: b.highPrice,
      low: b.lowPrice,
      close: b.closePrice,
    }))
    candleSeries.setData(candleData)

    // EMA20 line
    if (levels?.ema20 && levels.ema20.length === bars.length) {
      const ema20 = chart.addLineSeries({ color: CHART_COLORS.ema20, lineWidth: 1 })
      ema20.setData(
        bars.map((b, i) => ({
          time: b.barDate as unknown as import('lightweight-charts').Time,
          value: levels.ema20![i],
        }))
      )
    }

    // EMA50 line
    if (levels?.ema50 && levels.ema50.length === bars.length) {
      const ema50 = chart.addLineSeries({ color: CHART_COLORS.ema50, lineWidth: 1 })
      ema50.setData(
        bars.map((b, i) => ({
          time: b.barDate as unknown as import('lightweight-charts').Time,
          value: levels.ema50![i],
        }))
      )
    }

    // Price level lines
    if (levels?.entry != null) {
      candleSeries.createPriceLine({ price: levels.entry, color: CHART_COLORS.entry, lineWidth: 1, title: 'Entry' })
    }
    if (levels?.stop != null) {
      candleSeries.createPriceLine({ price: levels.stop, color: CHART_COLORS.stop, lineWidth: 1, title: 'Stop' })
    }
    if (levels?.target1 != null) {
      candleSeries.createPriceLine({ price: levels.target1, color: CHART_COLORS.target1, lineWidth: 1, title: 'T1' })
    }
    if (levels?.target2 != null) {
      candleSeries.createPriceLine({ price: levels.target2, color: CHART_COLORS.target2, lineWidth: 1, title: 'T2' })
    }

    chart.timeScale().fitContent()

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth })
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
      chartRef.current = null
    }
  }, [bars, levels, height])

  return <div ref={containerRef} style={{ height }} className="w-full rounded-lg overflow-hidden" />
}
