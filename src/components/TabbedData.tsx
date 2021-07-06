import * as GovUK from 'govuk-react';
import { useState, ReactElement } from 'react';
import DataTable from './DataTable';
import { ParsedData, ErrorLocations } from './../types';

interface TabbedDataProps {
  tableData: ParsedData,
  errorLocations: ErrorLocations,
}

export default function TabbedData({ tableData, errorLocations }: TabbedDataProps): ReactElement {
  const [tabIndex, setTabIndex] = useState(0);
  const shownTables = Array.from(tableData.keys()).filter(tableName => tableName !== 'Header');

  const tabTitles = Array.from(shownTables.entries()).map(([index, tableName]) => {
    return <GovUK.Tabs.Tab onClick={() => setTabIndex(index)} selected={tabIndex === index}>{tableName}</GovUK.Tabs.Tab>;
  });

  const tabPanels = Array.from(shownTables.entries()).map(([index, tableName]) => {
    return (
      <GovUK.Tabs.Panel selected={tabIndex === index}>
        <DataTable rowData={tableData.get(tableName)} highlight={errorLocations.get(tableName) as Set<string>} />
      </GovUK.Tabs.Panel>
    )
  });
  return (
    <GovUK.Tabs>
      <GovUK.Tabs.Title>Upload</GovUK.Tabs.Title>
      <GovUK.Tabs.List>
        {tabTitles}
      </GovUK.Tabs.List>
      {tabPanels}
    </GovUK.Tabs>
  )
}