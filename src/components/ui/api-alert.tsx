import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant,
}) => {
  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
