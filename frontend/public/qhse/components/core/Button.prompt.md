Primary action control — glowing lime CTA, dark-UI variants, with optional icons and loading state.

```jsx
<Button variant="primary" size="lg" iconRight={<ArrowIcon />}>申请演示</Button>
<Button variant="secondary">查看文档</Button>
<Button variant="ghost" size="sm">取消</Button>
```

Variants: `primary` (lime gradient + glow — one per view), `secondary` (raised surface), `outline`, `ghost`, `danger`. Sizes `sm | md | lg`. Props: `iconLeft`, `iconRight`, `loading`, `disabled`, `fullWidth`, `as="a"` for links.
