import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { useSetAtom } from 'jotai';
import { Card } from '@/component/ui/card';
import { columnsAtom, CsvData, csvDataAtom } from '@/shared/atoms/fileData'

export function CsvUpload() {
  const setCsvData = useSetAtom(csvDataAtom);
  const setColumns = useSetAtom(columnsAtom);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data as CsvData[];
          setCsvData(data);
          if (data.length > 0) {
            setColumns(Object.keys(data[0] as Record<string, unknown>));
          }
        },
      });
    }
  }, [setCsvData, setColumns]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Upload className="w-12 h-12 text-muted-foreground" />
        <div>
          <p className="text-lg font-medium">
            {isDragActive ? 'Drop your CSV file here' : 'Upload CSV file'}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop your CSV file here, or click to select a file
          </p>
        </div>
      </div>
    </Card>
  );
}