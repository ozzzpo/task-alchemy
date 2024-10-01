import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { ReactNode, useState } from 'react';
import { Button } from './button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  entitySheet: (data: any) => ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  entitySheet,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="border-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="!border-b-0">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className=" first:rounded-l-lg last:rounded-r-lg bg-[#F2F4F5] overflow-hidden"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Sheet key={row.id}>
                <SheetTrigger asChild>
                  <TableRow
                    className="cursor-pointer"
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </SheetTrigger>
                <SheetContent>
                  {entitySheet({ data: row.original })}
                </SheetContent>
              </Sheet>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Здесь пока пусто...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="space-x-3 mt-2">
        <Button
          className={`${table.getCanNextPage() ? '' : 'hidden'}`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          className={`${table.getCanNextPage() ? '' : 'hidden'}`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
      </div>
    </div>
  );
}
