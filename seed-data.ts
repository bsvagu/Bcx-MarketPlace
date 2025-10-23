import { drizzle } from "drizzle-orm/mysql2";
import { apis, apiCategories } from "./drizzle/schema";
import { nanoid } from "nanoid";

const db = drizzle(process.env.DATABASE_URL!);

const categories = [
  {
    id: nanoid(),
    name: "AI & Machine Learning",
    description: "APIs for artificial intelligence, machine learning models, and natural language processing",
    icon: "brain",
  },
  {
    id: nanoid(),
    name: "Data & Analytics",
    description: "APIs for data processing, analytics, and business intelligence",
    icon: "chart",
  },
  {
    id: nanoid(),
    name: "Communication",
    description: "APIs for messaging, email, SMS, and communication services",
    icon: "message",
  },
  {
    id: nanoid(),
    name: "Payment & Finance",
    description: "APIs for payment processing, financial data, and banking services",
    icon: "credit-card",
  },
  {
    id: nanoid(),
    name: "Security & Identity",
    description: "APIs for authentication, authorization, and security services",
    icon: "shield",
  },
  {
    id: nanoid(),
    name: "Cloud & Infrastructure",
    description: "APIs for cloud services, infrastructure management, and DevOps",
    icon: "cloud",
  },
];

async function seed() {
  console.log("Seeding categories...");
  await db.insert(apiCategories).values(categories);

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.name] = cat.id;
    return acc;
  }, {} as Record<string, string>);

  console.log("Seeding APIs...");
  const apiData = [
    // AI & Machine Learning
    {
      id: nanoid(),
      name: "GPT-4 Text Generation",
      description: "Advanced language model for natural language understanding and generation. Supports multiple languages and complex reasoning tasks.",
      categoryId: categoryMap["AI & Machine Learning"],
      version: "v4.0",
      status: "active" as const,
      endpoint: "/api/ai/gpt4/generate",
      method: "POST" as const,
      pricing: "From $0.03 per 1K tokens",
      rateLimit: "10,000 requests/hour",
      documentation: "Complete API documentation with examples for text generation, chat completions, and fine-tuning.",
      featured: true,
      popularity: 9500,
    },
    {
      id: nanoid(),
      name: "Image Recognition API",
      description: "State-of-the-art computer vision API for object detection, image classification, and facial recognition.",
      categoryId: categoryMap["AI & Machine Learning"],
      version: "v2.1",
      status: "active" as const,
      endpoint: "/api/ai/vision/recognize",
      method: "POST" as const,
      pricing: "From $0.002 per image",
      rateLimit: "5,000 requests/hour",
      documentation: "Comprehensive guide for image analysis, object detection, and custom model training.",
      featured: true,
      popularity: 8200,
    },
    {
      id: nanoid(),
      name: "Speech-to-Text API",
      description: "Convert audio to text with high accuracy. Supports 50+ languages and real-time transcription.",
      categoryId: categoryMap["AI & Machine Learning"],
      version: "v3.0",
      status: "active" as const,
      endpoint: "/api/ai/speech/transcribe",
      method: "POST" as const,
      pricing: "From $0.006 per minute",
      rateLimit: "1,000 requests/hour",
      documentation: "Documentation for audio transcription, language detection, and speaker identification.",
      featured: false,
      popularity: 7100,
    },
    // Data & Analytics
    {
      id: nanoid(),
      name: "Real-time Analytics Engine",
      description: "Process and analyze large datasets in real-time. Built for high-throughput data streaming and complex queries.",
      categoryId: categoryMap["Data & Analytics"],
      version: "v1.5",
      status: "active" as const,
      endpoint: "/api/analytics/stream",
      method: "POST" as const,
      pricing: "From $0.10 per GB processed",
      rateLimit: "Unlimited with tier",
      documentation: "Guide for streaming data ingestion, real-time queries, and dashboard integration.",
      featured: true,
      popularity: 6800,
    },
    {
      id: nanoid(),
      name: "Business Intelligence API",
      description: "Generate insights and reports from your business data. Includes predictive analytics and trend analysis.",
      categoryId: categoryMap["Data & Analytics"],
      version: "v2.0",
      status: "active" as const,
      endpoint: "/api/analytics/insights",
      method: "GET" as const,
      pricing: "From $99/month",
      rateLimit: "10,000 requests/day",
      documentation: "Documentation for data visualization, report generation, and predictive modeling.",
      featured: false,
      popularity: 5400,
    },
    // Communication
    {
      id: nanoid(),
      name: "SMS Gateway API",
      description: "Send and receive SMS messages globally. Supports bulk messaging, two-way communication, and delivery tracking.",
      categoryId: categoryMap["Communication"],
      version: "v3.2",
      status: "active" as const,
      endpoint: "/api/sms/send",
      method: "POST" as const,
      pricing: "From $0.05 per SMS",
      rateLimit: "1,000 requests/minute",
      documentation: "Complete guide for SMS delivery, webhooks, and message templates.",
      featured: true,
      popularity: 9100,
    },
    {
      id: nanoid(),
      name: "Email Delivery Service",
      description: "Reliable email delivery with high deliverability rates. Includes templates, tracking, and analytics.",
      categoryId: categoryMap["Communication"],
      version: "v4.1",
      status: "active" as const,
      endpoint: "/api/email/send",
      method: "POST" as const,
      pricing: "From $0.001 per email",
      rateLimit: "50,000 emails/day",
      documentation: "Documentation for transactional emails, bulk sending, and email validation.",
      featured: true,
      popularity: 8700,
    },
    {
      id: nanoid(),
      name: "Video Conferencing API",
      description: "Embed video calls into your application. Supports screen sharing, recording, and up to 100 participants.",
      categoryId: categoryMap["Communication"],
      version: "v1.8",
      status: "beta" as const,
      endpoint: "/api/video/conference",
      method: "POST" as const,
      pricing: "From $0.004 per minute/participant",
      rateLimit: "500 concurrent sessions",
      documentation: "Guide for video integration, room management, and recording features.",
      featured: false,
      popularity: 4200,
    },
    // Payment & Finance
    {
      id: nanoid(),
      name: "Payment Processing API",
      description: "Accept payments from credit cards, digital wallets, and bank transfers. PCI-DSS compliant with fraud detection.",
      categoryId: categoryMap["Payment & Finance"],
      version: "v5.0",
      status: "active" as const,
      endpoint: "/api/payments/process",
      method: "POST" as const,
      pricing: "2.9% + $0.30 per transaction",
      rateLimit: "10,000 requests/hour",
      documentation: "Complete payment integration guide with security best practices.",
      featured: true,
      popularity: 9800,
    },
    {
      id: nanoid(),
      name: "Currency Exchange API",
      description: "Real-time and historical exchange rates for 170+ currencies. Updated every minute.",
      categoryId: categoryMap["Payment & Finance"],
      version: "v2.3",
      status: "active" as const,
      endpoint: "/api/finance/exchange",
      method: "GET" as const,
      pricing: "From $29/month",
      rateLimit: "1,000 requests/day",
      documentation: "Documentation for currency conversion, historical data, and rate alerts.",
      featured: false,
      popularity: 6300,
    },
    // Security & Identity
    {
      id: nanoid(),
      name: "OAuth 2.0 Authentication",
      description: "Secure authentication and authorization service. Supports SSO, MFA, and social login providers.",
      categoryId: categoryMap["Security & Identity"],
      version: "v3.0",
      status: "active" as const,
      endpoint: "/api/auth/oauth",
      method: "POST" as const,
      pricing: "From $0.05 per MAU",
      rateLimit: "Unlimited",
      documentation: "Complete OAuth 2.0 implementation guide with security recommendations.",
      featured: true,
      popularity: 8900,
    },
    {
      id: nanoid(),
      name: "Identity Verification API",
      description: "Verify user identities with document scanning, facial recognition, and liveness detection.",
      categoryId: categoryMap["Security & Identity"],
      version: "v1.9",
      status: "active" as const,
      endpoint: "/api/identity/verify",
      method: "POST" as const,
      pricing: "From $1.50 per verification",
      rateLimit: "500 requests/hour",
      documentation: "Guide for KYC compliance, document verification, and fraud prevention.",
      featured: false,
      popularity: 5800,
    },
    // Cloud & Infrastructure
    {
      id: nanoid(),
      name: "Container Orchestration API",
      description: "Deploy and manage containerized applications at scale. Kubernetes-compatible with auto-scaling.",
      categoryId: categoryMap["Cloud & Infrastructure"],
      version: "v2.5",
      status: "active" as const,
      endpoint: "/api/cloud/containers",
      method: "POST" as const,
      pricing: "From $0.10 per container-hour",
      rateLimit: "Unlimited",
      documentation: "Documentation for container deployment, scaling, and monitoring.",
      featured: true,
      popularity: 7600,
    },
    {
      id: nanoid(),
      name: "CDN & Edge Computing",
      description: "Global content delivery network with edge computing capabilities. Reduce latency and improve performance.",
      categoryId: categoryMap["Cloud & Infrastructure"],
      version: "v4.2",
      status: "active" as const,
      endpoint: "/api/cdn/deploy",
      method: "POST" as const,
      pricing: "From $0.08 per GB",
      rateLimit: "Unlimited bandwidth",
      documentation: "Guide for CDN configuration, edge functions, and cache management.",
      featured: false,
      popularity: 6900,
    },
  ];

  await db.insert(apis).values(apiData);

  console.log("Seeding completed successfully!");
  console.log(`Created ${categories.length} categories and ${apiData.length} APIs`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});

