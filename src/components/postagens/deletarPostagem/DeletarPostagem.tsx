import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../service/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarPostagem() {
    let history = useNavigate();

    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    )

    const [postagem, setPostagem] = useState<Postagem>();

    useEffect(() => {
        if (token === '') {
            alert('Você nem deveria estar aqui');
            history('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id]);

    async function findById(id: string) {
        await buscaId(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
    }

    async function sim() {
        try {
            await deleteId(`/postagens/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            alert('Postagem apagada com sucesso');
        } catch (error) {
            alert('Falha ao apagar a postagem');
        }
    }

    function nao() {
        history('/posts');
    }

    return (
        <>
            <Box>
                <Card variant="outlined">
                    <CardContent>
                        <Box>
                            <Typography>Deseja deletar a postagem:</Typography>
                            <Typography>{postagem?.titulo}</Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display='flex' gap={2} >
                            <Box>
                                <Button variant='contained' size='large' color='primary' onClick={nao}>Não</Button>
                            </Box>
                            <Box>
                                <Button variant='contained' size='large' color='error' onClick={sim}>Sim</Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}

export default DeletarPostagem;