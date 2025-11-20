---
name: accessibility-checker
description: Reviews components and pages for accessibility (a11y) compliance including WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, and screen reader support. Activate when checking accessibility or when user mentions a11y, WCAG, or accessibility.
---

# Accessibility Checker Skill

Ensure the tims-merch e-commerce site is accessible to all users, including those using assistive technologies.

## When to Activate

- User asks to "check accessibility" or "improve a11y"
- User mentions WCAG, screen readers, or keyboard navigation
- User asks about "making it accessible"
- Before deploying new components or pages
- When user reports usability issues

## WCAG Compliance Levels

- **Level A**: Basic accessibility (minimum)
- **Level AA**: Standard target for most websites ⭐ **TARGET**
- **Level AAA**: Enhanced accessibility (ideal)

Aim for **WCAG 2.1 Level AA** compliance.

## Accessibility Checklist

### 1. Semantic HTML

#### Proper Structure
✅ Use semantic elements over generic divs
```tsx
// ❌ Bad
<div className="header">
  <div className="nav">...</div>
</div>

// ✅ Good
<header>
  <nav>...</nav>
</header>
```

#### Landmark Regions
✅ Required landmarks:
- `<header>` - Site header
- `<nav>` - Navigation
- `<main>` - Main content (only one per page)
- `<footer>` - Site footer
- `<aside>` - Complementary content
- `<section>` - Thematic grouping
- `<article>` - Self-contained content

#### Heading Hierarchy
✅ Proper heading order (no skipping levels)
```tsx
// ❌ Bad
<h1>Page Title</h1>
<h3>Subsection</h3> // Skipped h2

// ✅ Good
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

✅ Only one h1 per page
✅ Headings describe content structure, not just styling

### 2. Images & Media

#### Alt Text
✅ All images must have alt attribute
```tsx
// ❌ Bad
<Image src="/product.jpg" width={300} height={300} />

// ✅ Good
<Image
  src="/product.jpg"
  width={300}
  height={300}
  alt="Blue cotton t-shirt with logo"
/>

// ✅ Decorative images (empty alt)
<Image
  src="/decoration.svg"
  width={50}
  height={50}
  alt=""
/>
```

**Alt Text Guidelines**:
- Describe the content/function, not "image of"
- For products: Include key visual details (color, style, distinguishing features)
- For decorative images: Use empty alt (`alt=""`)
- For linked images: Describe destination
- Keep under 125 characters

#### Video & Audio
✅ Provide captions for videos
✅ Provide transcripts for audio
✅ Ensure media players are keyboard accessible

### 3. Forms & Inputs

#### Labels
✅ All inputs must have associated labels
```tsx
// ❌ Bad
<input type="text" placeholder="Name" />

// ✅ Good - Explicit label
<label htmlFor="name">Name</label>
<input type="text" id="name" name="name" />

// ✅ Good - Implicit label
<label>
  Name
  <input type="text" name="name" />
</label>

// ✅ Good - aria-label when visual label isn't possible
<input
  type="search"
  aria-label="Search products"
  placeholder="Search..."
/>
```

#### Error Messages
✅ Associate errors with inputs
```tsx
// ✅ Good
<label htmlFor="email">Email</label>
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}
```

#### Required Fields
✅ Indicate required fields
```tsx
<label htmlFor="email">
  Email <span aria-label="required">*</span>
</label>
<input
  type="email"
  id="email"
  required
  aria-required="true"
/>
```

#### Form Groups
✅ Group related inputs
```tsx
<fieldset>
  <legend>Shipping Address</legend>
  {/* Address fields */}
</fieldset>
```

### 4. Keyboard Navigation

#### Tab Order
✅ Logical tab order (follows visual flow)
✅ All interactive elements keyboard accessible
✅ No keyboard traps (user can escape all widgets)

#### Focus Management
✅ Visible focus indicators
```css
/* ❌ Bad - Never do this */
*:focus {
  outline: none;
}

/* ✅ Good - Custom focus styles */
button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

✅ Focus moves logically after actions (e.g., modal opens → focus trapped inside → focus returns on close)

#### Keyboard Shortcuts
Common shortcuts to support:
- `Enter` / `Space` - Activate buttons/links
- `Esc` - Close modals/dropdowns
- `Tab` - Move forward
- `Shift+Tab` - Move backward
- `Arrow keys` - Navigate menus/tabs

```tsx
// ✅ Good - Keyboard accessible dropdown
<button
  onClick={toggleDropdown}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    }
    if (e.key === 'Escape') {
      closeDropdown()
    }
  }}
  aria-expanded={isOpen}
  aria-haspopup="true"
>
  Menu
</button>
```

### 5. ARIA Attributes

#### When to Use ARIA
**First Rule of ARIA**: Don't use ARIA if semantic HTML exists
```tsx
// ❌ Bad
<div role="button" tabIndex={0} onClick={...}>Click</div>

// ✅ Good
<button onClick={...}>Click</button>
```

#### Common ARIA Attributes

**aria-label** - Provides accessible name
```tsx
<button aria-label="Close dialog">
  <XIcon /> {/* Icon only, needs label */}
</button>
```

**aria-labelledby** - References element providing label
```tsx
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Purchase</h2>
</div>
```

**aria-describedby** - Additional description
```tsx
<input
  aria-describedby="password-requirements"
/>
<div id="password-requirements">
  Must be at least 8 characters
</div>
```

**aria-live** - Announces dynamic changes
```tsx
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>
```

**aria-expanded** - For collapsible content
```tsx
<button aria-expanded={isOpen}>
  Show details
</button>
```

**aria-current** - Current item in navigation
```tsx
<a href="/products" aria-current="page">
  Products
</a>
```

**aria-hidden** - Hide from screen readers
```tsx
<span aria-hidden="true">→</span> {/* Decorative */}
```

### 6. Color & Contrast

#### Contrast Ratios (WCAG AA)
- **Normal text** (< 24px): 4.5:1
- **Large text** (≥ 24px or 19px bold): 3:1
- **UI components** (buttons, form borders): 3:1

✅ Test contrast: Use browser DevTools or online tools

#### Color Independence
❌ Don't rely on color alone
```tsx
// ❌ Bad - Color only
<span style={{ color: 'red' }}>Error</span>
<span style={{ color: 'green' }}>Success</span>

// ✅ Good - Icon + color + text
<span className="text-red-600">
  <ErrorIcon aria-hidden="true" />
  Error: Invalid input
</span>
```

### 7. Interactive Components

#### Buttons
```tsx
// ✅ Good button
<button
  type="button"
  aria-label="Add to cart"
  disabled={isLoading}
  aria-busy={isLoading}
>
  {isLoading ? 'Adding...' : 'Add to Cart'}
</button>
```

#### Links
```tsx
// ❌ Bad - Vague link text
<a href="/products">Click here</a>

// ✅ Good - Descriptive text
<a href="/products">View all products</a>

// ✅ Good - New window warning
<a href="/terms" target="_blank" rel="noopener noreferrer">
  Terms of Service
  <span className="sr-only"> (opens in new window)</span>
</a>
```

#### Modals/Dialogs
```tsx
// ✅ Accessible modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure?</p>
  <button onClick={confirm}>Confirm</button>
  <button onClick={close}>Cancel</button>
</div>
```

Focus management:
1. Focus moves to modal when opened
2. Focus trapped inside modal (Tab cycles through modal only)
3. Escape key closes modal
4. Focus returns to trigger element when closed

#### Tooltips
```tsx
// ✅ Accessible tooltip
<button
  aria-describedby={isHovered ? 'tooltip' : undefined}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onFocus={() => setIsHovered(true)}
  onBlur={() => setIsHovered(false)}
>
  Help
</button>
{isHovered && (
  <div id="tooltip" role="tooltip">
    Get assistance with your order
  </div>
)}
```

#### Tabs
```tsx
// ✅ Accessible tabs
<div role="tablist" aria-label="Product information">
  <button
    role="tab"
    aria-selected={activeTab === 'description'}
    aria-controls="description-panel"
    id="description-tab"
  >
    Description
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 'reviews'}
    aria-controls="reviews-panel"
    id="reviews-tab"
  >
    Reviews
  </button>
</div>

<div
  role="tabpanel"
  id="description-panel"
  aria-labelledby="description-tab"
  hidden={activeTab !== 'description'}
>
  {/* Content */}
</div>
```

### 8. E-commerce Specific

#### Product Cards
```tsx
<article aria-label="Product: Blue T-Shirt">
  <Image
    src="/tshirt.jpg"
    alt="Blue cotton t-shirt with front logo"
    width={300}
    height={300}
  />
  <h3>Blue T-Shirt</h3>
  <p>
    <span aria-label="Price">$29.99</span>
  </p>
  <button aria-label="Add Blue T-Shirt to cart">
    Add to Cart
  </button>
</article>
```

#### Shopping Cart
- Announce item additions/removals with aria-live
- Show item count accessibly
- Keyboard accessible quantity controls

```tsx
<div aria-live="polite" aria-atomic="true">
  {`${itemCount} items in cart`}
</div>
```

#### Checkout Form
- Clear progress indication
- Error summary at top
- Logical form field order
- All validation errors associated with inputs

### 9. Screen Reader Support

#### Visually Hidden Text
```tsx
// Utility class for screen reader only content
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Usage
<button>
  <TrashIcon aria-hidden="true" />
  <span className="sr-only">Delete item</span>
</button>
```

#### Skip Links
```tsx
// Allow keyboard users to skip navigation
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
<nav>...</nav>
<main id="main-content">...</main>
```

### 10. Dynamic Content

#### Loading States
```tsx
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <Spinner aria-hidden="true" />
      <span>Loading...</span>
    </>
  ) : (
    'Submit'
  )}
</button>
```

#### Live Regions
```tsx
// Polite - Announces when user is idle
<div aria-live="polite">
  {statusMessage}
</div>

// Assertive - Announces immediately (use sparingly)
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>
```

## Testing Checklist

### Automated Testing
- [ ] Run Lighthouse accessibility audit (DevTools)
- [ ] Run axe DevTools extension
- [ ] Check HTML validator (semantic structure)
- [ ] Test color contrast ratios

### Manual Testing
- [ ] Navigate entire site with keyboard only
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Zoom to 200% (text should reflow)
- [ ] Test with Windows High Contrast mode
- [ ] Disable images (ensure alt text is meaningful)
- [ ] Test form validation and error messages

### Keyboard Navigation Test
1. Tab through all interactive elements
2. Activate links/buttons with Enter/Space
3. Navigate menus with arrows
4. Close modals with Escape
5. Ensure focus is always visible
6. Ensure no keyboard traps

### Screen Reader Test (Common patterns)
1. Page title announced
2. Landmarks identified (header, nav, main, footer)
3. Headings create logical outline
4. Links have descriptive text
5. Forms have labels and error messages
6. Images have appropriate alt text
7. Buttons describe their action
8. Dynamic content announced

## Common Issues & Fixes

### Issue: Missing alt text
```tsx
// ❌ Bad
<img src="product.jpg" />

// ✅ Fix
<Image src="product.jpg" alt="Product description" width={300} height={300} />
```

### Issue: Div buttons
```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Fix
<button onClick={handleClick}>Click me</button>
```

### Issue: No form labels
```tsx
// ❌ Bad
<input placeholder="Email" />

// ✅ Fix
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Issue: Low contrast
```tsx
// ❌ Bad
<p className="text-gray-400">Important text</p>

// ✅ Fix
<p className="text-gray-700">Important text</p>
```

### Issue: Icon-only button
```tsx
// ❌ Bad
<button><XIcon /></button>

// ✅ Fix
<button aria-label="Close">
  <XIcon aria-hidden="true" />
</button>
```

## Workflow

1. **Scan the code** - Look for accessibility issues
2. **Run automated tools** - Lighthouse, axe DevTools
3. **Check each category** - Go through checklist above
4. **Test keyboard navigation** - Tab through the interface
5. **Test with screen reader** - NVDA (Windows) or VoiceOver (Mac)
6. **Document issues** - List problems with severity
7. **Provide fixes** - Show corrected code examples
8. **Verify fixes** - Re-test after implementing

## Output Format

```markdown
## Accessibility Report

### 🔴 Critical Issues
- **Missing alt text on product images** (app/components/ProductCard.tsx:15)
  - Fix: Add descriptive alt text to all product images

### 🟡 Important Issues
- **Low contrast on button text** (app/components/Button.tsx:10)
  - Current: 3.2:1, Required: 4.5:1
  - Fix: Use darker text color (text-gray-700 instead of text-gray-400)

### 🔵 Improvements
- **Add skip link** (app/layout.tsx)
  - Add skip navigation link for keyboard users

### ✅ Good Practices
- Proper heading hierarchy throughout
- All forms have associated labels
- Semantic HTML used correctly

### Summary
X critical, Y important, Z improvements suggested.
```

Make accessibility a priority, not an afterthought!
