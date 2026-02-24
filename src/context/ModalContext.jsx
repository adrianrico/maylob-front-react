import { createContext, useContext, useState } from 'react'
import MessageDisplay                          from '../custom_components/message_display'

const ModalContext = createContext()

export function ModalProvider({ children }) 
{
    const [modalState, setModalState] = useState({
        isOpen: false,
        messages: [],
        displayCode: 0
    })

    function openModal(messages, displayCode = 0)
    {
        setModalState
        ({
            isOpen: true,
            messages,
            displayCode
        })
    }

    function closeModal() 
    {
        setModalState(prev => ({ ...prev, isOpen: false }))
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            <MessageDisplay
                isOpen      = {modalState.isOpen}
                messages    = {modalState.messages}
                displayCode = {modalState.displayCode}
                onClose     = {closeModal}
            />
            
        </ModalContext.Provider>
    )
}

export function useModal() 
{
    return useContext(ModalContext)
}