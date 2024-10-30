import Link from 'next/link';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string;
  prevCursor: string;
  baseUrl: string;
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextCursor,
  prevCursor,
  baseUrl,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        disabled={!hasPreviousPage}
        asChild={hasPreviousPage}
      >
        {hasPreviousPage ? (
          <Link href={`${baseUrl}?cursor=${prevCursor}`}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </span>
        )}
      </Button>

      <Button
        variant="outline"
        disabled={!hasNextPage}
        asChild={hasNextPage}
      >
        {hasNextPage ? (
          <Link href={`${baseUrl}?cursor=${nextCursor}`}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        ) : (
          <span>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </span>
        )}
      </Button>
    </div>
  );
}