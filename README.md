# nickveles.com

My modern, accessible portfolio website - freelance web developer and machine learning consultant. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional interface with dark/light theme support
- **Accessibility First**: Built with comprehensive accessibility features including:
  - OpenDyslexic font support for dyslexic users
  - Skip navigation links
  - ARIA compliance
  - Keyboard navigation support
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Next.js App Router for optimal performance
- **SEO Optimized**: Comprehensive metadata and Open Graph tags
- **Contact Form**: Integrated contact form with FAQ section
- **Portfolio Showcase**: Projects, skills, certificates, and testimonials

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Custom font stack including OpenDyslexic for accessibility

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   │   ├── auth/.../     # Authentication routes
│   │   ├── contact/      # Contact form API
│   │   └── revalidate/   # Revalidation API
│   ├── contact/          # Contact page
│   ├── portfolio/        # Portfolio page
│   │   └── [slug]/       # Dynamic project pages
│   ├── tos/              # Terms of Service page
│   └── profile/          # Profile page
├── components/           # React components
│   ├── accessibility/    # Accessibility-focused components
│   ├── contact/          # Contact form and FAQ
│   ├── home/             # Homepage sections
│   ├── portfolio/        # Portfolio components
│   ├── profile/          # Profile components
│   ├── tos/              # Terms of Service components
│   ├── ui/               # shadcn/ui components
│   └── utils/            # Utility components
├── constants/            # Application constants
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── assets/               # Static assets (logos, images)
└── public/               # Public static files
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/NickVeles/nickveles
   cd nickveles
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Accessibility Features

This portfolio prioritizes accessibility with:

- **OpenDyslexic Font**: Special font designed for dyslexic users
- **Theme Support**: System-aware dark/light mode
- **Skip Navigation**: Quick navigation for screen readers
- **ARIA Labels**: Comprehensive ARIA implementation
- **Keyboard Navigation**: Full keyboard accessibility
- **Touch-Friendly**: Optimized for touch devices

## Pages

- **Home** (`/`): Personal header, about, testimonials, projects, skills, certificates, and contact CTA
- **Contact** (`/contact`): Contact form and frequently asked questions
- **Portfolio** (`/portfolio`): Detailed project showcase
- **Profile** (`/profile`): Password-protected profile with personal information for friends
- **Terms of Service** (`/tos`): Legal terms and conditions

## Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
```

For other platforms, ensure you have Node.js 18+ and follow the platform-specific deployment guides.

## Environment Variables

```env
# Sanity
SANITY_ID=your-sanity-project-id
SANITY_DS=your-sanity-project-dataset
SANITY_WEBHOOK_SECRET=your-webhook-secret

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-public-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-secret-recaptcha-key

# Resend
RESEND_API_KEY=your-resend-api-key
ZOHO_SENDER_EMAIL=sender-email
ZOHO_RECEIVER_EMAIL=receiver-email

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Upwork (1 for censor or nothing for not censor)
NEXT_PUBLIC_UPWORK_CENSOR=

# Other
PROFILE_PASSWORD=your-password
```

## License

This project is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) with terms specified in the LICENSE file.

## Special Thanks

- [Arnold Francisca](https://unsplash.com/@clark_fransa) for his great [image](https://unsplash.com/photos/turned-on-macbook-pro-wit-programming-codes-display-f77Bh3inUpE) I use as a placeholder and my logo background.

## Contact

For inquiries about this project or freelance opportunities, visit [nickveles.com/contact](https://nickveles.com/contact).
