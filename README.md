# password-generator

Generate secure passwords. Uses `crypto.getRandomValues()` — not `Math.random()`.

## Options

- Length (8–128 characters)
- Include/exclude uppercase, lowercase, numbers, symbols
- Exclude ambiguous characters (0, O, l, I)
- Generate multiple passwords at once
- Password strength indicator

## Run

```bash
npm install && npm run dev
```
