import * as yup from 'yup';

// O schema do Yup para validar cada linha do CSV.
export const csvRowSchema = yup.object().shape({
    id: yup.string().required('A ID é obrigatória'),
    name: yup.string().required('O nome é obrigatório'),
    description: yup.string().required('A descrição é obrigatória'),
    price: yup.number().required('O preço é obrigatório'),
    category: yup.string().required('A categoria é obrigatória'),
    pictureUrl: yup.string().required('A URL é obrigatória'),
});

// O schema para validar o array de dados.
// Isso é útil para validar o arquivo completo.
export const csvDataSchema = yup.array().of(csvRowSchema);
