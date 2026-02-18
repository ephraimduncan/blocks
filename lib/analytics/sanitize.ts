const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const MAX_STRING_LENGTH = 120;
const MAX_ARRAY_LENGTH = 20;

function stripEmails(value: string): string {
  return value.replace(EMAIL_REGEX, '[redacted]');
}

function capString(value: string): string {
  if (value.length <= MAX_STRING_LENGTH) {
    return value;
  }
  return value.slice(0, MAX_STRING_LENGTH);
}

function capArray(value: unknown[]): unknown[] {
  return value.slice(0, MAX_ARRAY_LENGTH);
}

export function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return capString(stripEmails(value));
  }

  if (Array.isArray(value)) {
    return capArray(value).map(sanitizeValue);
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  return;
}

export function sanitizeProperties<T extends Record<string, unknown>>(
  properties: T
): T {
  const sanitized = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(properties)) {
    const clean = sanitizeValue(value);
    if (clean !== undefined) {
      sanitized[key] = clean;
    }
  }

  return sanitized as T;
}

export function extractHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}
