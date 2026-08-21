# Accessibility Compliance

This project maintains WCAG AA accessibility standards through automated checks.

## Color Contrast Compliance

All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

### Current Color Palette (Idea 1: Modern Professional)

**Light Mode:**
- Background: #ffffff
- Text: #222222 (15.91:1 ✅)
- Secondary Text: #4b4e6d (8.05:1 ✅)
- Muted Text: #6b7280 (4.83:1 ✅)
- Accent (buttons): #0f766e (5.47:1 ✅)
- Accent (links/text): #0f766e (5.47:1 ✅)

**Dark Mode:**
- Background: #222222
- Text: #ffffff (15.91:1 ✅)
- Secondary Text: #95a3b3 (6.19:1 ✅)
- Muted Text: #9ca3af (6.27:1 ✅)
- Accent (buttons): #0f766e (5.47:1 ✅)
- Accent (links/text): #5eead4 (10.75:1 ✅)

## Automated Checks

### Pre-Commit Hook

Every commit automatically runs:
1. **ESLint with jsx-a11y plugin** - Checks React components for accessibility issues
2. **Contrast checker** - Verifies all colors meet WCAG AA standards

### Running Checks Manually

```bash
# Run accessibility lint
npm run lint

# Run color contrast check
node contrast-check.js
```

## Adding New Colors

When adding new colors to `app/globals.css`:

1. Update the color variables in both `:root` and `.dark`
2. Run `node contrast-check.js` to verify compliance
3. The pre-commit hook will prevent commits if colors fail WCAG AA

## ESLint Accessibility Rules

We enforce these jsx-a11y rules:
- `anchor-is-valid` - Ensures links are accessible
- `alt-text` - Requires alt text on images
- `aria-props` - Validates ARIA properties
- `aria-role` - Validates ARIA roles
- `heading-has-content` - Ensures headings have content
- `img-redundant-alt` - Prevents redundant alt text
- `no-access-key` - Prevents access key usage

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
