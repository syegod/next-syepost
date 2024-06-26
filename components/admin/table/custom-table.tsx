'use client';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { SortType } from '@/types';
import React, { FC, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CustomCell } from "./custom-cell";


interface CustomTableProps {
    data: any[]
}

const CustomTable: FC<CustomTableProps> = ({
    data
}) => {
    const [sort, setSort] = useState<SortType>({
        field: 'createdAt',
        order: 'desc'
    });
    const [table_data, setTableData] = useState<any[]>(data);

    useEffect(() => {
        console.log(Object.keys(table_data?.[0]))
    }, [sort])

    const changeSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const field = e.currentTarget.id;
        if (sort.field === field) {
            if (sort.order === 'asc') {
                setSort({ field, order: 'desc' });
            } else {
                setSort({ field, order: 'asc' });
            }
            return;
        } else {
            setSort({ field: field, order: 'asc' })
        }
    }

    return (
        <Table className="max-h-[40vh]">
            <TableHeader>
                <TableRow>
                    {Object.keys(table_data[0]).map((e, key) => (
                        <TableHead key={key}>{e}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {table_data.map((e, key) => (
                    <TableRow key={key} className="hover:bg-primary/90 hover:text-background transition cursor-pointer">
                        {Object.values(e).map((elem, i) => (
                            <CustomCell data={elem} key={i} />
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}

export default CustomTable