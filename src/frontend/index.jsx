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

  useEffect(() => {
    view.getContext().then((context) => {
      setFieldValue(context.extension.fieldValue);
    });
  }, []);

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setF1("");
    setF2("");
    setF3("");
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

  return (
    <>
      <Stack space="space.100">
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
      </Stack>

      <ModalTransition>
        {isModalOpen && (
          <Modal onClose={handleCloseModal} width="medium">
            <ModalHeader>
              <ModalTitle>Field Search Results</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Stack space="space.100">
                <Text size="small">You clicked the search button for the field value:</Text>
                <Box
                  xcss={{
                    padding: "space.100",
                    backgroundColor: "color.background.neutral.subtle",
                    borderRadius: "4px",
                  }}
                >
                  <Text as="strong" size="small">{fieldValue || "No value entered"}</Text>
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
                <Box>
                  <Button onClick={handleModalSearch}>Search </Button>
                </Box>

                <Text size="small">
                  This modal demonstrates how you can display search results,
                  field information, or any other content instead of using basic
                  alerts. You could integrate with APIs, show lookup results, or
                  provide interactive functionality here.
                </Text>
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
