import 'dotenv/config';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { apis } from "./drizzle/schema";
import type { InsertApi } from "./drizzle/schema";
import { nanoid } from "nanoid";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Please set it in your environment or .env file.");
  process.exit(1);
}
const client = postgres(databaseUrl);
const db = drizzle(client);
const generateId = () => nanoid(16);

const mapStatus = (excelStatus: string): "active" | "deprecated" | "beta" => {
  const status = excelStatus?.toLowerCase() || "";
  if (status.includes("active")) return "active";
  if (status.includes("deactivated") || status.includes("inactive")) return "deprecated";
  if (status.includes("new")) return "beta";
  return "active";
};

const extractMethod = (integrationType: string): "GET" | "POST" | "PUT" | "DELETE" | "PATCH" => {
  const type = integrationType?.toUpperCase() || "";
  if (type.includes("GET")) return "GET";
  if (type.includes("POST")) return "POST";
  if (type.includes("PUT")) return "PUT";
  if (type.includes("DELETE")) return "DELETE";
  if (type.includes("PATCH")) return "PATCH";
  // Default to POST for SOAP services, GET for REST
  return type.includes("REST") ? "GET" : "POST";
};

const excelApis: InsertApi[] = [
  {
    id: generateId(),
    name: "AzureBCXGetAuthToken",
    serviceName: "AzureBCXGetAuthToken",
    description: "A technical service for authenticating to AzureBCX.",
    serviceDescription: "A technical service for authenticating to AzureBCX.",
    categoryId: "cat-esb-services",
    version: "1.0",
    status: mapStatus("Active"),
    endpoint: "/esb/AzureBCXGetAuthToken",
    method: "POST",
    businessUnit: "BCX/IT",
    clientsImpacted: "EI-ESB PublishBillingAccountInformation, EI-ESB GetCustomerAccounts, EI-ESB GetCustomerDedails, EI-ESB GetGeographicSite, EI-ESB GetCRMAddressDetails, EI-ESB GetContacts",
    backends: "Azure API Manager_BCX POST {key}/oauth2/v2.0/token",
    complexity: "Simple",
    serviceType: "Technical",
    integrationType: "SOAP",
    featured: false,
    popularity: 0,
    area:"ESB",
  },
  {
    id: generateId(),
    name: "IPAAdaptation",
    serviceName: "IPAAdaptation",
    description: "This is a generic adaptation service that used to perform vaious protocol translations and message transformation where IPActivator needs to consume EI ESB services and/or APIs",
    serviceDescription: "This is a generic adaptation service that used to perform vaious protocol translations and message transformation where IPActivator needs to consume EI ESB services and/or APIs",
    categoryId: "cat-esb-services",
    version: "1.0",
    status: mapStatus("Active"),
    endpoint: "/esb/IPAAdaptation",
    method: "POST",
    businessUnit: "BCX/IT",
    clientsImpacted: "IPActivator",
    backends: "ServiceActivationAndConfiguration (POST /Service), ExchageRate (GET /latest)",
    complexity: "Simple",
    serviceType: "Adaptation",
    integrationType: "JMS",
    featured: false,
    popularity: 0,
    area:"ESB",
  },

];

const pdfApis: InsertApi[] = [
  {
    id: generateId(),
    name: "Get the list of execution candidates",
    serviceName: "Get Candidates List",
    description: "Returns the list of candidates (commands/scripts) that have been configured for execution by the XLayer Secure Remote Execution.",
    categoryId: "cat-secure-remote-exec",
    version: "5.4.1",
    status: "active" as const,
    endpoint: "/xlayer/sre/getCandidates",
    method: "GET" as const,
    responseFormat: "application/json",
    authRequired: true,
    swaggerUrl: "https://smtapi.ourservicedesk.com/swagger-ui/index.html",
    apiVersion: "5.4.1",
    featured: false,
    popularity: 0,
  area:"X-layer"
  },
  
  
  {
    id: generateId(),
    name: "Upload file to XLayer",
    serviceName: "Upload File",
    description: "Methods to Upload Attachments",
    categoryId: "cat-upload-files",
    version: "5.4.1",
    status: "active" as const,
    endpoint: "/xlayer/file/upload",
    method: "POST" as const,
    responseFormat: "multipart/form-data",
    authRequired: true,
    swaggerUrl: "https://smtapi.ourservicedesk.com/swagger-ui/index.html",
    apiVersion: "5.4.1",
    featured: false,
    popularity: 0,
    area:"X-layer"
  },
];

export async function seedApis() {
  try {
    console.log('🌱 Starting API seeding...\n');
    
    console.log('📊 Seeding Excel APIs (ESB Services)...');
    for (const api of excelApis) {
      await db.insert(apis).values(api);
      console.log(`  ✓ Created API: ${api.name}`);
    }
    console.log(`✅ Seeded ${excelApis.length} Excel APIs\n`);
    
    console.log('📄 Seeding PDF APIs (XLayer REST APIs)...');
    for (const api of pdfApis) {
      await db.insert(apis).values(api);
      console.log(`  ✓ Created API: ${api.name}`);
    }
    console.log(`✅ Seeded ${pdfApis.length} PDF APIs\n`);
    
    console.log('🎉 Seeding completed successfully!');
    console.log(`\n📈 Summary:`);
    console.log(`  • Excel APIs: ${excelApis.length}`);
    console.log(`  • PDF APIs: ${pdfApis.length}`);
    console.log(`  • Total APIs: ${excelApis.length + pdfApis.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding APIs:', error);
    throw error;
  }
}
seedApis()
  .then(() => {
    console.log('Seed script finished successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });