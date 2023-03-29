import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";

export function Livros() {

    const [livros, setLivros] = useState(null);
    
    useEffect(() =>
    {
        initializeTable();
    }, []);

    function initializeTable(){
        //buscar info no bd
        // const busca = await getLivros();
        getLivros().then(busca => {
            setLivros(busca);
        });
    }

    function onDeleteLivro(id, titulo) {
        const deletar = window.confirm(`Confirma a exclusão o livro ${titulo}?`);
        if (deletar) {
            //apagar info
            deleteLivro(id).then(() => {
                toast.success(
                    `Livro ${titulo} excluido com sucesso!`,
                    {
                        duration: 2000
                    });
                initializeTable();
            });
        } else {
            toast.success(
                "Operação cacelada!",
                {
                    duration: 2000
                });
        }
    }

    return (
        <div className="livros">
            <Container>
                <div className="d-flex justify-content-between aligns-items-center">
                    <h1>Livros</h1>
                    <Button 
                    as={Link} 
                    to="/livros/adicionar" 
                    variant="success"
                    className="mt-2"
                    >
                        Adicionar Livro
                    </Button>
                </div>
            </Container>
            <hr />

            {livros === null ?
                <Loader /> : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Categoria</th>
                                <th>ISBN</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.autor}</td>
                                        <td>{livro.categoria}</td>
                                        <td>{livro.isbn}</td>
                                        <td>
                                            <img src={livro.urlCapa} alt={livro.titulo} />
                                        </td>
                                        <td>
                                            <Button
                                                as={Link}
                                                to={`/livros/editar/${livro.id}`}
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button
                                                onClick={() => onDeleteLivro(livro.id, livro.titulo)}
                                                variant="danger"
                                                size="sm"
                                            >
                                                <i className="bi bi-trash3-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                )}
        </div>
    )
}