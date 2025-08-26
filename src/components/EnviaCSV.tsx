import React, { useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import { csvRowSchema } from '../validationSchema';
import { ValidationError } from 'yup';
import { ProdutoCartaoCSV } from './ProdutoCartaoCSV';
import axios from 'axios';
import { URL_BACKEND } from '../constants';

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
    const [sendedItemsSucess, setSendedItemsSucess] = useState<string[]>([]);
    const [sendedItemsFail, setSendedItemsFail] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState<boolean>(false);

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
    
    const InsertItemSendedSucess = (id: string) => {
        setSendedItemsSucess([...sendedItemsSucess, id]);
    };
    
    const InsertItemSendedFail = (id: string) => {
        setSendedItemsFail([...sendedItemsFail, id]);
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

    const postSequencial = async() => {
        setLoading(true);
        // setError(null);
        // setSuccess(false);
        setSendedItemsFail([]);
        setSendedItemsSucess([]);

        for (const item of dados) {
            if (selectedItems.includes(item.id)){
                try {
                    console.log(`Enviando item: ${item.name}`);
                    const response = await axios.post<Produto>(URL_BACKEND, item);
                    console.log('Requisição bem-sucedida para:', response.data.name);
                    InsertItemSendedSucess(item.id,);
                    // setSuccess(true);
                } catch (err) {
                    // setError('Ocorreu um erro ao enviar os dados.');
                    InsertItemSendedFail(item.id,);
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        }
    }

    // Lógica de renderização
    if (loading) {
        return <div>Enviando dados...</div>;
    }
    /*
    if (error) {
        return <div>Erro: {error}</div>;
    }
    if (success) {
        return <div>Todos os itens foram enviados com sucesso!</div>;
    }
    */


    return (
        <>
            <div className='form_container'>
                <h2>Enviar arquivo CSV</h2>
                <input className='item_input_group' type="file" accept=".csv" onChange={handleFileChange} />
                <button
                    // disabled={validationResults.length === 0}
                    disabled={(selectedItems.length === 0) || (loading)}
                    onClick={postSequencial}
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
                                    sendedItemsSucess={sendedItemsSucess.includes(item.id)}
                                    sendedItemsFail={sendedItemsFail.includes(item.id)}
                                />
                                
                                // {/* <div>
                                //     {sendedItemsSucess.includes(item.id) && (
                                //         <p style={{ color: 'green', fontWeight: 'bold' }}>Produto cadastrado com sucesso!</p>
                                //     )}
                                //     {sendedItemsFail.includes(item.id) &&(
                                //         <p style={{ color: 'red', fontWeight: 'bold' }}>Falha ao cadastrar produto!</p>
                                //     )}
                                // </div> */}
                            
                        ))}
                        {/* <div className="selected-info">
                            <h3>IDs Selecionados:</h3>
                            <p>{selectedItems.join(', ')}</p>
                        </div> */}
                    </>
                )}
            </div>
        </>
    );
};
