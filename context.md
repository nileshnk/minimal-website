# Website Development Context

## Goal

Create a personal portfolio website identical to https://www.priyanshu.me/ with dark theme, minimalist design, and clean typography.

## Design Requirements

### Visual Style & Colors

- **Background**: Deep charcoal/black (#0a0a0a to #1a1a1a)
- **Primary Text**: Pure white (#ffffff) for headings and main content
- **Secondary Text**: Light gray (#888888 to #aaaaaa) for subtitles and descriptions
- **Accent Colors**: None - strictly monochromatic palette
- **Links**: White text with subtle hover effects (no color change, possibly slight opacity)
- **Borders/Dividers**: None visible - content separated by generous whitespace

### Typography Specifications

- **Font Family**: System font stack (likely -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
- **Name/Heading**: Large, bold weight (700-800), approximately 32-40px
- **Job Title**: Medium size, normal weight (400), approximately 18-20px, gray color
- **Section Headings**: Medium-large size, bold weight (600-700), approximately 24-28px
- **Body Text**: Regular size (16-18px), normal weight (400), line-height 1.5-1.6
- **Blog Titles**: Medium size, bold weight (600), approximately 20-22px
- **Blog Subtitles**: Smaller size (14-16px), lighter gray color
- **Letter Spacing**: Tight to normal (-0.01em to 0em)

### Layout & Positioning

- **Container Width**: Maximum 600-700px, centered with auto margins
- **Padding**: 40-60px horizontal padding on large screens, 20-30px on mobile
- **Vertical Spacing**:
  - Between major sections: 80-120px
  - Between blog posts: 40-50px
  - Between title and subtitle: 8-12px
  - Between section heading and content: 30-40px
- **Alignment**: All content left-aligned, no center alignment anywhere
- **Grid**: Single column layout, no multi-column grids

### Spacing & Whitespace

- **Top Margin**: Approximately 100-120px from top of viewport to name
- **Section Gaps**: Large breathing room between Bio, Blog, and Connect sections
- **Paragraph Spacing**: 1.5-2em between paragraphs
- **List Item Spacing**: 0.8-1em between bullet points
- **Line Height**: Generous 1.5-1.6 for readability

### Homepage Structure

1. **Header Section**

   - Name: "Priyanshu Singh"
   - Title: "Web Developer"
   - Bio: "Dedicated to building responsive and user-friendly digital interfaces. Connecting creative design with efficient technical implementation."

2. **Blog Section**

   - Section title: "Blog"
   - **Article 1:**
     - Title: "Exploring the Intersection of Design, AI, and Design Engineering"
     - Subtitle: "How AI is changing the way we design"
   - **Article 2:**
     - Title: "Why I left my job to start my own company"
     - Subtitle: "A deep dive into my decision to leave my job and start my own company"
   - **Article 3:**
     - Title: "What I learned from my first year of freelancing"
     - Subtitle: "A look back at my first year of freelancing and what I learned"

3. **Connect Section**
   - Section title: "Connect"
   - Email: "priyanshu.singhcs11@gmail.com"
   - Social links: Github, Twitter, LinkedIn (with external link arrows)

### Blog Post Page Layout Details

- **Header Positioning**:
  - Name and title in top-left corner (40-60px from edges)
  - "Copy URL" button in top-right corner, same vertical alignment
  - Header has subtle background separation or padding
- **Hero Image**:
  - Full-width or near full-width (with container padding)
  - Aspect ratio approximately 16:9 or 2:1
  - Positioned below header with 40-60px gap
  - Image shows warm-lit, futuristic interior with geometric patterns
- **Article Content**:
  - Same max-width container as homepage (600-700px)
  - Title positioned 40-60px below hero image
  - Body text starts 30-40px below title
  - Bullet points indented 20-30px with custom bullet styling
  - Subsection headings have 40-50px top margin, 20-30px bottom margin

### Interactive Elements & Usability

- **Hover States**:
  - Links: Subtle opacity change (0.8-0.9) or slight text decoration
  - Social media icons: Gentle fade transition (200-300ms)
  - Email link: Same hover treatment as other links
- **Click Targets**:
  - Minimum 44px height for touch interfaces
  - Social links have adequate padding around icons
- **Focus States**: Subtle outline for keyboard navigation accessibility
- **Loading States**: Fast, minimal animations if any

### Responsive Behavior

- **Mobile (< 768px)**:
  - Horizontal padding reduces to 20-30px
  - Font sizes scale down proportionally (90-95% of desktop)
  - Vertical spacing reduces by 20-30%
  - "Copy URL" button remains in top-right but may be smaller
- **Tablet (768px - 1024px)**:
  - Maintains desktop proportions
  - Slightly reduced horizontal padding (30-40px)
- **Desktop (> 1024px)**:
  - Full specifications as described above
  - Container never exceeds max-width, always centered

### Visual Hierarchy & Content Flow

- **Reading Flow**: Clear top-to-bottom progression
- **Scan-ability**: Easy to identify sections at a glance
- **Content Prioritization**:
  1. Name (highest visual weight)
  2. Section headings (secondary weight)
  3. Blog post titles (tertiary weight)
  4. Body text and subtitles (base weight)
- **White Space Usage**: Generous spacing prevents cognitive overload
- **Text Density**: Low density, high readability priority

### Blog Post Page Content Structure

- **Header**: Name, title, "Copy URL" button (top-right)
- **Hero Image**: Any image that is relevant to the blog post
- **Article Content**:
  - Title: "Exploring the Intersection of Design, AI, and Design Engineering"
  - Introduction paragraph about AI and design intersection
  - Section: "The Evolving Role of AI in Design"
  - Bullet points covering:
    - Generative Design (AI algorithms generating design variations)
    - etc
  - Section: "Challenges and Opportunities"
  - **Challenges** subsection with bullet points:
    - etc
  - **Opportunities** subsection with bullet points:
    - etc

### Micro-Interactions & Animation

- **Page Load**: Instant, no loading animations
- **Transitions**: Subtle, fast (200-300ms) for hover states only
- **Scroll Behavior**: Smooth native scrolling, no custom scroll effects
- **Link Interactions**:
  - External links show arrow indicator (→)
  - Email links maintain same styling as other links
  - No underlines on hover, just opacity change

## Technical Implementation Requirements

- **HTML Structure**: Clean, semantic HTML5 with proper heading hierarchy (h1, h2, h3)
- **CSS Framework**: CSS/Tailwind for styling, or vanilla CSS with modern properties
- **Interactions**:
  - Smooth hover effects on links (opacity: 0.8 transition)
  - External link indicators (→ arrows) positioned after link text
  - Copy URL functionality with clipboard API
- **Responsive Design**:
  - Mobile-first approach
  - Breakpoints at 768px (tablet) and 1024px (desktop)
  - Fluid typography scaling
- **Performance**:
  - Fast loading times (< 2s first contentful paint)
  - Optimized images with proper aspect ratios
  - Minimal JavaScript bundle
- **Routing**: Clean URLs for blog posts (/blog/post-slug format)
- **Code Quality**:
  - Consistent indentation and formatting
  - Meaningful class names
  - Modular CSS structure

## Content Tone

Professional yet approachable, focus on web development, AI, and design engineering topics.

## Key Features to Implement

- Dark theme throughout
- Minimalist navigation
- Blog post system
- Contact section with social links
- Responsive grid layout
- Clean typography hierarchy
