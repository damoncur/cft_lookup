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
} from "@forge/react";
import { view } from "@forge/bridge";
import {
  SearchModal,
  searchProducts,
  searchJiraCustomFieldByName,
  updateJiraCustomFields,
} from "./SearchModal";

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

  const handleSelectModal = async () => {
    if (selected) {
      const cf1 = await searchJiraCustomFieldByName("TPPC Product ID");
      console.log("Searching for custom field: TPPC Product ID");
      const cf2 = await searchJiraCustomFieldByName("TPPC Product Name");
      console.log("Searching for custom field: TPPC Product Name ");
      const cf3 = await searchJiraCustomFieldByName("TPPC Version ID");
      console.log("Searching for custom field: TPPC Product ID");

      console.log("cfids", cf1, cf2, cf3);
      // Log the custom field lookups
      
      const updateSuccess = await updateJiraCustomFields(
        issueKey,
        cf1.customFieldId,
        cf2.customFieldId,
        cf3.customFieldId,
        selected.productId,
        selected.company + " " + selected.productName,
        selected.versionId
      );
      setIsModalOpen(false);
    }
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
        <Box as="span" xcss={{ width: "32px", height: "32px" }}>
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

      <SearchModal
        issueKey={issueKey}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectModal}
        f1={f1}
        f2={f2}
        f3={f3}
        setF1={setF1}
        setF2={setF2}
        setF3={setF3}
        searchResults={searchResults}
        selected={selected}
        setSelected={setSelected}
        onSearch={handleModalSearch}
        onClear={handleClearFields}
      />
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
