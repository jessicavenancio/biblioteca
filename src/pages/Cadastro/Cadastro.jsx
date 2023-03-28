import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg"
import { useForm } from "react-hook-form";
import { loginGoogle, cadastrarEmailSenha } from "../../firebase/auth";
import { toast } from "react-hot-toast";


export function Cadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();


    function onSubmit(data) {
        const { email, senha } = data;
        cadastrarEmailSenha(email, senha).then((user) => {
            toast.success(`Bem-vindo(a) ${user.displayName }`,
            {
                position: "top-center",
                duration: 2500,
            });

            navigate("/");
        }).catch((erro)=>{
            toast.error(`Um erro inesperado aconteceu. 
            Código: ${erro.code}.
            Atualize a página.`,
            {
                position: "top-center",
                duration: 2500,
            });
        });
    }

    function onLoginGoogle() {
        loginGoogle().then((user) => {
            console.log(user);
            toast.success(`Bem-vindo(a) ${user.displayName }`,
            {
                position: "top-center",
                duration: 2500,
            });
            navigate("/");
        }).catch((erro)=>{
            toast.error(`Um erro inesperado aconteceu. 
            Código: ${erro.code}.
            Atualize a página.`,
            {
                position: "top-center",
                duration: 2500,
            });
        });
    };

    return (
        <>
            <Container fluid className="my-5">
                <p className="text-center">
                    <img src={logoIcon} width="256" alt="Logo app" />
                </p>
                <h4>Faça parte da nossa plataforma</h4>
                <p className="text-muted">
                    Já tem conta? <Link to="/login">Entre</Link>
                </p>
                <hr />
                <Button variant="danger" className="mb-3" onClick={onLoginGoogle}>
                    <img src={googleIcon} width="28" alt="Logo google" />
                    Entrar com o Google
                </Button>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            className={errors.email ? "is-invalid" : ""}
                            placeholder="Seu email"
                            {...register("email", { required: "O e-mail é obrigatório" })}
                        />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            className={errors.senha ? "is-invalid" : ""}
                            placeholder="Sua senha"
                            {...register("senha", { required: "A senha é obrigatória" })}
                        />
                        <Form.Text className="invalid-feedback">
                            {errors.senha?.message}
                        </Form.Text>
                    </Form.Group>

                    <Button type="submit" variant="success">
                        Cadastrar
                    </Button>
                </Form>
            </Container>
        </>
    )
}