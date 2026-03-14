import { IconCheck } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    type: 'done',
    title: 'Repository connected',
    description: 'Linked GitHub repository to deployment pipeline',
    activityTime: '3d ago',
  },
  {
    id: 2,
    type: 'done',
    title: 'Build configuration set',
    description: 'Configured build commands and environment variables',
    activityTime: '2d ago',
  },
  {
    id: 3,
    type: 'done',
    title: 'Domain configured',
    description: 'Custom domain verified and SSL certificate issued',
    activityTime: '31min ago',
  },
  {
    id: 4,
    type: 'in progress',
    title: 'Running health checks',
    description: 'Verifying all endpoints respond correctly',
    activityTime: 'Running now...',
  },
  {
    id: 5,
    type: 'open',
    title: 'Go live',
    description: 'Switch traffic to the new deployment',
    activityTime: 'Upcoming',
  },
];

export function Onboarding06() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-medium text-foreground">Deployment progress</h3>
        <ul className="mt-6 space-y-6">
          {steps.map((step, stepIdx) => (
            <li className="relative flex gap-x-3" key={step.id}>
              <div
                className={cn(
                  'absolute top-0 left-0 flex w-6 justify-center',
                  stepIdx === steps.length - 1 ? 'h-6' : '-bottom-6'
                )}
              >
                <span aria-hidden className="w-px bg-border" />
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="relative flex size-6 flex-none items-center justify-center bg-background">
                  {step.type === 'done' ? (
                    <IconCheck aria-hidden className="size-5 text-primary" />
                  ) : step.type === 'in progress' ? (
                    <div
                      aria-hidden
                      className="size-2.5 rounded-full bg-primary ring-4 ring-background"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="size-3 rounded-full border border-border bg-background ring-4 ring-background"
                    />
                  )}
                </div>
                <div>
                  <p className="mt-0.5 font-medium text-foreground text-sm">
                    {step.title}{' '}
                    <span className="font-normal text-muted-foreground/60">
                      &#8729; {step.activityTime}
                    </span>
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
