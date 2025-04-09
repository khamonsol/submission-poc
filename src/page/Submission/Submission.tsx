import { CsvUpload } from '@/component/csv-upload';
import { CsvTable } from '@/component/csv-table';
import { ControlPanel } from '@/component/control-panel';

function Submission() {
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

export default Submission;