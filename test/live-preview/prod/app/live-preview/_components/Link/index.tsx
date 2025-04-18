import LinkWithDefault from 'next/link.js'
import React from 'react'

import type { Page, Post } from '../../../../../payload-types.js'
import type { Props as ButtonProps } from '../Button/index.js'

import { Button } from '../Button/index.js'

const Link = (LinkWithDefault.default || LinkWithDefault) as typeof LinkWithDefault.default

type CMSLinkType = {
  appearance?: ButtonProps['appearance']
  children?: React.ReactNode
  className?: string
  invert?: ButtonProps['invert']
  label?: string
  newTab?: boolean
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string
  }
  type?: 'custom' | 'reference'
  url?: string
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  appearance,
  children,
  className,
  invert,
  label,
  newTab,
  reference,
  url,
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `/${reference.value.slug}`
      : url

  if (!href) return null

  if (!appearance) {
    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

    if (href || url) {
      return (
        <Link {...newTabProps} className={className} href={href || url || ''}>
          {label && label}
          {children && children}
        </Link>
      )
    }
  }

  return (
    <Button
      appearance={appearance}
      className={className}
      href={href}
      invert={invert}
      label={label}
      newTab={newTab}
    />
  )
}
