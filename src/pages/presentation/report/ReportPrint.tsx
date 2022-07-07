import { TransactionInterface } from 'common/apis/transaction'
import { Grid } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTransactionsList } from 'redux/transaction/selector';

const ReportPrint = () => {
    const data = useSelector(selectTransactionsList)
    const [printData, setPrintData] = useState<string[][]>([])

    const transactionColumns = [
        'no',
        'transactionType',
        'transactionTimestamp',
        'mobileNumber',
        'amount',
        'payerBank',
        'payerBankAccountNumber',
        'recipientBank',
        'recipientBankAccountNumber',
        'status',
        'notes',
    ]
    
    useEffect(() => {
        const sortedData = data.map((row: TransactionInterface, index: number) => {
            const sortedFields: any = { no: index + 1}
            transactionColumns.forEach((column: string) => {
                if (row[column as keyof TransactionInterface]) {
                    if (column === 'transactionTimestamp') {
                        sortedFields[column] = moment(row.transactionTimestamp).format()
                    } else if (column === 'payerBank') {
                        sortedFields[column] = row.payerBank?.acronym.toUpperCase()
                    } else if (column === 'recipientBank') {
                        sortedFields[column] = row.recipientBank?.acronym.toUpperCase()
                    } else {
                        sortedFields[column] = row[column as keyof TransactionInterface]
                    }
                }
            })
            return sortedFields
        })
        setPrintData(sortedData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (printData.length > 0) {
            window.print()
        }
    }, [printData])

    return (<Grid
        data={printData}
        columns={transactionColumns}
        style={{
            table: { 'font-size': '10px' },
            td: { padding: 0 },
            th: { padding: 0 }
        }}
    />)
}

export default ReportPrint