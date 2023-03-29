import { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getEmprestimo } from "../../firebase/emprestimo";

export function Emprestimos() {

    const [emprestimos, setEmprestimos] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        //buscar info no bd
        // const busca = await getemprestimo();
        getEmprestimo().then(busca => {
            setEmprestimos(busca);
            console.log("Aqui está" + busca);
        });
    }

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Empréstimos</h1>
                    <Button as={Link} to="/emprestimos/adicionar" variant="success">Novo</Button>
                </div>


                {emprestimos === null ?
                    <Loader /> : (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Leitor</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th>Titulo Livro</th>
                                    <th>Status</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emprestimos.map((emprestimo) => {
                                    const data = emprestimo.dataEmprestimo.toDate().toLocaleDateString('pt-br')
                                    return (
                                        <tr key={emprestimo.id}>
                                            <td>{emprestimo.leitor}</td>
                                            <td>{emprestimo.email}</td>
                                            <td>{emprestimo.telefone}</td>
                                            <td>{emprestimo.livro.titulo}</td>
                                            <td>
                                                <Badge bg={
                                                    emprestimo.status === "Pendente" ? "warning"
                                                    : "success"
                                                }>{emprestimo.status}</Badge>
                                            </td>
                                            <td>{data}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    )}
            </Container>
        </div>
    )
}

//trazer para tela as informações do bd
// LEITOR
// EMAIL
// TELEFONE
// TITULO emprestimo
// STATUS
// DATA