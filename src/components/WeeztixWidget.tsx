'use client'

import { useEffect } from 'react'

const SCRIPT_SRC = 'https://v1.widget.shop.weeztix.com/injector.js'

export default function WeeztixWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="ot-iframe w-full"
      data-ot-url="https://shop.weeztix.com/aaa79a59-79eb-11f1-8e27-d65b0659bc31"
      data-ot-guid="aaa79a59-79eb-11f1-8e27-d65b0659bc31"
    />
  )
}
