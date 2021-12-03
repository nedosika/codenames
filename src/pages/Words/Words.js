import * as React from 'react';
import {DataGrid, useGridApiRef, GridActionsCellItem} from '@mui/x-data-grid';

import Alert from '@mui/material/Alert';
import {useWords} from "../../hooks/useWords";
import Layout from "../../layout";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';


function EditToolbar({numSelected}) {
    console.log(numSelected)
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            {numSelected > 0 ? (
                <Tooltip title="Delete" sx={{margin: '5px'}}>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list" sx={{margin: '5px'}}>
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}

        </Box>
    );
}

export default function Words() {
    const {words} = useWords();
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [numSelected, setNumSelected] = React.useState(0);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleStateChange = (params) => {
        setNumSelected(params?.selection?.length)
        console.log(params)
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
        }
    ];

    return (
        <Layout title="Words">
            <div style={{height: 'calc(100vh - 95px)', marginTop: 80}}>
                <DataGrid
                    components={{Toolbar: EditToolbar}}
                    componentsProps={{numSelected}}
                    rows={words}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    editMode="row"
                    disableSelectionOnClick
                    onEditRowsModelChange={handleEditRowsModelChange}
                    checkboxSelection
                    onStateChange={handleStateChange}
                />
            </div>
        </Layout>
    );
}
