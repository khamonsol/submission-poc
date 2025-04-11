import { CsvUpload } from '@/component/csv-upload';
import { CsvTable } from '@/component/csv-table';
import { ControlPanel } from '@/component/control-panel';
import { ValidationIndicator } from '@/component/validation-indicator';
import { useAtomValue } from 'jotai'
import { userIdAtom } from '@/shared/atoms/account'


function Submission() {

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Submission file upload</h1>
        <ControlPanel />
        <ValidationIndicator />
        <CsvUpload />
      </div>
      <CsvTable />
    </div>
  );
}

export default Submission;