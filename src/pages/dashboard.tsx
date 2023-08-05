/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function Dashboard({ className, ...props }: CardProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setData(JSON.parse(userData));
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>{data?.username || ""}</CardTitle>
          <CardDescription>{data?.email || ""}</CardDescription>
          <CardDescription>{`${
            data?.username || ""
          }.prakashpun.com.np`}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
