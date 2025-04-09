import { CsvUpload } from '@/components/csv-upload';
import { CsvTable } from '@/components/csv-table';
import { ControlPanel } from '@/components/control-panel';

function App() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">CSV File Upload</h1>
        <ControlPanel />
        <CsvUpload />
      </div>
      <CsvTable />
    </div>
  );
}

export default App;