import React from 'react';

interface ItemCardProps {
    item: Produto;
    isSelected: boolean;
    onSelect: (id: string, isSelected: boolean) => void;
    sendedItemsSucess: boolean;
    sendedItemsFail: boolean;
}

export const ProdutoCartaoCSV: React.FC<ItemCardProps> = ({ item, isSelected, onSelect, sendedItemsSucess, sendedItemsFail }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelect(item.id, event.target.checked);
    };

    return (
        <div key={item.id} className='item_caixa'>
            <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
            <div>
                <p className='item_titulo'>({item.id}) {item.name}</p>
                <p>{item.category}</p>
                <p>R${item.price}</p>
                <div className='button_div'>
                    <input
                        className='checkbox'
                        name='selecionado'
                        type="checkbox"
                        id={`checkbox_${item.id}`}
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                    />
                    <label className='checkbox' htmlFor={`checkbox_${item.id}`}>
                        Selecionado
                    </label>
                </div>
                <div>
                    {sendedItemsSucess && (
                        <p style={{ color: 'green', fontWeight: 'bold' }}>Produto cadastrado com sucesso!</p>
                    )}
                    {sendedItemsFail &&(
                        <p style={{ color: 'red', fontWeight: 'bold' }}>Falha ao cadastrar produto!</p>
                    )}
                </div>
            </div>
        </div>


        /*
        <div className={`card ${isSelected ? 'selected' : ''}`}>
            <div className="card-info">
                <p>ID: {item.id}</p>
                <p>Nome: {item.name}</p>
            </div>
            <input
                className='checkbox'
                type="checkbox"
                id={`checkbox_${item.id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
            />
            <label className='checkbox' htmlFor={`checkbox_${item.id}`}>
                Selecionado
            </label>
        </div>
        */
    );
};

/*
import { useState } from "react";

export const ProdutoCartaoCSV = (item: Produto) => {
    // const [checked, setChecked] = useState(false);

    // const handleCheckboxChange = () => {
    //     setChecked(!checked);
    // };

    return(
      <div key={item.id} className='item_caixa'>
        <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
        <div>
            <p className='item_titulo'>({item.id}) {item.name}</p>
            <p>{item.category}</p>
            <p>R${item.price}</p>
            <div className='button_div'>
                <input
                    type="checkbox"
                    id="selecionado"
                    //checked={checked}
                    //onChange={handleCheckboxChange}
                />
                <label htmlFor="selecionado">
                    Selecionado
                </label>
            </div>
        </div>
      </div>
    );
}
*/