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
} from "@forge/react";
import { view } from "@forge/bridge";

const View = () => {
  const [fieldValue, setFieldValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    view.getContext().then((context) => {
      setFieldValue(context.extension.fieldValue);
    });
  }, []);

  const handleSearchClick = () => {
    setIsModalOpen(true);

    // Generate mock search results based on current field values
    const mockResults = [
      {
        label: `Product ${f1 || "ABC"} - Version ${f3 || "1.0"}`,
        value: "result1",
      },
      { label: `${f2 || "Sample Product"} - Latest Version`, value: "result2" },
      { label: `Related Product - Version ${f3 || "2.0"}`, value: "result3" },
      { label: `${f1 || "XYZ"} Product Bundle`, value: "result4" },
      { label: `Legacy ${f2 || "Product"} - Archived`, value: "result5" },
      {
        label: `Enterprise ${f2 || "Solution"} - Version ${f3 || "3.1"}`,
        value: "result6",
      },
      {
        label: `${f1 || "CORE"}-${f2 || "Database"} - Production Build`,
        value: "result7",
      },
      {
        label: `Mobile ${f2 || "App"} - Version ${f3 || "2.5.1"}`,
        value: "result8",
      },
      {
        label: `${f2 || "Analytics"} Platform - Beta ${f3 || "4.0"}`,
        value: "result9",
      },
      {
        label: `${f1 || "API"} Gateway - Version ${f3 || "1.8.2"}`,
        value: "result10",
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

  const handleModalSearch = () => {
    // Handle search button click in modal
    console.log("Search clicked with values:", {
      productId: f1,
      productName: f2,
      versionId: f3,
    });

    // You can add your search logic here
    // For now, we'll just log the values
  };

  // Check if all search fields are empty by concatenating trimmed values
  const isSearchDisabled = f1.trim() + f2.trim() + f3.trim() === "";

  const handleClearFields = () => {
    setF1("");
    setF2("");
    setF3("");
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

                <Text size="small">this it important</Text>
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
