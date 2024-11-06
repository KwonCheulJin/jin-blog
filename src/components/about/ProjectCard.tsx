import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  detailsUrl: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  detailsUrl,
}: ProjectCardProps) {
  return (
    <Card className="flex-col">
      <Image
        className="h-full w-full rounded-t-lg"
        src={imageUrl}
        alt={`${title} 프로젝트 이미지`}
        width={192}
        height={192}
      />
      <div className="flex w-full flex-col justify-between p-4">
        <CardHeader className="p-0">
          <CardTitle className="mb-2 text-xl font-bold">{title}</CardTitle>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-0 pt-4">
          <Button className="z-50 w-full" asChild>
            <Link href={detailsUrl} target="_blank" rel="noopener noreferrer">
              사이트 보기
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
