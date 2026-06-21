Animated technical backdrop — perspective grid + drifting accent glow. The brand's hero canvas.

```jsx
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GridBackground variant="grid" glow fade />
  <div style={{ position: 'relative', zIndex: 1 }}>…hero content…</div>
</section>
```

Props: `variant` (`grid | dots`), `glow`, `fade`, `intensity`. Self-contained CSS animation; respects reduced-motion.
