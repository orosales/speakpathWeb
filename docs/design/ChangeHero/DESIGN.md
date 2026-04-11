# Design System Document: The Sonic Luminary

## 1. Overview & Creative North Star
**Creative North Star: "The Sonic Luminary"**
This design system rejects the "educational template" look in favor of a high-end, editorial experience that feels like a premium piece of audio hardware. We move away from flat, boxed-in layouts to an immersive environment defined by light, depth, and atmospheric resonance. 

The aesthetic is driven by **Intentional Asymmetry** and **Tonal Depth**. By overlapping typography with translucent containers and using aggressive white space, we create a sense of professional authority. This isn't just a learning tool; it’s a high-performance instrument for the voice.

---

## 2. Colors & Surface Philosophy
The palette utilizes a deep, nocturnal foundation to make the electric accents feel like glowing interfaces in a dark room.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** 
Structural boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background is the only way to denote a change in context. This maintains a seamless, fluid "app-like" feel rather than a "website" feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following tokens to create "nested" depth:
- **Base Layer:** `surface` (#010e24)
- **Content Sections:** `surface-container-low` (#02132b)
- **Nested Components (Cards):** `surface-container` (#061934)
- **Active/Hovered Elements:** `surface-container-high` (#0b203d)

### The "Glass & Gradient" Rule
Floating elements (like voice activity monitors or level badges) must utilize **Glassmorphism**. Use semi-transparent surface colors with a `24px` backdrop-blur. 
*   **Signature Texture:** Main CTAs should never be flat. Apply a linear gradient from `primary` (#58f5d1) to `primary-container` (#1cd0ad) at a 135-degree angle to provide a "lit from within" glow.

---

## 3. Typography
We utilize a pairing of **Plus Jakarta Sans** for high-impact editorial moments and **Manrope** for technical, utilitarian clarity.

*   **Display (Plus Jakarta Sans):** Set with a tight `-4%` letter spacing. Use `display-lg` (3.5rem) for hero statements to convey a bold, tech-focused confidence.
*   **Headline (Plus Jakarta Sans):** Used for section headers. These should often be offset to the left of the grid to embrace asymmetry.
*   **Body (Manrope):** Chosen for its superior legibility in dark modes. Use `body-lg` (1rem) for feature descriptions to ensure the experience feels "premium" rather than "dense."
*   **Label (Plus Jakarta Sans):** Small-caps or wide-spaced (10%+) labels in `tertiary` (#c87dff) are used for "Micro-copy" like difficulty levels or language tags.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" tonal tiers. To lift a language card off the background, place a `surface-container` card on a `surface-container-low` section. This creates a soft, natural lift without the "dirtiness" of heavy black shadows.

### Ambient Shadows
Where floating depth is required (e.g., a voice recording modal), use **Ambient Shadows**:
- **Color:** `surface-container-lowest` (#000000) at 12% opacity.
- **Blur:** 40px to 60px.
- **Spread:** -10px.
This mimics the way light dissipates in a digital void.

### The "Ghost Border" Fallback
If a border is required for accessibility, it must be a **Ghost Border**:
- Use `outline-variant` (#3b4861) at **15% opacity**. 
- **Strict Rule:** Never use 100% opaque borders.

---

## 5. Components

### Hero Section: Voice Interaction Focus
The hero is not a static image. It is a visualization of sound.
- **Voice Waveform:** Use a `tertiary` (#c87dff) to `primary` (#58f5d1) gradient stroke for a dynamic waveform.
- **Microphone Core:** A circular element using `surface-bright` (#152c4e) with a `primary` glow (8px blur) to signify "Listening" state.

### Buttons (Primary CTA)
- **Sizing:** Large padding (16px 32px), `xl` (1.5rem) roundedness.
- **Visuals:** Gradient fill (`primary` to `primary-container`).
- **The Arrow:** Include a `trailing-icon` (arrow-right). On hover, the arrow should translate +4px X-axis while the button gains a `primary` outer glow.

### Cards (Languages & Features)
- **Style:** Forbid divider lines. Use `md` (0.75rem) roundedness.
- **Separation:** Use vertical white space from the Spacing Scale (32px or 48px) rather than lines.
- **Interaction:** On hover, shift background from `surface-container` to `surface-container-high` and apply a subtle `primary` ghost border (15% opacity).

### Progress Chips
- **Selection Chips:** Use `secondary-container` (#374767) for inactive and `primary` (#58f5d1) for active states. Use `full` (9999px) roundedness for a "pill" aesthetic.

### Input Fields (Voice/Text)
- **Background:** `surface-container-lowest` (#000000) with a 20% opacity.
- **Active State:** Instead of a border change, increase the `backdrop-blur` and change the label color to `primary`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts where the headline is positioned on the left and the content card is pushed to the far right.
*   **Do** use "Optical Centering" for icons—voice and play icons often need to be nudged 1-2px to look visually balanced.
*   **Do** lean into `tertiary` (#c87dff) for "delight" moments, like achieving a new fluency level.

### Don't:
*   **Don't** use 1px solid white or grey borders. This "cheapens" the tech-focused aesthetic.
*   **Don't** use pure black (#000000) for backgrounds. Always use the `surface` navy (#010e24) to maintain tonal depth.
*   **Don't** use standard "Drop Shadows." If it doesn't look like an ambient glow, it doesn't belong in this system.
*   **Don't** overcrowd the Hero. Let the typography and the voice interaction visualization breathe with at least 80px of padding.