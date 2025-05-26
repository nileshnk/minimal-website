# Minimal Portfolio Website

A clean, minimalist portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a blog system powered by markdown files.

## Features

- 🎨 Minimalist dark theme design
- 📝 Markdown-based blog system
- 🚀 Built with Next.js 14 App Router
- 💅 Styled with Tailwind CSS
- 📱 Fully responsive
- ⚡ Fast and optimized

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd minimal-website
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Blog Posts

Blog posts are stored as markdown files in the `content/blog` directory. To add a new blog post:

1. Create a new `.md` file in `content/blog/`:

```bash
touch content/blog/my-new-post.md
```

2. Add frontmatter and content to your markdown file:

```markdown
---
title: "Your Blog Post Title"
description: "A brief description of your post"
date: "2024-03-15"
imageUrl: "/blog-images/optional-image.jpg" # Optional
imageCaption: "Image source" # Optional
readTime: "5 min read" # Optional
---

Your blog post content goes here...

## Markdown Features

You can use all standard markdown features:

- **Bold text**
- _Italic text_
- [Links](https://example.com)
- Lists
- Code blocks
- Blockquotes
- And more!
```

3. The blog post will automatically appear on your homepage and be accessible at `/blog/your-file-name`.

### Blog Post Guidelines

- **File naming**: Use kebab-case for file names (e.g., `my-awesome-post.md`)
- **Date format**: Use `YYYY-MM-DD` format in the frontmatter
- **Images**: Store blog images in `public/blog-images/`
- **URL**: The blog post URL will match the filename (without `.md`)

## Customization

### Update Personal Information

1. Edit `src/app/page.tsx` to update:
   - Your name
   - Your title/role
   - Your description
   - Email address
   - Social media links

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Typography styles are defined in the Tailwind config

### Adding New Sections

To add new sections to the homepage, edit `src/app/page.tsx` and follow the existing pattern.

## Project Structure

```
minimal-website/
├── content/
│   └── blog/              # Blog posts (markdown files)
├── public/
│   └── blog-images/       # Blog post images
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   └── [slug]/    # Dynamic blog post pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   └── lib/
│       └── blog.ts        # Blog utilities
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment

This site is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Markdown frontmatter
- [Remark](https://remark.js.org/) - Markdown processing
- [Lucide React](https://lucide.dev/) - Icons

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you have any questions or run into issues, please open an issue on GitHub.
