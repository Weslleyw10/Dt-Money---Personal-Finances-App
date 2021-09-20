import { useState, FormEvent } from 'react'
import Modal from 'react-modal'

import { useTransactions } from '../../hooks/useTransactions'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './style'


interface NewTransactionModalOpen {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root")

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalOpen) {  
  const { createTransaction } = useTransactions()

  const [typeTransaction, setTypeTransaction] = useState('deposit')
  const initial_state = {
    title: '',
    amount: 0,
    category: '',
    type: 'deposit'
  }
  const [transaction, setTransaction] = useState(initial_state)

  const handleSetTransaction = (key:string, value:string|number) => {
    setTransaction({
        ...transaction,
        [key]: value
    })
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    })

    onRequestClose()
    setTransaction(initial_state)

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Titulo"
          value={transaction.title}
          onChange={({target}) => handleSetTransaction('title', (target as HTMLInputElement).value )}
        />

        <input
          type="number"
          placeholder="Valor"
          value={transaction.amount}
          onChange={({target}) => handleSetTransaction('amount', Number((target as HTMLInputElement).value ))}
        />

        <TransactionTypeContainer>
          <RadioBox 
            type="button"
            onClick={() => {
              handleSetTransaction('type', 'deposit')
              setTypeTransaction('deposit')
            }}     
            isActive={typeTransaction === 'deposit'}     
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          
          <RadioBox 
            type="button"
            onClick={() => {
              handleSetTransaction('type', 'withdraw')
              setTypeTransaction('withdraw')
            }}     
            isActive={typeTransaction === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={transaction.category}
          onChange={({target}) => handleSetTransaction('category', (target as HTMLInputElement).value )}
        />

        <button type="submit">Cadastrar</button>

      </Container>


    </Modal>
  )
}