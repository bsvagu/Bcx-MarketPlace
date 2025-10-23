import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { apis, apiCategories, apiSubscriptions } from "./drizzle/schema";
import { nanoid } from "nanoid";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function seed() {
  console.log("Clearing existing data...");
  await db.delete(apiSubscriptions);
  await db.delete(apis);
  await db.delete(apiCategories);

  console.log("Creating categories...");
  const categoryData = [
    {
      id: nanoid(),
      name: "Account & Billing",
      description: "APIs for account management, billing, and financial operations",
      icon: "credit-card",
    },
    {
      id: nanoid(),
      name: "Customer Management",
      description: "APIs for customer data, profiles, and relationship management",
      icon: "users",
    },
    {
      id: nanoid(),
      name: "Messaging & Communication",
      description: "APIs for messaging, notifications, and real-time communication",
      icon: "message",
    },
    {
      id: nanoid(),
      name: "Order & Product Management",
      description: "APIs for product ordering, catalog, and order lifecycle",
      icon: "shopping-cart",
    },
    {
      id: nanoid(),
      name: "Support & Ticketing",
      description: "APIs for trouble tickets, support, and issue management",
      icon: "headphones",
    },
    {
      id: nanoid(),
      name: "Data & Usage",
      description: "APIs for usage tracking, analytics, and data management",
      icon: "chart",
    },
  ];

  await db.insert(apiCategories).values(categoryData);
  console.log(`Created ${categoryData.length} categories`);

  const [accountCat, customerCat, messagingCat, orderCat, supportCat, dataCat] = categoryData;

  console.log("Creating APIs...");
  const apiData = [
    {
      id: nanoid(),
      name: "Account Management",
      description: "Standardized mechanism for managing billing, settlement, and financial accounts in B2B and B2B2C scenarios. Supports creation, update, retrieval, and deletion of accounts, billing cycles, and related bill formats.",
      categoryId: accountCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "POST" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/accountManagement/v4/billingAccount",
      rateLimit: "10,000 requests/hour",
      featured: true,
      documentation: `## Account Management API

### Overview
The Account Management API provides a standardized mechanism for managing billing, settlement, and financial accounts in B2B and B2B2C scenarios.

### Operations
1. **CreateBillingAccount** - Create new billing accounts
2. **PatchBillingAccount** - Update existing billing accounts
3. **PublishBillingAccount** - Publish billing account changes
4. **RetrieveBillingAccount** - Retrieve billing account details

### Integration Flow
Salesforce >> Azure >> Mashery(BCX/Billing/BANCreate) >> EI/ESB >> FlexiBill

### Authentication
OAuth 2.0 with subscription key required`,
    },
    {
      id: nanoid(),
      name: "Address Management",
      description: "Standardized mechanism for geographic address handling, including searching, validating, and retrieving address details globally. Supports detailed location attributes for accurate address verification.",
      categoryId: customerCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/address/v4",
      rateLimit: "5,000 requests/hour",
      featured: true,
      documentation: `## Address Management API

### Overview
Provides standardized mechanism for geographic address handling with global support.

### Operations
1. **ListAddress** - Search and list addresses
2. **RetrieveAddress** - Get detailed address information

### Features
- Address validation and verification
- Global address support
- Detailed location attributes
- Address completion suggestions`,
    },
    {
      id: nanoid(),
      name: "Customer Bill Management",
      description: "Operations to find and retrieve customer bills (invoices) produced for customers. Includes detailed billing rates and dispute management capabilities.",
      categoryId: accountCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/customerBillManagement/v4",
      rateLimit: "10,000 requests/hour",
      featured: true,
      documentation: `## Customer Bill Management API

### Overview
Comprehensive API for customer billing and invoice management.

### Operations
1. **CreateCustomerBillDispute** - Create billing disputes
2. **ListCustomerBills** - Retrieve customer invoices
3. **PatchCustomerBillDispute** - Update dispute status

### Use Cases
- Invoice retrieval and viewing
- Billing dispute management
- Applied billing rates details
- Payment history tracking`,
    },
    {
      id: nanoid(),
      name: "Customer Management",
      description: "Standardized mechanism for customer and customer account management, including creation, update, retrieval, deletion and notification of events.",
      categoryId: customerCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/customer/v4",
      rateLimit: "10,000 requests/hour",
      featured: true,
      documentation: `## Customer Management API

### Overview
Complete customer lifecycle management with event notifications.

### Operations
1. **GetCustomerListByQuery** - Search customers by criteria
2. **RetrieveCustomers** - Get customer details

### Features
- Customer profile management
- Account association
- Event notifications
- Query-based search`,
    },
    {
      id: nanoid(),
      name: "Message Bus",
      description: "Azure Service Bus message processing with validation, backend system updates via authenticated PATCH requests, and reliable error management using retries and dead-letter queues.",
      categoryId: messagingCat.id,
      version: "v1.0",
      status: "active" as const,
      method: "POST" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/messagebus/v1",
      rateLimit: "Unlimited",
      featured: false,
      documentation: `## Message Bus API

### Overview
Asynchronous message processing with Azure Service Bus integration.

### Operations
1. **CRConfirmationOut_SF** - Service Bus trigger for confirmations
2. **MessageBus** - General message bus operations

### Features
- Reliable message delivery
- Retry mechanisms
- Dead-letter queue handling
- Authenticated PATCH updates`,
    },
    {
      id: nanoid(),
      name: "oms Web Socket",
      description: "Azure Web PubSub-based WebSocket functions for real-time messaging, managing user connections, message forwarding, and token generation for live chat and communication.",
      categoryId: messagingCat.id,
      version: "v1.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/websocket/v1",
      rateLimit: "1,000 concurrent connections",
      featured: true,
      documentation: `## OMS Web Socket API

### Overview
Real-time communication using Azure Web PubSub.

### Operations
1. **websocketTokenUrl** - Generate connection tokens

### Integration
Salesforce >> Azure >> OMS

### Features
- Real-time messaging
- User connection management
- Message forwarding
- Live chat capabilities`,
    },
    {
      id: nanoid(),
      name: "Party Management",
      description: "Standardized mechanism for managing parties, including individuals and organizations. Supports creation, update, retrieval, deletion, and event notification with detailed attributes.",
      categoryId: customerCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/party/v4/individual/:id",
      rateLimit: "10,000 requests/hour",
      featured: false,
      documentation: `## Party Management API

### Overview
Comprehensive party (individual and organization) management.

### Operations
1. **RetrieveIndividual** - Get individual party details

### Integration Flow
OMS >> EI/ESB >> Mashery >> Azure >> Salesforce

### Features
- Individual and organization management
- Identity and contact information
- Relationship tracking
- Tax information management`,
    },
    {
      id: nanoid(),
      name: "PartyRole Management",
      description: "Standardized mechanism for general party roles including creation, update, retrieval and notification of events. Manages PartyRole data resources with blocking and unblocking capabilities.",
      categoryId: customerCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "POST" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/partyRole/v4",
      rateLimit: "10,000 requests/hour",
      featured: false,
      documentation: `## PartyRole Management API

### Overview
Manage party roles and permissions within the system.

### Operations
1. **BlockUnblockPartyRole** - Control party role access
2. **CreatePartyRole** - Create new party roles
3. **PatchPartyRole** - Update existing roles

### Features
- Role creation and management
- Access control (block/unblock)
- Event notifications
- Role updates and patches`,
    },
    {
      id: nanoid(),
      name: "Payment Method",
      description: "Standardized mechanism for creation of payments and refunds. Supports tracking of payment statuses, amounts, channels, and related accounts for seamless financial transactions.",
      categoryId: accountCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "POST" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/PaymentMethod/v4/paymentMethod",
      rateLimit: "10,000 requests/hour",
      featured: true,
      documentation: `## Payment Method API

### Overview
Comprehensive payment and refund management system.

### Operations
1. **CreatePaymentMethod** - Add new payment methods

### Integration Flow
Salesforce >> Azure >> Mashery >> EI/ESB >> FlexiBill

### Features
- Payment method creation
- Refund processing
- Payment status tracking
- Multi-channel support`,
    },
    {
      id: nanoid(),
      name: "Product Ordering",
      description: "Standardized mechanism for product order lifecycle management. Supports creation, update, retrieval, cancellation, and event notification of orders between customers, service providers, and partners.",
      categoryId: orderCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/productOrdering/v4",
      rateLimit: "10,000 requests/hour",
      featured: false,
      documentation: `## Product Ordering API

### Overview
Complete product order lifecycle management system.

### Operations
1. **ListProductOrder** - List all product orders
2. **RetrieveProductOrder** - Get order details

### Integration Flow
Salesforce >> Azure >> Mashery >> EI/ESB >> OMS

### Features
- Order creation and management
- Order cancellation
- Event notifications
- Multi-party support`,
    },
    {
      id: nanoid(),
      name: "Trouble Ticket",
      description: "Standardized mechanism for trouble ticket management including creation, update, retrieval, and event notification. Supports incident tracking, problem management, and resolution workflows.",
      categoryId: supportCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "POST" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/troubleTicket/v4",
      rateLimit: "10,000 requests/hour",
      featured: false,
      documentation: `## Trouble Ticket API

### Overview
Comprehensive trouble ticket and incident management system.

### Operations
1. **CreateTroubleTicket** - Create new support tickets
2. **PatchTroubleTicket** - Update ticket status
3. **RetrieveTroubleTicket** - Get ticket details

### Features
- Incident tracking
- Problem management
- Resolution workflows
- Event notifications`,
    },
    {
      id: nanoid(),
      name: "Usage Management",
      description: "Standardized mechanism for usage tracking and management. Supports creation, update, retrieval, and notification of usage events for billing and analytics purposes.",
      categoryId: dataCat.id,
      version: "v4.0",
      status: "active" as const,
      method: "GET" as const,
      endpoint: "https://apim-iit-bcx-l2c-stg.azure-api.net/usageManagement/v4",
      rateLimit: "10,000 requests/hour",
      featured: false,
      documentation: `## Usage Management API

### Overview
Track and manage usage data for billing and analytics.

### Operations
1. **ListUsage** - List usage records
2. **RetrieveUsage** - Get detailed usage information

### Features
- Usage tracking
- Billing integration
- Analytics support
- Event notifications`,
    },
  ];

  await db.insert(apis).values(apiData);
  console.log(`Created ${apiData.length} APIs`);

  console.log("Seed completed successfully!");
  await client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

