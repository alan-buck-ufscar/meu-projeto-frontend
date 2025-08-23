import { Form } from "react-router"

export const ProdutoApaga: React.FC<Produto> = ({ id }) => {
    return (
        <Form method="DELETE" action='/produto'>
            
        </Form>
    ); 
}
