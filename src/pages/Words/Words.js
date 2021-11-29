import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

import Alert from '@mui/material/Alert';
import {useWords} from "../../hooks/useWords";
import Layout from "../../layout";
import Button from "@mui/material/Button";

export default function Words() {
    const {words} = useWords();
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    return (
        <Layout title="Words">
            <div style={{height: 'calc(100vh - 95px)', marginTop: 80}}>
                <DataGrid
                    rows={words}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    editMode="row"
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
            </div>
        </Layout>
    );
}

const columns = [
    {field: 'value', headerName: 'Word', width: 180, editable: true},
    {field: 'ru', headerName: 'Russian', editable: true},
    {
        field: 'create',
        headerName: 'Date Created',
        type: 'date',
        width: 180,
        editable: true,
    },
    {
        field: 'edit',
        headerName: 'Last Edited',
        type: 'dateTime',
        width: 220,
        editable: true,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 220,
        type: 'actions',
        editable: true,
        getActions: ({id}) => {
            return([
                <Button onClick={() => alert(id)}>Save</Button>,
                <Button onClick={() => alert(id)}>Cancel</Button>

            ])
        }
    },
];
