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
    const mockResults = [
      {
        label: `Product ${f1 || "ABC"} - Version ${f3 || "1.0"}`,
        value: "result1",
        productId: f1 || "ABC",
        productName: `${f1 || "ABC"} Product`,
        versionId: f3 || "1.0",
      },
      { 
        label: `${f2 || "Sample Product"} - Latest Version`, 
        value: "result2",
        productId: "SMPL",
        productName: f2 || "Sample Product",
        versionId: "latest",
      },
      { 
        label: `Related Product - Version ${f3 || "2.0"}`, 
        value: "result3",
        productId: "REL",
        productName: "Related Product",
        versionId: f3 || "2.0",
      },
      { 
        label: `${f1 || "XYZ"} Product Bundle`, 
        value: "result4",
        productId: f1 || "XYZ",
        productName: `${f1 || "XYZ"} Product Bundle`,
        versionId: "bundle",
      },
      { 
        label: `Legacy ${f2 || "Product"} - Archived`, 
        value: "result5",
        productId: "LGC",
        productName: `Legacy ${f2 || "Product"}`,
        versionId: "archived",
      },
      {
        label: `Enterprise ${f2 || "Solution"} - Version ${f3 || "3.1"}`,
        value: "result6",
        productId: "ENT",
        productName: `Enterprise ${f2 || "Solution"}`,
        versionId: f3 || "3.1",
      },
      {
        label: `${f1 || "CORE"}-${f2 || "Database"} - Production Build`,
        value: "result7",
        productId: f1 || "CORE",
        productName: `${f1 || "CORE"} ${f2 || "Database"}`,
        versionId: "production",
      },
      {
        label: `Mobile ${f2 || "App"} - Version ${f3 || "2.5.1"}`,
        value: "result8",
        productId: "MOB",
        productName: `Mobile ${f2 || "App"}`,
        versionId: f3 || "2.5.1",
      },
      {
        label: `${f2 || "Analytics"} Platform - Beta ${f3 || "4.0"}`,
        value: "result9",
        productId: "ANLYT",
        productName: `${f2 || "Analytics"} Platform`,
        versionId: `beta-${f3 || "4.0"}`,
      },
      {
        label: `${f1 || "API"} Gateway - Version ${f3 || "1.8.2"}`,
        value: "result10",
        productId: f1 || "API",
        productName: `${f1 || "API"} Gateway`,
        versionId: f3 || "1.8.2",
      },
      { 
        label: `Security ${f2 || "Module"} - Patch ${f3 || "2.3.4"}`, 
        value: "result11",
        productId: "SEC",
        productName: `Security ${f2 || "Module"}`,
        versionId: f3 || "2.3.4",
      },
      { 
        label: `${f2 || "Backup"} Service - LTS Version`, 
        value: "result12",
        productId: "BKUP",
        productName: `${f2 || "Backup"} Service`,
        versionId: "lts",
      },
      { 
        label: `${f1 || "ML"}-${f2 || "Engine"} - Version ${f3 || "5.0"}`, 
        value: "result13",
        productId: f1 || "ML",
        productName: `${f1 || "ML"} ${f2 || "Engine"}`,
        versionId: f3 || "5.0",
      },
      { 
        label: `Integration ${f2 || "Hub"} - Release ${f3 || "3.7"}`, 
        value: "result14",
        productId: "INTG",
        productName: `Integration ${f2 || "Hub"}`,
        versionId: f3 || "3.7",
      },
      { 
        label: `Cloud ${f1 || "SERVICE"} - Stable Release`, 
        value: "result15",
        productId: f1 || "CLD",
        productName: `Cloud ${f1 || "SERVICE"}`,
        versionId: "stable",
      },
      { 
        label: `DevOps ${f2 || "Pipeline"} - Build ${f3 || "1.2.3"}`, 
        value: "result16",
        productId: "DVOPS",
        productName: `DevOps ${f2 || "Pipeline"}`,
        versionId: f3 || "1.2.3",
      },
      { 
        label: `Monitoring ${f2 || "Dashboard"} - Version ${f3 || "4.5"}`, 
        value: "result17",
        productId: "MON",
        productName: `Monitoring ${f2 || "Dashboard"}`,
        versionId: f3 || "4.5",
      },
      { 
        label: `${f1 || "WEB"}-${f2 || "Framework"} - Release ${f3 || "2.1"}`, 
        value: "result18",
        productId: f1 || "WEB",
        productName: `${f1 || "WEB"} ${f2 || "Framework"}`,
        versionId: f3 || "2.1",
      },
      { 
        label: `Testing ${f2 || "Suite"} - Version ${f3 || "3.8.1"}`, 
        value: "result19",
        productId: "TEST",
        productName: `Testing ${f2 || "Suite"}`,
        versionId: f3 || "3.8.1",
      },
      { 
        label: `${f2 || "Authentication"} Service - Patch ${f3 || "1.4.2"}`, 
        value: "result20",
        productId: "AUTH",
        productName: `${f2 || "Authentication"} Service`,
        versionId: f3 || "1.4.2",
      },
      { 
        label: `Report ${f2 || "Generator"} - Version ${f3 || "2.7"}`, 
        value: "result21",
        productId: "RPT",
        productName: `Report ${f2 || "Generator"}`,
        versionId: f3 || "2.7",
      },
      { 
        label: `${f1 || "DATA"}-${f2 || "Warehouse"} - Build ${f3 || "5.1"}`, 
        value: "result22",
        productId: f1 || "DATA",
        productName: `${f1 || "DATA"} ${f2 || "Warehouse"}`,
        versionId: f3 || "5.1",
      },
      { 
        label: `Logging ${f2 || "Framework"} - Release ${f3 || "1.9"}`, 
        value: "result23",
        productId: "LOG",
        productName: `Logging ${f2 || "Framework"}`,
        versionId: f3 || "1.9",
      },
      { 
        label: `${f2 || "Cache"} Manager - Version ${f3 || "3.2.1"}`, 
        value: "result24",
        productId: "CACHE",
        productName: `${f2 || "Cache"} Manager`,
        versionId: f3 || "3.2.1",
      },
      { 
        label: `Network ${f2 || "Tools"} - Stable ${f3 || "4.0"}`, 
        value: "result25",
        productId: "NET",
        productName: `Network ${f2 || "Tools"}`,
        versionId: `stable-${f3 || "4.0"}`,
      },
      { 
        label: `${f1 || "UI"}-${f2 || "Component"} - Version ${f3 || "6.1"}`, 
        value: "result26",
        productId: f1 || "UI",
        productName: `${f1 || "UI"} ${f2 || "Component"}`,
        versionId: f3 || "6.1",
      },
      { 
        label: `Workflow ${f2 || "Engine"} - Release ${f3 || "2.4"}`, 
        value: "result27",
        productId: "WF",
        productName: `Workflow ${f2 || "Engine"}`,
        versionId: f3 || "2.4",
      },
      { 
        label: `${f2 || "Search"} Index - Build ${f3 || "1.7.3"}`, 
        value: "result28",
        productId: "SRCH",
        productName: `${f2 || "Search"} Index`,
        versionId: f3 || "1.7.3",
      },
      { 
        label: `Message ${f2 || "Queue"} - Version ${f3 || "4.2"}`, 
        value: "result29",
        productId: "MSG",
        productName: `Message ${f2 || "Queue"}`,
        versionId: f3 || "4.2",
      },
      { 
        label: `${f1 || "SYNC"}-${f2 || "Service"} - Patch ${f3 || "3.5.1"}`, 
        value: "result30",
        productId: f1 || "SYNC",
        productName: `${f1 || "SYNC"} ${f2 || "Service"}`,
        versionId: f3 || "3.5.1",
      },
    ];

    setSearchResults(mockResults);
    console.log(
      `search results for field value: ${f1} ${f2} ${f3}`,
      mockResults
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
