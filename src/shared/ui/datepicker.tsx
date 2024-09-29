import React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/shared/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { UseFormSetValue } from 'react-hook-form';
import { ru } from 'date-fns/locale';

export function DatePicker({
  inputName,
  setValue,
}: {
  inputName: string;
  setValue: UseFormSetValue<any>;
}) {
  const [date, setDate] = React.useState<Date>();
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setValue(inputName, selectedDate);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP', { locale: ru }) : <span>__.__.____</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
