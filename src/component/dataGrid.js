
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function DataTable() {


    const MySwal = withReactContent(Swal)


    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [loading, setLoading] = useState('');
    const [data, setData] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateBody, setUpdateBody] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [useriId, setUserId] = useState('');
    const create = (row) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: title,
            body: body,
            userId: useriId,
        }).then((json) => {
            MySwal.fire({
                icon: 'success',
                title: 'Creacion Exitosa',
                text: JSON.stringify(json.data),
                footer: '<a href="">Si tiene alguna duda comuniquese con jorge suarez</a>'
            })
        });
        console.log(row)

    }

    const updater = (row) => {
        setData(row);
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: updateTitle,
            body: updateBody,
            userId: row.userId,
        }).then((json) => {
            console.log(json)
        });
        console.log(row)

    }
    const deleteData = (row) => {

        axios.delete(`https://jsonplaceholder.typicode.com/posts/${row.userId}`).then((data) => {
            MySwal.fire({
                icon: 'success',
                title: 'Fila eliminada correctamente',
                text: `${JSON.stringify(row)} Respuesta endpoint : ${JSON.stringify(data.status)}`,
                footer: '<a href="">Si tiene alguna duda comuniquese con jorge suarez</a>'
            })
            console.log(data)
         })
        

       

    }

    const columns = [
        { field: 'id', headerName: 'id', width: 70 },
        { field: 'userId', headerName: 'userId', width: 80 },
        { field: 'title', headerName: 'title', width: 200 },
        { field: 'completed', headerName: 'completed', width: 200, },
        {
            field: "Update",
            headerName: "Update",
            sortable: true,
            renderCell: ({ row }) =>
                <Button style={{
                    borderRadius: 35,
                    backgroundColor: "#21b6ae",
                    fontSize: "18px"
                }} variant={'contained'} onClick={() => { updater(row); handleClickOpenUpdate() }}>
                    Update
                </Button>
        },

        {
            field: "delete",
            headerName: "delete",
            sortable: true,
            renderCell: ({ row }) =>
                <Button style={{
                    borderRadius: 35,
                    backgroundColor: "#ff0000",
                    fontSize: "18px"
                }} variant={'contained'} onClick={() => { deleteData(row) }}>
                    delete
                </Button>
        },
    ];


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloser = () => {
        setOpen(false);
        create();
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const handleCloserUpdate = () => {
        setOpenUpdate(false);
        MySwal.fire({
            icon: 'success',
            title: 'Actualizacion exitosa',
            text: 'presiona Ok para continuar',
            footer: '<a href="">Si tiene alguna duda comuniquese con jorge suarez</a>'
        })
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeupdateBody = (e) => {
        setUpdateBody(e.target.value);
        console.log(e.target.value);
    };
    const handleChangeupdateTitle = (e) => {
        setUpdateTitle(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeBody = (e) => {
        setBody(e.target.value);
        console.log(e.target.value);
    };
    const handleChangeUserId = (e) => {
        setUserId(e.target.value);
        console.log(e.target.value);
    };
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then((response) => {
                setLoading(response.data)
                return response.data
            })
    }, [loading]);
    return (

        <><div style={{ height: 400, width: '100%' }}>
            <Button variant={'contained'} onClick={() => { handleClickOpen() }}>
                Create
            </Button>
            <DataGrid
                rows={loading}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]} />
        </div><div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            por favor agrege los datos
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="title"
                            type="string"
                            fullWidth
                            variant="filled"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="body"
                            type="string"
                            fullWidth
                            variant="filled"
                            onChange={handleChangeBody} />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userId"
                            label="userId"
                            type="numeric"
                            fullWidth
                            variant="filled"
                            onChange={handleChangeUserId} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleCloser}>Crear</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openUpdate} onClose={handleCloseUpdate}>
                    <DialogTitle>Update</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            por favor agrege los datos
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="title"
                            type="string"
                            fullWidth
                            variant="filled"
                            onChange={handleChangeupdateTitle}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="body"
                            type="string"
                            fullWidth
                            variant="filled"
                            onChange={handleChangeupdateBody}/>
                            
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userId"
                            label="userId"
                            type="numeric"
                            fullWidth
                            variant="filled"
                            value={data.userId}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUpdate}>Cancelar</Button>
                        <Button onClick={handleCloserUpdate}>Crear</Button>
                    </DialogActions>
                </Dialog>
            </div></>
    );
}
