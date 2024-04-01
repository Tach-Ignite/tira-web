export interface StepperProps {
  steps: string[];
  completedSteps: Number[];
  inCompletedSteps: Number[];
  currentStep?: Number;
  className?: string;
}
