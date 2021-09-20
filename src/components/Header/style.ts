import styled from "styled-components";

export const Container = styled.header`
    width: 100%;    
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 2rem 1rem 12rem;

    button {
        background: var(--blue-light);
        color: var(--shape);
        border: 0;
        border-radius: .25rem;
        padding: 0 2rem;
        height: 2.5rem;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(.9);
        }

    }
`