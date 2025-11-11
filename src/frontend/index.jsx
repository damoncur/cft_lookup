import React, { useState, useEffect } from "react";
import ForgeReconciler, {
  Icon,
  Text,
  Textfield,
  Inline,
  Stack,
  Tooltip,
  Button,
  Box,
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
  scrollAreaStyles,
} from "@forge/react";
import { view } from "@forge/bridge";

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
  "NVIDIA"
];

// Products map for each tech company
const COMPANY_PRODUCTS = {
  "Microsoft": [
    "Windows", "Office 365", "Azure", "Teams", "Visual Studio", 
    "Xbox", "Surface", "SQL Server", "Power BI", "SharePoint"
  ],
  "Apple": [
    "iPhone", "iPad", "Mac", "Apple Watch", "AirPods", 
    "macOS", "iOS", "Apple TV", "Safari", "iCloud"
  ],
  "Google": [
    "Search", "Gmail", "Android", "Chrome", "YouTube", 
    "Google Cloud", "Drive", "Maps", "Ads", "Workspace"
  ],
  "Amazon": [
    "AWS", "Prime", "Alexa", "Kindle", "Echo", 
    "S3", "EC2", "Lambda", "DynamoDB", "Fire TV"
  ],
  "Meta": [
    "Facebook", "Instagram", "WhatsApp", "Messenger", "Portal", 
    "Oculus", "Workplace", "Reality Labs", "Threads", "Quest"
  ],
  "Netflix": [
    "Streaming Service", "Originals", "Downloads", "Profiles", "Games", 
    "Interactive Content", "4K HDR", "Dolby Atmos", "Kids Mode", "Mobile App"
  ],
  "Salesforce": [
    "CRM", "Sales Cloud", "Service Cloud", "Marketing Cloud", "Commerce Cloud", 
    "Platform", "Analytics", "Einstein AI", "Tableau", "Slack"
  ],
  "Oracle": [
    "Database", "Cloud Infrastructure", "Java", "MySQL", "WebLogic", 
    "Enterprise Manager", "Fusion Applications", "Autonomous Database", "Exadata", "HCM Cloud"
  ],
  "Adobe": [
    "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Acrobat", 
    "Creative Cloud", "Experience Manager", "Analytics", "Target", "Campaign"
  ],
  "NVIDIA": [
    "GeForce", "RTX", "CUDA", "Omniverse", "Drive", 
    "Jetson", "Clara", "DGX", "A100", "Shield"
  ]
};

// Product releases organized by company and product
const PRODUCT_RELEASES = {
  "Microsoft": {
    "Windows": ["11 23H2", "11 22H2", "10 22H2", "Server 2022"],
    "Office 365": ["2024.1", "2023.12", "2023.11", "Enterprise"],
    "Azure": ["v2.1", "v2.0", "Government", "Stack"],
    "Teams": ["1.6.0", "1.5.12", "Phone 1.4", "Rooms 4.8"],
    "Visual Studio": ["2022 17.8", "2022 17.7", "Code 1.85", "Enterprise"],
    "Xbox": ["Series X/S", "One X", "One S", "Game Pass"],
    "Surface": ["Pro 9", "Laptop 5", "Studio 2+", "Go 4"],
    "SQL Server": ["2022 CU8", "2019 CU22", "2017 CU31", "Express"],
    "Power BI": ["Dec 2023", "Nov 2023", "Premium", "Desktop"],
    "SharePoint": ["Online", "2019", "2016", "Server"]
  },
  "Apple": {
    "iPhone": ["15.1", "15 Pro", "14.8", "SE 3rd"],
    "iPad": ["Pro M2", "Air 5th", "10th Gen", "Mini 6th"],
    "Mac": ["M3 Pro", "M2 Ultra", "M1 Max", "Intel"],
    "Apple Watch": ["Series 9", "Ultra 2", "SE 2nd", "Series 8"],
    "AirPods": ["Pro 2nd", "3rd Gen", "Max 2", "2nd Gen"],
    "macOS": ["Sonoma 14.2", "Ventura 13.6", "Monterey 12.7", "Big Sur"],
    "iOS": ["17.2", "16.7", "15.8", "14.8"],
    "Apple TV": ["4K 3rd", "HD 2nd", "4K 2nd", "App 2.0"],
    "Safari": ["17.2", "16.6", "Technology Preview", "15.6"],
    "iCloud": ["2023.11", "Drive 14", "Photos 13", "Mail 16"]
  },
  "Google": {
    "Search": ["Universal 2023", "AI Overview", "Lens 3.0", "Scholar"],
    "Gmail": ["2023.12", "Confidential", "Offline 6.0", "Enterprise"],
    "Android": ["14", "13", "12L", "Go Edition"],
    "Chrome": ["120.0", "119.0", "Dev 121", "Beta 120"],
    "YouTube": ["18.49", "TV 4.0", "Premium 2.0", "Shorts 1.5"],
    "Google Cloud": ["2023.12", "Vertex AI", "BigQuery 3.0", "Functions v2"],
    "Drive": ["Desktop 84", "Mobile 2.23", "Enterprise", "One 15GB"],
    "Maps": ["11.109", "Platform 3.55", "Earth 10.46", "Navigation"],
    "Ads": ["Google Ads 2023", "AdSense 1.21", "Analytics GA4", "Manager"],
    "Workspace": ["Enterprise Plus", "Business", "Education", "Essentials"]
  },
  "Amazon": {
    "AWS": ["Global 2023", "GovCloud", "Local Zones", "Wavelength"],
    "Prime": ["Individual", "Family 6", "Student", "Gaming"],
    "Alexa": ["4th Gen", "Show 15", "Dot 5th", "Auto 2nd"],
    "Kindle": ["Paperwhite 11th", "Oasis 10th", "Scribe", "Basic 2022"],
    "Echo": ["4th Gen", "Dot 5th", "Show 15", "Studio"],
    "S3": ["Standard", "Glacier Instant", "Deep Archive", "Express One"],
    "EC2": ["M7i", "C7g", "R7g", "T4g"],
    "Lambda": ["Runtime 2023", "Extensions", "Container", "Layers"],
    "DynamoDB": ["Standard", "Global Tables v2", "Accelerator", "PartiQL"],
    "Fire TV": ["Stick 4K Max", "Cube 3rd", "TV 55\"", "Edition"]
  },
  "Meta": {
    "Facebook": ["Web 2023.12", "Mobile 442", "Lite 384", "Business"],
    "Instagram": ["Mobile 312", "Threads 1.1", "Reels 2.0", "Stories 5.0"],
    "WhatsApp": ["2.23.24", "Business 2.23", "Web 2.2350", "Desktop 2.2347"],
    "Messenger": ["Mobile 438", "Desktop 198", "Kids 240", "Rooms 4.0"],
    "Portal": ["Portal+ v6", "Go v4", "TV v8", "Mini v5"],
    "Oculus": ["Quest 3", "Quest 2 v57", "Rift S", "Link 2.0"],
    "Workplace": ["Standard 2023", "Advanced", "Enterprise", "Essential"],
    "Reality Labs": ["Horizon 3.0", "Spark AR 178", "Research", "Avatar SDK"],
    "Threads": ["Mobile 1.1.12", "Web Beta", "Desktop Preview", "API v1"],
    "Quest": ["v57", "Pro", "Business", "Link PC"]
  },
  "Netflix": {
    "Streaming Service": ["Standard", "Premium 4K", "Basic", "Mobile"],
    "Originals": ["Series 2023", "Films 2023", "Documentaries", "International"],
    "Downloads": ["Smart Downloads", "Offline", "Mobile Only", "SD Card"],
    "Profiles": ["Standard", "Kids", "PIN Protected", "Auto-Play"],
    "Games": ["Mobile 23.1", "Trivia", "Puzzle", "Adventure"],
    "Interactive Content": ["Bandersnatch 2.0", "Carmen Sandiego", "Trivia", "Quiz"],
    "4K HDR": ["Ultra HD", "HDR10", "Dolby Vision", "Standard HDR"],
    "Dolby Atmos": ["5.1 Surround", "Spatial Audio", "Headphone", "Home Theater"],
    "Kids Mode": ["Preschool", "Big Kids", "Family", "Educational"],
    "Mobile App": ["Android 8.108", "iOS 16.34", "Tablet", "Phone"]
  },
  "Salesforce": {
    "CRM": ["Unlimited", "Enterprise", "Professional", "Essentials"],
    "Sales Cloud": ["Unlimited", "Enterprise", "Professional", "Lightning"],
    "Service Cloud": ["Unlimited", "Enterprise", "Professional", "Voice"],
    "Marketing Cloud": ["Growth", "Plus", "Advanced", "Premium"],
    "Commerce Cloud": ["B2C", "B2B", "Order Management", "Einstein"],
    "Platform": ["Lightning", "Apex", "Visualforce", "Flow"],
    "Analytics": ["Tableau CRM", "Einstein", "Wave", "Reports"],
    "Einstein AI": ["GPT Integration", "Voice", "Vision", "Prediction"],
    "Tableau": ["2023.3", "Server", "Online", "Desktop"],
    "Slack": ["Enterprise Grid", "Business+", "Standard", "Connect"]
  },
  "Oracle": {
    "Database": ["23c", "21c", "19c", "Express 21c"],
    "Cloud Infrastructure": ["Gen 2", "Government", "Dedicated", "@Customer"],
    "Java": ["21 LTS", "17 LTS", "11 LTS", "SE 8"],
    "MySQL": ["8.2", "8.0", "HeatWave", "Cluster 8.0"],
    "WebLogic": ["14.1.1", "12.2.1.4", "Kubernetes", "Cloud"],
    "Enterprise Manager": ["13.5", "Cloud Control", "Ops Center", "Database"],
    "Fusion Applications": ["23D", "23C", "23B", "SaaS"],
    "Autonomous Database": ["23c", "JSON", "Graph", "Serverless"],
    "Exadata": ["X10M", "X9M", "Cloud@Customer", "Database Machine"],
    "HCM Cloud": ["23D", "Recruiting", "Talent", "Payroll"]
  },
  "Adobe": {
    "Photoshop": ["2024", "2023", "Elements 2024", "Camera Raw 16"],
    "Illustrator": ["2024", "2023", "Draw Mobile", "Vector"],
    "Premiere Pro": ["2024", "2023", "Elements 2024", "Rush 2.0"],
    "After Effects": ["2024", "2023", "Beta", "Mobile Preview"],
    "Acrobat": ["DC 2023", "Pro DC", "Standard DC", "Reader DC"],
    "Creative Cloud": ["Desktop 5.9", "Libraries", "Fonts", "Stock"],
    "Experience Manager": ["Cloud Service", "6.5", "Forms", "Assets"],
    "Analytics": ["Customer Journey", "Real-time CDP", "Target", "Campaign"],
    "Target": ["Premium", "Standard", "Mobile", "Recommendations"],
    "Campaign": ["v8", "Standard", "Classic v7", "Managed Services"]
  },
  "NVIDIA": {
    "GeForce": ["RTX 4090", "RTX 4080", "RTX 4070", "GTX 1660"],
    "RTX": ["4090", "4080 Super", "4070 Ti", "4060"],
    "CUDA": ["12.3", "12.2", "11.8", "Toolkit"],
    "Omniverse": ["2023.2", "Create", "View", "Enterprise"],
    "Drive": ["Hyperion 9", "Xavier", "Orin", "Sim 2023"],
    "Jetson": ["Orin Nano", "AGX Orin", "Xavier NX", "Nano"],
    "Clara": ["Holoscan 2.0", "Parabricks 4.2", "Discovery", "Imaging"],
    "DGX": ["H100", "A100", "Station A100", "Cloud"],
    "A100": ["80GB", "40GB", "SXM", "PCIe"],
    "Shield": ["TV Pro", "TV", "Portable", "Controller"]
  }
};

// UUID map for each company + product combination
const PRODUCT_UUIDS = {
  "Microsoft": {
    "Windows": "550e8400-e29b-41d4-a716-446655440000",
    "Office 365": "550e8400-e29b-41d4-a716-446655440001", 
    "Azure": "550e8400-e29b-41d4-a716-446655440002",
    "Teams": "550e8400-e29b-41d4-a716-446655440003",
    "Visual Studio": "550e8400-e29b-41d4-a716-446655440004",
    "Xbox": "550e8400-e29b-41d4-a716-446655440005",
    "Surface": "550e8400-e29b-41d4-a716-446655440006",
    "SQL Server": "550e8400-e29b-41d4-a716-446655440007",
    "Power BI": "550e8400-e29b-41d4-a716-446655440008",
    "SharePoint": "550e8400-e29b-41d4-a716-446655440009"
  },
  "Apple": {
    "iPhone": "550e8400-e29b-41d4-a716-446655440010",
    "iPad": "550e8400-e29b-41d4-a716-446655440011",
    "Mac": "550e8400-e29b-41d4-a716-446655440012",
    "Apple Watch": "550e8400-e29b-41d4-a716-446655440013",
    "AirPods": "550e8400-e29b-41d4-a716-446655440014",
    "macOS": "550e8400-e29b-41d4-a716-446655440015",
    "iOS": "550e8400-e29b-41d4-a716-446655440016",
    "Apple TV": "550e8400-e29b-41d4-a716-446655440017",
    "Safari": "550e8400-e29b-41d4-a716-446655440018",
    "iCloud": "550e8400-e29b-41d4-a716-446655440019"
  },
  "Google": {
    "Search": "550e8400-e29b-41d4-a716-446655440020",
    "Gmail": "550e8400-e29b-41d4-a716-446655440021",
    "Android": "550e8400-e29b-41d4-a716-446655440022",
    "Chrome": "550e8400-e29b-41d4-a716-446655440023",
    "YouTube": "550e8400-e29b-41d4-a716-446655440024",
    "Google Cloud": "550e8400-e29b-41d4-a716-446655440025",
    "Drive": "550e8400-e29b-41d4-a716-446655440026",
    "Maps": "550e8400-e29b-41d4-a716-446655440027",
    "Ads": "550e8400-e29b-41d4-a716-446655440028",
    "Workspace": "550e8400-e29b-41d4-a716-446655440029"
  },
  "Amazon": {
    "AWS": "550e8400-e29b-41d4-a716-446655440030",
    "Prime": "550e8400-e29b-41d4-a716-446655440031",
    "Alexa": "550e8400-e29b-41d4-a716-446655440032",
    "Kindle": "550e8400-e29b-41d4-a716-446655440033",
    "Echo": "550e8400-e29b-41d4-a716-446655440034",
    "S3": "550e8400-e29b-41d4-a716-446655440035",
    "EC2": "550e8400-e29b-41d4-a716-446655440036",
    "Lambda": "550e8400-e29b-41d4-a716-446655440037",
    "DynamoDB": "550e8400-e29b-41d4-a716-446655440038",
    "Fire TV": "550e8400-e29b-41d4-a716-446655440039"
  },
  "Meta": {
    "Facebook": "550e8400-e29b-41d4-a716-446655440040",
    "Instagram": "550e8400-e29b-41d4-a716-446655440041",
    "WhatsApp": "550e8400-e29b-41d4-a716-446655440042",
    "Messenger": "550e8400-e29b-41d4-a716-446655440043",
    "Portal": "550e8400-e29b-41d4-a716-446655440044",
    "Oculus": "550e8400-e29b-41d4-a716-446655440045",
    "Workplace": "550e8400-e29b-41d4-a716-446655440046",
    "Reality Labs": "550e8400-e29b-41d4-a716-446655440047",
    "Threads": "550e8400-e29b-41d4-a716-446655440048",
    "Quest": "550e8400-e29b-41d4-a716-446655440049"
  },
  "Netflix": {
    "Streaming Service": "550e8400-e29b-41d4-a716-446655440050",
    "Originals": "550e8400-e29b-41d4-a716-446655440051",
    "Downloads": "550e8400-e29b-41d4-a716-446655440052",
    "Profiles": "550e8400-e29b-41d4-a716-446655440053",
    "Games": "550e8400-e29b-41d4-a716-446655440054",
    "Interactive Content": "550e8400-e29b-41d4-a716-446655440055",
    "4K HDR": "550e8400-e29b-41d4-a716-446655440056",
    "Dolby Atmos": "550e8400-e29b-41d4-a716-446655440057",
    "Kids Mode": "550e8400-e29b-41d4-a716-446655440058",
    "Mobile App": "550e8400-e29b-41d4-a716-446655440059"
  },
  "Salesforce": {
    "CRM": "550e8400-e29b-41d4-a716-446655440060",
    "Sales Cloud": "550e8400-e29b-41d4-a716-446655440061",
    "Service Cloud": "550e8400-e29b-41d4-a716-446655440062",
    "Marketing Cloud": "550e8400-e29b-41d4-a716-446655440063",
    "Commerce Cloud": "550e8400-e29b-41d4-a716-446655440064",
    "Platform": "550e8400-e29b-41d4-a716-446655440065",
    "Analytics": "550e8400-e29b-41d4-a716-446655440066",
    "Einstein AI": "550e8400-e29b-41d4-a716-446655440067",
    "Tableau": "550e8400-e29b-41d4-a716-446655440068",
    "Slack": "550e8400-e29b-41d4-a716-446655440069"
  },
  "Oracle": {
    "Database": "550e8400-e29b-41d4-a716-446655440070",
    "Cloud Infrastructure": "550e8400-e29b-41d4-a716-446655440071",
    "Java": "550e8400-e29b-41d4-a716-446655440072",
    "MySQL": "550e8400-e29b-41d4-a716-446655440073",
    "WebLogic": "550e8400-e29b-41d4-a716-446655440074",
    "Enterprise Manager": "550e8400-e29b-41d4-a716-446655440075",
    "Fusion Applications": "550e8400-e29b-41d4-a716-446655440076",
    "Autonomous Database": "550e8400-e29b-41d4-a716-446655440077",
    "Exadata": "550e8400-e29b-41d4-a716-446655440078",
    "HCM Cloud": "550e8400-e29b-41d4-a716-446655440079"
  },
  "Adobe": {
    "Photoshop": "550e8400-e29b-41d4-a716-446655440080",
    "Illustrator": "550e8400-e29b-41d4-a716-446655440081",
    "Premiere Pro": "550e8400-e29b-41d4-a716-446655440082",
    "After Effects": "550e8400-e29b-41d4-a716-446655440083",
    "Acrobat": "550e8400-e29b-41d4-a716-446655440084",
    "Creative Cloud": "550e8400-e29b-41d4-a716-446655440085",
    "Experience Manager": "550e8400-e29b-41d4-a716-446655440086",
    "Analytics": "550e8400-e29b-41d4-a716-446655440087",
    "Target": "550e8400-e29b-41d4-a716-446655440088",
    "Campaign": "550e8400-e29b-41d4-a716-446655440089"
  },
  "NVIDIA": {
    "GeForce": "550e8400-e29b-41d4-a716-446655440090",
    "RTX": "550e8400-e29b-41d4-a716-446655440091",
    "CUDA": "550e8400-e29b-41d4-a716-446655440092",
    "Omniverse": "550e8400-e29b-41d4-a716-446655440093",
    "Drive": "550e8400-e29b-41d4-a716-446655440094",
    "Jetson": "550e8400-e29b-41d4-a716-446655440095",
    "Clara": "550e8400-e29b-41d4-a716-446655440096",
    "DGX": "550e8400-e29b-41d4-a716-446655440097",
    "A100": "550e8400-e29b-41d4-a716-446655440098",
    "Shield": "550e8400-e29b-41d4-a716-446655440099"
  }
};

// Search function that accepts productId (UUID), productName, and versionId
const searchProducts = (productId, productName, versionId) => {
  const results = [];
  
  // Iterate through all companies and products
  for (const company in TECH_COMPANIES) {
    const companyName = TECH_COMPANIES[company];
    const products = COMPANY_PRODUCTS[companyName] || [];
    
    for (const product of products) {
      const uuid = PRODUCT_UUIDS[companyName]?.[product];
      const releases = PRODUCT_RELEASES[companyName]?.[product] || [];
      
      // Check if this product matches search criteria
      let matches = true;
      
      // Filter by productId (UUID) if provided
      if (productId && productId.trim()) {
        const searchUUID = productId.trim().toLowerCase();
        if (!uuid || !uuid.toLowerCase().includes(searchUUID)) {
          matches = false;
        }
      }
      
      // Filter by productName (matches company and/or product name) if provided
      if (productName && productName.trim()) {
        const searchTerm = productName.trim().toLowerCase();
        const companyMatch = companyName.toLowerCase().includes(searchTerm);
        const productMatch = product.toLowerCase().includes(searchTerm);
        
        if (!companyMatch && !productMatch) {
          matches = false;
        }
      }
      
      // Filter by versionId if provided
      if (versionId && versionId.trim()) {
        const searchVersion = versionId.trim().toLowerCase();
        const versionMatch = releases.some(release => 
          release.toLowerCase().includes(searchVersion)
        );
        
        if (!versionMatch) {
          matches = false;
        }
      }
      
      // If all criteria match, add to results
      if (matches) {
        // Add each matching release as a separate result
        const matchingReleases = versionId && versionId.trim() 
          ? releases.filter(release => release.toLowerCase().includes(versionId.trim().toLowerCase()))
          : releases;
        
        for (const release of matchingReleases) {
          results.push({
            uuid: uuid,
            company: companyName,
            product: product,
            version: release,
            label: `${companyName} ${product} - ${release}`,
            value: `${uuid}_${release}`,
            productId: uuid,
            productName: `${companyName} ${product}`,
            versionId: release
          });
        }
      }
    }
  }
  
  return results;
};

const View = () => {
  const [fieldValue, setFieldValue] = useState(null);
  const [issueKey, setIssueKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const getContextData = async () => {
      try {
        const context = await view.getContext();
        setFieldValue(context.extension.fieldValue);

        // Extract issueKey from context
        const issueKey =
          context.extension.issue?.key ||
          context.platformContext?.issueKey ||
          context.extension.content?.key;
        setIssueKey(issueKey);

        console.log("Context:", context);
        console.log("Issue Key:", issueKey);
      } catch (error) {
        console.error("Error getting context:", error);
      }
    };

    getContextData();
  }, []);

  const handleSearchClick = () => {
    setIsModalOpen(true);

    // Generate mock search results based on current field values

    // You can add your search logic here
    // For now, we'll just log the values
  };

  const handleModalSearch = () => {
    console.log("Search clicked with values:", {
      productId: f1,
      productName: f2,
      versionId: f3,
    });

    // Use the new search function instead of mock results
    const searchResults = searchProducts(f1.trim(), f2.trim(), f3.trim());
    
    setSearchResults(searchResults);
    
    // Auto-select first entry if results are found
    if (searchResults.length > 0) {
      setSelected(searchResults[0]);
    }
    
    console.log(
      `search results for field value: ${f1} ${f2} ${f3}`,
      searchResults
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setF1("");
    setF2("");
    setF3("");
    setSearchResults([]);
  };

  // Check if all search fields are empty by concatenating trimmed values
  const isSearchDisabled = f1.trim() + f2.trim() + f3.trim() === "";

  const handleClearFields = () => {
    setF1("");
    setF2("");
    setF3("");
    setSearchResults([]);
    setSelected(null);
  };

  return (
    <>
      <Inline space="space.100" alignBlock="end">
        <Box as="span" xcss={{ width: "32px" }}>
          <Tooltip text="Click to search">
            <Button
              iconBefore="search"
              spacing="compact"
              onClick={handleSearchClick}
            />
          </Tooltip>
        </Box>
        <Text size="small">{`${fieldValue || "world"}!`}</Text>
      </Inline>

      <ModalTransition>
        {isModalOpen && (
          <Modal onClose={handleCloseModal} width="medium">
            <ModalHeader>
              <ModalTitle>TPPC Lookup</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Stack space="space.100">
                <Text size="small">
                  You clicked the search button for the field value:
                </Text>
                <Box
                  xcss={{
                    padding: "space.100",
                    backgroundColor: "color.background.neutral.subtle",
                    borderRadius: "4px",
                  }}
                >
                  <Text as="strong" size="small">
                    {fieldValue || "No value entered"}
                  </Text>
                </Box>
                <Inline space="space.100" alignBlock="end">
                  <Stack>
                    <Label htmlFor="f1-input">
                      <Text size="small">Product Id</Text>
                    </Label>
                    <Textfield
                      id="f1-input"
                      value={f1}
                      onChange={(e) => setF1(e.target.value)}
                      spacing="compact"
                    />
                  </Stack>
                  <Stack>
                    <Label htmlFor="f2-input">
                      <Text size="small">Product Name</Text>
                    </Label>
                    <Textfield
                      id="f2-input"
                      value={f2}
                      onChange={(e) => setF2(e.target.value)}
                      spacing="compact"
                    />
                  </Stack>
                  <Stack>
                    <Label htmlFor="f3-input">
                      <Text size="small">Version Id</Text>
                    </Label>
                    <Textfield
                      id="f3-input"
                      value={f3}
                      onChange={(e) => setF3(e.target.value)}
                      spacing="compact"
                    />
                  </Stack>
                </Inline>
                <Inline space="space.100">
                  <Button
                    onClick={handleModalSearch}
                    isDisabled={isSearchDisabled}
                  >
                    Search
                  </Button>
                  <Button
                    appearance="subtle"
                    onClick={handleClearFields}
                    xcss={{ display: isSearchDisabled ? "none" : "block" }}
                  >
                    Clear
                  </Button>
                </Inline>

                <Text size="large" as="strong">
                  Search Results:
                </Text>

                {/* Search Results Section */}
                <Stack space="space.100">
                  <Label>Search results</Label>
                  {searchResults.length === 0 ? (
                    <SectionMessage title="No results yet">
                      Enter criteria and click <Text weight="bold">Search</Text>
                      .
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
                <Button appearance="subtle" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button appearance="primary" onClick={handleCloseModal}>
                  OK
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
