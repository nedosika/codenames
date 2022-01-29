import * as React from 'react';
import {Outlet, useNavigate} from "react-router";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {experimentalStyled as styled} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import Layout from "../../layout";
import {useWords} from "../../hooks/useWords";

function EditToolbar({numSelected, onDeleteWords, onOpenCreateProcessDialog}) {
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            {numSelected > 0 ? (
                <Tooltip title="Delete" sx={{margin: '5px'}}>
                    <IconButton onClick={onDeleteWords}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list" sx={{margin: '5px'}}>
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
            <Button color="primary" onClick={onOpenCreateProcessDialog}>Add</Button>
        </Box>
    );
}

export default function Words() {
    const navigate = useNavigate();
    const {words, deleteWords, updateWord} = useWords();
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [selected, setSelected] = React.useState(0);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleStateChange = React.useCallback((params) => {
        setSelected(params?.selection)
    }, []);

    const handleDeleteSelectedWords = () => {
        deleteWords(selected).then(() => console.log('deleted'))
    }

    const handleOpenCreateProcessDialog = () => {
        navigate(`add`);
    };

    const handleRowEditStop = ({id}) => {

        const {value: {value}, ru: {value: ru} } = editRowsModel[id];

        updateWord({id, value, ru}).then(() => console.log('updated'))
    }

    const columns = [
        {field: 'value', headerName: 'Words', width: 180, editable: true},
        {field: 'ru', headerName: 'Russian', width: 180, editable: true},
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
                    componentsProps={{
                        toolbar: {
                            numSelected: selected?.length,
                            onDeleteWords: handleDeleteSelectedWords,
                            onOpenCreateProcessDialog: handleOpenCreateProcessDialog
                        }
                    }}
                    rows={words}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    editMode="row"
                    disableSelectionOnClick
                    onEditRowsModelChange={handleEditRowsModelChange}
                    checkboxSelection
                    onStateChange={handleStateChange}
                    onRowEditStop={handleRowEditStop}
                />
            </div>
            <Outlet/>
        </Layout>
    );
}
