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

export default function Words() {
    const apiRef = useGridApiRef();
    const {words} = useWords();
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [selectedCellParams, setSelectedCellParams] = React.useState(null);

    console.log(selectedCellParams)

    const handleCellClick = React.useCallback((params) => {
        setSelectedCellParams(params);
    }, []);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCancelClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.setRowMode(id, 'view');

        const row = apiRef.current.getRow(id);
        if (row.isNew) {
            apiRef.current.updateRows([{ id, _action: 'delete' }]);
        }
    };

    const handleEditClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.setRowMode(id, 'edit');
    };

    const handleDeleteClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };

    const handleClick = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field, cellMode } = selectedCellParams;
        if (cellMode === 'edit') {
            //apiRef.current.commitCellChange({ id, field });
            //apiRef.current.setCellMode(id, field, 'view');
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'view'});
        } else {
            //apiRef.current.setCellMode(id, field, 'edit');
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit', hasFocus: true  });
        }
    };

    const handleDoubleCellClick = React.useCallback((params, event) => {
        console.log(params)
        event.defaultMuiPrevented = true;
    }, []);

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
            width: 100,
            type: 'actions',
            getActions: (action) => {
                //const { cellMode } = selectedCellParams;
                //const isInEditMode = cellMode === 'edit' && action.id === id;
                const isInEditMode = false

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleClick}
                            color="primary"
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleClick}
                            color="inherit"
                        />,
                    ];
                }

                return([
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleClick}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleClick}
                        color="inherit"
                    />,
                ])
            }
        },
    ];

    return (
        <Layout title="Words">
            <div style={{height: 'calc(100vh - 95px)', marginTop: 80}}>
                <DataGrid
                    apiRef={apiRef}
                    rows={words}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    editMode="row"
                    onEditRowsModelChange={handleEditRowsModelChange}
                    // onRowSelected={(parmas) => {
                    //     console.log(Array.from(parmas.api.current.getSelectedRows().entries()));
                    // }}
                    onCellDoubleClick={handleDoubleCellClick}
                    onCellClick={handleCellClick}
                />
            </div>
        </Layout>
    );
}
