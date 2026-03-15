'use client'

import { Toaster } from 'sonner'

const toastColors = {
  '--success-bg': '#4c9409',
  '--success-border': '#4c9409',
  '--success-text': '#ffffff',
  '--error-bg': '#9b1003',
  '--error-border': '#9b1003',
  '--error-text': '#ffffff',
  '--info-bg': '#047bca',
  '--info-border': '#047bca',
  '--info-text': '#ffffff'
} as React.CSSProperties

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      style={toastColors}
      toastOptions={{
        classNames: {
          closeButton: '!w-6 !h-6 transition-transform duration-150 hover:scale-125 hover:!bg-inherit hover:!border-inherit [&>svg]:!w-5 [&>svg]:!h-5 [&>svg]:[stroke-width:2] [&>svg]:transition-[stroke-width] [&>svg]:duration-150 hover:[&>svg]:[stroke-width:3]'
        }
      }}
    />
  )
}
