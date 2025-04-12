import { Button } from '@/component/ui/button';
import { Send } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { canSubmitAtom, validateCSVHeaders } from '@/shared/atoms/validation';
import { submissionPayloadAtom } from '@/shared/atoms/submission';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/component/ui/dialog';

// Response type for the dialog
interface ApiResponseDisplay {
  success: boolean;
  message: string;
  details: any;
}

export function SubmitButton() {
  const canSubmit = useAtomValue(canSubmitAtom);
  const validationResult = useAtomValue(validateCSVHeaders);
  const submission = useAtomValue(submissionPayloadAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponseDisplay | null>(null);

  // Only allow submission if validation passes (empty string means validation passed)
  const isValid = canSubmit && validationResult === '' && submission.isValid;
  
  // Debug info
  console.log('Submit button state:', {
    canSubmit,
    validationResult,
    isValid,
    iso: submission.iso,
    product: submission.product,
    traderName: submission.traderName,
    requiresPassword: submission.requiresPassword,
    hasFormattedDate: !!submission.formattedDate,
    payloadSize: submission.apiPayload.length
  });

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    if (!isValid) {
      console.log('Validation failed:', { isValid });
      return;
    }

    setIsSubmitting(true);
    console.log('Starting submission process');
    
    try {
      // Check if we need a password
      let config = {};
      if (submission.requiresPassword) {
        const password = prompt(`Please enter your ${submission.iso} account password:`);
        if (!password) {
          throw new Error(`Password is required for ${submission.iso} submissions`);
        }
        config = { password };
      }
      
      // Call the submit function with any necessary config
      const response = await submission.submit(config);
      
      // Check if we got a valid response
      if (!response) {
        throw new Error('No response received from API');
      }
      
      console.log('API Response:', response);
      
      // Prepare the response for display
      setApiResponse({
        success: response?.status_code >= 200 && response?.status_code < 300,
        message: response?.message || 'Submission complete',
        details: response || {}
      });
      
      // Show the dialog
      setShowResponseDialog(true);
      
    } catch (error: any) {
      console.error('Submission failed:', error);
      
      // Check if this is an API error response (has status_code property)
      if (error && typeof error === 'object' && 'status_code' in error) {
        // This is an API error response, display it directly
        setApiResponse({
          success: false,
          message: error.message || 'API error',
          details: error
        });
      } else if (error && error.response && error.response.data) {
        // This is an Axios error with response data
        const apiError = error.response.data;
        setApiResponse({
          success: false,
          message: apiError.message || `Error ${error.response.status}: ${error.response.statusText}`,
          details: apiError
        });
      } else {
        // This is a JavaScript error
        setApiResponse({
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: {
            error: error instanceof Error ? error.message : String(error)
          }
        });
      }
      
      // Show the dialog for errors too
      setShowResponseDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <label className="text-sm font-medium">&nbsp;</label>
      <Button
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        className="bg-success hover:bg-success/90 text-success-foreground"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⟳</span>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Trades
          </>
        )}
      </Button>
      
      {/* API Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className={apiResponse?.success ? "text-green-600" : "text-red-600"}>
              {apiResponse?.success ? "Submission Successful" : "Submission Failed"}
            </DialogTitle>
            <DialogDescription>
              {apiResponse?.message}
              {/* Display correlation ID if available */}
              {apiResponse?.details?.correlation_id && (
                <div className="mt-1 text-sm text-muted-foreground">
                  Correlation ID: {apiResponse.details.correlation_id}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[350px] overflow-auto border rounded-md p-4 bg-slate-50">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(apiResponse?.details, null, 2)}
            </pre>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 