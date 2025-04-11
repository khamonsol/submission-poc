import { useAtomValue } from 'jotai';
import { Alert, AlertDescription, AlertTitle } from '@/component/ui/alert';
import { X, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { validateCSVHeaders } from '@/shared/atoms/validation';
import { columnsAtom } from '@/shared/atoms/fileData';

export function ValidationIndicator() {
  const validationResult = useAtomValue(validateCSVHeaders);
  const columns = useAtomValue(columnsAtom);
  
  // Don't show anything if no file has been uploaded
  if (!columns || columns.length === 0) {
    return null;
  }

  // Empty string means validation passed
  if (validationResult === '') {
    return (
      <Alert className="mb-4 bg-success/20 border-success text-success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Validation Passed</AlertTitle>
        <AlertDescription>
          CSV file headers match the expected format for the selected ISO and product.
        </AlertDescription>
      </Alert>
    );
  }
  
  // If the validation result contains "No validation rules found", it's a warning not an error
  if (validationResult.includes("No validation rules found")) {
    return (
      <Alert className="mb-4 bg-warning/20 border-warning text-warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Validation Rules</AlertTitle>
        <AlertDescription>
          {validationResult}
        </AlertDescription>
      </Alert>
    );
  }
  // Otherwise, it's a validation error
  return (
    <Alert className="mb-4 bg-destructive/20 border-destructive text-destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Validation Failed</AlertTitle>
      <AlertDescription>
        It looks like a file for a different ISO / Product combination was uploaded than what was selected.
      </AlertDescription>
      <AlertDescription>
        <div className="font-semibold">Problems:</div>
        <div>{validationResult}</div>
      </AlertDescription>
    </Alert>
  );
} 