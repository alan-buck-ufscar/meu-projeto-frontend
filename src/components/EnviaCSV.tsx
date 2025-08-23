import React, { useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import { csvRowSchema } from '../validationSchema';
import { ValidationError } from 'yup';

// Define a interface para os resultados da validação
interface ValidationResult {
    row: Produto;
    isValid: boolean;
    errors: string[];
    rowIndex: number;
}

export const EnviaCSV: React.FC = () => {
    const { readString } = usePapaParse();
    const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
    const [validationMessage, setValidationMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvString = e.target?.result as string;
            
            // Configurações do PapaParse
            readString(csvString, {
                header: true, // As primeiras linhas são cabeçalhos
                skipEmptyLines: true,
                dynamicTyping: true, // Converte números e booleanos automaticamente
                complete: (results) => {
                    const parsedData = results.data as Produto[];
                    let allValid = true;
                    const newResults: ValidationResult[] = [];

                    // Valida cada linha do CSV
                    parsedData.forEach((row, index) => {
                    try {
                        // Tenta validar a linha contra o schema do Yup
                        csvRowSchema.validateSync(row, { abortEarly: false });
                        newResults.push({
                            row,
                            isValid: true,
                            errors: [],
                            rowIndex: index + 1,
                        });
                    } catch (err) {
                        const yupError = err as ValidationError;
                        allValid = false;
                        newResults.push({
                            row,
                            isValid: false,
                            errors: yupError.errors,
                            rowIndex: index + 1,
                        });
                    }
                    });

                    setValidationResults(newResults);
                    if (allValid) {
                        setValidationMessage('Todos os dados do CSV são válidos!');
                    } else {
                        setValidationMessage('Foram encontrados dados inválidos no CSV. Verifique a lista abaixo.');
                    }
                },
                error: (error) => {
                    console.error('Erro ao parsear o CSV:', error);
                    setValidationMessage('Ocorreu um erro ao processar o arquivo CSV.');
                }
                });
        };
        reader.readAsText(file);
        }
    };

    return (
        <div className='form_container'>
            <h2>Enviar arquivo CSV</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />

            {validationMessage && <p>{validationMessage}</p>}

            {validationResults.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Linha</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Categoria</th>
                            <th>Imagem</th>
                            <th>Erros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {validationResults.map(result => (
                        <tr key={result.rowIndex} style={{ backgroundColor: result.isValid ? '#d4edda' : '#f8d7da' }}>
                            <td>{result.rowIndex}</td>
                            <td>{result.row.id}</td>
                            <td>{result.row.name}</td>
                            <td>{result.row.description}</td>
                            <td>{result.row.price}</td>
                            <td>{result.row.category}</td>
                            <td>{result.row.pictureUrl}</td>
                            <td>{result.isValid ? 'Válido' : 'Inválido'}</td>
                            <td>
                            {result.errors.length > 0 && (
                                <ul>
                                    {result.errors.map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                    ))}
                                </ul>
                            )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
