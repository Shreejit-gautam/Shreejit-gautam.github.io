import { normalizeHostname } from './siteDomain.js'

const prismExperienceByDomain = {
  'shreejitgautam.com.np': {
    role: 'Fullstack and GenAI Engineer',
    company: 'Prism Lab Pvt. Ltd.',
    technologiesFirst: true,
    dates: 'Dec 2025 – Present',
    displayDate: 'DEC 2025 — PRESENT',
    location: 'Kapan, Budhanilkantha, Nepal',
    summary: 'Building secure AI systems and high-concurrency assessment platforms.',
    highlights: [
      'Built secure, citation-backed document retrieval and Q&A.',
      'Developed an AI support agent with approval workflows.',
      'Engineered assessment, payment, and email systems.',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    projects: [
      {
        title: 'DocuMind — Secure Enterprise Document Retrieval & Q&A API',
        stack: 'Python · FastAPI · PostgreSQL · pgvector · OpenAI API · Sentence Transformers · Redis · Docker · JWT · Pytest',
        points: [
          'Designed and deployed a Retrieval-Augmented Generation (RAG) API supporting semantic search and natural-language question answering across 5,000+ documents using FastAPI, PostgreSQL, pgvector, and LLM integrations.',
          'Engineered hybrid retrieval combining PostgreSQL full-text search, vector similarity, Reciprocal Rank Fusion (RRF), and cross-encoder reranking across approximately 30,000 indexed document chunks.',
          'Implemented JWT authentication, role-based authorization, document-level access controls, and source citations to deliver secure, traceable, and context-grounded responses.',
          'Developed an automated evaluation framework using 200 curated question-answer pairs, tracking Recall@5, P95 response latency, and LLM inference cost.',
          'Improved Recall@5 from 71% to 83% (+12 percentage points) while achieving 3.2-second P95 end-to-end latency and approximately $0.003 average cost per query.',
        ],
      },
      {
        title: 'AI Support Operations Agent',
        stack: 'Python · LangGraph · FastAPI · PostgreSQL · Redis · Celery · REST APIs · LangSmith · Docker',
        points: [
          'Developed a stateful AI support agent using LangGraph and FastAPI to automate ticket classification, customer inquiries, and multi-step issue resolution.',
          'Integrated Zendesk and Shopify REST APIs for ticket management, order retrieval, and automated support actions through LLM-based tool calling.',
          'Implemented durable execution using PostgreSQL-backed checkpointing, persistent workflow state, and retry mechanisms for reliable failure recovery.',
          'Built human-in-the-loop approval workflows with LangGraph interrupts and Slack notifications for sensitive operations, including refunds and escalations.',
          'Integrated Celery, Redis, and LangSmith for asynchronous processing, execution tracing, error monitoring, and workflow observability.',
        ],
      },
      {
        title: 'Taayari — High-Concurrency Online Assessment Backend',
        stack: 'Python 3.12 · FastAPI · PostgreSQL · SQLModel · SQLAlchemy · AWS SES · Docker · Traefik',
        contentUrl: 'https://www.instagram.com/p/DdBH_9rior_/',
        points: [
          'Designed and implemented a high-performance assessment engine handling timed test submissions, real-time grading, negative marking calculations, and leaderboard rank aggregation.',
          'Engineered financial transaction workflows and digital wallet integration with eSewa and manual QR payment uploads, using database pessimistic locking to maintain transactional consistency and prevent race conditions during credit purchases.',
          'Implemented background workers for batch LLM question generation using the OpenAI Batch API, enforcing token budget thresholds and structured schema validation.',
          'Built a resilient transactional and marketing email pipeline using AWS SES, incorporating concurrent worker claiming, lease timeouts, and throttling handlers for reliable delivery processing.',
          'Established production deployment infrastructure using Docker multi-stage builds, Alembic database migrations, and Traefik reverse proxy with automated Let’s Encrypt TLS certificates.',
        ],
      },
    ],
  },
  'shreejit.me': {
    role: 'Fullstack',
    company: 'Prism Lab Pvt. Ltd.',
    technologiesFirst: true,
    dates: 'Dec 2025 – Present',
    displayDate: 'DEC 2025 — PRESENT',
    location: 'Kapan, Budhanilkantha, Nepal',
    summary: 'Building a multi-tenant LMS and school ERP platform.',
    highlights: [
      'Built white-labeled portals with role-based access.',
      'Designed tenant-isolated data and secure video delivery.',
      'Integrated payments, assessments, and notifications.',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS S3'],
    projects: [
      {
        title: 'Multi-Tenant LMS & School ERP Platform',
        stack: 'Next.js · Node.js · PostgreSQL · AWS S3 · Cloudflare Stream',
        points: [
          'Engineered an integrated cloud-based Learning Management System and enterprise ERP platform, empowering academic institutions to deploy white-labeled portals featuring customized subdomains and granular role-based authorization.',
          'Architected a multi-tenant PostgreSQL database architecture to maintain strict data isolation for student enrollment records, attendance tracking, and financial ledgers across diverse organizational entities.',
          'Constructed interactive course authoring tools, an automated assessment engine, virtual classroom integrations via video conferencing APIs, and dynamic PDF credential generation pipelines.',
          'Designed a secure HLS video delivery system with signed access tokens to restrict unauthorized media distribution and minimize bandwidth consumption overhead.',
          'Integrated regional payment gateways, including eSewa and Khalti, alongside automated notification webhooks for frictionless course enrollment, fee invoicing, and instant parent alerts.',
        ],
      },
    ],
  },
}

export function getPrismExperienceForDomain(hostname) {
  const domain = normalizeHostname(hostname)
  return Object.hasOwn(prismExperienceByDomain, domain) ? prismExperienceByDomain[domain] : null
}
