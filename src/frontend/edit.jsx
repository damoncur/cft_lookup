import React, { useState, useCallback, useEffect } from "react";
import ForgeReconciler, {
  Textfield,
  Button,
  Stack,
  Inline,
} from "@forge/react";
import { CustomFieldEdit } from "@forge/react/jira";
import { view } from "@forge/bridge";
import {
  SearchModal,
  searchProducts,
  searchJiraCustomFieldByName,
  updateJiraCustomFields,
} from "./SearchModal";

const Edit = () => {
  const [value, setValue] = useState("");
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
        setValue(context.extension.fieldValue || "");

        // Extract issueKey from context
        const issueKey =
          context.extension.issue?.key ||
          context.platformContext?.issueKey ||
          context.extension.content?.key;
        setIssueKey(issueKey);

        console.log("Edit Context:", context);
        console.log("Edit Issue Key:", issueKey);
      } catch (error) {
        console.error("Error getting context:", error);
      }
    };

    getContextData();
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await view.submit(value);
    } catch (e) {
      console.error(e);
    }
  }, [value]);

  const handleOnChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSearchClick = () => {
    setIsModalOpen(true);

    // Generate search results based on current field values
    const results = searchProducts(f1, f2, f3);
    setSearchResults(results);

    // Auto-select first result if only one match
    if (results.length === 1) {
      setSelected(results[0]);
    } else {
      setSelected(null);
    }

    console.log("Search initiated with:", { f1, f2, f3 });
    console.log("Results found:", results.length);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setF1("");
    setF2("");
    setF3("");
    setSearchResults([]);
    setSelected(null);
  };

  const handleSelectModal = async () => {
    if (selected && issueKey) {
      try {
        // Search for the custom field IDs
        const cf1 = await searchJiraCustomFieldByName("TPPC Product ID");
        const cf2 = await searchJiraCustomFieldByName("TPPC Product Name");
        const cf3 = await searchJiraCustomFieldByName("TPPC Version ID");

        console.log("Custom Field Lookups:", { cf1, cf2, cf3 });

        // Update custom fields if they exist
        if (cf1?.customFieldId && cf2?.customFieldId && cf3?.customFieldId) {
          const updateSuccess = await updateJiraCustomFields(
            issueKey,
            cf1.customFieldId,
            cf2.customFieldId,
            cf3.customFieldId,
            selected.uuid,
            selected.companyProduct,
            selected.releases[0] || "default"
          );

          if (updateSuccess) {
            console.log("All custom fields updated successfully!");
          } else {
            console.warn("Custom field updates failed");
          }
        } else {
          console.log("Some custom fields not found - skipping updates");
        }

        // Update the main field value
        setValue(selected.value);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating custom fields:", error);
        setIsModalOpen(false);
      }
    } else {
      console.warn("No selection or issue key available");
      setIsModalOpen(false);
    }
  };

  const handleClearFields = () => {
    setF1("");
    setF2("");
    setF3("");
    setSearchResults([]);
    setSelected(null);
  };

  return (
    <CustomFieldEdit onSubmit={onSubmit}>
      <Stack>
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
          onSearch={handleSearchClick}
          onClear={handleClearFields}
        />
      </Stack>
    </CustomFieldEdit>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);
