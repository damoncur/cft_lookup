import React, { useState, useEffect } from 'react';
import ForgeReconciler, {
  Icon,
  Text,
  Inline,
  Stack,
  Tooltip,
  Button,
  Box,
} from "@forge/react";
import { view } from '@forge/bridge';

const View = () => {
  const [fieldValue, setFieldValue] = useState(null);

  useEffect(() => {
    view.getContext().then((context) => { setFieldValue(context.extension.fieldValue) });
  }, []);

  return (
    <Stack space="space.100">
      <Inline space="space.100" alignBlock="end">
        <Box as="span" xcss={{ width: '32px' }}>
          <Tooltip text="Click to search">
            <Button 
              appearance="subtle-link"
              iconBefore="search"
              spacing="compact"
              onClick={() => alert(`Search icon clicked!`)}
            />
          </Tooltip>
        </Box>
        <Text>{`${fieldValue || 'world'}!`}</Text>
      </Inline>
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
