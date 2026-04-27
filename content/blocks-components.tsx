'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export const blocksComponents: Record<string, ComponentType> = {
  'file-upload-01': dynamic(
    () => import('./components/file-upload/file-upload-01'),
    { ssr: false }
  ),
  'file-upload-02': dynamic(
    () => import('./components/file-upload/file-upload-02'),
    { ssr: false }
  ),
  'file-upload-03': dynamic(
    () => import('./components/file-upload/file-upload-03'),
    { ssr: false }
  ),
  'file-upload-04': dynamic(
    () => import('./components/file-upload/file-upload-04'),
    { ssr: false }
  ),
  'file-upload-05': dynamic(
    () => import('./components/file-upload/file-upload-05'),
    { ssr: false }
  ),
  'file-upload-06': dynamic(
    () => import('./components/file-upload/file-upload-06'),
    { ssr: false }
  ),

  'form-layout-01': dynamic(
    () => import('./components/form-layout/form-layout-01'),
    { ssr: false }
  ),
  'form-layout-02': dynamic(
    () => import('./components/form-layout/form-layout-02'),
    { ssr: false }
  ),
  'form-layout-03': dynamic(
    () => import('./components/form-layout/form-layout-03'),
    { ssr: false }
  ),
  'form-layout-04': dynamic(
    () => import('./components/form-layout/form-layout-04'),
    { ssr: false }
  ),
  'form-layout-05': dynamic(
    () => import('./components/form-layout/form-layout-05'),
    { ssr: false }
  ),

  'login-01': dynamic(() => import('./components/login/login-01'), {
    ssr: false,
  }),
  'login-02': dynamic(() => import('./components/login/login-02'), {
    ssr: false,
  }),
  'login-03': dynamic(() => import('./components/login/login-03'), {
    ssr: false,
  }),
  'login-04': dynamic(() => import('./components/login/login-04'), {
    ssr: false,
  }),
  'login-05': dynamic(() => import('./components/login/login-05'), {
    ssr: false,
  }),
  'login-06': dynamic(() => import('./components/login/login-06'), {
    ssr: false,
  }),
  'login-07': dynamic(() => import('./components/login/login-07'), {
    ssr: false,
  }),
  'login-08': dynamic(() => import('./components/login/login-08'), {
    ssr: false,
  }),
  'login-09': dynamic(() => import('./components/login/login-09'), {
    ssr: false,
  }),

  'stats-01': dynamic(() => import('./components/stats/stats-01'), {
    ssr: false,
  }),
  'stats-02': dynamic(() => import('./components/stats/stats-02'), {
    ssr: false,
  }),
  'stats-03': dynamic(() => import('./components/stats/stats-03'), {
    ssr: false,
  }),
  'stats-04': dynamic(() => import('./components/stats/stats-04'), {
    ssr: false,
  }),
  'stats-05': dynamic(() => import('./components/stats/stats-05'), {
    ssr: false,
  }),
  'stats-06': dynamic(() => import('./components/stats/stats-06'), {
    ssr: false,
  }),
  'stats-07': dynamic(() => import('./components/stats/stats-07'), {
    ssr: false,
  }),
  'stats-08': dynamic(() => import('./components/stats/stats-08'), {
    ssr: false,
  }),
  'stats-09': dynamic(() => import('./components/stats/stats-09'), {
    ssr: false,
  }),
  'stats-10': dynamic(() => import('./components/stats/stats-10'), {
    ssr: false,
  }),
  'stats-11': dynamic(() => import('./components/stats/stats-11'), {
    ssr: false,
  }),
  'stats-12': dynamic(() => import('./components/stats/stats-12'), {
    ssr: false,
  }),
  'stats-13': dynamic(() => import('./components/stats/stats-13'), {
    ssr: false,
  }),
  'stats-14': dynamic(
    () => import('./components/stats/stats-14').then((mod) => mod.Stats14),
    { ssr: false }
  ),
  'stats-15': dynamic(
    () => import('./components/stats/stats-15').then((mod) => mod.Stats15),
    { ssr: false }
  ),

  'grid-list-01': dynamic(() => import('./components/grid-list/grid-list-01'), {
    ssr: false,
  }),
  'grid-list-02': dynamic(() => import('./components/grid-list/grid-list-02'), {
    ssr: false,
  }),
  'grid-list-03': dynamic(() => import('./components/grid-list/grid-list-03'), {
    ssr: false,
  }),

  'command-menu-01': dynamic(
    () =>
      import('./components/command-menu/command-menu-01').then(
        (mod) => mod.CommandMenu01
      ),
    { ssr: false }
  ),
  'command-menu-02': dynamic(
    () =>
      import('./components/command-menu/command-menu-02').then(
        (mod) => mod.CommandMenu02
      ),
    { ssr: false }
  ),
  'command-menu-03': dynamic(
    () =>
      import('./components/command-menu/command-menu-03').then(
        (mod) => mod.CommandMenu03
      ),
    { ssr: false }
  ),

  'dialog-01': dynamic(() => import('./components/dialogs/dialog-01'), {
    ssr: false,
  }),
  'dialog-02': dynamic(() => import('./components/dialogs/dialog-02'), {
    ssr: false,
  }),
  'dialog-03': dynamic(() => import('./components/dialogs/dialog-03'), {
    ssr: false,
  }),
  'dialog-04': dynamic(() => import('./components/dialogs/dialog-04'), {
    ssr: false,
  }),
  'dialog-05': dynamic(() => import('./components/dialogs/dialog-05'), {
    ssr: false,
  }),
  'dialog-06': dynamic(() => import('./components/dialogs/dialog-06'), {
    ssr: false,
  }),
  'dialog-07': dynamic(() => import('./components/dialogs/dialog-07'), {
    ssr: false,
  }),
  'dialog-08': dynamic(() => import('./components/dialogs/dialog-08'), {
    ssr: false,
  }),
  'dialog-09': dynamic(() => import('./components/dialogs/dialog-09'), {
    ssr: false,
  }),
  'dialog-10': dynamic(() => import('./components/dialogs/dialog-10'), {
    ssr: false,
  }),
  'dialog-11': dynamic(() => import('./components/dialogs/dialog-11'), {
    ssr: false,
  }),
  'dialog-12': dynamic(() => import('./components/dialogs/dialog-12'), {
    ssr: false,
  }),

  'sidebar-01': dynamic(() => import('./components/sidebar/sidebar-01'), {
    ssr: false,
  }),
  'sidebar-02': dynamic(() => import('./components/sidebar/sidebar-02'), {
    ssr: false,
  }),
  'sidebar-03': dynamic(() => import('./components/sidebar/sidebar-03'), {
    ssr: false,
  }),
  'sidebar-04': dynamic(
    () => import('./components/sidebar/sidebar-04/app/page'),
    { ssr: false }
  ),
  'sidebar-05': dynamic(
    () => import('./components/sidebar/sidebar-05/app/page'),
    { ssr: false }
  ),
  'sidebar-06': dynamic(
    () => import('./components/sidebar/sidebar-06/app/page'),
    { ssr: false }
  ),

  'ai-01': dynamic(() => import('./components/ai/ai-01'), { ssr: false }),
  'ai-02': dynamic(() => import('./components/ai/ai-02'), { ssr: false }),
  'ai-03': dynamic(() => import('./components/ai/ai-03'), { ssr: false }),
  'ai-04': dynamic(() => import('./components/ai/ai-04'), { ssr: false }),
  'ai-05': dynamic(() => import('./components/ai/ai-05'), { ssr: false }),

  'table-01': dynamic(() => import('./components/tables/table-01'), {
    ssr: false,
  }),
  'table-02': dynamic(() => import('./components/tables/table-02'), {
    ssr: false,
  }),
  'table-03': dynamic(() => import('./components/tables/table-03'), {
    ssr: false,
  }),
  'table-04': dynamic(() => import('./components/tables/table-04'), {
    ssr: false,
  }),
  'table-05': dynamic(() => import('./components/tables/table-05'), {
    ssr: false,
  }),

  'onboarding-01': dynamic(
    () =>
      import('./components/onboarding/onboarding-01').then(
        (mod) => mod.Onboarding01
      ),
    { ssr: false }
  ),
  'onboarding-02': dynamic(
    () =>
      import('./components/onboarding/onboarding-02').then(
        (mod) => mod.Onboarding02
      ),
    { ssr: false }
  ),
  'onboarding-03': dynamic(
    () =>
      import('./components/onboarding/onboarding-03').then(
        (mod) => mod.Onboarding03
      ),
    { ssr: false }
  ),
  'onboarding-04': dynamic(
    () =>
      import('./components/onboarding/onboarding-04').then(
        (mod) => mod.Onboarding04
      ),
    { ssr: false }
  ),
  'onboarding-05': dynamic(
    () =>
      import('./components/onboarding/onboarding-05').then(
        (mod) => mod.Onboarding05
      ),
    { ssr: false }
  ),
  'onboarding-06': dynamic(
    () =>
      import('./components/onboarding/onboarding-06').then(
        (mod) => mod.Onboarding06
      ),
    { ssr: false }
  ),
  'onboarding-07': dynamic(
    () =>
      import('./components/onboarding/onboarding-07').then(
        (mod) => mod.Onboarding07
      ),
    { ssr: false }
  ),
};
