'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { blocksMetadata } from './blocks-metadata';

export const blocksComponents: Record<string, ComponentType> =
  Object.fromEntries(
    blocksMetadata.map((block) => [
      block.id,
      dynamic(async () => {
        const entry =
          block.category === 'sidebar' &&
          ['sidebar-04', 'sidebar-05', 'sidebar-06'].includes(block.id)
            ? await import(`./components/${block.category}/${block.id}/app/page`)
            : await import(`./components/${block.category}/${block.id}`);
        const name = block.id
          .split('-')
          .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
          .join('');

        return entry.default ?? entry[name];
      }),
    ])
  );
