import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounder-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate"></h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{lastEditTime}</span>
    </div>
  )
}
