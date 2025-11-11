import React, { useState, useEffect } from 'react';
import ForgeReconciler, {
  Form,
  Label,
  Textfield,
  useForm,
  FormSection,
  FormFooter,
  LoadingButton,
  Button,
  ButtonGroup,
  FormHeader,
  Stack,
  Select,
  RadioGroup,
  Radio,
  Text,
  SectionMessage,
  Inline,
  Box,
} from "@forge/react";
import { view } from '@forge/bridge';

const ContextConfig = () => {
  const [extensionData, setExtensionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [configuration, setConfiguration] = useState(() => ({
    regex: '^.+$',
    groupName: '',
    customFieldId: '',
    useExistingGroup: false,
    projectGroups: {} // Store groups directly in configuration
  }));
  const [availableGroups, setAvailableGroups] = useState([]);
  const [projectKey, setProjectKey] = useState('');
  const [message, setMessage] = useState(null);
  const [groupMode, setGroupMode] = useState('new'); // 'new' or 'existing'
  
  const { handleSubmit, register, getFieldId, getValues } = useForm();

  useEffect(() => {
    view.getContext().then(({ extension }) => {
      setExtensionData(extension);
      
      // Get project key from context
      const projKey = extension?.project?.key || 
                     extension?.platformContext?.projectKey ||
                     'DEFAULT';
      setProjectKey(projKey);

      if (extension.configuration) {
        const config = extension.configuration;
        setConfiguration({
          regex: config.regex || '^.+$',
          groupName: config.groupName || '',
          customFieldId: config.customFieldId || '',
          useExistingGroup: config.useExistingGroup || false,
          projectGroups: config.projectGroups || {}
        });
        
        // Load available groups from stored configuration
        const groups = config.projectGroups || {};
        const groupsForProject = groups[projKey] || {};
        setAvailableGroups(Object.keys(groupsForProject));
        
        if (config.useExistingGroup) {
          setGroupMode('existing');
        }
      }
    });
  }, []);

  // Load available groups when project key is available
  useEffect(() => {
    if (projectKey && configuration.projectGroups) {
      const groupsForProject = configuration.projectGroups[projectKey] || {};
      setAvailableGroups(Object.keys(groupsForProject));
    }
  }, [projectKey, configuration.projectGroups]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { regex, groupName, customFieldId } = getValues();
      
      const finalGroupName = groupMode === 'existing' ? 
        configuration.existingGroupName || groupName : 
        groupName;
      
      const finalCustomFieldId = customFieldId || `cf_${Date.now()}`;
      
      // Update project groups in configuration
      const updatedProjectGroups = { ...configuration.projectGroups };
      
      if (!updatedProjectGroups[projectKey]) {
        updatedProjectGroups[projectKey] = {};
      }
      
      if (!updatedProjectGroups[projectKey][finalGroupName]) {
        updatedProjectGroups[projectKey][finalGroupName] = {
          project: projectKey,
          customFields: {}
        };
      }
      
      // Add this custom field to the group
      updatedProjectGroups[projectKey][finalGroupName].customFields[finalCustomFieldId] = finalCustomFieldId;

      setMessage({ type: 'success', text: `Group "${finalGroupName}" configured successfully!` });

      // Submit the configuration
      await view.submit({
        configuration: {
          regex: regex || configuration.regex,
          groupName: finalGroupName,
          customFieldId: finalCustomFieldId,
          useExistingGroup: groupMode === 'existing',
          projectKey: projectKey,
          projectGroups: updatedProjectGroups
        }
      });
      
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setMessage({ type: 'error', text: `Error saving configuration: ${e.message}` });
    }
  };

  if (!extensionData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Custom Field Group Configuration" />
      
      <Stack space="space.200">
        {message && (
          <SectionMessage appearance={message.type}>
            <Text>{message.text}</Text>
          </SectionMessage>
        )}

        <Text>Project: <strong>{projectKey}</strong></Text>

        <FormSection>
          <Label labelFor={getFieldId('regex')}>
            Validation RegEx
          </Label>
          <Textfield 
            {...register('regex')} 
            placeholder={configuration.regex}
            description="Regular expression to validate field values"
          />
        </FormSection>

        <FormSection>
          <Label>Group Configuration</Label>
          <RadioGroup
            value={groupMode}
            onChange={(value) => setGroupMode(value)}
          >
            <Radio value="new" label="Create New Group" />
            <Radio value="existing" label="Use Existing Group" />
          </RadioGroup>
        </FormSection>

        {groupMode === 'new' ? (
          <FormSection>
            <Label labelFor={getFieldId('groupName')}>
              New Group Name
            </Label>
            <Textfield 
              {...register('groupName')} 
              placeholder="e.g., User Management, Reporting, Configuration"
              description="Name for the new group that will contain this custom field"
              isRequired
            />
          </FormSection>
        ) : (
          <FormSection>
            <Label>Select Existing Group</Label>
            {availableGroups.length > 0 ? (
              <Select
                options={availableGroups.map(group => ({ 
                  label: group, 
                  value: group 
                }))}
                placeholder="Choose an existing group..."
                onChange={(option) => {
                  setConfiguration({
                    ...configuration,
                    existingGroupName: option.value
                  });
                }}
              />
            ) : (
              <Text>No existing groups found. Create a new group instead.</Text>
            )}
          </FormSection>
        )}

        <FormSection>
          <Label labelFor={getFieldId('customFieldId')}>
            Custom Field ID (Optional)
          </Label>
          <Textfield 
            {...register('customFieldId')} 
            placeholder="Will be auto-generated if not provided"
            description="Unique identifier for this custom field"
          />
        </FormSection>

        {availableGroups.length > 0 && (
          <Box>
            <Text as="h4">Existing Groups in Project:</Text>
            <Text>{availableGroups.join(', ')}</Text>
          </Box>
        )}
      </Stack>

      <FormFooter align="start">
        <ButtonGroup>
          <Button appearance="subtle" onClick={view.close}>Close</Button>
          <LoadingButton appearance="primary" type="submit" isLoading={isLoading}>
            Save Configuration
          </LoadingButton>
        </ButtonGroup>
      </FormFooter>
    </Form>
  )
}

ForgeReconciler.render(
  <React.StrictMode>
    <ContextConfig />
  </React.StrictMode>
);
