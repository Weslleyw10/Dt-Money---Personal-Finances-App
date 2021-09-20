import { Container, Content } from './style'

import { Summary } from '../Summary'
import { TransactionsTable } from '../TransactionsTable'

export function Dashboard () {
    return (
        <Container>
            <Content>
                <Summary />
                <TransactionsTable />
            </Content>
        </Container>        
    )
}
