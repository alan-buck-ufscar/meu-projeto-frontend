import React, { useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import { csvRowSchema } from '../validationSchema';
import { ValidationError } from 'yup';
import { ProdutoCartaoCSV } from './ProdutoCartaoCSV';

// Define a interface para os resultados da validação
interface ValidationResult {
    row: Produto;
    isValid: boolean;
    errors: string[];
    rowIndex: number;
}

function transformValidationResultsToProductList(validationResults: ValidationResult[]): Produto[] {
    return validationResults.map((result: ValidationResult) => ({
        id: result.row.id,
        name: result.row.name,
        description: result.row.description,
        price: result.row.price,
        category: result.row.category,
        pictureUrl: result.row.pictureUrl
    }));
}

export const EnviaCSV: React.FC = () => {
    const { readString } = usePapaParse();
    const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
    const [validationMessage, setValidationMessage] = useState<string>('');
    const dados = transformValidationResultsToProductList(validationResults);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleItemSelect = (id: string, isSelected: boolean) => {
        setSelectedItems(prevSelectedItems => {
        if (isSelected) {
            // Adiciona o ID se ele ainda não estiver no array
            return [...prevSelectedItems, id];
        } else {
            // Remove o ID do array
            return prevSelectedItems.filter(itemId => itemId !== id);
        }
        });
    };
    
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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        dados.map(item => (
            console.log(selectedItems.includes(item.id)
            )
        ))
    }

    return (
        <>
            <div className='form_container'>
                <h2>Enviar arquivo CSV</h2>
                <input className='item_input_group' type="file" accept=".csv" onChange={handleFileChange} />
                <button
                    disabled={validationResults.length === 0}
                    onClick={handleSubmit}
                >Enviar...</button>
                {validationMessage && <p>{validationMessage}</p>}
            </div>
            <div>
                {validationResults.length > 0 && (
                    <>
                        {dados.map(item => (
                            <ProdutoCartaoCSV
                                key={item.id}
                                item={item}
                                isSelected={selectedItems.includes(item.id)}
                                onSelect={handleItemSelect}
                            />
                        ))}
                        <div className="selected-info">
                            <h3>IDs Selecionados:</h3>
                            <p>{selectedItems.join(', ')}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
