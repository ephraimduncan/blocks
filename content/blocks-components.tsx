'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { blocksMetadata } from './blocks-metadata';

const entries: Record<string, string> = {
  'sidebar-04': '/app/page',
  'sidebar-05': '/app/page',
  'sidebar-06': '/app/page',
  'chat-03': '/app/chat/page',
};

export const blocksComponents: Record<string, ComponentType> =
  Object.fromEntries(
    blocksMetadata.map((block) => [
      block.id,
      dynamic(async () => {
        const entry = await import(
          `./components/${block.category}/${block.id}${entries[block.id] ?? ''}`
        );
        const name = block.id
          .split('-')
          .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
          .join('');

        return entry.default ?? entry[name];
      }),
    ])
  );
