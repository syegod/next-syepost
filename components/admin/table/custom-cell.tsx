import { TableCell } from '@/components/ui/table';
import { PopoverWrapper } from '@/components/wrappers/popover-wrapper';
import { FC } from 'react';

interface CustomCellProps {
    data: any
}

export const CustomCell: FC<CustomCellProps> = ({
    data
}) => {


    if (data instanceof Date) {
        return (
            <TableCell className="max-w-[20em] truncate">
                {data.toLocaleString()}
            </TableCell>
        )
    }
    if (data instanceof Array) {
        return (
            <TableCell className="max-w-[20em] truncate">
                {data.length > 0 ?
                    <PopoverWrapper trigger={
                        <button className='hover:underline'>Array{`[${data.length}]`}</button>
                    }>
                        <div className='grid'>
                            {data.map((e: any, key) => (
                                <pre key={key} className='text-xs'>
                                    {JSON.stringify(e, null, 1)}
                                </pre>
                            ))}
                        </div>
                    </PopoverWrapper> : <button className='hover:underline'>Array{`[${data.length}]`}</button>
                }
            </TableCell>
        )
    }
    if (data instanceof Object) {
        return (
            <TableCell className="max-w-[20em] truncate">
                <div className='hover:underline'>Object{"{}"}</div>
            </TableCell>
        )
    }
    else {
        return (
            <TableCell className="max-w-[20em] truncate">
                {data}
            </TableCell>
        )
    }

}