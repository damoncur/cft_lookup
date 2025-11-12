import { requestJira } from "@forge/bridge";

/**
 * Fetches all Jira fields from the REST API
 * @returns {Promise<Array>} Array of Jira field objects
 */
export const fetchJiraFields = async () => {
  try {
    console.log("Fetching Jira fields...");
    
    const response = await requestJira("/rest/api/3/field", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(`Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      console.error("Failed to fetch Jira fields:", response.status, response.statusText);
      throw new Error(`Failed to fetch Jira fields: ${response.status} ${response.statusText}`);
    }

    const fields = await response.json();
    console.log(`Retrieved ${fields.length} fields from Jira`);
    return fields;
  } catch (error) {
    console.error("Error fetching Jira fields:", error);
    throw error;
  }
};
