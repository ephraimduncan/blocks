'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export const blocksComponents: Record<string, ComponentType> = {
  'file-upload-01': dynamic(
    () => import('./components/file-upload/file-upload-01')
  ),
  'file-upload-02': dynamic(
    () => import('./components/file-upload/file-upload-02')
  ),
  'file-upload-03': dynamic(
    () => import('./components/file-upload/file-upload-03')
  ),
  'file-upload-04': dynamic(
    () => import('./components/file-upload/file-upload-04')
  ),
  'file-upload-05': dynamic(
    () => import('./components/file-upload/file-upload-05')
  ),
  'file-upload-06': dynamic(
    () => import('./components/file-upload/file-upload-06')
  ),

  'form-layout-01': dynamic(
    () => import('./components/form-layout/form-layout-01')
  ),
  'form-layout-02': dynamic(
    () => import('./components/form-layout/form-layout-02')
  ),
  'form-layout-03': dynamic(
    () => import('./components/form-layout/form-layout-03')
  ),
  'form-layout-04': dynamic(
    () => import('./components/form-layout/form-layout-04')
  ),
  'form-layout-05': dynamic(
    () => import('./components/form-layout/form-layout-05')
  ),

  'login-01': dynamic(() => import('./components/login/login-01')),
  'login-02': dynamic(() => import('./components/login/login-02')),
  'login-03': dynamic(() => import('./components/login/login-03')),
  'login-04': dynamic(() => import('./components/login/login-04')),
  'login-05': dynamic(() => import('./components/login/login-05')),
  'login-06': dynamic(() => import('./components/login/login-06')),
  'login-07': dynamic(() => import('./components/login/login-07')),
  'login-08': dynamic(() => import('./components/login/login-08')),
  'login-09': dynamic(() => import('./components/login/login-09')),

  'stats-01': dynamic(() => import('./components/stats/stats-01')),
  'stats-02': dynamic(() => import('./components/stats/stats-02')),
  'stats-03': dynamic(() => import('./components/stats/stats-03')),
  'stats-04': dynamic(() => import('./components/stats/stats-04')),
  'stats-05': dynamic(() => import('./components/stats/stats-05')),
  'stats-06': dynamic(() => import('./components/stats/stats-06')),
  'stats-07': dynamic(() => import('./components/stats/stats-07')),
  'stats-08': dynamic(() => import('./components/stats/stats-08')),
  'stats-09': dynamic(() => import('./components/stats/stats-09')),
  'stats-10': dynamic(() => import('./components/stats/stats-10')),
  'stats-11': dynamic(() => import('./components/stats/stats-11')),
  'stats-12': dynamic(() => import('./components/stats/stats-12')),
  'stats-13': dynamic(() => import('./components/stats/stats-13')),
  'stats-14': dynamic(() =>
    import('./components/stats/stats-14').then((mod) => mod.Stats14)
  ),
  'stats-15': dynamic(() =>
    import('./components/stats/stats-15').then((mod) => mod.Stats15)
  ),

  'grid-list-01': dynamic(() => import('./components/grid-list/grid-list-01')),
  'grid-list-02': dynamic(() => import('./components/grid-list/grid-list-02')),
  'grid-list-03': dynamic(() => import('./components/grid-list/grid-list-03')),

  'command-menu-01': dynamic(() =>
    import('./components/command-menu/command-menu-01').then(
      (mod) => mod.CommandMenu01
    )
  ),
  'command-menu-02': dynamic(() =>
    import('./components/command-menu/command-menu-02').then(
      (mod) => mod.CommandMenu02
    )
  ),
  'command-menu-03': dynamic(() =>
    import('./components/command-menu/command-menu-03').then(
      (mod) => mod.CommandMenu03
    )
  ),

  'dialog-01': dynamic(() => import('./components/dialogs/dialog-01')),
  'dialog-02': dynamic(() => import('./components/dialogs/dialog-02')),
  'dialog-03': dynamic(() => import('./components/dialogs/dialog-03')),
  'dialog-04': dynamic(() => import('./components/dialogs/dialog-04')),
  'dialog-05': dynamic(() => import('./components/dialogs/dialog-05')),
  'dialog-06': dynamic(() => import('./components/dialogs/dialog-06')),
  'dialog-07': dynamic(() => import('./components/dialogs/dialog-07')),
  'dialog-08': dynamic(() => import('./components/dialogs/dialog-08')),
  'dialog-09': dynamic(() => import('./components/dialogs/dialog-09')),
  'dialog-10': dynamic(() => import('./components/dialogs/dialog-10')),
  'dialog-11': dynamic(() => import('./components/dialogs/dialog-11')),
  'dialog-12': dynamic(() => import('./components/dialogs/dialog-12')),

  'sidebar-01': dynamic(() => import('./components/sidebar/sidebar-01')),
  'sidebar-02': dynamic(() => import('./components/sidebar/sidebar-02')),
  'sidebar-03': dynamic(() => import('./components/sidebar/sidebar-03')),
  'sidebar-04': dynamic(
    () => import('./components/sidebar/sidebar-04/app/page')
  ),
  'sidebar-05': dynamic(
    () => import('./components/sidebar/sidebar-05/app/page')
  ),
  'sidebar-06': dynamic(
    () => import('./components/sidebar/sidebar-06/app/page')
  ),

  'ai-01': dynamic(() => import('./components/ai/ai-01')),
  'ai-02': dynamic(() => import('./components/ai/ai-02')),
  'ai-03': dynamic(() => import('./components/ai/ai-03')),
  'ai-04': dynamic(() => import('./components/ai/ai-04')),
  'ai-05': dynamic(() => import('./components/ai/ai-05')),
  'chat-01': dynamic(() => import('./components/chat/chat-01')),

  'table-01': dynamic(() => import('./components/tables/table-01')),
  'table-02': dynamic(() => import('./components/tables/table-02')),
  'table-03': dynamic(() => import('./components/tables/table-03')),
  'table-04': dynamic(() => import('./components/tables/table-04')),
  'table-05': dynamic(() => import('./components/tables/table-05')),

  'onboarding-01': dynamic(() =>
    import('./components/onboarding/onboarding-01').then(
      (mod) => mod.Onboarding01
    )
  ),
  'onboarding-02': dynamic(() =>
    import('./components/onboarding/onboarding-02').then(
      (mod) => mod.Onboarding02
    )
  ),
  'onboarding-03': dynamic(() =>
    import('./components/onboarding/onboarding-03').then(
      (mod) => mod.Onboarding03
    )
  ),
  'onboarding-04': dynamic(() =>
    import('./components/onboarding/onboarding-04').then(
      (mod) => mod.Onboarding04
    )
  ),
  'onboarding-05': dynamic(() =>
    import('./components/onboarding/onboarding-05').then(
      (mod) => mod.Onboarding05
    )
  ),
  'onboarding-06': dynamic(() =>
    import('./components/onboarding/onboarding-06').then(
      (mod) => mod.Onboarding06
    )
  ),
  'onboarding-07': dynamic(() =>
    import('./components/onboarding/onboarding-07').then(
      (mod) => mod.Onboarding07
    )
  ),
};
