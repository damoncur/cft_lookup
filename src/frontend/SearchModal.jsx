import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
  ButtonGroup,
  Label,
  SectionMessage,
  Select,
  Stack,
  Textfield,
  Button,
  Text,
  Inline,
} from "@forge/react";

// Popular tech giant company names (top 10)
const TECH_COMPANIES = [
  "Microsoft",
  "Apple",
  "Google",
  "Amazon",
  "Meta",
  "Netflix",
  "Salesforce",
  "Oracle",
  "Adobe",
  "NVIDIA",
];

// Products map for each tech company
const COMPANY_PRODUCTS = {
  Microsoft: [
    "Windows",
    "Office 365",
    "Azure",
    "Teams",
    "Visual Studio",
    "Xbox",
    "Surface",
    "SQL Server",
    "Power BI",
    "SharePoint",
  ],
  Apple: [
    "iPhone",
    "iPad",
    "Mac",
    "Apple Watch",
    "AirPods",
    "macOS",
    "iOS",
    "Apple TV",
    "Safari",
    "iCloud",
  ],
  Google: [
    "Search",
    "Gmail",
    "Android",
    "Chrome",
    "YouTube",
    "Google Cloud",
    "Drive",
    "Maps",
    "Ads",
    "Workspace",
  ],
  Amazon: [
    "AWS",
    "Prime Video",
    "Alexa",
    "Kindle",
    "Fire TV",
    "Prime",
    "Echo",
    "Ring",
    "Twitch",
    "Audible",
  ],
  Meta: [
    "Facebook",
    "Instagram",
    "WhatsApp",
    "Messenger",
    "Meta Quest",
    "Threads",
    "Workplace",
    "Portal",
    "Horizon",
    "Reality Labs",
  ],
  Netflix: [
    "Streaming Service",
    "Netflix Games",
    "Netflix Studios",
    "Original Content",
    "Mobile App",
    "Smart TV App",
    "Downloads",
    "Profiles",
    "Kids Profiles",
    "Netflix API",
  ],
  Salesforce: [
    "Sales Cloud",
    "Service Cloud",
    "Marketing Cloud",
    "Commerce Cloud",
    "Platform",
    "Analytics",
    "Integration",
    "Community Cloud",
    "Financial Services",
    "Health Cloud",
  ],
  Oracle: [
    "Database",
    "Cloud Infrastructure",
    "Java",
    "MySQL",
    "Enterprise Applications",
    "Fusion Middleware",
    "Exadata",
    "Autonomous Database",
    "Analytics Cloud",
    "HCM Cloud",
  ],
  Adobe: [
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Premiere Pro",
    "After Effects",
    "Creative Cloud",
    "Acrobat",
    "Experience Cloud",
    "Analytics",
    "Campaign",
  ],
  NVIDIA: [
    "GeForce",
    "RTX",
    "CUDA",
    "Omniverse",
    "Drive",
    "Jetson",
    "DGX",
    "Quadro",
    "Tesla",
    "Shield",
  ],
};

// Product releases map
const PRODUCT_RELEASES = {
  Microsoft_Windows: [
    "Windows 11",
    "Windows 10",
    "Windows Server 2022",
    "Windows Server 2019",
  ],
  "Microsoft_Office 365": [
    "Office 2021",
    "Office 2019",
    "Office Online",
    "Office Mobile",
  ],
  Microsoft_Azure: [
    "Azure Stack",
    "Azure Arc",
    "Azure DevOps",
    "Azure Functions",
  ],
  Microsoft_Teams: [
    "Teams Premium",
    "Teams Phone",
    "Teams Rooms",
    "Teams Live Events",
  ],
  "Microsoft_Visual Studio": [
    "VS 2022",
    "VS Code",
    "VS Community",
    "VS Enterprise",
  ],
  Microsoft_Xbox: [
    "Xbox Series X",
    "Xbox Series S",
    "Xbox Game Pass",
    "Xbox Cloud Gaming",
  ],
  Microsoft_Surface: [
    "Surface Pro 9",
    "Surface Laptop 5",
    "Surface Studio 2",
    "Surface Go 3",
  ],
  "Microsoft_SQL Server": [
    "SQL Server 2022",
    "SQL Server 2019",
    "Azure SQL",
    "SQL Express",
  ],
  "Microsoft_Power BI": [
    "Power BI Pro",
    "Power BI Premium",
    "Power BI Desktop",
    "Power BI Mobile",
  ],
  Microsoft_SharePoint: [
    "SharePoint Online",
    "SharePoint Server",
    "SharePoint Designer",
    "OneDrive",
  ],

  Apple_iPhone: ["iPhone 15", "iPhone 14", "iPhone SE", "iPhone 13"],
  Apple_iPad: ["iPad Pro", "iPad Air", "iPad mini", "iPad 10th gen"],
  Apple_Mac: ["MacBook Pro M3", "MacBook Air M2", "iMac M3", "Mac Studio"],
  "Apple_Apple Watch": ["Series 9", "Ultra 2", "SE 2nd gen", "Nike Edition"],
  Apple_AirPods: [
    "AirPods Pro 2",
    "AirPods 3rd gen",
    "AirPods Max",
    "AirPods 2nd gen",
  ],
  Apple_macOS: ["Sonoma", "Ventura", "Monterey", "Big Sur"],
  Apple_iOS: ["iOS 17", "iOS 16", "iOS 15", "iPadOS 17"],
  "Apple_Apple TV": ["Apple TV 4K", "Apple TV HD", "tvOS 17", "Apple TV+"],
  Apple_Safari: [
    "Safari 17",
    "Safari 16",
    "Safari Technology Preview",
    "WebKit",
  ],
  Apple_iCloud: ["iCloud+", "iCloud Drive", "iCloud Photos", "iCloud Backup"],

  Google_Search: ["Search Console", "Discover", "Lens", "Assistant"],
  Google_Gmail: [
    "Gmail for Business",
    "Gmail Mobile",
    "Gmail Offline",
    "Gmail API",
  ],
  Google_Android: ["Android 14", "Android 13", "Android Go", "Android Auto"],
  Google_Chrome: ["Chrome 119", "Chrome OS", "Chrome Enterprise", "Chrome Dev"],
  Google_YouTube: [
    "YouTube Premium",
    "YouTube Music",
    "YouTube TV",
    "YouTube Shorts",
  ],
  "Google_Google Cloud": ["GCP", "Firebase", "BigQuery", "Kubernetes Engine"],
  Google_Drive: [
    "Google One",
    "Drive for Desktop",
    "Drive File Stream",
    "Backup and Sync",
  ],
  Google_Maps: ["Maps Platform", "Street View", "Earth", "My Maps"],
  Google_Ads: ["Google Ads", "AdSense", "Ad Manager", "Shopping Ads"],
  Google_Workspace: ["Gmail", "Docs", "Sheets", "Slides"],

  Amazon_AWS: ["EC2", "S3", "Lambda", "RDS"],
  "Amazon_Prime Video": ["Prime Video", "Freevee", "Prime Gaming", "MGM+"],
  Amazon_Alexa: ["Echo Dot", "Echo Show", "Echo Studio", "Alexa Skills"],
  Amazon_Kindle: [
    "Kindle Oasis",
    "Kindle Paperwhite",
    "Kindle Scribe",
    "Kindle Unlimited",
  ],
  "Amazon_Fire TV": [
    "Fire TV Stick",
    "Fire TV Cube",
    "Fire TV Omni",
    "Fire TV Studio",
  ],
  Amazon_Prime: [
    "Prime Membership",
    "Prime Delivery",
    "Prime Reading",
    "Prime Photos",
  ],
  Amazon_Echo: ["Echo 4th gen", "Echo Show 15", "Echo Buds", "Echo Auto"],
  Amazon_Ring: ["Ring Doorbell", "Ring Security", "Ring Alarm", "Ring Protect"],
  Amazon_Twitch: [
    "Twitch Prime",
    "Twitch Studio",
    "Twitch Mobile",
    "Twitch Affiliate",
  ],
  Amazon_Audible: [
    "Audible Plus",
    "Audible Premium",
    "Audible Originals",
    "Audible Mobile",
  ],

  Meta_Facebook: [
    "Facebook App",
    "Facebook Lite",
    "Facebook Gaming",
    "Facebook Dating",
  ],
  Meta_Instagram: [
    "Instagram Stories",
    "Instagram Reels",
    "Instagram Shopping",
    "Instagram Live",
  ],
  Meta_WhatsApp: [
    "WhatsApp Business",
    "WhatsApp Web",
    "WhatsApp Desktop",
    "WhatsApp Pay",
  ],
  Meta_Messenger: [
    "Messenger Kids",
    "Messenger Rooms",
    "Messenger Desktop",
    "Messenger API",
  ],
  "Meta_Meta Quest": ["Quest 3", "Quest 2", "Quest Pro", "Quest Link"],
  Meta_Threads: [
    "Threads Mobile",
    "Threads Web",
    "Threads API",
    "Threads Desktop",
  ],
  Meta_Workplace: [
    "Workplace Standard",
    "Workplace Advanced",
    "Workplace Essential",
    "Workplace API",
  ],
  Meta_Portal: ["Portal TV", "Portal Go", "Portal Mini", "Portal+"],
  Meta_Horizon: [
    "Horizon Worlds",
    "Horizon Workrooms",
    "Horizon Home",
    "Horizon OS",
  ],
  "Meta_Reality Labs": [
    "AR Glasses",
    "VR Headsets",
    "Haptic Gloves",
    "Neural Interfaces",
  ],

  "Netflix_Streaming Service": [
    "Netflix Standard",
    "Netflix Premium",
    "Netflix Basic",
    "Netflix Mobile",
  ],
  "Netflix_Netflix Games": [
    "Mobile Games",
    "Cloud Gaming",
    "Indie Games",
    "AAA Games",
  ],
  "Netflix_Netflix Studios": [
    "Original Series",
    "Original Movies",
    "Documentaries",
    "Animation",
  ],
  "Netflix_Original Content": [
    "Netflix Originals",
    "Netflix Films",
    "Netflix Documentaries",
    "Netflix Kids",
  ],
  "Netflix_Mobile App": [
    "iOS App",
    "Android App",
    "Tablet App",
    "Mobile Downloads",
  ],
  "Netflix_Smart TV App": ["Samsung TV", "LG TV", "Roku", "Apple TV"],
  Netflix_Downloads: [
    "Offline Viewing",
    "Download Manager",
    "Smart Downloads",
    "Mobile Downloads",
  ],
  Netflix_Profiles: [
    "User Profiles",
    "Kids Profiles",
    "Profile Management",
    "Viewing History",
  ],
  "Netflix_Kids Profiles": [
    "Kids Mode",
    "Parental Controls",
    "Age-Appropriate Content",
    "Kids Interface",
  ],
  "Netflix_Netflix API": [
    "Partner API",
    "Developer API",
    "Content API",
    "Recommendation API",
  ],

  "Salesforce_Sales Cloud": [
    "Sales Cloud Einstein",
    "Lead Management",
    "Opportunity Management",
    "Forecasting",
  ],
  "Salesforce_Service Cloud": [
    "Case Management",
    "Knowledge Base",
    "Live Agent",
    "Field Service",
  ],
  "Salesforce_Marketing Cloud": [
    "Email Studio",
    "Journey Builder",
    "Social Studio",
    "Advertising Studio",
  ],
  "Salesforce_Commerce Cloud": [
    "B2C Commerce",
    "B2B Commerce",
    "Order Management",
    "Store Locator",
  ],
  Salesforce_Platform: ["Lightning Platform", "Heroku", "MuleSoft", "Tableau"],
  Salesforce_Analytics: [
    "Tableau Analytics",
    "Einstein Analytics",
    "Reports & Dashboards",
    "Wave",
  ],
  Salesforce_Integration: [
    "MuleSoft Anypoint",
    "Data Integration",
    "API Management",
    "iPaaS",
  ],
  "Salesforce_Community Cloud": [
    "Experience Cloud",
    "Partner Community",
    "Customer Community",
    "Employee Community",
  ],
  "Salesforce_Financial Services": [
    "Financial Services Cloud",
    "Wealth Management",
    "Banking",
    "Insurance",
  ],
  "Salesforce_Health Cloud": [
    "Patient Management",
    "Care Management",
    "Provider Network",
    "Health Records",
  ],

  Oracle_Database: ["Oracle 23c", "Oracle 21c", "Oracle 19c", "Oracle XE"],
  "Oracle_Cloud Infrastructure": [
    "OCI Compute",
    "OCI Storage",
    "OCI Networking",
    "OCI Database",
  ],
  Oracle_Java: ["Java 21", "Java 17", "Java 11", "OpenJDK"],
  Oracle_MySQL: ["MySQL 8.0", "MySQL 5.7", "MySQL Cluster", "MySQL Workbench"],
  "Oracle_Enterprise Applications": [
    "ERP Cloud",
    "HCM Cloud",
    "SCM Cloud",
    "CX Cloud",
  ],
  "Oracle_Fusion Middleware": [
    "WebLogic",
    "SOA Suite",
    "Identity Management",
    "API Management",
  ],
  Oracle_Exadata: [
    "Exadata Cloud",
    "Exadata X9M",
    "Exadata Database Machine",
    "ExaCC",
  ],
  "Oracle_Autonomous Database": [
    "Autonomous Data Warehouse",
    "Autonomous Transaction Processing",
    "Autonomous JSON",
    "Always Free",
  ],
  "Oracle_Analytics Cloud": [
    "Oracle Analytics",
    "Data Visualization",
    "Business Intelligence",
    "Machine Learning",
  ],
  "Oracle_HCM Cloud": [
    "Human Capital Management",
    "Talent Management",
    "Workforce Management",
    "Payroll",
  ],

  Adobe_Photoshop: [
    "Photoshop 2024",
    "Photoshop Elements",
    "Photoshop Express",
    "Photoshop Camera",
  ],
  Adobe_Illustrator: [
    "Illustrator 2024",
    "Illustrator Draw",
    "Illustrator on iPad",
    "Illustrator Web",
  ],
  Adobe_InDesign: [
    "InDesign 2024",
    "InDesign Server",
    "InCopy",
    "InDesign Mobile",
  ],
  "Adobe_Premiere Pro": [
    "Premiere Pro 2024",
    "Premiere Rush",
    "Premiere Elements",
    "Premiere Clip",
  ],
  "Adobe_After Effects": [
    "After Effects 2024",
    "After Effects Mobile",
    "Character Animator",
    "Media Encoder",
  ],
  "Adobe_Creative Cloud": [
    "CC All Apps",
    "CC Photography",
    "CC Single App",
    "CC Student",
  ],
  Adobe_Acrobat: [
    "Acrobat DC",
    "Acrobat Reader",
    "Acrobat Pro",
    "Acrobat Sign",
  ],
  "Adobe_Experience Cloud": ["Analytics", "Target", "Campaign", "Commerce"],
  Adobe_Analytics: [
    "Adobe Analytics",
    "Customer Journey Analytics",
    "Analytics Workspace",
    "Report Builder",
  ],
  Adobe_Campaign: [
    "Campaign Classic",
    "Campaign Standard",
    "Journey Orchestration",
    "Real-time CDP",
  ],

  NVIDIA_GeForce: ["RTX 4090", "RTX 4080", "RTX 4070", "RTX 4060"],
  NVIDIA_RTX: ["RTX 4090 Ti", "RTX 4080 Super", "RTX 4070 Ti", "RTX 4060 Ti"],
  NVIDIA_CUDA: ["CUDA 12.3", "CUDA 11.8", "cuDNN", "TensorRT"],
  NVIDIA_Omniverse: [
    "Omniverse Create",
    "Omniverse View",
    "Omniverse Code",
    "Omniverse Farm",
  ],
  NVIDIA_Drive: ["Drive AGX", "Drive Sim", "Drive Mapping", "Drive Chauffeur"],
  NVIDIA_Jetson: [
    "Jetson AGX Orin",
    "Jetson Orin Nano",
    "Jetson Xavier",
    "JetPack SDK",
  ],
  NVIDIA_DGX: ["DGX H100", "DGX A100", "DGX Station", "DGX SuperPOD"],
  NVIDIA_Quadro: ["Quadro RTX", "Quadro GV100", "Quadro P6000", "Quadro Sync"],
  NVIDIA_Tesla: ["Tesla V100", "Tesla T4", "Tesla A100", "Tesla H100"],
  NVIDIA_Shield: [
    "Shield TV Pro",
    "Shield TV",
    "Shield Tablet",
    "Shield Controller",
  ],
};

// Product UUIDs map
const PRODUCT_UUIDS = {
  Microsoft_Windows: "550e8400-e29b-41d4-a716-446655440001",
  "Microsoft_Office 365": "550e8400-e29b-41d4-a716-446655440002",
  Microsoft_Azure: "550e8400-e29b-41d4-a716-446655440003",
  Microsoft_Teams: "550e8400-e29b-41d4-a716-446655440004",
  "Microsoft_Visual Studio": "550e8400-e29b-41d4-a716-446655440005",
  Microsoft_Xbox: "550e8400-e29b-41d4-a716-446655440006",
  Microsoft_Surface: "550e8400-e29b-41d4-a716-446655440007",
  "Microsoft_SQL Server": "550e8400-e29b-41d4-a716-446655440008",
  "Microsoft_Power BI": "550e8400-e29b-41d4-a716-446655440009",
  Microsoft_SharePoint: "550e8400-e29b-41d4-a716-446655440010",

  Apple_iPhone: "660e8400-e29b-41d4-a716-446655440011",
  Apple_iPad: "660e8400-e29b-41d4-a716-446655440012",
  Apple_Mac: "660e8400-e29b-41d4-a716-446655440013",
  "Apple_Apple Watch": "660e8400-e29b-41d4-a716-446655440014",
  Apple_AirPods: "660e8400-e29b-41d4-a716-446655440015",
  Apple_macOS: "660e8400-e29b-41d4-a716-446655440016",
  Apple_iOS: "660e8400-e29b-41d4-a716-446655440017",
  "Apple_Apple TV": "660e8400-e29b-41d4-a716-446655440018",
  Apple_Safari: "660e8400-e29b-41d4-a716-446655440019",
  Apple_iCloud: "660e8400-e29b-41d4-a716-446655440020",

  Google_Search: "770e8400-e29b-41d4-a716-446655440021",
  Google_Gmail: "770e8400-e29b-41d4-a716-446655440022",
  Google_Android: "770e8400-e29b-41d4-a716-446655440023",
  Google_Chrome: "770e8400-e29b-41d4-a716-446655440024",
  Google_YouTube: "770e8400-e29b-41d4-a716-446655440025",
  "Google_Google Cloud": "770e8400-e29b-41d4-a716-446655440026",
  Google_Drive: "770e8400-e29b-41d4-a716-446655440027",
  Google_Maps: "770e8400-e29b-41d4-a716-446655440028",
  Google_Ads: "770e8400-e29b-41d4-a716-446655440029",
  Google_Workspace: "770e8400-e29b-41d4-a716-446655440030",

  Amazon_AWS: "880e8400-e29b-41d4-a716-446655440031",
  "Amazon_Prime Video": "880e8400-e29b-41d4-a716-446655440032",
  Amazon_Alexa: "880e8400-e29b-41d4-a716-446655440033",
  Amazon_Kindle: "880e8400-e29b-41d4-a716-446655440034",
  "Amazon_Fire TV": "880e8400-e29b-41d4-a716-446655440035",
  Amazon_Prime: "880e8400-e29b-41d4-a716-446655440036",
  Amazon_Echo: "880e8400-e29b-41d4-a716-446655440037",
  Amazon_Ring: "880e8400-e29b-41d4-a716-446655440038",
  Amazon_Twitch: "880e8400-e29b-41d4-a716-446655440039",
  Amazon_Audible: "880e8400-e29b-41d4-a716-446655440040",

  Meta_Facebook: "990e8400-e29b-41d4-a716-446655440041",
  Meta_Instagram: "990e8400-e29b-41d4-a716-446655440042",
  Meta_WhatsApp: "990e8400-e29b-41d4-a716-446655440043",
  Meta_Messenger: "990e8400-e29b-41d4-a716-446655440044",
  "Meta_Meta Quest": "990e8400-e29b-41d4-a716-446655440045",
  Meta_Threads: "990e8400-e29b-41d4-a716-446655440046",
  Meta_Workplace: "990e8400-e29b-41d4-a716-446655440047",
  Meta_Portal: "990e8400-e29b-41d4-a716-446655440048",
  Meta_Horizon: "990e8400-e29b-41d4-a716-446655440049",
  "Meta_Reality Labs": "990e8400-e29b-41d4-a716-446655440050",

  "Netflix_Streaming Service": "aa0e8400-e29b-41d4-a716-446655440051",
  "Netflix_Netflix Games": "aa0e8400-e29b-41d4-a716-446655440052",
  "Netflix_Netflix Studios": "aa0e8400-e29b-41d4-a716-446655440053",
  "Netflix_Original Content": "aa0e8400-e29b-41d4-a716-446655440054",
  "Netflix_Mobile App": "aa0e8400-e29b-41d4-a716-446655440055",
  "Netflix_Smart TV App": "aa0e8400-e29b-41d4-a716-446655440056",
  Netflix_Downloads: "aa0e8400-e29b-41d4-a716-446655440057",
  Netflix_Profiles: "aa0e8400-e29b-41d4-a716-446655440058",
  "Netflix_Kids Profiles": "aa0e8400-e29b-41d4-a716-446655440059",
  "Netflix_Netflix API": "aa0e8400-e29b-41d4-a716-446655440060",

  "Salesforce_Sales Cloud": "bb0e8400-e29b-41d4-a716-446655440061",
  "Salesforce_Service Cloud": "bb0e8400-e29b-41d4-a716-446655440062",
  "Salesforce_Marketing Cloud": "bb0e8400-e29b-41d4-a716-446655440063",
  "Salesforce_Commerce Cloud": "bb0e8400-e29b-41d4-a716-446655440064",
  Salesforce_Platform: "bb0e8400-e29b-41d4-a716-446655440065",
  Salesforce_Analytics: "bb0e8400-e29b-41d4-a716-446655440066",
  Salesforce_Integration: "bb0e8400-e29b-41d4-a716-446655440067",
  "Salesforce_Community Cloud": "bb0e8400-e29b-41d4-a716-446655440068",
  "Salesforce_Financial Services": "bb0e8400-e29b-41d4-a716-446655440069",
  "Salesforce_Health Cloud": "bb0e8400-e29b-41d4-a716-446655440070",

  Oracle_Database: "cc0e8400-e29b-41d4-a716-446655440071",
  "Oracle_Cloud Infrastructure": "cc0e8400-e29b-41d4-a716-446655440072",
  Oracle_Java: "cc0e8400-e29b-41d4-a716-446655440073",
  Oracle_MySQL: "cc0e8400-e29b-41d4-a716-446655440074",
  "Oracle_Enterprise Applications": "cc0e8400-e29b-41d4-a716-446655440075",
  "Oracle_Fusion Middleware": "cc0e8400-e29b-41d4-a716-446655440076",
  Oracle_Exadata: "cc0e8400-e29b-41d4-a716-446655440077",
  "Oracle_Autonomous Database": "cc0e8400-e29b-41d4-a716-446655440078",
  "Oracle_Analytics Cloud": "cc0e8400-e29b-41d4-a716-446655440079",
  "Oracle_HCM Cloud": "cc0e8400-e29b-41d4-a716-446655440080",

  Adobe_Photoshop: "dd0e8400-e29b-41d4-a716-446655440081",
  Adobe_Illustrator: "dd0e8400-e29b-41d4-a716-446655440082",
  Adobe_InDesign: "dd0e8400-e29b-41d4-a716-446655440083",
  "Adobe_Premiere Pro": "dd0e8400-e29b-41d4-a716-446655440084",
  "Adobe_After Effects": "dd0e8400-e29b-41d4-a716-446655440085",
  "Adobe_Creative Cloud": "dd0e8400-e29b-41d4-a716-446655440086",
  Adobe_Acrobat: "dd0e8400-e29b-41d4-a716-446655440087",
  "Adobe_Experience Cloud": "dd0e8400-e29b-41d4-a716-446655440088",
  Adobe_Analytics: "dd0e8400-e29b-41d4-a716-446655440089",
  Adobe_Campaign: "dd0e8400-e29b-41d4-a716-446655440090",

  NVIDIA_GeForce: "ee0e8400-e29b-41d4-a716-446655440091",
  NVIDIA_RTX: "ee0e8400-e29b-41d4-a716-446655440092",
  NVIDIA_CUDA: "ee0e8400-e29b-41d4-a716-446655440093",
  NVIDIA_Omniverse: "ee0e8400-e29b-41d4-a716-446655440094",
  NVIDIA_Drive: "ee0e8400-e29b-41d4-a716-446655440095",
  NVIDIA_Jetson: "ee0e8400-e29b-41d4-a716-446655440096",
  NVIDIA_DGX: "ee0e8400-e29b-41d4-a716-446655440097",
  NVIDIA_Quadro: "ee0e8400-e29b-41d4-a716-446655440098",
  NVIDIA_Tesla: "ee0e8400-e29b-41d4-a716-446655440099",
  NVIDIA_Shield: "ee0e8400-e29b-41d4-a716-446655440100",
};

// Search function that accepts multiple parameters and performs string matching on UUIDs
const searchProducts = (productId, productName, versionId) => {
  const results = [];

  // Normalize search terms
  const searchProductId = productId ? productId.trim().toLowerCase() : "";
  const searchProductName = productName ? productName.trim().toLowerCase() : "";
  const searchVersionId = versionId ? versionId.trim().toLowerCase() : "";

  // If all search terms are empty, return empty results
  if (!searchProductId && !searchProductName && !searchVersionId) {
    return results;
  }

  console.log(
    `Searching with criteria - ProductId: "${searchProductId}", ProductName: "${searchProductName}", VersionId: "${searchVersionId}"`
  );

  // Start with all possible product combinations and filter top-down
  TECH_COMPANIES.forEach((company) => {
    const products = COMPANY_PRODUCTS[company] || [];

    products.forEach((product) => {
      const productKey = `${company}_${product}`;
      const uuid = PRODUCT_UUIDS[productKey];
      const releases = PRODUCT_RELEASES[productKey] || [];
      const companyProduct = `${company} ${product}`;

      // Top-down filtering approach:
      // 1. Filter by UUID first (highest priority)
      if (searchProductId) {
        // If productId is specified, it must match the UUID
        if (!uuid || !uuid.toLowerCase().includes(searchProductId)) {
          return; // Skip this product entirely
        }
      }

      // 2. Filter by company+product name (medium priority)
      if (searchProductName) {
        // If productName is specified, it must match company or product name
        const companyMatch = company.toLowerCase().includes(searchProductName);
        const productMatch = product.toLowerCase().includes(searchProductName);
        const combinedMatch = companyProduct
          .toLowerCase()
          .includes(searchProductName);

        if (!companyMatch && !productMatch && !combinedMatch) {
          return; // Skip this product entirely
        }
      }

      // 3. Filter by version/release (lowest priority)
      let matchingReleases = releases;
      if (searchVersionId) {
        // If versionId is specified, filter to only matching releases
        matchingReleases = releases.filter((release) =>
          release.toLowerCase().includes(searchVersionId)
        );

        // If no releases match the version criteria, skip this product
        if (matchingReleases.length === 0) {
          return;
        }
      }

      // If we get here, this product matches all specified criteria
      // Add results for each matching release (or all releases if no version filter)
      if (matchingReleases.length > 0) {
        // Add each matching release as a separate result
        matchingReleases.forEach((release) => {
          results.push({
            company: company,
            product: product,
            companyProduct: companyProduct,
            releases: [release], // Single release for this result
            uuid: uuid,
            label: `${company} ${product} (${release})`,
            value: `${company}_${product}_${release}`,
            productId: uuid,
            productName: companyProduct,
            versionId: release,
          });
        });
      } else {
        // No specific release filtering, add a result with the first release or default
        const defaultRelease = releases.length > 0 ? releases[0] : "default";
        results.push({
          company: company,
          product: product,
          companyProduct: companyProduct,
          releases: releases,
          uuid: uuid,
          label: `${company} ${product} (${defaultRelease})`,
          value: `${company}_${product}_${defaultRelease}`,
          productId: uuid,
          productName: companyProduct,
          versionId: defaultRelease,
        });
      }
    });
  });

  console.log(`Found ${results.length} matching products:`, results);
  return results;
};

// Search Jira custom fields by name and return the custom field ID
const searchJiraCustomFieldByName = async (fieldName) => {
  try {
    if (!fieldName || !fieldName.trim()) {

      console.log("field is missing and is required");
      return null;
    }
    console.log(`Searching Jira custom fields for name: "${fieldName}"`);
    // Import requestJira from @forge/bridge for API calls
    const { requestJira } = require("@forge/bridge");

    // Call Jira REST API to get all fields (including custom fields)
    const response = await requestJira("/rest/api/3/field", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch Jira fields:",
        response.status,
        response.statusText
      );
      return null;
    }

    const fields = await response.json();
    console.log(`Retrieved ${fields.length} fields from Jira`);
    const searchTerm = fieldName.trim().toLowerCase();

    console.log(
      `Searching for custom field with name containing: "${searchTerm}"`
    );

    // Filter for custom fields that match the search term
    const matchingCustomFields = fields
      .filter(
        (field) =>
          field.id.startsWith("customfield_") &&
          field.name.toLowerCase().includes(searchTerm)
      )
      .map((field) => ({
        customFieldId: field.id,
        fieldName: field.name,
        fieldKey: field.key || field.id,
        fieldType: field.schema?.type || "unknown",
        custom: field.custom || false,
        searchable: field.searchable || false,
      }));

    console.log(
      `Found ${matchingCustomFields.length} matching custom fields:`,
      matchingCustomFields
    );

    // Return the first match or null if no matches
    return matchingCustomFields.length > 0 ? matchingCustomFields[0] : null;
  } catch (error) {
    console.error("Error searching Jira custom fields:", error);
    return null;
  }
};

// Update multiple Jira custom fields in a single API call
const updateJiraCustomFields = async (
  issueKey,
  cf1,
  cf2,
  cf3,
  cf1Value,
  cf2Value,
  cf3Value
) => {
  try {
    if (!issueKey || !cf1 || !cf2 || !cf3) {
      console.error(
        "Missing required parameters: issueKey or custom field IDs"
      );
      return false;
    }

    // Import requestJira from @forge/bridge for API calls
    const { requestJira } = require("@forge/bridge");

    // Prepare the field update data - always expecting three custom field values
    const updateData = {
      fields: {
        [cf1]: cf1Value,
        [cf2]: cf2Value,
        [cf3]: cf3Value,
      },
    };

    console.log(`Updating issue ${issueKey} with custom fields:`, {
      [cf1]: cf1Value,
      [cf2]: cf2Value,
      [cf3]: cf3Value,
    });

    // Call Jira REST API to update the issue's custom fields
    const response = await requestJira(`/rest/api/3/issue/${issueKey}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Failed to update Jira custom fields:",
        response.status,
        response.statusText,
        errorData
      );
      return false;
    }

    console.log(`Successfully updated custom fields for issue ${issueKey}`);
    return true;
  } catch (error) {
    console.error("Error updating Jira custom fields:", error);
    return false;
  }
};

// Common Search Modal Component
const SearchModal = ({
  issueKey,
  isOpen,
  onClose,
  onSelect,
  f1,
  f2,
  f3,
  setF1,
  setF2,
  setF3,
  searchResults,
  selected,
  setSelected,
  onSearch,
  onClear,
}) => {
  // Check if all search fields are empty by concatenating trimmed values
  const isSearchDisabled = f1.trim() + f2.trim() + f3.trim() === "";

  return (
    <ModalTransition>
      {isOpen && (
        <Modal onClose={onClose}>
          <ModalHeader>
            <ModalTitle>
              {issueKey} Tech Product Platform Catalog Search
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Stack space="space.200">
              {/* Search Fields Section */}
              <Stack space="space.100">
                <Label>Search criteria</Label>
                <Inline space="space.100">
                  <Stack space="space.100">
                    <Text size="small">Product id</Text>
                    <Textfield
                      label="Company"
                      value={f1}
                      onChange={(e) => setF1(e.target.value)}
                    />
                  </Stack>
                  <Stack space="space.100">
                    <Text size="small">Product Name</Text>
                    <Textfield
                      label="Product Name"
                      value={f2}
                      onChange={(e) => setF2(e.target.value)}
                      placeholder="e.g., Windows, iPhone, Chrome..."
                    />
                  </Stack>
                  <Stack space="space.100">
                    <Text size="small">Version Id</Text>
                    <Textfield
                      label="Version Id "
                      value={f3}
                      onChange={(e) => setF3(e.target.value)}
                      placeholder="vesion id"
                    />
                  </Stack>
                </Inline>
                <ButtonGroup>
                  <Button
                    appearance="primary"
                    onClick={onSearch}
                    isDisabled={isSearchDisabled}
                  >
                    Search
                  </Button>
                  <Button appearance="subtle" onClick={onClear}>
                    Clear
                  </Button>
                </ButtonGroup>
              </Stack>

              <Text as="strong">Search Results:</Text>

              {/* Search Results Section */}
              <Stack space="space.100">
                <Label>Search results</Label>
                {searchResults.length === 0 ? (
                  <SectionMessage title="No results yet">
                    Enter criteria and click <Text weight="bold">Search</Text>.
                  </SectionMessage>
                ) : (
                  <Select
                    options={searchResults.map((r) => ({
                      label: r.label,
                      value: r.value,
                      productId: r.productId,
                      productName: r.productName,
                      versionId: r.versionId,
                    }))}
                    placeholder="Select a result..."
                    value={selected}
                    onChange={(option) => setSelected(option)}
                  />
                )}
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button appearance="subtle" onClick={onClose}>
                Close
              </Button>
              <Button
                appearance="primary"
                onClick={onSelect}
                isDisabled={!selected}
              >
                Select
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </ModalTransition>
  );
};

export {
  SearchModal,
  searchProducts,
  searchJiraCustomFieldByName,
  updateJiraCustomFields,
};
