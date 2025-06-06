import { Button } from '@/shared/ui/button';
import type { Doc } from '@/../convex/_generated/dataModel';
import type { PaginationStatus } from 'convex/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/ui/table';
import { Loader2, LoaderIcon } from 'lucide-react';
import { DocumentRow } from '../../..';

interface DocumentsTableProps {
  documents: Doc<'documents'>[] | null;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export default function DocumentsTable({
  documents,
  loadMore,
  status
}: DocumentsTableProps) {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-5 px-16 py-6">
      {documents ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {!documents.length ? (
            <TableBody>
              <TableRow className="hover:bg-transparent border-none">
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map(document => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      ) : (
        <div className="flex items-center justify-center h-24">
          <LoaderIcon className="size-5 text-muted-foreground animate-spin" />
        </div>
      )}

      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status !== 'CanLoadMore'}
        >
          {status === 'CanLoadMore' ? (
            'Load more'
          ) : status === 'LoadingMore' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            !documents && 'End of results'
          )}
        </Button>
      </div>
    </div>
  );
}
