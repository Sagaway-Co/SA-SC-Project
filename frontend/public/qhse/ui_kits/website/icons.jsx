/* HSE Check website UI kit — icon helper.
 * Icons are Lucide (MIT), loaded from CDN as the brand icon set:
 * thin 1.75px stroke, rounded joins. We read Lucide's icon-node data and
 * inline it as SVG so React owns the node (no createIcons DOM swap).
 * Assigns window.Icon — loaded as a plain babel script, not a DS component.
 */
(function () {
  function pascal(name) {
    return name.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
  }
  function nodeFor(name) {
    const L = window.lucide;
    if (!L) return null;
    const p = pascal(name);
    return (L.icons && (L.icons[p] || L.icons[name])) || L[p] || null;
  }
  function innerHTML(node) {
    if (!node) return '';
    // Lucide node is [tagName, attrsObject, childrenArray]; children may also
    // be the top-level array in older builds. Render from the child tuples.
    const children = Array.isArray(node[2]) ? node[2] : node;
    return children.map(([tag, attrs]) => {
      const a = Object.entries(attrs || {})
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${a}></${tag}>`;
    }).join('');
  }

  function Icon({ name, size = 20, stroke = 1.75, color = 'currentColor', style }) {
    const html = React.useMemo(() => innerHTML(nodeFor(name)), [name]);
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: { display: 'inline-block', flex: 'none', ...style },
      dangerouslySetInnerHTML: { __html: html },
    });
  }

  window.Icon = Icon;
})();
