'use client'

import { useEffect, useRef } from 'react'

const SCRIPT_SRC = 'https://v1.widget.shop.weeztix.com/injector.js'
const SHOP_URL = 'https://shop.weeztix.com/aaa79a59-79eb-11f1-8e27-d65b0659bc31'
const SHOP_GUID = 'aaa79a59-79eb-11f1-8e27-d65b0659bc31'

declare global {
  interface Window {
    OpenTicket?: {
      ShopInjector: new () => {
        init: (config: { url: string; guid: string; elem: HTMLElement }) => Promise<void>
      }
    }
  }
}

// The Weeztix script auto-scans the DOM for `.ot-iframe` elements exactly once
// (either immediately or on the first DOMContentLoaded event) and does not use
// a MutationObserver. That one-shot scan can race against React committing our
// container to the DOM on client-side navigations, causing the widget to
// intermittently fail to appear. Loading the script once and then calling its
// manual init API ourselves — with a guaranteed live ref to our container —
// avoids relying on that timing-sensitive auto-scan altogether.
function loadWeeztixScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      if (window.OpenTicket?.ShopInjector) {
        resolve()
      } else {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', () => reject(new Error('Failed to load Weeztix widget script')))
      }
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', () => reject(new Error('Failed to load Weeztix widget script')))
    document.body.appendChild(script)
  })
}

export default function WeeztixWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const container = containerRef.current
    if (!container) return

    loadWeeztixScript()
      .then(() => {
        if (cancelled || !container || !window.OpenTicket?.ShopInjector) return
        // Guard against double-init (e.g. React StrictMode's mount/cleanup/mount in dev)
        if (container.querySelector('.ot-container')) return
        return new window.OpenTicket.ShopInjector().init({
          url: SHOP_URL,
          guid: SHOP_GUID,
          elem: container,
        })
      })
      .catch((err) => {
        console.error('Weeztix widget failed to load', err)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return <div ref={containerRef} className="weeztix-widget w-full" />
}
