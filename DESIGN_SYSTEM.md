# Design System Guide - Health-ON-ML

This document describes the UI/UX design system for the Health-ON-ML frontend, generated using the UI/UX Pro Max design intelligence tool.

## Design System Overview

The Health-ON-ML project is positioned as a healthcare risk prediction application. The design system should:

- **Industry**: Medical/Healthcare (Clinical Risk Assessment)
- **Mood**: Professional, trustworthy, calming, accessible
- **Primary Use**: Patient intake form and clinical risk reports
- **Accessibility**: WCAG AA minimum

## Recommended Style

**Style**: Soft UI + Minimal Clinical
- Clean, professional appearance
- Soft shadows and subtle depth
- Calming color palette
- Clear typography hierarchy
- High contrast for medical data readability

## Color Palette (Recommended)

### Primary Colors
- **Primary**: #4A90E2 (Medical Blue)
- **Secondary**: #50C878 (Health Green)
- **Accent**: #FF6B6B (Risk Red / Alert)
- **Background**: #F5F7FA (Clean White)
- **Text**: #2C3E50 (Dark Blue-Gray)

### Status Colors
- **Low Risk**: #50C878 (Green)
- **Medium Risk**: #FDB913 (Yellow)
- **High Risk**: #FF6B6B (Red)

## Typography

- **Heading Font**: Inter / Poppins (Modern, clean, medical-friendly)
- **Body Font**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto (System fonts for accessibility)
- **Mono Font**: 'Monaco', 'Courier New' (For numerical health data)

### Font Sizes
- H1 (Page Title): 32px / 40px
- H2 (Section Title): 24px / 28px
- H3 (Card Title): 18px / 20px
- Body: 14px / 16px
- Small: 12px / 14px

## Component Guidelines

### Form Inputs
- Border radius: 6px
- Border color: #DDD
- Focus border: #4A90E2
- Placeholder text: #999
- Height: 40-44px
- Padding: 10px 12px

### Buttons
- Primary: #4A90E2 background, white text
- Secondary: White background, #4A90E2 border
- Hover: Slightly darker shade, smooth 200ms transition
- Padding: 10px 24px
- Border radius: 6px
- Cursor: pointer

### Risk Cards
- Border radius: 8px
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
- Padding: 20px
- Border: 1px solid #E0E0E0
- Hover shadow: 0 4px 12px rgba(0, 0, 0, 0.12)

### Alert / Status Badges
- Success (Low Risk): Green background, dark text
- Warning (Medium Risk): Yellow background, dark text
- Danger (High Risk): Red background, white text
- Font weight: 600
- Padding: 6px 12px
- Border radius: 4px

## Layout Spacing

- Small gap: 8px
- Medium gap: 16px
- Large gap: 24px
- Page padding: 20px (mobile), 32px (desktop)

## Responsive Breakpoints

- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px
- Large: 1440px

## Anti-Patterns (Avoid)

- ❌ Bright neon colors (medical apps need trust, not excitement)
- ❌ Harsh animations (patients need calm, clear interface)
- ❌ Dark mode as default (medical data visibility is critical)
- ❌ Emoji as icons (use proper SVG medical icons)
- ❌ Thin, hard-to-read fonts
- ❌ Unclear medical terminology without tooltips

## Accessibility Requirements

- [ ] Text contrast minimum 4.5:1 for normal text
- [ ] Text contrast minimum 3:1 for large text
- [ ] All interactive elements have visible focus states
- [ ] Keyboard navigation fully supported
- [ ] Screen reader friendly labels on form inputs
- [ ] Respect `prefers-reduced-motion` media query
- [ ] Form validation errors clearly marked

## Icon Set

Use one of these systems:
- **Heroicons** (Healthcare neutral, clean)
- **Lucide Icons** (Medical friendly)
- **Feather Icons** (Minimal healthcare vibe)

Medical-specific icons:
- Heart / Heart rate: for cardiac risk
- Droplet / Blood: for glucose/diabetes
- Kidney: for kidney disease
- Warning triangle: for high-risk alerts

## Implementation Checklist

- [ ] Color palette implemented in Tailwind/CSS
- [ ] Typography imported (Google Fonts or system fonts)
- [ ] Component library built (Button, Input, Card, Badge)
- [ ] Form validation styling consistent
- [ ] Risk card layout responsive
- [ ] Hover/focus states smooth and visible
- [ ] Mobile view tested at 375px
- [ ] Accessibility audit with aXe or similar
- [ ] Dark mode considered for future (if needed)

## Tools & References

To generate or refine this design system further, use:

```bash
# Install UI/UX Pro Max CLI
npm install -g uipro-cli

# Generate medical app design system
uipro init --ai copilot

# Generate design system for our specific use case
# (Run inside the Frontend folder)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "medical clinic risk assessment" --design-system -p "Health-ON-ML"
```

## Next Steps

1. **Implement in React**: Use this design system to build Tailwind CSS components
2. **Build component library**: Button, Input, Form, Card, Badge, Modal
3. **Create design tokens file**: CSS variables for colors, spacing, typography
4. **Test with real patients**: Collect feedback on usability and trust
5. **Iterate on colors/typography**: Medical UIs often need adjustment after real use

---

**Design System Status**: Foundation v1.0  
**Last Updated**: May 5, 2026  
**Next Review**: After initial frontend prototype
