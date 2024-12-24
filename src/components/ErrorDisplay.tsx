'use client'

import { Button } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({
  title = "出错了",
  message = "加载失败，请稍后重试",
  onRetry
}: ErrorDisplayProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3 justify-center">
          {/* <ExclamationTriangleIcon className="w-8 h-8 text-danger" /> */}
          <p className="text-xl font-bold text-danger">{title}</p>
        </CardHeader>
        <CardBody className="text-center">
          <p className="text-default-500 mb-4">{message}</p>
          {onRetry && (
            <Button 
              color="primary" 
              variant="flat"
              onPress={onRetry}
            >
              重试
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
} 